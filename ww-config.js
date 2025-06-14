module.exports = {
  name: 'Payment Plan Component',
  description: 'Create and manage vendor payment plans',
  version: '1.0.0',
  icon: 'credit-card',
  type: 'element',
  editor: {
    label: 'Payment Plan',
    icon: 'credit-card'
  },
  properties: {
    buttonText: {
      label: 'Button Text',
      type: 'Text',
      defaultValue: 'Create Payment Plan'
    },
    title: {
      label: 'Popup Title', 
      type: 'Text',
      defaultValue: 'Create Payment Plan'
    },
    vendorId: {
      label: 'Vendor ID',
      type: 'Text',
      defaultValue: ''
    },
    vendorName: {
      label: 'Vendor Name',
      type: 'Text', 
      defaultValue: ''
    },
    quotedAmount: {
      label: 'Quoted Amount',
      type: 'Number',
      defaultValue: 0
    }
  }
}
