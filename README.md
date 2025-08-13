# CV. DELTA TOBACCO CIGARETTES - Production Form System

A modern HTML5 web application for managing production forms in tobacco cigarette manufacturing, optimized for tablet landscape mode with barcode scanning capabilities.

## 🚀 Features

### Core Functionality
- **Barcode Scanner**: Scan machine barcodes to auto-detect machine type
- **Dynamic Forms**: Generate forms based on machine configuration
- **Real-time Calculations**: Auto-calculate SISA (remaining) and production results
- **Data Persistence**: Save forms locally with localStorage
- **Print Support**: Print-friendly form layouts
- **Responsive Design**: Optimized for tablet landscape mode

### Machine Types Supported
1. **GARANT** - SEY AK Production
2. **HILED** - SKY KUCK Production  
3. **JARANT** - Sky Click Production
4. **FMC 8** - Soy Click Production

### Form Sections
- Production Information (Date, Shift, Machine, Operator)
- Material Input/Output Table (TSG, Filter, Ambri, CTP)
- Waste Data Collection
- Production Results Calculation
- Notes and Part Replacement Tracking
- Digital Signatures

## 📁 Project Structure

```
mock/
├── index.html              # Main application entry point
├── css/
│   ├── style.css           # Base styles and layout
│   ├── scanner.css         # Barcode scanner styles
│   ├── forms.css           # Production form styles
│   └── responsive.css      # Responsive design rules
├── js/
│   ├── app.js              # Main application controller
│   ├── machine-config.js   # Machine configurations and utilities
│   ├── scanner.js          # Barcode scanner functionality
│   └── form-handlers.js    # Form generation and data handling
├── data/                   # Data storage directory
├── assets/
│   └── images/             # Image assets
└── README.md               # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Modern web browser with ES6+ support
- Camera access for barcode scanning
- Local web server (for camera access)

### Quick Start
1. Clone or download the project
2. Start a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```
3. Open `http://localhost:8000` in your browser
4. Allow camera access when prompted

### Development Setup
1. Open the project in your preferred code editor
2. Make changes to HTML, CSS, or JavaScript files
3. Refresh the browser to see changes
4. Use browser developer tools for debugging

## 🎯 Usage Guide

### 1. Application Flow
```
Splash Screen → Barcode Scanner → Machine Selection → Production Form → Success
```

### 2. Barcode Scanning
- Click "Start Scanner" to activate camera
- Point camera at machine barcode
- System will auto-detect machine type
- Use "Manual Input" if scanning fails

### 3. Form Filling
- Production info is auto-filled based on machine type
- Enter operator name and team members
- Fill in material input/output data
- Waste data is pre-filled with defaults
- Results are calculated automatically

### 4. Data Management
- Forms are saved locally in browser
- Print forms using browser print function
- Export data in JSON/CSV format
- Reset forms to start over

## 🔧 Configuration

### Machine Configuration
Edit `js/machine-config.js` to modify:
- Machine types and barcodes
- Default material values
- Waste types and defaults
- Calculation formulas

### Barcode Mapping
```javascript
const BARCODE_MAPPING = {
    "GAR001": "GARANT",
    "HIL002": "HILED", 
    "JAR003": "JARANT",
    "FMC004": "FMC8"
};
```

### Form Customization
- Modify CSS files for styling changes
- Update form structure in `form-handlers.js`
- Add new form fields as needed

## 📱 Responsive Design

### Tablet Landscape (1024px+)
- Full two-column layout
- Optimized spacing and typography
- Touch-friendly input sizes

### Tablet Portrait (768px-1023px)
- Single column layout
- Adjusted spacing
- Maintained readability

### Mobile (up to 767px)
- Stacked layout
- Larger touch targets
- Simplified navigation

## 🔍 Debugging & Development

### Debug Mode
When running on localhost, debug tools are available:
```javascript
// Access debug tools in browser console
window.debug.logAppState()      // Log current app state
window.debug.logSavedForms()    // Log saved form data
window.debug.clearAllData()     // Clear all local data
window.debug.simulateBarcode('GAR001')  // Simulate barcode scan
```

### Browser Console
- Check for JavaScript errors
- Monitor form data changes
- Test machine configurations

### Local Storage
- Forms are saved in localStorage
- Access via browser dev tools
- Clear data for testing

## 🎨 Customization

### Styling
- Modify `css/style.css` for base styles
- Update `css/forms.css` for form-specific styling
- Adjust `css/responsive.css` for breakpoints

### Functionality
- Add new machine types in `machine-config.js`
- Modify calculation logic in `MachineConfig` class
- Extend form validation in `FormHandler` class

### Data Export
- Implement PDF generation with jsPDF
- Add Excel export functionality
- Connect to backend API for data sync

## 🚨 Browser Compatibility

### Supported Browsers
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Required Features
- ES6+ JavaScript support
- localStorage API
- getUserMedia API (camera access)
- Canvas API
- Fetch API

## 📊 Data Structure

### Form Data Format
```javascript
{
  machine: "GARANT",
  machineConfig: {...},
  materials: {
    TSG: { masuk: "20 (400)", keluar: "20 (900)", sisa: "-" },
    FILTER: { masuk: "1+1.25 + 19T (59)", keluar: "19+1.21-(55.16)", sisa: "1 (3,85)" }
  },
  waste: {
    "WASTE BATANG": "40.15",
    "WASTE RAJANG": "17"
  },
  productionInfo: {
    tanggal: "Selasa 29/7/2025",
    shift: "1 Pagi",
    operator: "WAHYUDI"
  },
  notes: {
    keterangan: "...",
    partDiganti: "..."
  },
  timestamp: "2025-07-29T10:30:00.000Z",
  formId: "form_1732878600000_abc123"
}
```

## 🔐 Security Considerations

### Local Storage
- Data is stored locally in browser
- No server-side data transmission
- Clear sensitive data when needed

### Camera Access
- Requires user permission
- HTTPS required for production
- Fallback to manual input available

## 🚀 Future Enhancements

### Planned Features
- [ ] Real barcode detection with ZXing/QuaggaJS
- [ ] PDF generation with jsPDF
- [ ] Data synchronization with backend
- [ ] User authentication system
- [ ] Advanced reporting and analytics
- [ ] Offline mode with Service Workers
- [ ] Multi-language support
- [ ] Dark mode theme

### Technical Improvements
- [ ] Progressive Web App (PWA) features
- [ ] WebAssembly for performance
- [ ] Real-time collaboration
- [ ] Advanced form validation
- [ ] Data backup and restore

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is developed for CV. DELTA TOBACCO CIGARETTES internal use.

## 📞 Support

For technical support or questions:
- Check browser console for errors
- Verify camera permissions
- Test with different browsers
- Review machine configurations

---

**Version**: 1.0.0  
**Last Updated**: July 2025  
**Target Platform**: Tablet Landscape Mode 