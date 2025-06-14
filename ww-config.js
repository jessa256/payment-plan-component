export default {
  editor: {
    label: 'Payment Plan Popup v3.0',
    icon: 'payment',
    customStylePropertiesOrder: [
      ['buttonBackgroundColor', 'buttonTextColor'],
      ['buttonBorderRadius', 'buttonPadding'],
      ['buttonFontSize', 'buttonFontWeight'],
      ['cancelButtonBackgroundColor', 'cancelButtonTextColor'],
      ['submitButtonBackgroundColor', 'submitButtonTextColor'],
      ['closeButtonColor', 'labelColor'],
      ['inputBorderColor', 'inputFocusColor'],
      ['balanceInfoBackgroundColor', 'balanceInfoBorderColor']
    ],
    customSettingsPropertiesOrder: [
      // Content Settings
      'buttonText',
      'title',
      
      // Static Vendor Data (Read-only in editor, pulled from context)
      'staticVendorId',
      'staticVendorName', 
      'staticQuotedAmount',
      
      // Editable Form Labels
      'invoiceLabel',
      'invoicePlaceholder',
      'totalAmountLabel',
      'paymentAmountLabel',
      'amountRemainingLabel',
      'amountRemainingPlaceholder',
      'amountRemainingHelper',
      'paymentTypeLabel',
      'immediatePaymentText',
      'historicalPaymentText',
      'scheduledPaymentText',
      'paymentDateLabel',
      'paymentDateHelper',
      'scheduledDateLabel',
      'scheduledDateHelper',
      'paymentMethodLabel',
      'paymentMethodPlaceholder',
      'paymentReferenceLabel',
      'notesLabel',
      'notesPlaceholder',
      'cancelButtonText',
      'processingText',
      
      // Submit Button Text
      'immediateSubmitText',
      'historicalSubmitText',
      'scheduledSubmitText',
      
      // Supabase Settings
      'supabaseUrl',
      'supabaseKey',
      'tableName'
    ]
  },
  properties: {
    // Main Button and Title
    buttonText: {
      label: 'Button Text',
      type: 'Text',
      options: {
        placeholder: 'Create Payment Plan'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Create Payment Plan'
    },
    title: {
      label: 'Popup Title', 
      type: 'Text',
      options: {
        placeholder: 'Create Payment Plan'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Create Payment Plan'
    },

    // Static Vendor Data (populated from context)
    staticVendorId: {
      label: 'Vendor ID (Static)',
      type: 'Text',
      options: {
        placeholder: 'Auto-populated from context',
        readonly: true
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: ''
    },
    staticVendorName: {
      label: 'Vendor Name (Static)',
      type: 'Text', 
      options: {
        placeholder: 'Auto-populated from context',
        readonly: true
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: ''
    },
    staticQuotedAmount: {
      label: 'Quoted Amount (Static)',
      type: 'Number',
      options: {
        placeholder: '0.00',
        min: 0,
        step: 0.01,
        readonly: true
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 0
    },

    // Form Labels - All Editable
    invoiceLabel: {
      label: 'Invoice Label',
      type: 'Text',
      options: {
        placeholder: 'Invoice/Reference Number'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Invoice/Reference Number'
    },
    invoicePlaceholder: {
      label: 'Invoice Placeholder',
      type: 'Text',
      options: {
        placeholder: 'INV-2024-001'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'INV-2024-001'
    },
    totalAmountLabel: {
      label: 'Total Amount Label',
      type: 'Text',
      options: {
        placeholder: 'Total Amount Owed'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Total Amount Owed'
    },
    paymentAmountLabel: {
      label: 'Payment Amount Label',
      type: 'Text',
      options: {
        placeholder: 'Payment Amount'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Payment Amount'
    },

    // New Amount Remaining Field
    amountRemainingLabel: {
      label: 'Amount Remaining Label',
      type: 'Text',
      options: {
        placeholder: 'Amount Remaining'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Amount Remaining'
    },
    amountRemainingPlaceholder: {
      label: 'Amount Remaining Placeholder',
      type: 'Text',
      options: {
        placeholder: '0.00'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '0.00'
    },
    amountRemainingHelper: {
      label: 'Amount Remaining Helper Text',
      type: 'Text',
      options: {
        placeholder: 'Enter the remaining amount after this payment'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Enter the remaining amount after this payment'
    },

    // Payment Type Labels
    paymentTypeLabel: {
      label: 'Payment Type Label',
      type: 'Text',
      options: {
        placeholder: 'Payment Type'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Payment Type'
    },
    immediatePaymentText: {
      label: 'Immediate Payment Text',
      type: 'Text',
      options: {
        placeholder: 'Payment Made Today'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Payment Made Today'
    },
    historicalPaymentText: {
      label: 'Historical Payment Text',
      type: 'Text',
      options: {
        placeholder: 'Historical Payment (Already Made)'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Historical Payment (Already Made)'
    },
    scheduledPaymentText: {
      label: 'Scheduled Payment Text',
      type: 'Text',
      options: {
        placeholder: 'Scheduled Future Payment'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Scheduled Future Payment'
    },

    // Date Labels
    paymentDateLabel: {
      label: 'Payment Date Label',
      type: 'Text',
      options: {
        placeholder: 'Payment Date'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Payment Date'
    },
    paymentDateHelper: {
      label: 'Payment Date Helper',
      type: 'Text',
      options: {
        placeholder: 'When was this payment actually made?'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'When was this payment actually made?'
    },
    scheduledDateLabel: {
      label: 'Scheduled Date Label',
      type: 'Text',
      options: {
        placeholder: 'Scheduled Payment Date'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Scheduled Payment Date'
    },
    scheduledDateHelper: {
      label: 'Scheduled Date Helper',
      type: 'Text',
      options: {
        placeholder: 'When do you plan to make this payment?'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'When do you plan to make this payment?'
    },

    // Payment Method Labels
    paymentMethodLabel: {
      label: 'Payment Method Label',
      type: 'Text',
      options: {
        placeholder: 'Payment Method'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Payment Method'
    },
    paymentMethodPlaceholder: {
      label: 'Payment Method Placeholder',
      type: 'Text',
      options: {
        placeholder: 'Select payment method...'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Select payment method...'
    },
    paymentReferenceLabel: {
      label: 'Payment Reference Label',
      type: 'Text',
      options: {
        placeholder: 'Payment Reference'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Payment Reference'
    },

    // Notes
    notesLabel: {
      label: 'Notes Label',
      type: 'Text',
      options: {
        placeholder: 'Notes'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Notes'
    },
    notesPlaceholder: {
      label: 'Notes Placeholder',
      type: 'Text',
      options: {
        placeholder: 'Additional notes about this payment...'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Additional notes about this payment...'
    },

    // Button Text
    cancelButtonText: {
      label: 'Cancel Button Text',
      type: 'Text',
      options: {
        placeholder: 'Cancel'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Cancel'
    },
    processingText: {
      label: 'Processing Text',
      type: 'Text',
      options: {
        placeholder: 'Creating...'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Creating...'
    },

    // Submit Button Text Options
    immediateSubmitText: {
      label: 'Immediate Submit Text',
      type: 'Text',
      options: {
        placeholder: 'Record Payment'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Record Payment'
    },
    historicalSubmitText: {
      label: 'Historical Submit Text',
      type: 'Text',
      options: {
        placeholder: 'Add Historical Payment'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Add Historical Payment'
    },
    scheduledSubmitText: {
      label: 'Scheduled Submit Text',
      type: 'Text',
      options: {
        placeholder: 'Schedule Payment'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Schedule Payment'
    },

    // Main Button Styling
    buttonBackgroundColor: {
      label: 'Button Background Color',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#10b981'
    },
    buttonTextColor: {
      label: 'Button Text Color', 
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#ffffff'
    },
    buttonBorderRadius: {
      label: 'Button Border Radius',
      type: 'Length',
      options: {
        unitChoices: [
          { label: 'px', value: 'px' },
          { label: '%', value: '%' },
          { label: 'rem', value: 'rem' }
        ]
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '8px'
    },
    buttonPadding: {
      label: 'Button Padding',
      type: 'Length',
      options: {
        unitChoices: [
          { label: 'px', value: 'px' },
          { label: 'rem', value: 'rem' }
        ]
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '12px 24px'
    },
    buttonFontSize: {
      label: 'Button Font Size',
      type: 'Length',
      options: {
        unitChoices: [
          { label: 'px', value: 'px' },
          { label: 'rem', value: 'rem' },
          { label: 'em', value: 'em' }
        ]
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '14px'
    },
    buttonFontWeight: {
      label: 'Button Font Weight',
      type: 'Select',
      options: {
        options: [
          { label: '100 - Thin', value: '100' },
          { label: '200 - Extra Light', value: '200' },
          { label: '300 - Light', value: '300' },
          { label: '400 - Normal', value: '400' },
          { label: '500 - Medium', value: '500' },
          { label: '600 - Semi Bold', value: '600' },
          { label: '700 - Bold', value: '700' },
          { label: '800 - Extra Bold', value: '800' },
          { label: '900 - Black', value: '900' }
        ]
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '600'
    },

    // Cancel Button Styling
    cancelButtonBackgroundColor: {
      label: 'Cancel Button Background',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#f3f4f6'
    },
    cancelButtonTextColor: {
      label: 'Cancel Button Text Color',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#374151'
    },
    cancelButtonBorderRadius: {
      label: 'Cancel Button Border Radius',
      type: 'Length',
      options: {
        unitChoices: [
          { label: 'px', value: 'px' },
          { label: '%', value: '%' },
          { label: 'rem', value: 'rem' }
        ]
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '8px'
    },

    // Submit Button Styling
    submitButtonBackgroundColor: {
      label: 'Submit Button Background',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#10b981'
    },
    submitButtonTextColor: {
      label: 'Submit Button Text Color',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#ffffff'
    },
    submitButtonBorderRadius: {
      label: 'Submit Button Border Radius',
      type: 'Length',
      options: {
        unitChoices: [
          { label: 'px', value: 'px' },
          { label: '%', value: '%' },
          { label: 'rem', value: 'rem' }
        ]
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '8px'
    },

    // Close Button Styling
    closeButtonColor: {
      label: 'Close Button Color',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#6b7280'
    },

    // Form Styling
    labelColor: {
      label: 'Label Text Color',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#374151'
    },
    inputBorderColor: {
      label: 'Input Border Color',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#d1d5db'
    },
    inputFocusColor: {
      label: 'Input Focus Color',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#10b981'
    },

    // Balance Info Styling
    balanceInfoBackgroundColor: {
      label: 'Balance Info Background',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#f9fafb'
    },
    balanceInfoBorderColor: {
      label: 'Balance Info Border',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#e5e7eb'
    },
    paidOffNoticeBackgroundColor: {
      label: 'Paid Off Notice Background',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#d1fae5'
    },
    paidOffNoticeTextColor: {
      label: 'Paid Off Notice Text Color',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#065f46'
    },

    // Supabase Direct Integration (Optional)
    supabaseUrl: {
      label: 'Supabase URL (Optional)',
      type: 'Text',
      options: {
        placeholder: 'https://your-project.supabase.co'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: ''
    },
    supabaseKey: {
      label: 'Supabase Anon Key (Optional)',
      type: 'Text',
      options: {
        placeholder: 'Your anon key...'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: ''
    },
    tableName: {
      label: 'Table Name',
      type: 'Text',
      options: {
        placeholder: 'payment_plans'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'payment_plans'
    }
  },
  triggerEvents: [
    {
      name: 'payment-popup-opened',
      label: 'Payment Popup Opened',
      event: {
        action: 'popup_opened',
        vendor_id: '',
        vendor_name: ''
      }
    },
    {
      name: 'payment-plan-created', 
      label: 'Payment Plan Created',
      event: {
        action: 'create_payment_plan',
        data: {},
        vendor_id: '',
        vendor_name: '',
        amount: 0,
        type: '',
        is_fully_paid: false,
        supabase_result: {}
      }
    }
  ]
};export default {
  editor: {
    label: 'Payment Plan Popup',
    icon: 'payment',
    customStylePropertiesOrder: [
      ['buttonBackgroundColor', 'buttonTextColor'],
      ['buttonBorderRadius', 'buttonPadding'],
      ['buttonFontSize', 'buttonFontWeight']
    ],
    customSettingsPropertiesOrder: [
      'buttonText',
      'title', 
      'vendorId',
      'vendorName',
      'quotedAmount'
    ]
  },
  properties: {
    buttonText: {
      label: 'Button Text',
      type: 'Text',
      options: {
        placeholder: 'Create Payment Plan'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Create Payment Plan'
    },
    title: {
      label: 'Popup Title', 
      type: 'Text',
      options: {
        placeholder: 'Create Payment Plan'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 'Create Payment Plan'
    },
    vendorId: {
      label: 'Vendor ID',
      type: 'Text',
      options: {
        placeholder: 'Enter vendor ID'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: ''
    },
    vendorName: {
      label: 'Vendor Name',
      type: 'Text', 
      options: {
        placeholder: 'Enter vendor name'
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: ''
    },
    quotedAmount: {
      label: 'Quoted Amount',
      type: 'Number',
      options: {
        placeholder: '0.00',
        min: 0,
        step: 0.01
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: 0
    },
    // Button styling properties
    buttonBackgroundColor: {
      label: 'Button Background Color',
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#10b981'
    },
    buttonTextColor: {
      label: 'Button Text Color', 
      type: 'Color',
      options: {
        nullable: false
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '#ffffff'
    },
    buttonBorderRadius: {
      label: 'Button Border Radius',
      type: 'Length',
      options: {
        unitChoices: [
          { label: 'px', value: 'px' },
          { label: '%', value: '%' },
          { label: 'rem', value: 'rem' }
        ]
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '8px'
    },
    buttonPadding: {
      label: 'Button Padding',
      type: 'Length',
      options: {
        unitChoices: [
          { label: 'px', value: 'px' },
          { label: 'rem', value: 'rem' }
        ]
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '12px 24px'
    },
    buttonFontSize: {
      label: 'Button Font Size',
      type: 'Length',
      options: {
        unitChoices: [
          { label: 'px', value: 'px' },
          { label: 'rem', value: 'rem' },
          { label: 'em', value: 'em' }
        ]
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '14px'
    },
    buttonFontWeight: {
      label: 'Button Font Weight',
      type: 'Select',
      options: {
        options: [
          { label: '100 - Thin', value: '100' },
          { label: '200 - Extra Light', value: '200' },
          { label: '300 - Light', value: '300' },
          { label: '400 - Normal', value: '400' },
          { label: '500 - Medium', value: '500' },
          { label: '600 - Semi Bold', value: '600' },
          { label: '700 - Bold', value: '700' },
          { label: '800 - Extra Bold', value: '800' },
          { label: '900 - Black', value: '900' }
        ]
      },
      bindable: true,
      responsive: true,
      states: true,
      defaultValue: '600'
    }
  },
  triggerEvents: [
    {
      name: 'payment-popup-opened',
      label: 'Payment Popup Opened',
      event: {
        action: 'popup_opened',
        vendor_id: '',
        vendor_name: ''
      }
    },
    {
      name: 'payment-plan-created', 
      label: 'Payment Plan Created',
      event: {
        action: 'create_payment_plan',
        data: {},
        vendor_id: '',
        vendor_name: '',
        amount: 0,
        type: '',
        is_fully_paid: false
      }
    }
  ]
};
