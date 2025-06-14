export default {
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