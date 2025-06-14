export default {
  editor: {
    label: 'Payment Plan Popup v3.1.1',
    icon: 'payment'
  },
  inherit: {
    type: 'ww-text',
    values: {
      text: {
        en: 'Payment Plan'
      }
    }
  },
  properties: {
    // Button text
    buttonText: {
      label: {
        en: 'Button Text'
      },
      type: 'Text',
      options: {
        placeholder: 'Enter button text'
      },
      defaultValue: 'Open Payment Plan',
      bindable: true
    },
    
    // Modal title
    title: {
      label: {
        en: 'Modal Title'
      },
      type: 'Text',
      options: {
        placeholder: 'Enter modal title'
      },
      defaultValue: 'Payment Plan',
      bindable: true
    },

    // Static vendor data (read-only, pulled from context)
    staticVendorId: {
      label: {
        en: 'Vendor ID (from context)'
      },
      type: 'Text',
      options: {
        readonly: true
      },
      bindable: true
    },

    staticVendorName: {
      label: {
        en: 'Vendor Name (from context)'
      },
      type: 'Text',
      options: {
        readonly: true
      },
      bindable: true
    },

    staticQuotedAmount: {
      label: {
        en: 'Quoted Amount (from context)'
      },
      type: 'Number',
      options: {
        readonly: true
      },
      bindable: true
    },

    // NEW: Amount Remaining calculation (from WeWeb workflow/variable)
    calculatedAmountRemaining: {
      label: {
        en: 'Amount Remaining (calculated)'
      },
      type: 'Number',
      section: 'settings',
      options: {
        placeholder: 'Bind to WeWeb variable/workflow result'
      },
      bindable: true,
      defaultValue: 0
    },

    // Form field labels (editable in the editor)
    invoiceLabel: {
      label: {
        en: 'Invoice Label'
      },
      type: 'Text',
      defaultValue: 'Invoice/Reference Number',
      bindable: true
    },

    invoicePlaceholder: {
      label: {
        en: 'Invoice Placeholder'
      },
      type: 'Text',
      defaultValue: 'Enter invoice or reference number',
      bindable: true
    },

    totalAmountLabel: {
      label: {
        en: 'Total Amount Label'
      },
      type: 'Text',
      defaultValue: 'Total Amount',
      bindable: true
    },

    paymentAmountLabel: {
      label: {
        en: 'Payment Amount Label'
      },
      type: 'Text',
      defaultValue: 'Payment Amount',
      bindable: true
    },

    amountRemainingLabel: {
      label: {
        en: 'Amount Remaining Label'
      },
      type: 'Text',
      defaultValue: 'Amount Remaining',
      bindable: true
    },

    amountRemainingPlaceholder: {
      label: {
        en: 'Amount Remaining Placeholder'
      },
      type: 'Text',
      defaultValue: 'Enter payment amount',
      bindable: true
    },

    amountRemainingHelper: {
      label: {
        en: 'Amount Remaining Helper Text'
      },
      type: 'Text',
      defaultValue: 'Enter the amount you want to pay now',
      bindable: true
    },

    paymentTypeLabel: {
      label: {
        en: 'Payment Type Label'
      },
      type: 'Text',
      defaultValue: 'Payment Type',
      bindable: true
    },

    immediatePaymentText: {
      label: {
        en: 'Immediate Payment Text'
      },
      type: 'Text',
      defaultValue: 'Immediate Payment',
      bindable: true
    },

    historicalPaymentText: {
      label: {
        en: 'Historical Payment Text'
      },
      type: 'Text',
      defaultValue: 'Historical Payment',
      bindable: true
    },

    scheduledPaymentText: {
      label: {
        en: 'Scheduled Payment Text'
      },
      type: 'Text',
      defaultValue: 'Scheduled Payment',
      bindable: true
    },

    paymentDateLabel: {
      label: {
        en: 'Payment Date Label'
      },
      type: 'Text',
      defaultValue: 'Payment Date',
      bindable: true
    },

    paymentDateHelper: {
      label: {
        en: 'Payment Date Helper Text'
      },
      type: 'Text',
      defaultValue: 'When was this payment made?',
      bindable: true
    },

    scheduledDateLabel: {
      label: {
        en: 'Scheduled Date Label'
      },
      type: 'Text',
      defaultValue: 'Scheduled Date',
      bindable: true
    },

    scheduledDateHelper: {
      label: {
        en: 'Scheduled Date Helper Text'
      },
      type: 'Text',
      defaultValue: 'When should this payment be processed?',
      bindable: true
    },

    paymentMethodLabel: {
      label: {
        en: 'Payment Method Label'
      },
      type: 'Text',
      defaultValue: 'Payment Method',
      bindable: true
    },

    paymentMethodPlaceholder: {
      label: {
        en: 'Payment Method Placeholder'
      },
      type: 'Text',
      defaultValue: 'e.g., Credit Card, Bank Transfer, Check',
      bindable: true
    },

    paymentReferenceLabel: {
      label: {
        en: 'Payment Reference Label'
      },
      type: 'Text',
      defaultValue: 'Payment Reference',
      bindable: true
    },

    notesLabel: {
      label: {
        en: 'Notes Label'
      },
      type: 'Text',
      defaultValue: 'Notes (Optional)',
      bindable: true
    },

    notesPlaceholder: {
      label: {
        en: 'Notes Placeholder'
      },
      type: 'Text',
      defaultValue: 'Add any additional notes about this payment',
      bindable: true
    },

    cancelButtonText: {
      label: {
        en: 'Cancel Button Text'
      },
      type: 'Text',
      defaultValue: 'Cancel',
      bindable: true
    },

    processingText: {
      label: {
        en: 'Processing Text'
      },
      type: 'Text',
      defaultValue: 'Processing...',
      bindable: true
    },

    immediateSubmitText: {
      label: {
        en: 'Immediate Submit Button Text'
      },
      type: 'Text',
      defaultValue: 'Process Payment',
      bindable: true
    },

    historicalSubmitText: {
      label: {
        en: 'Historical Submit Button Text'
      },
      type: 'Text',
      defaultValue: 'Record Payment',
      bindable: true
    },

    scheduledSubmitText: {
      label: {
        en: 'Scheduled Submit Button Text'
      },
      type: 'Text',
      defaultValue: 'Schedule Payment',
      bindable: true
    },

    // NEW: Styling options for required fields
    requiredFieldColor: {
      label: {
        en: 'Required Asterisk Color'
      },
      type: 'Color',
      defaultValue: '#dc3545',
      bindable: true
    },

    errorBorderColor: {
      label: {
        en: 'Error Border Color'
      },
      type: 'Color',
      defaultValue: '#dc3545',
      bindable: true
    },

    amountRemainingColor: {
      label: {
        en: 'Amount Remaining Color'
      },
      type: 'Color',
      defaultValue: '#28a745',
      bindable: true
    }
  },

  triggerEvents: [
    {
      name: 'payment-submitted',
      label: { en: 'On payment submitted' },
      event: {
        paymentData: {},
        vendorInfo: {},
        paymentType: ''
      }
    },
    {
      name: 'payment-cancelled',
      label: { en: 'On payment cancelled' },
      event: {}
    },
    {
      name: 'modal-opened',
      label: { en: 'On modal opened' },
      event: {
        vendorInfo: {}
      }
    },
    {
      name: 'modal-closed',
      label: { en: 'On modal closed' },
      event: {}
    },
    // NEW: Validation events
    {
      name: 'validation-failed',
      label: { en: 'On validation failed' },
      event: {
        errors: {}
      }
    },
    {
      name: 'amount-remaining-updated',
      label: { en: 'On amount remaining updated' },
      event: {
        amountRemaining: 0,
        vendorId: ''
      }
    }
  ]
};export default {
  editor: {
    label: 'Payment Plan Popup v3.0.2',
    icon: 'payment'
  },
  inherit: {
    type: 'ww-text',
    values: {
      text: {
        en: 'Payment Plan'
      }
    }
  },
  properties: {
    // Button text
    buttonText: {
      label: {
        en: 'Button Text'
      },
      type: 'Text',
      options: {
        placeholder: 'Enter button text'
      },
      defaultValue: 'Open Payment Plan',
      bindable: true
    },
    
    // Modal title
    title: {
      label: {
        en: 'Modal Title'
      },
      type: 'Text',
      options: {
        placeholder: 'Enter modal title'
      },
      defaultValue: 'Payment Plan',
      bindable: true
    },

    // Static vendor data (read-only, pulled from context)
    staticVendorId: {
      label: {
        en: 'Vendor ID (from context)'
      },
      type: 'Text',
      options: {
        readonly: true
      },
      bindable: true
    },

    staticVendorName: {
      label: {
        en: 'Vendor Name (from context)'
      },
      type: 'Text',
      options: {
        readonly: true
      },
      bindable: true
    },

    staticQuotedAmount: {
      label: {
        en: 'Quoted Amount (from context)'
      },
      type: 'Number',
      options: {
        readonly: true
      },
      bindable: true
    },

    // Form field labels (editable in the editor)
    invoiceLabel: {
      label: {
        en: 'Invoice Label'
      },
      type: 'Text',
      defaultValue: 'Invoice/Reference Number',
      bindable: true
    },

    invoicePlaceholder: {
      label: {
        en: 'Invoice Placeholder'
      },
      type: 'Text',
      defaultValue: 'Enter invoice or reference number',
      bindable: true
    },

    totalAmountLabel: {
      label: {
        en: 'Total Amount Label'
      },
      type: 'Text',
      defaultValue: 'Total Amount',
      bindable: true
    },

    paymentAmountLabel: {
      label: {
        en: 'Payment Amount Label'
      },
      type: 'Text',
      defaultValue: 'Payment Amount',
      bindable: true
    },

    amountRemainingLabel: {
      label: {
        en: 'Amount Remaining Label'
      },
      type: 'Text',
      defaultValue: 'Amount Remaining',
      bindable: true
    },

    amountRemainingPlaceholder: {
      label: {
        en: 'Amount Remaining Placeholder'
      },
      type: 'Text',
      defaultValue: 'Enter payment amount',
      bindable: true
    },

    amountRemainingHelper: {
      label: {
        en: 'Amount Remaining Helper Text'
      },
      type: 'Text',
      defaultValue: 'Enter the amount you want to pay now',
      bindable: true
    },

    paymentTypeLabel: {
      label: {
        en: 'Payment Type Label'
      },
      type: 'Text',
      defaultValue: 'Payment Type',
      bindable: true
    },

    immediatePaymentText: {
      label: {
        en: 'Immediate Payment Text'
      },
      type: 'Text',
      defaultValue: 'Immediate Payment',
      bindable: true
    },

    historicalPaymentText: {
      label: {
        en: 'Historical Payment Text'
      },
      type: 'Text',
      defaultValue: 'Historical Payment',
      bindable: true
    },

    scheduledPaymentText: {
      label: {
        en: 'Scheduled Payment Text'
      },
      type: 'Text',
      defaultValue: 'Scheduled Payment',
      bindable: true
    },

    paymentDateLabel: {
      label: {
        en: 'Payment Date Label'
      },
      type: 'Text',
      defaultValue: 'Payment Date',
      bindable: true
    },

    paymentDateHelper: {
      label: {
        en: 'Payment Date Helper Text'
      },
      type: 'Text',
      defaultValue: 'When was this payment made?',
      bindable: true
    },

    scheduledDateLabel: {
      label: {
        en: 'Scheduled Date Label'
      },
      type: 'Text',
      defaultValue: 'Scheduled Date',
      bindable: true
    },

    scheduledDateHelper: {
      label: {
        en: 'Scheduled Date Helper Text'
      },
      type: 'Text',
      defaultValue: 'When should this payment be processed?',
      bindable: true
    },

    paymentMethodLabel: {
      label: {
        en: 'Payment Method Label'
      },
      type: 'Text',
      defaultValue: 'Payment Method',
      bindable: true
    },

    paymentMethodPlaceholder: {
      label: {
        en: 'Payment Method Placeholder'
      },
      type: 'Text',
      defaultValue: 'e.g., Credit Card, Bank Transfer, Check',
      bindable: true
    },

    paymentReferenceLabel: {
      label: {
        en: 'Payment Reference Label'
      },
      type: 'Text',
      defaultValue: 'Payment Reference',
      bindable: true
    },

    notesLabel: {
      label: {
        en: 'Notes Label'
      },
      type: 'Text',
      defaultValue: 'Notes (Optional)',
      bindable: true
    },

    notesPlaceholder: {
      label: {
        en: 'Notes Placeholder'
      },
      type: 'Text',
      defaultValue: 'Add any additional notes about this payment',
      bindable: true
    },

    cancelButtonText: {
      label: {
        en: 'Cancel Button Text'
      },
      type: 'Text',
      defaultValue: 'Cancel',
      bindable: true
    },

    processingText: {
      label: {
        en: 'Processing Text'
      },
      type: 'Text',
      defaultValue: 'Processing...',
      bindable: true
    },

    immediateSubmitText: {
      label: {
        en: 'Immediate Submit Button Text'
      },
      type: 'Text',
      defaultValue: 'Process Payment',
      bindable: true
    },

    historicalSubmitText: {
      label: {
        en: 'Historical Submit Button Text'
      },
      type: 'Text',
      defaultValue: 'Record Payment',
      bindable: true
    },

    scheduledSubmitText: {
      label: {
        en: 'Scheduled Submit Button Text'
      },
      type: 'Text',
      defaultValue: 'Schedule Payment',
      bindable: true
    }
  },

  triggerEvents: [
    {
      name: 'payment-submitted',
      label: { en: 'On payment submitted' },
      event: {
        paymentData: {},
        vendorInfo: {},
        paymentType: ''
      }
    },
    {
      name: 'payment-cancelled',
      label: { en: 'On payment cancelled' },
      event: {}
    },
    {
      name: 'modal-opened',
      label: { en: 'On modal opened' },
      event: {
        vendorInfo: {}
      }
    },
    {
      name: 'modal-closed',
      label: { en: 'On modal closed' },
      event: {}
    }
  ]
};
