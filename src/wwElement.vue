<template>
  <div class="ww-payment-plan-popup">
    <!-- Trigger Button -->
    <button @click="showPopup" class="payment-plan-trigger-btn" :style="buttonStyles">
      {{ content.buttonText || 'Create Payment Plan' }}
    </button>

    <!-- Payment Plan Creation Popup -->
    <div v-if="isPopupVisible" class="popup-overlay" @click="handleBackdropClick">
      <div class="popup-container" @click.stop>
        <div class="popup-header">
          <h2>{{ content.title || 'Create Payment Plan' }}</h2>
          <button class="close-btn" @click="hidePopup" :style="closeButtonStyles">×</button>
        </div>

        <div class="popup-content">
          <!-- Vendor Information Section -->
          <div class="vendor-info-section">
            <h3>Vendor Information</h3>
            <div class="vendor-details">
              <div class="detail-row">
                <span class="label">Vendor:</span>
                <span class="value">{{ content.staticVendorName || 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Total Amount:</span>
                <span class="value">${{ formatCurrency(content.staticQuotedAmount || 0) }}</span>
              </div>
              <!-- NEW: Amount Remaining Display -->
              <div class="detail-row amount-remaining-row">
                <span class="label">Amount Remaining:</span>
                <span class="value remaining-amount" :class="{ 'fully-paid': amountRemaining <= 0 }">
                  ${{ formatCurrency(amountRemaining) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Payment Form -->
          <form @submit.prevent="submitPayment" class="payment-form">
            <!-- Invoice/Reference Number -->
            <div class="form-group">
              <label>{{ content.invoiceLabel || 'Invoice/Reference Number' }}</label>
              <input 
                v-model="paymentData.invoice" 
                type="text" 
                :placeholder="content.invoicePlaceholder || 'Enter invoice or reference number'"
              />
            </div>

            <!-- Payment Amount (NOW REQUIRED) -->
            <div class="form-group">
              <label class="required-label">
                {{ content.paymentAmountLabel || 'Payment Amount' }}
                <span class="required-asterisk">*</span>
              </label>
              <input 
                v-model.number="paymentData.amount" 
                type="number" 
                step="0.01" 
                min="0.01"
                :max="amountRemaining > 0 ? amountRemaining : undefined"
                :placeholder="content.amountRemainingPlaceholder || 'Enter payment amount'"
                required 
                :class="{ 'error': validationErrors.amount }"
              />
              <small class="helper-text">{{ content.amountRemainingHelper || 'Enter the amount you want to pay now' }}</small>
              <div v-if="validationErrors.amount" class="error-message">{{ validationErrors.amount }}</div>
            </div>

            <!-- Payment Type (NOW REQUIRED) -->
            <div class="form-group">
              <label class="required-label">
                {{ content.paymentTypeLabel || 'Payment Type' }}
                <span class="required-asterisk">*</span>
              </label>
              <select v-model="paymentData.type" required :class="{ 'error': validationErrors.type }">
                <option value="">Select payment type</option>
                <option value="immediate">{{ content.immediatePaymentText || 'Immediate Payment' }}</option>
                <option value="historical">{{ content.historicalPaymentText || 'Historical Payment' }}</option>
                <option value="scheduled">{{ content.scheduledPaymentText || 'Scheduled Payment' }}</option>
              </select>
              <div v-if="validationErrors.type" class="error-message">{{ validationErrors.type }}</div>
            </div>

            <!-- Payment Date (for historical payments) -->
            <div v-if="paymentData.type === 'historical'" class="form-group">
              <label class="required-label">
                {{ content.paymentDateLabel || 'Payment Date' }}
                <span class="required-asterisk">*</span>
              </label>
              <input v-model="paymentData.date" type="date" :max="todayDate" required />
              <small class="helper-text">{{ content.paymentDateHelper || 'When was this payment made?' }}</small>
            </div>

            <!-- Scheduled Date (for scheduled payments) -->
            <div v-if="paymentData.type === 'scheduled'" class="form-group">
              <label class="required-label">
                {{ content.scheduledDateLabel || 'Scheduled Date' }}
                <span class="required-asterisk">*</span>
              </label>
              <input v-model="paymentData.scheduledDate" type="date" :min="todayDate" required />
              <small class="helper-text">{{ content.scheduledDateHelper || 'When should this payment be processed?' }}</small>
            </div>

            <!-- Payment Method (NOW REQUIRED) -->
            <div class="form-group">
              <label class="required-label">
                {{ content.paymentMethodLabel || 'Payment Method' }}
                <span class="required-asterisk">*</span>
              </label>
              <input 
                v-model="paymentData.method" 
                type="text" 
                :placeholder="content.paymentMethodPlaceholder || 'e.g., Credit Card, Bank Transfer, Check'"
                required 
                :class="{ 'error': validationErrors.method }"
              />
              <div v-if="validationErrors.method" class="error-message">{{ validationErrors.method }}</div>
            </div>

            <!-- Payment Reference -->
            <div class="form-group">
              <label>{{ content.paymentReferenceLabel || 'Payment Reference' }}</label>
              <input v-model="paymentData.reference" type="text" />
            </div>

            <!-- Notes -->
            <div class="form-group">
              <label>{{ content.notesLabel || 'Notes (Optional)' }}</label>
              <textarea 
                v-model="paymentData.notes" 
                :placeholder="content.notesPlaceholder || 'Add any additional notes about this payment'"
                rows="3"
              ></textarea>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button type="button" @click="hidePopup" class="cancel-btn" :style="cancelButtonStyles">
                {{ content.cancelButtonText || 'Cancel' }}
              </button>
              <button type="submit" :disabled="isProcessing || !isFormValid" class="submit-btn" :style="submitButtonStyles">
                {{ isProcessing ? (content.processingText || 'Processing...') : getSubmitButtonText() }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isPopupVisible: false,
      isProcessing: false,
      paymentData: {
        invoice: '',
        amount: null,
        type: '',
        date: '',
        scheduledDate: '',
        method: '',
        reference: '',
        notes: ''
      },
      validationErrors: {}
    }
  },
  computed: {
    // NEW: Amount Remaining calculation
    amountRemaining() {
      // This will be bound to WeWeb workflow/variable that calculates from Supabase
      return this.content.calculatedAmountRemaining || this.content.staticQuotedAmount || 0
    },
    
    // NEW: Today's date for date validation
    todayDate() {
      return new Date().toISOString().split('T')[0]
    },
    
    // NEW: Form validation
    isFormValid() {
      return (
        this.paymentData.amount && 
        this.paymentData.amount > 0 &&
        this.paymentData.type &&
        this.paymentData.method &&
        this.paymentData.method.trim().length > 0
      )
    },
    
    buttonStyles() {
      return {
        backgroundColor: this.content.buttonBackgroundColor || '#007bff',
        color: this.content.buttonTextColor || '#ffffff',
        borderRadius: this.content.buttonBorderRadius || '4px',
        padding: this.content.buttonPadding || '10px 20px',
        fontSize: this.content.buttonFontSize || '14px',
        fontWeight: this.content.buttonFontWeight || '500'
      }
    },
    cancelButtonStyles() {
      return {
        backgroundColor: this.content.cancelButtonBackgroundColor || '#6c757d',
        color: this.content.cancelButtonTextColor || '#ffffff'
      }
    },
    submitButtonStyles() {
      return {
        backgroundColor: this.content.submitButtonBackgroundColor || '#28a745',
        color: this.content.submitButtonTextColor || '#ffffff'
      }
    },
    closeButtonStyles() {
      return {
        color: this.content.closeButtonColor || '#000000'
      }
    }
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true
      this.$emit('trigger-event', {
        name: 'modal-opened',
        event: {
          vendorInfo: {
            id: this.content.staticVendorId,
            name: this.content.staticVendorName,
            quotedAmount: this.content.staticQuotedAmount,
            amountRemaining: this.amountRemaining
          }
        }
      })
    },
    hidePopup() {
      this.isPopupVisible = false
      this.resetForm()
      this.$emit('trigger-event', {
        name: 'modal-closed',
        event: {}
      })
    },
    handleBackdropClick() {
      this.hidePopup()
    },
    resetForm() {
      this.paymentData = {
        invoice: '',
        amount: null,
        type: '',
        date: '',
        scheduledDate: '',
        method: '',
        reference: '',
        notes: ''
      }
      this.validationErrors = {}
      this.isProcessing = false
    },
    
    // NEW: Enhanced validation
    validateForm() {
      this.validationErrors = {}
      
      if (!this.paymentData.amount || this.paymentData.amount <= 0) {
        this.validationErrors.amount = 'Payment amount is required and must be greater than 0'
      } else if (this.amountRemaining > 0 && this.paymentData.amount > this.amountRemaining) {
        this.validationErrors.amount = `Payment amount cannot exceed remaining balance of $${this.formatCurrency(this.amountRemaining)}`
      }
      
      if (!this.paymentData.type) {
        this.validationErrors.type = 'Payment type is required'
      }
      
      if (!this.paymentData.method || this.paymentData.method.trim().length === 0) {
        this.validationErrors.method = 'Payment method is required'
      }
      
      return Object.keys(this.validationErrors).length === 0
    },
    
    async submitPayment() {
      if (!this.validateForm()) {
        return
      }
      
      this.isProcessing = true
      
      try {
        const submissionData = {
          ...this.paymentData,
          vendorId: this.content.staticVendorId,
          vendorName: this.content.staticVendorName,
          totalAmount: this.content.staticQuotedAmount,
          amountRemaining: this.amountRemaining,
          timestamp: new Date().toISOString()
        }

        this.$emit('trigger-event', {
          name: 'payment-submitted',
          event: {
            paymentData: submissionData,
            vendorInfo: {
              id: this.content.staticVendorId,
              name: this.content.staticVendorName,
              quotedAmount: this.content.staticQuotedAmount,
              amountRemaining: this.amountRemaining
            },
            paymentType: this.paymentData.type
          }
        })

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.hidePopup()
      } catch (error) {
        console.error('Error submitting payment:', error)
      } finally {
        this.isProcessing = false
      }
    },
    getSubmitButtonText() {
      switch (this.paymentData.type) {
        case 'immediate':
          return this.content.immediateSubmitText || 'Process Payment'
        case 'historical':
          return this.content.historicalSubmitText || 'Record Payment'
        case 'scheduled':
          return this.content.scheduledSubmitText || 'Schedule Payment'
        default:
          return 'Submit Payment'
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount || 0)
    }
  }
}
</script>

<style scoped>
.ww-payment-plan-popup {
  display: inline-block;
}

.payment-plan-trigger-btn {
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
}

.payment-plan-trigger-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-container {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.popup-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
}

.popup-content {
  padding: 20px;
}

.vendor-info-section {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
}

.vendor-info-section h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: #495057;
}

