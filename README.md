# Payment Plan Component v3.0.1

A comprehensive WeWeb custom component for creating and managing payment plans with vendors. Features dynamic form fields, Supabase integration, and extensive customization options.

## 🚀 Features

### Core Functionality
- **Payment Plan Creation**: Create immediate, historical, or scheduled payments
- **Dynamic Calculations**: Real-time remaining balance calculations
- **Vendor Integration**: Static vendor data pulled from context
- **Multiple Payment Types**: Support for various payment methods (Check, ACH, Wire, Venmo, etc.)
- **Date Handling**: Smart date validation for historical and future payments

### New in v3.0.x
- ✅ **Amount Remaining Field**: Fully editable field with JavaScript binding support
- ✅ **Static Vendor Data**: Auto-populated from parent component context
- ✅ **Enhanced Customization**: All labels, buttons, and styling now editable
- ✅ **Improved Supabase Integration**: Direct API calls + workflow fallback
- ✅ **Better Mobile Responsiveness**: Optimized for all screen sizes
- ✅ **Comprehensive Documentation**: Professional README and setup guides

## 📋 Requirements

- **WeWeb**: Latest version
- **Vue.js**: 3.x (handled by WeWeb)
- **Supabase** (optional): For direct database integration
- **Node.js**: 16+ (for development)

## 🛠 Installation

### Option 1: Clone from GitHub
```bash
git clone https://github.com/jessa256/payment-plan-component.git
cd payment-plan-component
npm install
```

### Option 2: Add to Existing WeWeb Project
1. Download or clone this repository
2. Copy the component files to your WeWeb project's custom components directory
3. Import and register in your WeWeb project

## ⚙️ Configuration

### Static Vendor Data
The component automatically pulls vendor information from the parent component's context. Set these bindings in WeWeb:

| Field | Binding |
|-------|---------|
| **Vendor ID** | `context.component?.props?.vendorData?.id` |
| **Vendor Name** | `context.component?.props?.vendorData?.vendor_name` |
| **Quoted Amount** | `context.component?.props?.vendorData?.quoted_amount` |

### Supabase Integration

#### Option A: Direct Integration
Configure in component settings:
```javascript
supabaseUrl: 'https://your-project.supabase.co'
supabaseKey: 'your-anon-key'
tableName: 'payment_plans'
```

#### Option B: Workflow Integration (Recommended)
1. Create a WeWeb workflow
2. Set trigger to "Component Event"
3. Listen for `payment-plan-created` event
4. Add Supabase insert action

### Database Schema
```sql
CREATE TABLE payment_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id TEXT NOT NULL,
  invoice_reference TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_amount DECIMAL(10,2) NOT NULL,
  amount_remaining DECIMAL(10,2),
  payment_type TEXT NOT NULL CHECK (payment_type IN ('immediate', 'historical', 'scheduled')),
  payment_date DATE,
  payment_method TEXT NOT NULL,
  payment_reference TEXT,
  notes TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'paid', 'cancelled')),
  calculated_remaining_balance DECIMAL(10,2),
  is_fully_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 🎨 Customization

### Editable Content
All text and labels can be customized in the WeWeb editor:

#### Form Labels
- Invoice/Reference Label & Placeholder
- Payment Amount Label
- Amount Remaining Label, Placeholder & Helper Text
- Payment Type Labels (Immediate, Historical, Scheduled)
- Payment Method Labels
- Notes Label & Placeholder

#### Button Text
- Trigger Button Text
- Cancel Button Text
- Submit Button Variations (by payment type)
- Processing Text

#### Styling Options
- Button colors, sizes, and border radius
- Form input styling and focus colors
- Balance info background and borders
- Label colors and typography

### JavaScript Binding
The **Amount Remaining** field supports full JavaScript binding in WeWeb:

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

### `payment-popup-opened`
Triggered when the payment popup opens.
```javascript
{
  action: 'popup_opened',
  vendor_id: 'string',
  vendor_name: 'string'
}
```

### `payment-plan-created`
Triggered when a payment plan is successfully created.
```javascript
{
  action: 'create_payment_plan',
  data: {
    vendor_id: 'string',
    invoice_reference: 'string',
    total_amount: 1400.00,
    payment_amount: 500.00,
    amount_remaining: 900.00,
    payment_type: 'immediate|historical|scheduled',
    payment_date: '2024-06-14',
    payment_method: 'check|ach|wire|etc',
    payment_reference: 'string',
    notes: 'string',
    status: 'paid|scheduled',
    calculated_remaining_balance: 900.00,
    is_fully_paid: false,
    created_at: '2024-06-14T10:30:00Z'
  },
  vendor_id: 'string',
  vendor_name: 'string',
  amount: 500.00,
  type: 'immediate',
  is_fully_paid: false,
  supabase_result: {
    success: true,
    method: 'direct|workflow|none'
  }
}
```

## 🔧 Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests (if available)
npm test
```

