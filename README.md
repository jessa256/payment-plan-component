# Payment Plan Component v3.1.2

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

### New in v3.1.x
✅ **Required Field Validation**: Payment Amount, Type, and Method are now mandatory  
✅ **Amount Remaining Display**: Dynamic field showing current balance from Supabase calculations  
✅ **Enhanced Form Validation**: Real-time validation with detailed error messages  
✅ **Smart Payment Limits**: Prevents payments exceeding remaining balance  
✅ **Visual Indicators**: Required fields marked with red asterisks  
✅ **Improved Date Logic**: Historical payments ≤ today, scheduled payments ≥ today  
✅ **Submit Button Logic**: Disabled until all required fields are valid  
✅ **Build Stability**: Fixed all component compilation and build issues  

### Previous Features (v3.0.x)
✅ **Amount Remaining Field**: Fully editable field with JavaScript binding support  
✅ **Static Vendor Data**: Auto-populated from parent component context  
✅ **Enhanced Customization**: All labels, buttons, and styling now editable  
✅ **Improved Supabase Integration**: Direct API calls + workflow fallback  
✅ **Better Mobile Responsiveness**: Optimized for all screen sizes  
✅ **Production Ready**: Successfully builds with WeWeb CLI  
✅ **Comprehensive Documentation**: Professional README and setup guides  

## 📋 Requirements

- **WeWeb**: Latest version
- **Vue.js**: 3.x (handled by WeWeb)
- **Supabase** (optional): For dynamic amount remaining calculations
- **Node.js**: 16+ (for development)

## 🛠 Installation

### Option 1: Use Pre-built Component (Recommended)
1. Download the latest release from GitHub Releases
2. Extract the files
3. Copy `dist/manager.js` to your WeWeb project
4. Reference `ww-config.js` for configuration options
5. Import in your WeWeb project

### Option 2: Clone and Build
```bash
git clone https://github.com/jessa256/payment-plan-component.git
cd payment-plan-component
npm install
# Build for WeWeb
weweb build -- name=payment-plan-component type=wwobject
```

### Option 3: Development Setup
```bash
git clone https://github.com/jessa256/payment-plan-component.git
cd payment-plan-component
npm install
# Start development server
weweb serve
```

## ⚙️ Configuration

### Static Vendor Data
The component automatically pulls vendor information from the parent component's context. Set these bindings in WeWeb:

| Field | Binding |
|-------|---------|
| Vendor ID | `context.component?.props?.vendorData?.id` |
| Vendor Name | `context.component?.props?.vendorData?.vendor_name` |
| Quoted Amount | `context.component?.props?.vendorData?.quoted_amount` |

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

#### Amount Remaining Calculation Function
```sql
CREATE OR REPLACE FUNCTION get_vendor_amount_remaining(vendor_id_param TEXT)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    total_quoted DECIMAL(10,2);
    total_paid DECIMAL(10,2);
    amount_remaining DECIMAL(10,2);
BEGIN
    SELECT COALESCE(quoted_amount, 0) INTO total_quoted
    FROM "vendorInformation" 
    WHERE vendor_name = vendor_id_param OR id::text = vendor_id_param;
    
    SELECT COALESCE(SUM(payment_amount), 0) INTO total_paid
    FROM "paymentPlans" 
    WHERE vendor = vendor_id_param 
    AND payment_date <= CURRENT_DATE
    AND paid = true;
    
    amount_remaining := total_quoted - total_paid;
    
    IF amount_remaining < 0 THEN
        amount_remaining := 0;
    END IF;
    
    RETURN amount_remaining;
END;
$$ LANGUAGE plpgsql;
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

### JavaScript Binding
The Amount Remaining field supports full JavaScript binding in WeWeb:
```javascript
// Example: Calculate based on custom logic
const calculateRemaining = () => {
  const total = formData.totalAmount;
  const payment = formData.paymentAmount;
  const customFee = 50;
  return Math.max(0, total - payment + customFee);
};
```

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

### modal-opened
Triggered when the payment popup opens.
```javascript
{
  vendorInfo: {
    id: 'string',
    name: 'string',
    quotedAmount: 1400.00,
    amountRemaining: 900.00
  }
}
```

### modal-closed
Triggered when the payment popup closes.

## 🔧 Development

### WeWeb CLI Commands
```bash
# Start development server
weweb serve

