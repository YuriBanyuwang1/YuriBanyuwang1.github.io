// Main Application Controller
// Manages overall application flow, initialization, and screen transitions

class ProductionFormApp {
    constructor() {
        this.currentScreen = 'splash';
        this.isInitialized = false;
        this.appData = {
            version: '1.0.0',
            lastUpdate: new Date().toISOString(),
            settings: {}
        };
        
        this.initializeApp();
    }
    
    async initializeApp() {
        try {
            console.log('Initializing Production Form Application...');
            
            // Show splash screen
            this.showScreen('splash');
            
            // Simulate initialization process
            await this.performInitialization();
            
            // Load settings
            this.loadSettings();
            
            // Check for saved machine selection
            this.checkSavedMachine();
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Transition to scanner screen
            setTimeout(() => {
                this.showScreen('scanner');
            }, 2000);
            
        } catch (error) {
            console.error('Initialization error:', error);
            this.showErrorScreen('Failed to initialize application');
        }
    }
    
    async performInitialization() {
        // Simulate loading time
        await this.delay(1500);
        
        // Check browser compatibility
        this.checkBrowserCompatibility();
        
        // Initialize local storage
        this.initializeStorage();
        
        // Load machine configurations
        this.loadMachineConfigurations();
        
        console.log('Application initialized successfully');
    }
    
    checkBrowserCompatibility() {
        const requiredFeatures = [
            'localStorage',
            'getUserMedia',
            'canvas',
            'fetch'
        ];
        
        const missingFeatures = requiredFeatures.filter(feature => {
            switch (feature) {
                case 'localStorage':
                    return !window.localStorage;
                case 'getUserMedia':
                    return !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia;
                case 'canvas':
                    return !document.createElement('canvas').getContext;
                case 'fetch':
                    return !window.fetch;
                default:
                    return false;
            }
        });
        
        if (missingFeatures.length > 0) {
            throw new Error(`Browser missing required features: ${missingFeatures.join(', ')}`);
        }
    }
    
    initializeStorage() {
        try {
            // Test localStorage
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            
            // Initialize app data if not exists
            if (!localStorage.getItem('appData')) {
                localStorage.setItem('appData', JSON.stringify(this.appData));
            }
            
        } catch (error) {
            console.warn('localStorage not available:', error);
        }
    }
    
    loadMachineConfigurations() {
        // Machine configurations are loaded from machine-config.js
        if (typeof MachineConfig === 'undefined') {
            throw new Error('Machine configuration not loaded');
        }
        
        console.log('Machine configurations loaded:', MachineConfig.getAllMachines());
    }
    
    loadSettings() {
        try {
            const savedSettings = localStorage.getItem('appSettings');
            if (savedSettings) {
                this.appData.settings = JSON.parse(savedSettings);
            }
        } catch (error) {
            console.warn('Failed to load settings:', error);
        }
    }
    