### File Structure
```
payment-plan-component/
├── src/
│   └── wwElement.vue          # Main component file
├── ww-config.js              # WeWeb configuration
├── package.json              # Package configuration
├── README.md                 # This file
└── .gitignore               # Git ignore rules
```

## 🐛 Troubleshooting

### Common Issues

**Component not appearing in WeWeb:**
- Ensure component is properly imported
- Check WeWeb console for errors
- Verify component registration in WeWeb

**Static vendor data not loading:**
- Verify parent component is passing `vendorData` prop
- Check context bindings are correct
- Ensure vendor data exists in parent context

**Supabase integration failing:**
- Verify Supabase URL and key are correct
- Check table exists with proper schema
- Ensure API permissions allow inserts
- Check browser network tab for API errors

**Styling not applying:**
- Clear browser cache
- Check WeWeb editor for style conflicts
- Verify CSS selectors are not being overridden

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

### Version History
- **v3.0.1** (June 2024): Documentation update with comprehensive README, setup guides, and licensing
- **v3.0.0** (June 2024): Major update - Added amount remaining field, static vendor data from context, enhanced customization options, improved Supabase integration
- **v2.x.x**: WeWeb editor configuration and button styling options  
- **v1.x.x**: Initial release with basic payment plan functionality

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

---

**Made with ❤️ for the WeWeb community**# Payment Plan Component v3.0

A comprehensive WeWeb custom component for creating and managing payment plans with vendors. Features dynamic form fields, Supabase integration, and extensive customization options.

## 🚀 Features

### Core Functionality
- **Payment Plan Creation**: Create immediate, historical, or scheduled payments
- **Dynamic Calculations**: Real-time remaining balance calculations
- **Vendor Integration**: Static vendor data pulled from context
- **Multiple Payment Types**: Support for various payment methods (Check, ACH, Wire, Venmo, etc.)
- **Date Handling**: Smart date validation for historical and future payments

### New in v3.0
- ✅ **Amount Remaining Field**: Fully editable field with JavaScript binding support
- ✅ **Static Vendor Data**: Auto-populated from parent component context
- ✅ **Enhanced Customization**: All labels, buttons, and styling now editable
- ✅ **Improved Supabase Integration**: Direct API calls + workflow fallback
- ✅ **Better Mobile Responsiveness**: Optimized for all screen sizes

## 📋 Requirements

- **WeWeb**: Latest version
- **Vue.js**: 3.x (handled by WeWeb)
- **Supabase** (optional): For direct database integration
- **Node.js**: 16+ (for development)

## 🛠 Installation

### Option 1: Clone from GitHub
```bash
git clone https://github.com/jessa256/payment-plan-component.git
cd payment-plan-component
npm install
```

### Option 2: Add to Existing WeWeb Project
1. Download or clone this repository
2. Copy the component files to your WeWeb project's custom components directory
3. Import and register in your WeWeb project

## ⚙️ Configuration

### Static Vendor Data
The component automatically pulls vendor information from the parent component's context. Set these bindings in WeWeb:

| Field | Binding |
|-------|---------|
| **Vendor ID** | `context.component?.props?.vendorData?.id` |
| **Vendor Name** | `context.component?.props?.vendorData?.vendor_name` |
| **Quoted Amount** | `context.component?.props?.vendorData?.quoted_amount` |

### Supabase Integration

#### Option A: Direct Integration
Configure in component settings:
```javascript
supabaseUrl: 'https://your-project.supabase.co'
supabaseKey: 'your-anon-key'
tableName: 'payment_plans'
```

#### Option B: Workflow Integration (Recommended)
1. Create a WeWeb workflow
2. Set trigger to "Component Event"
3. Listen for `payment-plan-created` event
4. Add Supabase insert action