# Build for production
weweb build -- name=payment-plan-component type=wwobject

# Check WeWeb CLI help
weweb --help
```

### File Structure
```
payment-plan-component/
├── src/
│   └── wwElement.vue        # Main component file
├── dist/
│   └── manager.js          # Built component (21KB)
├── ww-config.js            # WeWeb configuration
├── package.json            # Package configuration
├── README.md               # This file
└── .gitignore             # Git ignore rules
```

## 🐛 Troubleshooting

### Common Issues

**WeWeb CLI Permission Errors:**
```bash
mkdir ~/.npm-global && npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
npm install -g @weweb/cli
```

**Component Build Failures:**
- Ensure single export default in config files
- Remove HTML comments from `<style>` sections
- Check for syntax errors in Vue components
- Verify no duplicate `<script>` tags in Vue files
- Ensure only one `export default` statement per file

**Component not appearing in WeWeb:**
- Ensure component is properly imported
- Check WeWeb console for errors
- Verify component registration in WeWeb

**Required field validation not working:**
- Verify you're using v3.1.2 or later
- Check that form fields have proper validation attributes
- Ensure submit button is properly bound to validation state

**Static vendor data not loading:**
- Verify parent component is passing vendorData prop
- Check context bindings are correct
- Ensure vendor data exists in parent context

**Amount remaining not calculating:**
- Verify Supabase function exists and is accessible
- Check WeWeb workflow is properly configured
- Ensure `calculatedAmountRemaining` binding is set
- Check browser network tab for API errors

**Supabase integration failing:**
- Verify Supabase URL and key are correct
- Check table exists with proper schema
- Ensure API permissions allow inserts
- Check browser network tab for API errors

**Build Errors (Fixed in v3.1.2):**
- Babel parser errors: Resolved by cleaning Vue component structure
- Module export errors: Fixed duplicate export statements
- Vue compiler errors: Removed duplicate script tags

### Debug Mode
Enable debug logging by adding to browser console:
```javascript
localStorage.setItem('paymentPlanDebug', 'true');
```

## 📈 Roadmap

### Planned Features
- [ ] Recurring payment support
- [ ] Payment status tracking and notifications
- [ ] Email notifications integration
- [ ] PDF invoice generation
- [ ] Multi-currency support
- [ ] Payment approval workflow
- [ ] Bulk payment operations
- [ ] Advanced reporting and analytics
- [ ] Auto-calculation of payment schedules
- [ ] Integration with accounting software

## 📊 Version History

### v3.1.2 (June 2025): Build Fix Release
- **Fixed**: Resolved Babel parser errors that prevented component compilation
- **Fixed**: Removed duplicate `<script>` tags in Vue component structure
- **Fixed**: Cleaned up duplicate `export default` statements in ww-config.js
- **Fixed**: Component now builds successfully with WeWeb CLI
- **Improved**: Component structure and code organization for better maintainability
- **Verified**: All v3.1.1 features now properly functional and stable

### v3.1.1 (June 2025): Enhanced Validation & UX (Build Issues)
- **NEW**: Required field validation for Payment Amount, Payment Type, and Payment Method
- **NEW**: Amount Remaining display with dynamic Supabase calculation
- **NEW**: Enhanced form validation with real-time error messages
- **NEW**: Smart payment limits preventing overpayment
- **NEW**: Visual indicators for required fields (red asterisks)
- **NEW**: Improved date validation logic
- **NEW**: Submit button disabled until form is valid
- **Improved**: Better error handling and user feedback
- **Improved**: Enhanced accessibility and UX
- **Note**: This version had build errors, resolved in v3.1.2

### v3.0.2 (June 2024): Production Ready
- Fixed WeWeb CLI compatibility
- Resolved build errors
- Cleaned up component structure
- Generated production artifacts (dist/manager.js)

### v3.0.1 (June 2024): Documentation Update
- Comprehensive README with setup guides
- Added licensing information
- Improved troubleshooting section

### v3.0.0 (June 2024): Major Update
- Added amount remaining field
- Static vendor data from context
- Enhanced customization options
- Improved Supabase integration

### v2.x.x: Configuration & Styling
- WeWeb editor configuration
- Button styling options
- Basic customization features

### v1.x.x: Initial Release
- Basic payment plan functionality
- Core form features
- Initial Supabase integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

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

Made with ❤️ for the WeWeb community