    checkSavedMachine() {
        try {
            const savedMachine = localStorage.getItem('selectedMachine');
            if (savedMachine) {
                console.log('Found saved machine selection:', savedMachine);
                // Could auto-select the machine or show it as default
            }
        } catch (error) {
            console.warn('Failed to check saved machine:', error);
        }
    }
    
    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(`${screenName}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenName;
            
            // Trigger screen-specific actions
            this.onScreenChange(screenName);
        } else {
            console.error(`Screen not found: ${screenName}-screen`);
        }
    }
    
    onScreenChange(screenName) {
        switch (screenName) {
            case 'scanner':
                this.onScannerScreen();
                break;
            case 'machine-select':
                this.onMachineSelectScreen();
                break;
            case 'form':
                this.onFormScreen();
                break;
            case 'success':
                this.onSuccessScreen();
                break;
        }
    }
    
    onScannerScreen() {
        console.log('Scanner screen activated');
        // Scanner functionality is handled by BarcodeScanner class
    }
    
    onMachineSelectScreen() {
        console.log('Machine selection screen activated');
        // Machine selection functionality is handled by scanner
    }
    
    onFormScreen() {
        console.log('Form screen activated');
        // Form functionality is handled by FormHandler class
    }
    
    onSuccessScreen() {
        console.log('Success screen activated');
        // Success screen functionality is handled by FormHandler
    }
    
    showErrorScreen(message) {
        // Create error screen
        const errorHTML = `
            <div class="error-content">
                <div class="error-icon">⚠️</div>
                <h2>Application Error</h2>
                <p>${message}</p>
                <button class="btn-primary" onclick="location.reload()">Reload Application</button>
            </div>
        `;
        
        document.getElementById('splash-screen').innerHTML = errorHTML;
    }
    
    // Utility methods
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    // Data management
    saveFormData(formData) {
        try {
            const forms = this.getSavedForms();
            forms.push(formData);
            localStorage.setItem('savedForms', JSON.stringify(forms));
            
            console.log('Form data saved successfully');
            return true;
        } catch (error) {
            console.error('Failed to save form data:', error);
            return false;
        }
    }
    
    getSavedForms() {
        try {
            const saved = localStorage.getItem('savedForms');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error('Failed to get saved forms:', error);
            return [];
        }
    }
    
    clearSavedForms() {
        try {
            localStorage.removeItem('savedForms');
            console.log('Saved forms cleared');
        } catch (error) {
            console.error('Failed to clear saved forms:', error);
        }
    }
    
    // Export functionality
    exportFormData(formData, format = 'json') {
        switch (format) {
            case 'json':
                return this.exportAsJSON(formData);
            case 'csv':
                return this.exportAsCSV(formData);
            case 'pdf':
                return this.exportAsPDF(formData);
            default:
                throw new Error(`Unsupported export format: ${format}`);
        }
    }
    
    exportAsJSON(formData) {
        const dataStr = JSON.stringify(formData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `production_form_${formData.formId}.json`;
        link.click();
    }
    
    exportAsCSV(formData) {
        // Convert form data to CSV format
        const csvData = this.convertToCSV(formData);
        const dataBlob = new Blob([csvData], { type: 'text/csv' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `production_form_${formData.formId}.csv`;
        link.click();
    }
    
    convertToCSV(formData) {
        const rows = [];
        
        // Add header
        rows.push(['Field', 'Value']);
        
        // Add production info
        Object.entries(formData.productionInfo).forEach(([key, value]) => {
            rows.push([key, value]);
        });
        
        // Add materials
        Object.entries(formData.materials).forEach(([material, data]) => {
            rows.push([`${material}_MASUK`, data.masuk]);
            rows.push([`${material}_KELUAR`, data.keluar]);
            rows.push([`${material}_SISA`, data.sisa]);
        });
        
        // Add waste
        Object.entries(formData.waste).forEach(([waste, value]) => {
            rows.push([waste, value]);
        });
        
        // Add notes
        Object.entries(formData.notes).forEach(([note, value]) => {
            rows.push([note, value]);
        });
        
        return rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    }
    
    exportAsPDF(formData) {
        // PDF export would require a PDF library like jsPDF
        // For now, we'll use the browser's print functionality
        window.print();
    }
    
    // Settings management
    saveSettings(settings) {
        try {
            this.appData.settings = { ...this.appData.settings, ...settings };
            localStorage.setItem('appSettings', JSON.stringify(this.appData.settings));
            console.log('Settings saved successfully');
        } catch (error) {
            console.error('Failed to save settings:', error);
        }
    }
    
    getSettings() {
        return this.appData.settings;
    }
    
    // Application state management
    getAppState() {
        return {
            currentScreen: this.currentScreen,
            isInitialized: this.isInitialized,
            appData: this.appData,
            savedFormsCount: this.getSavedForms().length
        };
    }
    
    // Debug and development helpers
    debugMode() {
        return {
            // Add debug information to console
            logAppState: () => console.log('App State:', this.getAppState()),
            logSavedForms: () => console.log('Saved Forms:', this.getSavedForms()),
            logSettings: () => console.log('Settings:', this.getSettings()),
            clearAllData: () => {
                localStorage.clear();
                console.log('All data cleared');
            },
            simulateBarcode: (barcode) => {
                if (window.scanner) {
                    window.scanner.simulateScan(barcode);
                }
            }
        };
    }
}

// Initialize application when DOM is loaded
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new ProductionFormApp();
    
    // Make app globally accessible for debugging
    window.app = app;
    
    // Add debug mode to window for development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.debug = app.debugMode();
        console.log('Debug mode enabled. Use window.debug for debugging tools.');
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Application backgrounded');
    } else {
        console.log('Application foregrounded');
    }
});

// Handle beforeunload event
window.addEventListener('beforeunload', (e) => {
    // Check if there's unsaved data
    if (window.formHandler && window.formHandler.formData) {
        const hasData = Object.values(window.formHandler.formData.materials).some(material => 
            material.masuk || material.keluar
        );
        
        if (hasData) {
            e.preventDefault();
            e.returnValue = 'You have unsaved data. Are you sure you want to leave?';
        }
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductionFormApp;
} 