.vendor-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
}

.detail-row .label {
  font-weight: 500;
  color: #6c757d;
}

.detail-row .value {
  font-weight: 600;
  color: #495057;
}

/* NEW: Amount Remaining Styling */
.amount-remaining-row .remaining-amount {
  color: #28a745;
  font-weight: 700;
}

.amount-remaining-row .remaining-amount.fully-paid {
  color: #6c757d;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

/* NEW: Required field styling */
.required-label {
  display: flex;
  align-items: center;
  gap: 4px;
}

.required-asterisk {
  color: #dc3545;
  font-weight: 600;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

/* NEW: Error styling */
.form-group input.error,
.form-group select.error {
  border-color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
}

.error-message {
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 2px;
}

.helper-text {
  color: #6c757d;
  font-size: 0.8rem;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.cancel-btn,
.submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  opacity: 0.9;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  background-color: #6c757d !important;
}

@media (max-width: 768px) {
  .popup-container {
    width: 95%;
    margin: 10px;
  }
  
  .popup-header,
  .popup-content {
    padding: 15px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .cancel-btn,
  .submit-btn {
    width: 100%;
  }
}
</style><template>
  <div class="ww-payment-plan-popup">
    <!-- Trigger Button -->
    <button @click="showPopup" class="payment-plan-trigger-btn" :style="buttonStyles">
      {{ content.buttonText || 'Create Payment Plan' }}
    </button>

    <!-- Payment Plan Creation Popup -->
    <div v-if="isPopupVisible" class="popup-overlay" @click="handleBackdropClick">
      <div class="popup-container" @click.stop>
        <div class="popup-header">
          <h2>{{ content.title || 'Create Payment Plan' }}</h2>
          <button class="close-btn" @click="hidePopup" :style="closeButtonStyles">×</button>
        </div>

        <div class="popup-content">
          <!-- Vendor Information Section -->
          <div class="vendor-info-section">
            <h3>Vendor Information</h3>
            <div class="vendor-details">
              <div class="detail-row">
                <span class="label">Vendor:</span>
                <span class="value">{{ content.staticVendorName || 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="label">Total Amount:</span>
                <span class="value">${{ formatCurrency(content.staticQuotedAmount || 0) }}</span>
              </div>
            </div>
          </div>

          <!-- Payment Form -->
          <form @submit.prevent="submitPayment" class="payment-form">
            <!-- Invoice/Reference Number -->
            <div class="form-group">
              <label>{{ content.invoiceLabel || 'Invoice/Reference Number' }}</label>
              <input 
                v-model="paymentData.invoice" 
                type="text" 
                :placeholder="content.invoicePlaceholder || 'Enter invoice or reference number'"
                required 
              />
            </div>

            <!-- Payment Amount -->
            <div class="form-group">
              <label>{{ content.paymentAmountLabel || 'Payment Amount' }}</label>
              <input 
                v-model.number="paymentData.amount" 
                type="number" 
                step="0.01" 
                min="0"
                :placeholder="content.amountRemainingPlaceholder || 'Enter payment amount'"
                required 
              />
              <small class="helper-text">{{ content.amountRemainingHelper || 'Enter the amount you want to pay now' }}</small>
            </div>

            <!-- Payment Type -->
            <div class="form-group">
              <label>{{ content.paymentTypeLabel || 'Payment Type' }}</label>
              <select v-model="paymentData.type" required>
                <option value="">Select payment type</option>
                <option value="immediate">{{ content.immediatePaymentText || 'Immediate Payment' }}</option>
                <option value="historical">{{ content.historicalPaymentText || 'Historical Payment' }}</option>
                <option value="scheduled">{{ content.scheduledPaymentText || 'Scheduled Payment' }}</option>
              </select>
            </div>

            <!-- Payment Date (for historical payments) -->
            <div v-if="paymentData.type === 'historical'" class="form-group">
              <label>{{ content.paymentDateLabel || 'Payment Date' }}</label>
              <input v-model="paymentData.date" type="date" required />
              <small class="helper-text">{{ content.paymentDateHelper || 'When was this payment made?' }}</small>
            </div>

            <!-- Scheduled Date (for scheduled payments) -->
            <div v-if="paymentData.type === 'scheduled'" class="form-group">
              <label>{{ content.scheduledDateLabel || 'Scheduled Date' }}</label>
              <input v-model="paymentData.scheduledDate" type="date" required />
              <small class="helper-text">{{ content.scheduledDateHelper || 'When should this payment be processed?' }}</small>
            </div>

            <!-- Payment Method -->
            <div class="form-group">
              <label>{{ content.paymentMethodLabel || 'Payment Method' }}</label>
              <input 
                v-model="paymentData.method" 
                type="text" 
                :placeholder="content.paymentMethodPlaceholder || 'e.g., Credit Card, Bank Transfer, Check'"
                required 
              />
            </div>

            <!-- Payment Reference -->
            <div class="form-group">
              <label>{{ content.paymentReferenceLabel || 'Payment Reference' }}</label>
              <input v-model="paymentData.reference" type="text" />
            </div>

            <!-- Notes -->
            <div class="form-group">
              <label>{{ content.notesLabel || 'Notes (Optional)' }}</label>
              <textarea 
                v-model="paymentData.notes" 
                :placeholder="content.notesPlaceholder || 'Add any additional notes about this payment'"
                rows="3"
              ></textarea>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button type="button" @click="hidePopup" class="cancel-btn" :style="cancelButtonStyles">
                {{ content.cancelButtonText || 'Cancel' }}
              </button>
              <button type="submit" :disabled="isProcessing" class="submit-btn" :style="submitButtonStyles">
                {{ isProcessing ? (content.processingText || 'Processing...') : getSubmitButtonText() }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isPopupVisible: false,
      isProcessing: false,
      paymentData: {
        invoice: '',
        amount: 0,
        type: '',
        date: '',
        scheduledDate: '',
        method: '',
        reference: '',
        notes: ''
      }
    }
  },
  computed: {
    buttonStyles() {
      return {
        backgroundColor: this.content.buttonBackgroundColor || '#007bff',
        color: this.content.buttonTextColor || '#ffffff',
        borderRadius: this.content.buttonBorderRadius || '4px',
        padding: this.content.buttonPadding || '10px 20px',
        fontSize: this.content.buttonFontSize || '14px',
        fontWeight: this.content.buttonFontWeight || '500'
      }
    },
    cancelButtonStyles() {
      return {
        backgroundColor: this.content.cancelButtonBackgroundColor || '#6c757d',
        color: this.content.cancelButtonTextColor || '#ffffff'
      }
    },
    submitButtonStyles() {
      return {
        backgroundColor: this.content.submitButtonBackgroundColor || '#28a745',
        color: this.content.submitButtonTextColor || '#ffffff'
      }
    },
    closeButtonStyles() {
      return {
        color: this.content.closeButtonColor || '#000000'
      }
    }
  },
  methods: {
    showPopup() {
      this.isPopupVisible = true
      this.$emit('trigger-event', {
        name: 'modal-opened',
        event: {
          vendorInfo: {
            id: this.content.staticVendorId,
            name: this.content.staticVendorName,
            quotedAmount: this.content.staticQuotedAmount
          }
        }
      })
    },
    hidePopup() {
      this.isPopupVisible = false
      this.resetForm()
      this.$emit('trigger-event', {
        name: 'modal-closed',
        event: {}
      })
    },
    handleBackdropClick() {
      this.hidePopup()
    },
    resetForm() {
      this.paymentData = {
        invoice: '',
        amount: 0,
        type: '',
        date: '',
        scheduledDate: '',
        method: '',
        reference: '',
        notes: ''
      }
      this.isProcessing = false
    },
    async submitPayment() {
      this.isProcessing = true
      
      try {
        const submissionData = {
          ...this.paymentData,
          vendorId: this.content.staticVendorId,
          vendorName: this.content.staticVendorName,
          totalAmount: this.content.staticQuotedAmount,
          timestamp: new Date().toISOString()
        }

        this.$emit('trigger-event', {
          name: 'payment-submitted',
          event: {
            paymentData: submissionData,
            vendorInfo: {
              id: this.content.staticVendorId,
              name: this.content.staticVendorName,
              quotedAmount: this.content.staticQuotedAmount
            },
            paymentType: this.paymentData.type
          }
        })

        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        this.hidePopup()
      } catch (error) {
        console.error('Error submitting payment:', error)
      } finally {
        this.isProcessing = false
      }
    },
    getSubmitButtonText() {
      switch (this.paymentData.type) {
        case 'immediate':
          return this.content.immediateSubmitText || 'Process Payment'
        case 'historical':
          return this.content.historicalSubmitText || 'Record Payment'
        case 'scheduled':
          return this.content.scheduledSubmitText || 'Schedule Payment'
        default:
          return 'Submit Payment'
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount || 0)
    }
  }
}
</script>

<style scoped>
.ww-payment-plan-popup {
  display: inline-block;
}

.payment-plan-trigger-btn {
  border: none;
  cursor: pointer;
  font-family: inherit;
  transition: all 0.2s ease;
}

.payment-plan-trigger-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.popup-container {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.popup-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
}

.popup-content {
  padding: 20px;
}

.vendor-info-section {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
}

.vendor-info-section h3 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  color: #495057;
}

.vendor-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
}

.detail-row .label {
  font-weight: 500;
  color: #6c757d;
}

.detail-row .value {
  font-weight: 600;
  color: #495057;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.form-group label {
  font-weight: 500;
  color: #495057;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.helper-text {
  color: #6c757d;
  font-size: 0.8rem;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.cancel-btn,
.submit-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cancel-btn:hover {
  opacity: 0.9;
}

.submit-btn:hover:not(:disabled) {
  opacity: 0.9;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

@media (max-width: 768px) {
  .popup-container {
    width: 95%;
    margin: 10px;
  }
  
  .popup-header,
  .popup-content {
    padding: 15px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .cancel-btn,
  .submit-btn {
    width: 100%;
  }
}
</style>