### Database Schema
```sql
CREATE TABLE payment_plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vendor_id TEXT NOT NULL,
  invoice_reference TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_amount DECIMAL(10,2) NOT NULL,
  amount_remaining DECIMAL(10,2),
  payment_type TEXT NOT NULL CHECK (payment_type IN ('immediate', 'historical', 'scheduled')),
  payment_date DATE,
  payment_method TEXT NOT NULL,
  payment_reference TEXT,
  notes TEXT,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'paid', 'cancelled')),
  calculated_remaining_balance DECIMAL(10,2),
  is_fully_paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

## 🎨 Customization

### Editable Content
All text and labels can be customized in the WeWeb editor:

#### Form Labels
- Invoice/Reference Label & Placeholder
- Payment Amount Label
- Amount Remaining Label, Placeholder & Helper Text
- Payment Type Labels (Immediate, Historical, Scheduled)
- Payment Method Labels
- Notes Label & Placeholder

#### Button Text
- Trigger Button Text
- Cancel Button Text
- Submit Button Variations (by payment type)
- Processing Text

#### Styling Options
- Button colors, sizes, and border radius
- Form input styling and focus colors
- Balance info background and borders
- Label colors and typography

### JavaScript Binding
The **Amount Remaining** field supports full JavaScript binding in WeWeb:

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

### `payment-popup-opened`
Triggered when the payment popup opens.
```javascript
{
  action: 'popup_opened',
  vendor_id: 'string',
  vendor_name: 'string'
}
```

### `payment-plan-created`
Triggered when a payment plan is successfully created.
```javascript
{
  action: 'create_payment_plan',
  data: {
    vendor_id: 'string',
    invoice_reference: 'string',
    total_amount: 1400.00,
    payment_amount: 500.00,
    amount_remaining: 900.00,
    payment_type: 'immediate|historical|scheduled',
    payment_date: '2024-06-14',
    payment_method: 'check|ach|wire|etc',
    payment_reference: 'string',
    notes: 'string',
    status: 'paid|scheduled',
    calculated_remaining_balance: 900.00,
    is_fully_paid: false,
    created_at: '2024-06-14T10:30:00Z'
  },
  vendor_id: 'string',
  vendor_name: 'string',
  amount: 500.00,
  type: 'immediate',
  is_fully_paid: false,
  supabase_result: {
    success: true,
    method: 'direct|workflow|none'
  }
}
```

## 🔧 Development

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests (if available)
npm test
```

### File Structure
```
payment-plan-component/
├── src/
│   └── wwElement.vue          # Main component file
├── ww-config.js              # WeWeb configuration
├── package.json              # Package configuration
├── README.md                 # This file
└── .gitignore               # Git ignore rules
```

## 🐛 Troubleshooting

### Common Issues

**Component not appearing in WeWeb:**
- Ensure component is properly imported
- Check WeWeb console for errors
- Verify component registration in WeWeb

**Static vendor data not loading:**
- Verify parent component is passing `vendorData` prop
- Check context bindings are correct
- Ensure vendor data exists in parent context

**Supabase integration failing:**
- Verify Supabase URL and key are correct
- Check table exists with proper schema
- Ensure API permissions allow inserts
- Check browser network tab for API errors

**Styling not applying:**
- Clear browser cache
- Check WeWeb editor for style conflicts
- Verify CSS selectors are not being overridden

### Debug Mode
Enable debug logging by adding to browser console:
```javascript
localStorage.setItem('paymentPlanDebug', 'true');
```

## 📈 Roadmap

### Planned Features
- [ ] Recurring payment support
- [ ] Payment status tracking
- [ ] Email notifications
- [ ] PDF invoice generation
- [ ] Multi-currency support
- [ ] Payment approval workflow
- [ ] Bulk payment operations

### Version History
- **v3.0.0**: Added amount remaining field, static vendor data, enhanced customization
- **v2.0.0**: Added WeWeb editor configuration and button styling options
- **v1.0.0**: Initial release with basic payment plan functionality

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
- **Email**: your-email@example.com

## 🙏 Acknowledgments

- WeWeb team for the excellent no-code platform
- Supabase team for the backend infrastructure
- Vue.js community for the reactive framework

---

**Made with ❤️ for the WeWeb community**
