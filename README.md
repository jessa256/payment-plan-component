# Payment Plan Component v3.2.0

A comprehensive WeWeb custom component for creating and managing payment plans with vendors. Features popup-over-popup functionality, modern Vue 3 compatibility, dynamic form fields, required field validation, and extensive customization options.

## 🚀 Features

### Core Functionality
- **Popup-over-Popup Design**: Creates overlay above existing vendor detail popups
- **Payment Plan Creation**: Create immediate, historical, or scheduled payments
- **Required Field Validation**: Mandatory Payment Amount, Type, and Method with real-time validation
- **Dynamic Calculations**: Real-time remaining balance calculations from Supabase
- **Smart Payment Limits**: Payment amount cannot exceed remaining balance
- **Vendor Integration**: Static vendor data pulled from WeWeb popup context
- **Multiple Payment Types**: Support for various payment methods (Check, ACH, Wire, Venmo, etc.)
- **Date Handling**: Smart date validation for historical and future payments
- **Enhanced UX**: Visual indicators, error messages, ESC key support, and form validation

### New in v3.2.0 ✨
✅ **Vue 3 Compatibility**: Eliminates `wwLib.useCreateElement` deprecation warnings  
✅ **Popup-over-Popup**: Designed to work above vendor details popups with proper z-indexing  
✅ **Modern Architecture**: Uses modern Vue 3 patterns without deprecated WeWeb APIs  
✅ **Enhanced Layering**: Proper modal stacking with backdrop and animations  
✅ **Improved Events**: Comprehensive event system for WeWeb workflow integration  
✅ **ESC Key Support**: Close popup with escape key for better UX  
✅ **Mobile Responsive**: Optimized for all screen sizes with better mobile layout  

### Previous Features (v3.1.x)
✅ **Required Field Validation**: Payment Amount, Type, and Method are mandatory  
✅ **Amount Remaining Display**: Dynamic field showing current balance  
✅ **Enhanced Form Validation**: Real-time validation with detailed error messages  
✅ **Smart Payment Limits**: Prevents payments exceeding remaining balance  
✅ **Visual Indicators**: Required fields marked with red asterisks  
✅ **Improved Date Logic**: Historical payments ≤ today, scheduled payments ≥ today  

## 📋 Requirements

- **WeWeb**: Latest version
- **Vue.js**: 3.x (handled by WeWeb)
- **Supabase** (optional): For dynamic amount remaining calculations
- **Node.js**: 16+ (for development)

## 🛠 Installation

### Option 1: GitHub Import (Recommended) 🌟
```
1. Copy this GitHub URL: https://github.com/jessa256/payment-plan-component
2. In WeWeb: Components → Custom Components → Import from GitHub
3. Paste the URL and select the latest release (v3.2.0)
4. WeWeb will automatically import dist/manager.js
```

