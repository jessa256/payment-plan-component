# Payment Plan Component v3.1.3

A comprehensive WeWeb custom component for creating and managing payment plans with vendors. Features dynamic form fields, required field validation, real-time amount remaining calculations, Supabase integration, and extensive customization options.

## 🚀 Features

### Core Functionality
- **Payment Plan Creation**: Create immediate, historical, or scheduled payments
- **Required Field Validation**: Mandatory Payment Amount, Payment Type, and Payment Method
- **Dynamic Calculations**: Real-time remaining balance calculations from Supabase
- **Smart Payment Limits**: Payment amount cannot exceed remaining balance
- **Vendor Integration**: Static vendor data pulled from context
- **Multiple Payment Types**: Support for various payment methods (Check, ACH, Wire, Venmo, etc.)
- **Date Handling**: Smart date validation for historical and future payments
- **Enhanced UX**: Visual indicators, error messages, and form validation

### New in v3.1.3 ✨
✅ **Build Fix Release**: Resolved all WeWeb CLI compilation issues  
✅ **Production Ready**: Component now builds successfully without errors  
✅ **GitHub Integration**: Ready for direct GitHub import into WeWeb  
✅ **Required Field Validation**: Payment Amount, Type, and Method are mandatory  
✅ **Amount Remaining Display**: Dynamic field showing current balance  
✅ **Enhanced Form Validation**: Real-time validation with detailed error messages  
✅ **Smart Payment Limits**: Prevents payments exceeding remaining balance  
✅ **Visual Indicators**: Required fields marked with red asterisks  
✅ **Improved Date Logic**: Historical payments ≤ today, scheduled payments ≥ today  

### Previous Features (v3.0.x - v3.1.2)
✅ **Amount Remaining Field**: Fully editable field with JavaScript binding support  
✅ **Static Vendor Data**: Auto-populated from parent component context  
✅ **Enhanced Customization**: All labels, buttons, and styling now editable  
✅ **Improved Supabase Integration**: Direct API calls + workflow fallback  
✅ **Better Mobile Responsiveness**: Optimized for all screen sizes  
✅ **Comprehensive Documentation**: Professional README and setup guides  

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
3. Paste the URL and select the latest release (v3.1.3)
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

### Static Vendor Data
The component automatically pulls vendor information from the parent component's context. Set these bindings in WeWeb:

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

#### Option A: Direct Integration
Configure in component settings:
```javascript
supabaseUrl: 'https://your-project.supabase.co'
supabaseKey: 'your-anon-key'
tableName: 'paymentPlans'
```

#### Option B: Workflow Integration (Recommended)
1. Create a WeWeb workflow
2. Set trigger to "Component Event"
3. Listen for `payment-submitted` event
4. Add Supabase insert action

### Database Schema

