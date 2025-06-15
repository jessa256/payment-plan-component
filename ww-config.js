export default {
  editor: {
    label: 'Payment Plan Popup v3.2.0',
    icon: 'payment'
  },
  inherit: {
    type: 'ww-text',
    values: {
      text: {
        en: 'Payment Plan Popup'
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
      defaultValue: 'Create Payment Plan',
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
      section: 'vendor-data',
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
      section: 'vendor-data',
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
      section: 'vendor-data',
      options: {
        readonly: true
      },
      bindable: true
    },

    // Amount Remaining calculation (from WeWeb workflow/variable)
    calculatedAmountRemaining: {
      label: {
        en: 'Amount Remaining (calculated)'
      },
      type: 'Number',
      section: 'calculations',
      options: {
        placeholder: 'Bind to WeWeb variable/workflow result'
      },
      bindable: true,
      defaultValue: 0
    },

    // Form field labels (editable in the editor)
    vendorSectionTitle: {
      label: {
        en: 'Vendor Section Title'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Vendor Information',
      bindable: true
    },

    vendorNameLabel: {
      label: {
        en: 'Vendor Name Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Vendor:',
      bindable: true
    },

    quotedAmountLabel: {
      label: {
        en: 'Quoted Amount Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Quoted Amount:',
      bindable: true
    },

    amountRemainingLabel: {
      label: {
        en: 'Amount Remaining Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Amount Remaining:',
      bindable: true
    },

    invoiceLabel: {
      label: {
        en: 'Invoice Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Invoice/Reference Number',
      bindable: true
    },

    invoicePlaceholder: {
      label: {
        en: 'Invoice Placeholder'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Enter invoice or reference number',
      bindable: true
    },

    paymentAmountLabel: {
      label: {
        en: 'Payment Amount Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Payment Amount',
      bindable: true
    },

    paymentTypeLabel: {
      label: {
        en: 'Payment Type Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Payment Type',
      bindable: true
    },

    paymentMethodLabel: {
      label: {
        en: 'Payment Method Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Payment Method',
      bindable: true
    },

    referenceLabel: {
      label: {
        en: 'Reference Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Reference/Confirmation Number',
      bindable: true
    },

    referencePlaceholder: {
      label: {
        en: 'Reference Placeholder'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Optional reference number',
      bindable: true
    },

    notesLabel: {
      label: {
        en: 'Notes Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Notes',
      bindable: true
    },

    notesPlaceholder: {
      label: {
        en: 'Notes Placeholder'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Optional notes or comments',
      bindable: true
    },

    // Date labels for different payment types
    immediateDateLabel: {
      label: {
        en: 'Immediate Date Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Payment Date',
      bindable: true
    },

    historicalDateLabel: {
      label: {
        en: 'Historical Date Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Date Paid (Past)',
      bindable: true
    },

    scheduledDateLabel: {
      label: {
        en: 'Scheduled Date Label'
      },
      type: 'Text',
      section: 'labels',
      defaultValue: 'Scheduled Date (Future)',
      bindable: true
    },

    // Submit button text for different payment types
    immediateSubmitText: {
      label: {
        en: 'Immediate Submit Text'
      },
      type: 'Text',
      section: 'buttons',
      defaultValue: 'Process Payment',
      bindable: true
    },

    historicalSubmitText: {
      label: {
        en: 'Historical Submit Text'
      },
      type: 'Text',
      section: 'buttons',
      defaultValue: 'Record Payment',
      bindable: true
    },

    scheduledSubmitText: {
      label: {
        en: 'Scheduled Submit Text'
      },
      type: 'Text',
      section: 'buttons',
      defaultValue: 'Schedule Payment',
      bindable: true
    },

    cancelText: {
      label: {
        en: 'Cancel Button Text'
      },
      type: 'Text',
      section: 'buttons',
      defaultValue: 'Cancel',
      bindable: true
    },

    processingText: {
      label: {
        en: 'Processing Text'
      },
      type: 'Text',
      section: 'buttons',
      defaultValue: 'Processing...',
      bindable: true
    },

    // Button styling
    buttonBackgroundColor: {
      label: {
        en: 'Trigger Button Background'
      },
      type: 'Color',
      section: 'styling',
      defaultValue: '#007bff',
      bindable: true
    },

    buttonTextColor: {
      label: {
        en: 'Trigger Button Text Color'
      },
      type: 'Color',
      section: 'styling',
      defaultValue: '#ffffff',
      bindable: true
    },

    cancelButtonBackgroundColor: {
      label: {
        en: 'Cancel Button Background'
      },
      type: 'Color',
      section: 'styling',
      defaultValue: '#6c757d',
      bindable: true
    },

    cancelButtonTextColor: {
      label: {
        en: 'Cancel Button Text Color'
      },
      type: 'Color',
      section: 'styling',
      defaultValue: '#ffffff',
      bindable: true
    },

    submitButtonBackgroundColor: {
      label: {
        en: 'Submit Button Background'
      },
      type: 'Color',
      section: 'styling',
      defaultValue: '#28a745',
      bindable: true
    },

    submitButtonTextColor: {
      label: {
        en: 'Submit Button Text Color'
      },
      type: 'Color',
      section: 'styling',
      defaultValue: '#ffffff',
      bindable: true
    },

    disabledButtonColor: {
      label: {
        en: 'Disabled Button Color'
      },
      type: 'Color',
      section: 'styling',
      defaultValue: '#6c757d',
      bindable: true
    },

    closeButtonColor: {
      label: {
        en: 'Close Button Color'
      },
      type: 'Color',
      section: 'styling',
      defaultValue: '#000000',
      bindable: true
    },

    buttonBorderRadius: {
      label: {
        en: 'Button Border Radius'
      },
      type: 'Text',
      section: 'styling',
      defaultValue: '4px',
      bindable: true
    },

    buttonPadding: {
      label: {
        en: 'Button Padding'
      },
      type: 'Text',
      section: 'styling',
      defaultValue: '10px 20px',
      bindable: true
    },

    buttonFontSize: {
      label: {
        en: 'Button Font Size'
      },
      type: 'Text',
      section: 'styling',
      defaultValue: '14px',
      bindable: true
    },

    buttonFontWeight: {
      label: {
        en: 'Button Font Weight'
      },
      type: 'Text',
      section: 'styling',
      defaultValue: '500',
      bindable: true
    }
  },
  
  // Component events
  triggers: [
    {
      name: 'modal-opened',
      label: {
        en: 'Modal Opened'
      }
    },
    {
      name: 'modal-closed',
      label: {
        en: 'Modal Closed'
      }
    },
    {
      name: 'payment-submitted',
      label: {
        en: 'Payment Submitted'
      }
    },
    {
      name: 'payment-success',
      label: {
        en: 'Payment Success'
      }
    }
  ]
}