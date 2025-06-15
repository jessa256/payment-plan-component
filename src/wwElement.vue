<template>
  <div class="ww-payment-plan-popup">
    <!-- Trigger Button -->
    <button
      @click="openPopup"
      :style="buttonStyles"
      class="payment-plan-trigger-btn"
    >
      {{ content.buttonText || 'Create Payment Plan' }}
    </button>

    <!-- Modal Overlay (only shown when isPopupVisible is true) -->
    <div v-if="isPopupVisible" class="popup-overlay" @click.self="closePopup">
      <div class="popup-container">
        <!-- Header -->
        <div class="popup-header">
          <h2>{{ content.title || 'Payment Plan' }}</h2>
          <button @click="closePopup" class="close-btn" :style="closeButtonStyles">
            ×
          </button>
        </div>

        <!-- Content -->
        <div class="popup-content">
          <!-- Vendor Info Section (Read-only from context) -->
          <div class="vendor-info-section">
            <h3>{{ content.vendorSectionTitle || 'Vendor Information' }}</h3>
            <div class="vendor-details">
              <div class="detail-row">
                <span class="label">{{ content.vendorNameLabel || 'Vendor:' }}</span>
                <span class="value">{{ content.staticVendorName || 'N/A' }}</span>
              </div>
              <div class="detail-row">
                <span class="label">{{ content.quotedAmountLabel || 'Quoted Amount:' }}</span>
                <span class="value">${{ formatCurrency(content.staticQuotedAmount || 0) }}</span>
              </div>
              <div class="detail-row amount-remaining-row">
                <span class="label">{{ content.amountRemainingLabel || 'Amount Remaining:' }}</span>
                <span class="remaining-amount">${{ formatCurrency(amountRemaining) }}</span>
              </div>
            </div>
          </div>

          <!-- Payment Form -->
          <form @submit.prevent="submitPayment" class="payment-form">
            <!-- Invoice/Reference -->
            <div class="form-group">
              <label :for="'invoice-' + componentId">
                {{ content.invoiceLabel || 'Invoice/Reference Number' }}
              </label>
              <input
                :id="'invoice-' + componentId"
                v-model="paymentData.invoice"
                type="text"
                :placeholder="content.invoicePlaceholder || 'Enter invoice or reference number'"
                class="form-input"
              />
            </div>

            <!-- Payment Amount (Required) -->
            <div class="form-group">
              <label :for="'amount-' + componentId" class="required-label">
                {{ content.paymentAmountLabel || 'Payment Amount' }} *
              </label>
              <input
                :id="'amount-' + componentId"
                v-model.number="paymentData.amount"
                type="number"
                step="0.01"
                min="0.01"
                :max="amountRemaining"
                placeholder="0.00"
                class="form-input"
                :class="{ 'error': validationErrors.amount }"
                required
              />
              <div v-if="validationErrors.amount" class="error-message">
                {{ validationErrors.amount }}
              </div>
            </div>

            <!-- Payment Type (Required) -->
            <div class="form-group">
              <label :for="'type-' + componentId" class="required-label">
                {{ content.paymentTypeLabel || 'Payment Type' }} *
              </label>
              <select
                :id="'type-' + componentId"
                v-model="paymentData.type"
                class="form-input"
                :class="{ 'error': validationErrors.type }"
                required
              >
                <option value="">Select payment type</option>
                <option value="immediate">Immediate Payment</option>
                <option value="historical">Historical Payment</option>
                <option value="scheduled">Scheduled Payment</option>
              </select>
              <div v-if="validationErrors.type" class="error-message">
                {{ validationErrors.type }}
              </div>
            </div>

            <!-- Payment Date -->
            <div class="form-group" v-if="paymentData.type">
              <label :for="'date-' + componentId">
                {{ getDateLabel() }}
              </label>
              <input
                :id="'date-' + componentId"
                v-model="paymentData.date"
                type="date"
                :max="paymentData.type === 'historical' ? todayDate : null"
                :min="paymentData.type === 'scheduled' ? todayDate : null"
                class="form-input"
              />
            </div>

            <!-- Payment Method (Required) -->
            <div class="form-group">
              <label :for="'method-' + componentId" class="required-label">
                {{ content.paymentMethodLabel || 'Payment Method' }} *
              </label>
              <select
                :id="'method-' + componentId"
                v-model="paymentData.method"
                class="form-input"
                :class="{ 'error': validationErrors.method }"
                required
              >
                <option value="">Select payment method</option>
                <option value="Check">Check</option>
                <option value="ACH">ACH Transfer</option>
                <option value="Wire">Wire Transfer</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Venmo">Venmo</option>
                <option value="PayPal">PayPal</option>
                <option value="Cash">Cash</option>
                <option value="Other">Other</option>
              </select>
              <div v-if="validationErrors.method" class="error-message">
                {{ validationErrors.method }}
              </div>
            </div>

            <!-- Reference Number -->
            <div class="form-group">
              <label :for="'reference-' + componentId">
                {{ content.referenceLabel || 'Reference/Confirmation Number' }}
              </label>
              <input
                :id="'reference-' + componentId"
                v-model="paymentData.reference"
                type="text"
                :placeholder="content.referencePlaceholder || 'Optional reference number'"
                class="form-input"
              />
            </div>

            <!-- Notes -->
            <div class="form-group">
              <label :for="'notes-' + componentId">
                {{ content.notesLabel || 'Notes' }}
              </label>
              <textarea
                :id="'notes-' + componentId"
                v-model="paymentData.notes"
                :placeholder="content.notesPlaceholder || 'Optional notes or comments'"
                class="form-input"
                rows="3"
              ></textarea>
            </div>

            <!-- Form Actions -->
            <div class="form-actions">
              <button
                type="button"
                @click="closePopup"
                :style="cancelButtonStyles"
                class="cancel-btn"
              >
                {{ content.cancelText || 'Cancel' }}
              </button>
              <button
                type="submit"
                :disabled="!isFormValid || isProcessing"
                :style="submitButtonStyles"
                class="submit-btn"
              >
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
  name: 'PaymentPlanPopup',
  props: {
    content: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data: function() {
    return {
      componentId: Math.random().toString(36).substr(2, 9),
      isPopupVisible: false,
      isProcessing: false,
      paymentData: {
        invoice: '',
        amount: null,
        type: '',
        date: '',
        method: '',
        reference: '',
        notes: ''
      },
      validationErrors: {}
    }
  },
  computed: {
    amountRemaining: function() {
      return this.content.calculatedAmountRemaining || this.content.staticQuotedAmount || 0
    },
    
    todayDate: function() {
      return new Date().toISOString().split('T')[0]
    },
    
    isFormValid: function() {
      this.validateForm()
      return (
        this.paymentData.amount && 
        this.paymentData.amount > 0 &&
        this.paymentData.amount <= this.amountRemaining &&
        this.paymentData.type &&
        this.paymentData.method &&
        this.paymentData.method.trim().length > 0 &&
        Object.keys(this.validationErrors).length === 0
      )
    },
    
    buttonStyles: function() {
      return {
        backgroundColor: this.content.buttonBackgroundColor || '#007bff',
        color: this.content.buttonTextColor || '#ffffff',
        borderRadius: this.content.buttonBorderRadius || '4px',
        padding: this.content.buttonPadding || '10px 20px',
        fontSize: this.content.buttonFontSize || '14px',
        fontWeight: this.content.buttonFontWeight || '500'
      }
    },
    
    cancelButtonStyles: function() {
      return {
        backgroundColor: this.content.cancelButtonBackgroundColor || '#6c757d',
        color: this.content.cancelButtonTextColor || '#ffffff',
        borderRadius: this.content.buttonBorderRadius || '4px',
        padding: this.content.buttonPadding || '10px 20px',
        fontSize: this.content.buttonFontSize || '14px',
        fontWeight: this.content.buttonFontWeight || '500'
      }
    },
    
    submitButtonStyles: function() {
      const isDisabled = !this.isFormValid || this.isProcessing
      return {
        backgroundColor: isDisabled 
          ? (this.content.disabledButtonColor || '#6c757d')
          : (this.content.submitButtonBackgroundColor || '#28a745'),
        color: this.content.submitButtonTextColor || '#ffffff',
        borderRadius: this.content.buttonBorderRadius || '4px',
        padding: this.content.buttonPadding || '10px 20px',
        fontSize: this.content.buttonFontSize || '14px',
        fontWeight: this.content.buttonFontWeight || '500',
        opacity: isDisabled ? 0.6 : 1
      }
    },
    
    closeButtonStyles: function() {
      return {
        color: this.content.closeButtonColor || '#000000'
      }
    }
  },
  methods: {
    openPopup: function() {
      this.isPopupVisible = true
      
      // Emit modal opened event with vendor information
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
    
    closePopup: function() {
      this.isPopupVisible = false
      this.resetForm()
      
      // Emit modal closed event
      this.$emit('trigger-event', {
        name: 'modal-closed',
        event: {
          vendorInfo: {
            id: this.content.staticVendorId,
            name: this.content.staticVendorName
          }
        }
      })
    },
    
    validateForm: function() {
      this.validationErrors = {}
      
      // Validate payment amount
      if (!this.paymentData.amount || this.paymentData.amount <= 0) {
        this.validationErrors.amount = 'Payment amount is required and must be greater than 0'
      } else if (this.paymentData.amount > this.amountRemaining) {
        this.validationErrors.amount = `Payment amount cannot exceed remaining balance of $${this.formatCurrency(this.amountRemaining)}`
      }
      
      // Validate payment type
      if (!this.paymentData.type) {
        this.validationErrors.type = 'Payment type is required'
      }
      
      // Validate payment method
      if (!this.paymentData.method || this.paymentData.method.trim().length === 0) {
        this.validationErrors.method = 'Payment method is required'
      }
    },
    
    getDateLabel: function() {
      switch (this.paymentData.type) {
        case 'immediate':
          return this.content.immediateDateLabel || 'Payment Date'
        case 'historical':
          return this.content.historicalDateLabel || 'Date Paid (Past)'
        case 'scheduled':
          return this.content.scheduledDateLabel || 'Scheduled Date (Future)'
        default:
          return 'Payment Date'
      }
    },
    
    getSubmitButtonText: function() {
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
    
    submitPayment: function() {
      if (!this.isFormValid) {
        return
      }
      
      this.isProcessing = true
      
      // Prepare payment data with vendor information
      const paymentPlan = {
        // Vendor info from static data
        vendor_id: this.content.staticVendorId,
        vendor_name: this.content.staticVendorName,
        
        // Payment details
        invoice_number: this.paymentData.invoice,
        payment_amount: this.paymentData.amount,
        payment_type: this.paymentData.type,
        payment_date: this.paymentData.date || this.todayDate,
        payment_method: this.paymentData.method,
        reference_number: this.paymentData.reference,
        notes: this.paymentData.notes,
        
        // Calculated fields
        amount_remaining: this.amountRemaining - this.paymentData.amount,
        created_at: new Date().toISOString()
      }
      
      // Emit payment submitted event to WeWeb workflow
      this.$emit('trigger-event', {
        name: 'payment-submitted',
        event: {
          paymentPlan: paymentPlan,
          vendorInfo: {
            id: this.content.staticVendorId,
            name: this.content.staticVendorName,
            quotedAmount: this.content.staticQuotedAmount
          },
          formData: this.paymentData,
          calculatedAmountRemaining: this.amountRemaining - this.paymentData.amount
        }
      })
      
      // Simulate processing time then emit success
      setTimeout(() => {
        this.isProcessing = false
        
        // Emit success event - WeWeb workflow will handle Supabase insert
        this.$emit('trigger-event', {
          name: 'payment-success',
          event: { 
            paymentPlan: paymentPlan,
            message: 'Payment plan created successfully!'
          }
        })
        
        // Close popup after successful submission
        this.closePopup()
      }, 1000)
    },
    
    resetForm: function() {
      this.paymentData = {
        invoice: '',
        amount: null,
        type: '',
        date: '',
        method: '',
        reference: '',
        notes: ''
      }
      this.validationErrors = {}
    },
    
    formatCurrency: function(amount) {
      return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount || 0)
    }
  },
  
  // Handle ESC key to close popup
  mounted: function() {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && this.isPopupVisible) {
        this.closePopup()
      }
    }
    document.addEventListener('keydown', handleEscape)
    
    // Store the handler for cleanup
    this._handleEscape = handleEscape
  },
  
  beforeUnmount: function() {
    if (this._handleEscape) {
      document.removeEventListener('keydown', this._handleEscape)
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

/* Modal Overlay - Higher z-index to appear above vendor details popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000; /* Higher than typical WeWeb popups (usually 9999) */
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.popup-container {
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { 
    opacity: 0; 
    transform: translateY(-20px) scale(0.95); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0) scale(1); 
  }
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  background-color: #f8f9fa;
}

.popup-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  transition: opacity 0.2s ease;
}