#### Required Tables
```sql
CREATE TABLE paymentPlans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id TEXT NOT NULL,
  vendor TEXT NOT NULL,
  invoice_reference TEXT,
  payment_amount DECIMAL(10,2) NOT NULL,
  payment_type TEXT NOT NULL CHECK (payment_type IN ('immediate', 'historical', 'scheduled')),
  payment_date DATE NOT NULL,
  payment_method TEXT NOT NULL,
  payment_reference TEXT,
  notes TEXT,
  paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE vendorInformation (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_name TEXT NOT NULL UNIQUE,
  vendor_type TEXT,
  quoted_amount DECIMAL(10,2),
  contact_name TEXT,
  phone_number TEXT,
  email TEXT,
  website TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 🎨 Customization

### Editable Content
All text and labels can be customized in the WeWeb editor:

**Form Labels**
- Invoice/Reference Label & Placeholder
- Payment Amount Label (with required indicator)
- Payment Type Labels (Immediate, Historical, Scheduled)
- Payment Method Labels (with required indicator)
- Notes Label & Placeholder

**Button Text**
- Trigger Button Text
- Cancel Button Text
- Submit Button Variations (by payment type)
- Processing Text

**Styling Options**
- Button colors, sizes, and border radius
- Form input styling and focus colors
- Required field indicators (red asterisks)
- Error message styling
- Amount remaining display colors
- Label colors and typography

### Required Field Validation
The component now enforces validation for:
- **Payment Amount**: Must be > 0 and ≤ remaining balance
- **Payment Type**: Must select immediate, historical, or scheduled
- **Payment Method**: Cannot be empty

## 📡 Events

The component emits these events for workflow integration:

### payment-submitted
Triggered when a payment plan is successfully created.
```javascript
{
  paymentData: {
    invoice: 'string',
    amount: 500.00,
    type: 'immediate|historical|scheduled',
    date: '2025-06-14',
    scheduledDate: '2025-06-14',
    method: 'check|ach|wire|etc',
    reference: 'string',
    notes: 'string',
    vendorId: 'string',
    vendorName: 'string',
    totalAmount: 1400.00,
    amountRemaining: 900.00,
    timestamp: '2025-06-14T10:30:00Z'
  },
  vendorInfo: {
    id: 'string',
    name: 'string',
    quotedAmount: 1400.00,
    amountRemaining: 900.00
  },
  paymentType: 'immediate'
}
```

### validation-failed
Triggered when form validation fails.
```javascript
{
  errors: {
    amount: 'Payment amount is required',
    type: 'Payment type is required',
    method: 'Payment method is required'
  }
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
│   └── manager.js          # Built component (~25KB)
├── ww-config.js            # WeWeb configuration
├── package.json            # Package configuration  
├── README.md               # This documentation
└── LICENSE                 # MIT License
```

## 🐛 Troubleshooting

### Common Issues

**WeWeb Import Errors:**
- Ensure you're using the latest WeWeb version
- Try importing `dist/manager.js` directly if GitHub import fails
- Check WeWeb console for specific error messages

**Component not appearing in WeWeb:**
- Verify component imported successfully
- Check WeWeb component library refresh
- Ensure proper component registration

**Required field validation not working:**
- Verify you're using v3.1.3
- Check that form fields have proper validation attributes
- Ensure submit button is properly bound to validation state

**Static vendor data not loading:**
- Verify parent component is passing vendorData prop
- Check context bindings are correct: `{{ context.vendorData.* }}`
- Ensure vendor data exists in parent context

**Amount remaining not calculating:**
- Verify `calculatedAmountRemaining` binding is set
- Check WeWeb workflow is properly configured for vendor selection
- Ensure Supabase function exists and is accessible

## 📈 Version History

### v3.1.3 (June 2025): Build Fix & GitHub Ready 🎉
- **Fixed**: Resolved all WeWeb CLI compilation and build errors
- **Fixed**: Component now builds successfully without syntax issues
- **Added**: GitHub integration ready for direct WeWeb import
- **Added**: Comprehensive release documentation and versioning
- **Improved**: All v3.1.2 features now fully functional and stable
- **Verified**: Production-ready component with proper build artifacts

### v3.1.2 (June 2025): Enhanced Validation & UX (Build Issues - Fixed in v3.1.3)
- **NEW**: Required field validation for Payment Amount, Payment Type, and Payment Method
- **NEW**: Amount Remaining display with dynamic Supabase calculation
- **NEW**: Enhanced form validation with real-time error messages
- **NEW**: Smart payment limits preventing overpayment
- **NEW**: Visual indicators for required fields (red asterisks)

### v3.0.2 (June 2024): Production Ready
- Fixed WeWeb CLI compatibility
- Resolved build errors
- Generated production artifacts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **GitHub Issues**: [Create an issue](https://github.com/jessa256/payment-plan-component/issues)
- **WeWeb Community**: [WeWeb Discord](https://discord.gg/weweb)
- **Email**: kjessicaclark1@live.com

## 🙏 Acknowledgments

- WeWeb team for the excellent no-code platform
- Supabase team for the backend infrastructure
- Vue.js community for the reactive framework
- Contributors and testers who helped improve this component

---

**⭐ Star this repo if it helps your WeWeb projects!**

Made with ❤️ for the WeWeb community by Jessica Clark