### Option 2: Direct File Import
1. Download the latest release from [GitHub Releases](https://github.com/jessa256/payment-plan-component/releases)
2. Extract the files
3. Import `dist/manager.js` into your WeWeb project

### Option 3: Clone and Build
```bash
git clone https://github.com/jessa256/payment-plan-component.git
cd payment-plan-component
npm install
npm run build
```

## ⚙️ Configuration

### Usage in Vendor Details Popup
The component is designed to be used **inside** your existing vendor details popup. When clicked, it creates a new overlay **on top** of the vendor popup.

**Flow**: Vendor Grid → Vendor Details Popup → Payment Plan Popup Overlay

### Static Vendor Data
The component automatically pulls vendor information from the vendor details popup context. Set these bindings in WeWeb:

| Field | Binding |
|-------|---------|
| Vendor ID | `{{ context.vendorData.id }}` |
| Vendor Name | `{{ context.vendorData.vendor_name }}` |
| Quoted Amount | `{{ context.vendorData.quoted_amount }}` |

### Amount Remaining Calculation
Bind the `calculatedAmountRemaining` property to a WeWeb variable or workflow result:

| Field | Binding |
|-------|---------|
| Amount Remaining | `{{ variables.calculatedAmountRemaining }}` |

### Supabase Integration

#### WeWeb Workflow Integration (Recommended)
1. Create a WeWeb workflow
2. Set trigger to "Component Event"
3. Listen for `payment-success` event
4. Insert payment data into your `paymentPlans` table:

```javascript
// Example workflow action
{
  "table": "paymentPlans",
  "action": "insert",
  "data": "{{ trigger.event.paymentPlan }}"
}
```

## 🎯 Component Events

### payment-submitted
Triggered when the user submits the payment form with all validation passed.

**Event Data:**
```javascript
{
  paymentPlan: {
    vendor_id: "vendor-uuid",
    vendor_name: "Vendor Name",
    invoice_number: "INV-001",
    payment_amount: 1500.00,
    payment_type: "immediate",
    payment_date: "2025-06-14",
    payment_method: "Check",
    reference_number: "REF-123",
    notes: "Payment notes",
    amount_remaining: 500.00,
    created_at: "2025-06-14T10:30:00Z"
  },
  vendorInfo: {
    id: "vendor-uuid",
    name: "Vendor Name", 
    quotedAmount: 2000.00
  },
  formData: { /* raw form data */ },
  calculatedAmountRemaining: 500.00
}
```

### payment-success
Triggered after successful processing (1 second delay for UX).

**Event Data:**
```javascript
{
  paymentPlan: { /* same as above */ },
  message: "Payment plan created successfully!"
}
```

### modal-opened / modal-closed
Triggered when the payment popup opens or closes with vendor information.

## 🔧 Development

### WeWeb CLI Commands
```bash
# Start development server
npm run serve

# Build for production
npm run build
```

### File Structure
```
payment-plan-component/
├── src/
│   └── wwElement.vue        # Main component file
├── dist/
│   └── manager.js          # Built component (~30KB)
├── ww-config.js            # WeWeb configuration
├── package.json            # Package configuration  
├── README.md               # This documentation
├── CHANGELOG.md            # Version history
└── LICENSE                 # MIT License
```

## 🐛 Troubleshooting

### Common Issues

**WeWeb Import Errors:**
- Ensure you're using the latest WeWeb version
- Try importing `dist/manager.js` directly if GitHub import fails
- Check WeWeb console for specific error messages

**Component not appearing above vendor popup:**
- Verify z-index settings in browser dev tools
- Check for CSS conflicts with existing popup styles
- Ensure component is properly imported and configured

**Deprecated API warnings resolved:**
- v3.2.0 eliminates all `wwLib.useCreateElement` warnings
- Uses modern Vue 3 composition patterns
- No more build-time deprecation messages

**Static vendor data not loading:**
- Verify parent popup is passing vendorData context
- Check context bindings: `{{ context.vendorData.* }}`
- Ensure vendor data exists in parent popup context

**Amount remaining not calculating:**
- Verify `calculatedAmountRemaining` binding is set
- Check WeWeb workflow is configured for amount calculation
- Ensure Supabase queries are returning expected data

## 📈 Version History

### v3.2.0 (June 2025): Vue 3 Compatibility & Popup-over-Popup 🎉
- **Fixed**: Eliminated all `wwLib.useCreateElement` deprecation warnings
- **NEW**: Popup-over-popup architecture with proper z-index layering
- **NEW**: Modern Vue 3 patterns without deprecated WeWeb APIs
- **NEW**: ESC key support for closing popup
- **NEW**: Enhanced animations and mobile responsiveness
- **Improved**: Event system for better WeWeb workflow integration
- **Verified**: Compatible with latest WeWeb and Vue 3 standards

### v3.1.3 (June 2025): Build Fix & GitHub Ready
- **Fixed**: Resolved all WeWeb CLI compilation and build errors
- **Added**: GitHub integration ready for direct WeWeb import
- **Improved**: All v3.1.2 features now fully functional and stable

### v3.1.2 (June 2025): Enhanced Validation & UX
- **NEW**: Required field validation for Payment Amount, Type, and Method
- **NEW**: Amount Remaining display with dynamic Supabase calculation
- **NEW**: Enhanced form validation with real-time error messages
- **NEW**: Smart payment limits preventing overpayment

### v3.0.2 (June 2024): Production Ready
- Fixed WeWeb CLI compatibility
- Resolved build errors
- Generated production artifacts

## 🔗 WeWeb Integration Guide

### Setting Up in Vendor Details Popup

1. **Add Component** to your vendor details popup
2. **Configure Vendor Data Bindings**:
   ```
   Static Vendor ID: {{ context.vendorData.id }}
   Static Vendor Name: {{ context.vendorData.vendor_name }}
   Static Quoted Amount: {{ context.vendorData.quoted_amount }}
   ```

3. **Create Amount Calculation Workflow**:
   - Trigger: When vendor popup opens
   - Action: Query existing payments for vendor
   - Variable: Store calculated remaining amount
   - Bind to: `calculatedAmountRemaining`

4. **Create Payment Submission Workflow**:
   - Trigger: Component Event `payment-success`
   - Action: Insert into Supabase `paymentPlans` table
   - Data: `{{ trigger.event.paymentPlan }}`

### Popup Layering Architecture

```
┌─────────────────────────────────────┐ ← Payment Plan Popup (z-index: 10000)
│  Payment Form Overlay               │
│  ┌─────────────────────────────────┐ │
│  │ Vendor Details Popup            │ │ ← Vendor Details (z-index: 9999)
│  │ (Original popup)                │ │
│  │                                 │ │
│  └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support & Resources

- **GitHub Repository**: https://github.com/jessa256/payment-plan-component
- **Issues**: [GitHub Issues](https://github.com/jessa256/payment-plan-component/issues)
- **WeWeb Community**: Discord discussions
- **Email**: kjessicaclark1@live.com

## 🙏 Special Thanks

Thanks to the WeWeb community for feedback on the popup-over-popup architecture and Vue 3 compatibility requirements. This release represents a modern, future-proof component suitable for all WeWeb projects.

---

**⭐ Star the repo if this component helps your WeWeb projects!**

**🔄 Upgrade today**: Import v3.2.0 for Vue 3 compatibility and popup-over-popup functionality!