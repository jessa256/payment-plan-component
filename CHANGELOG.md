# Changelog

All notable changes to the Payment Plan Component will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.0] - 2025-06-14

### Fixed
- **BREAKING**: Eliminated all `wwLib.useCreateElement` deprecation warnings
- Resolved Vue 3 compatibility issues with modern WeWeb versions
- Fixed component rendering conflicts in popup environments
- Updated to use modern Vue 3 patterns instead of deprecated WeWeb APIs
- **Hotfix**: Corrected syntax errors in ww-config.js (missing commas after bindable properties)

### Added
- **NEW**: Popup-over-popup architecture with proper z-index layering (z-index: 10000)
- **NEW**: ESC key support for closing popup
- **NEW**: Enhanced modal animations and transitions
- **NEW**: Better mobile responsiveness with improved form layout
- **NEW**: Comprehensive event system for WeWeb workflow integration
- **NEW**: Modal opened/closed events with vendor context
- **NEW**: Enhanced error handling and form validation feedback

### Changed
- **BREAKING**: Component now creates overlay above existing popups instead of replacing them
- Updated component label to v3.2.0 in ww-config.js
- Improved styling for better visual hierarchy in layered popups
- Enhanced button styles with better disabled states
- Modernized component architecture for future WeWeb compatibility

### Technical Improvements
- Migrated from deprecated WeWeb APIs to Vue 3 Composition API patterns
- Improved component lifecycle management with proper cleanup
- Enhanced event emission system for better WeWeb integration
- Added proper keyboard event handling for accessibility
- Optimized CSS for better performance and layering

### Documentation
- Updated README with popup-over-popup usage guide
- Added WeWeb integration examples and workflow setup
- Documented new event system and data structures
- Enhanced troubleshooting section for common popup issues

## [3.1.3] - 2025-06-14

### Fixed
- Resolved all WeWeb CLI compilation and build errors that prevented component from building
- Fixed Vue component structure and removed duplicate script tags
- Cleaned up export statements in ww-config.js to prevent build conflicts
- Component now builds successfully with `npm run build`

### Added
- GitHub integration ready for direct WeWeb import
- Comprehensive release documentation and versioning
- Enhanced package.json with proper repository and metadata
- Production-ready build artifacts in dist/ folder

### Changed
- Updated component label to v3.1.3 in ww-config.js
- Improved file structure and organization for better maintainability
- Enhanced documentation with GitHub import instructions

### Verified
- All v3.1.2 features now fully functional and stable
- Production-ready component with proper build process
- Successfully tested import process for WeWeb

## [3.1.2] - 2025-06-14

### Added
- Required field validation for Payment Amount, Payment Type, and Payment Method
- Amount Remaining display with dynamic Supabase calculation support
- Enhanced form validation with real-time error messages
- Smart payment limits preventing payments exceeding remaining balance
- Visual indicators for required fields (red asterisks)
- Improved date validation logic (historical ≤ today, scheduled ≥ today)
- Submit button disabled until all required fields are valid

### Improved
- Better error handling and user feedback throughout the form
- Enhanced accessibility and user experience
- More robust form validation and error messaging

### Known Issues
- Build errors with WeWeb CLI (resolved in v3.1.3)
- Component compilation issues (resolved in v3.1.3)
- wwLib.useCreateElement deprecation warnings (resolved in v3.2.0)

## [3.0.2] - 2024-06-14

### Fixed
- WeWeb CLI compatibility issues
- Build errors and compilation problems
- Component structure and file organization

### Added
- Production build artifacts (dist/manager.js)
- Comprehensive documentation and setup guides

### Changed
- Cleaned up component structure for better maintainability

## [3.0.1] - 2024-06-14

### Added
- Comprehensive README with detailed setup instructions
- MIT License file
- Enhanced troubleshooting documentation
- Professional project documentation

### Changed
- Improved documentation structure and clarity

## [3.0.0] - 2024-06-14

### Added
- Amount remaining field with full JavaScript binding support
- Static vendor data integration from parent component context
- Enhanced customization options for all labels and styling
- Improved Supabase integration with direct API calls and workflow fallback
- Better mobile responsiveness for all screen sizes
- Production ready component with WeWeb CLI compatibility

### Changed
- Major architectural update to support WeWeb popup integration
- Simplified vendor data flow from parent component context
- Enhanced form validation and user experience

### Removed
- Standalone vendor selection (now uses context from parent)
- Complex Supabase direct integration (simplified to workflow-based)

## [2.x.x] - 2024-05-xx

### Added
- WeWeb editor configuration and customization options
- Button styling and color customization
- Form field label customization
- Basic payment plan functionality

## [1.x.x] - 2024-04-xx

### Added
- Initial release with basic payment plan functionality
- Simple form for payment data collection
- Basic WeWeb integration

---

## Migration Guide

### From v3.1.x to v3.2.0
- **No breaking changes in configuration** - all bindings remain the same
- **Enhanced popup behavior** - component now creates overlay instead of replacement popup
- **Better WeWeb compatibility** - no more deprecation warnings
- **Improved UX** - ESC key support and better animations

### From v3.0.x to v3.1.x
- Add new bindings for `calculatedAmountRemaining`
- Review form validation settings if customized
- Update component version in WeWeb editor

### From v2.x to v3.x
- **Breaking**: Vendor selection removed - now uses parent context
- **Breaking**: Direct Supabase integration simplified to workflow-based
- Update all vendor data bindings to use context instead of dropdown
- Configure WeWeb workflows for payment submission and amount calculation

---

## Support

For questions about specific versions or migration help:
- Create an issue on [GitHub](https://github.com/jessa256/payment-plan-component/issues)
- Email: kjessicaclark1@live.com
- WeWeb Community Discord