.close-btn:hover {
  opacity: 0.6;
}

.popup-content {
  padding: 20px;
}

.vendor-info-section {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid #dee2e6;
}

.vendor-info-section h3 {
  margin: 0 0 15px 0;
  font-size: 1.1rem;
  color: #495057;
  font-weight: 600;
}

.vendor-details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.detail-row .label {
  font-weight: 500;
  color: #6c757d;
}

.detail-row .value {
  font-weight: 600;
  color: #495057;
}

.amount-remaining-row .remaining-amount {
  color: #28a745;
  font-weight: 700;
  font-size: 1.1rem;
}

.payment-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 500;
  color: #495057;
  font-size: 14px;
}

.required-label::after {
  content: ' *';
  color: #dc3545;
  font-weight: bold;
}

.form-input {
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: #fff;
}

.form-input:focus {
  outline: 0;
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.form-input.error {
  border-color: #dc3545;
}

.form-input.error:focus {
  border-color: #dc3545;
  box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25);
}

.error-message {
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.cancel-btn,
.submit-btn {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cancel-btn:hover,
.submit-btn:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.submit-btn:disabled {
  cursor: not-allowed;
  transform: none;
}

/* Responsive Design */
@media (max-width: 768px) {
  .popup-container {
    width: 95%;
    margin: 20px;
  }
  
  .popup-content {
    padding: 15px;
  }
  
  .vendor-info-section {
    padding: 12px;
  }
  
  .detail-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
  
  .detail-row .value {
    font-size: 0.9rem;
  }
  
  .form-actions {
    flex-direction: column;
  }
}

/* Ensure proper layering above other WeWeb elements */
.popup-overlay * {
  box-sizing: border-box;
}
</style>