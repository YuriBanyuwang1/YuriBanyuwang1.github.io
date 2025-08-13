// Form Handlers
// Manages dynamic form generation, data handling, and calculations

class FormHandler {
    constructor() {
        this.currentMachine = null;
        this.formData = {};
        this.isCalculating = false;
        
        this.initializeFormHandler();
    }
    
    initializeFormHandler() {
        // Make FormHandler globally accessible
        window.FormHandler = this;
        
        // Bind event listeners for success screen
        document.getElementById('print-form').addEventListener('click', () => {
            this.printForm();
        });
        
        document.getElementById('new-form').addEventListener('click', () => {
            this.startNewForm();
        });
    }
    
    generateForm(machineName) {
        this.currentMachine = machineName;
        const machineConfig = MachineConfig.getMachineConfig(machineName);
        
        if (!machineConfig) {
            console.error('Machine configuration not found:', machineName);
            return;
        }
        
        // Hide other screens
        this.hideAllScreens();
        
        // Show form container
        const formContainer = document.getElementById('form-container');
        formContainer.classList.add('active');
        
        // Generate form HTML
        const formHTML = this.createFormHTML(machineConfig);
        document.querySelector('.form-wrapper').innerHTML = formHTML;
        
        // Initialize form data
        this.initializeFormData(machineConfig);
        
        // Bind form events
        this.bindFormEvents();
        
        // Pre-fill with default values
        this.prefillForm(machineConfig);
        
        // Auto-calculate initial values
        this.calculateAllSisa();
        this.calculateResult();
    }
    
    createFormHTML(machineConfig) {
        return `
            <!-- Header -->
            <div class="form-header">
                <h1>MAKER</h1>
                <h2>CV. DELTA TOBACCO CIGARETTES</h2>
            </div>
            
            <!-- Production Info -->
            <div class="production-info">
                <div class="production-info-left">
                    <div class="field-group">
                        <label>HARI/TANGGAL:</label>
                        <input type="text" id="tanggal" class="handwritten" value="${MachineConfig.formatDate()}">
                    </div>
                    <div class="field-group">
                        <label>SHIFT:</label>
                        <input type="text" id="shift" class="handwritten" value="${MachineConfig.getShift()}">
                    </div>
                    <div class="field-group">
                        <label>MESIN:</label>
                        <input type="text" id="mesin" class="handwritten" value="${machineConfig.name}" readonly>
                    </div>
                    <div class="field-group">
                        <label>PRODUKSI:</label>
                        <input type="text" id="produksi" class="handwritten" value="${machineConfig.productionType}" readonly>
                    </div>
                </div>
                <div class="production-info-right">
                    <div class="field-group">
                        <label>OPERATOR:</label>
                        <input type="text" id="operator" class="handwritten" placeholder="Enter operator name">
                    </div>
                    <div class="names-list">
                        <label>NAMA:</label>
                        <div class="name-item">
                            <span>1.</span>
                            <input type="text" id="nama1" class="handwritten" placeholder="Name 1">
                        </div>
                        <div class="name-item">
                            <span>2.</span>
                            <input type="text" id="nama2" class="handwritten" placeholder="Name 2">
                        </div>
                        <div class="name-item">
                            <span>3.</span>
                            <input type="text" id="nama3" class="handwritten" placeholder="Name 3">
                        </div>
                        <div class="name-item">
                            <span>4.</span>
                            <input type="text" id="nama4" class="handwritten" placeholder="Name 4">
                        </div>
                        <div class="name-item">
                            <span>5.</span>
                            <input type="text" id="nama5" class="handwritten" placeholder="Name 5">
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Material Table -->
            <div class="material-table">
                <table>
                    <thead>
                        <tr>
                            <th>BAHAN</th>
                            <th>MASUK</th>
                            <th>KELUAR</th>
                            <th>SISA</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.generateMaterialRows(machineConfig)}
                    </tbody>
                </table>
            </div>
            
            <!-- Waste Section -->
            <div class="waste-section">
                <h3>WASTE DATA</h3>
                <div class="waste-grid">
                    ${this.generateWasteItems(machineConfig)}
                </div>
            </div>
            
            <!-- Result Section -->
            <div class="result-section">
                <div class="field-group">
                    <label>HASIL:</label>
                    <input type="text" id="hasil" class="handwritten" readonly>
                </div>
            </div>
            
            <!-- Notes Section -->
            <div class="notes-section">
                <div class="field-group">
                    <label>KETERANGAN:</label>
                    <textarea id="keterangan" class="handwritten" placeholder="Enter remarks..."></textarea>
                </div>
                <div class="field-group">
                    <label>PART YANG DIGANTI:</label>
                    <textarea id="part-diganti" class="handwritten" placeholder="Enter replaced parts..."></textarea>
                </div>
            </div>
            
            <!-- Signature Section -->
            <div class="signature-section">
                <div class="signature-box">
                    <label>Diajukan Oleh:</label>
                    <div class="signature-line"></div>
                    <span>(Operator)</span>
                </div>
                <div class="signature-box">
                    <label>Menyetujui:</label>
                    <div class="signature-line"></div>
                    <span>(Kepala Produksi)</span>
                </div>
            </div>
            
            <!-- Form Footer -->
            <div class="form-footer">
                <span>${new Date().toLocaleDateString('id-ID')}</span>
                <span>Sentul</span>
                <span>Kecamatan Tanggulangin</span>
                <span>Kabupaten Sidoarjo</span>
                <span>Jawa Timur</span>
            </div>
            
            <!-- Form Actions -->
            <div class="form-actions">
                <button class="btn-primary" onclick="formHandler.saveForm()">Save Form</button>
                <button class="btn-secondary" onclick="formHandler.resetForm()">Reset</button>
                <button class="btn-secondary" onclick="formHandler.backToScanner()">Back to Scanner</button>
            </div>
        `;
    }
    
    generateMaterialRows(machineConfig) {
        let rows = '';
        
        Object.entries(machineConfig.defaultMaterials).forEach(([materialName, config]) => {
            rows += `
                <tr>
                    <td>${materialName}</td>
                    <td>
                        <input type="text" 
                               id="masuk_${materialName}" 
                               class="handwritten material-input" 
                               data-material="${materialName}"
                               data-field="masuk"
                               value="${config.default}">
                    </td>
                    <td>
                        <input type="text" 
                               id="keluar_${materialName}" 
                               class="handwritten material-input" 
                               data-material="${materialName}"
                               data-field="keluar"
                               value="">
                    </td>
                    <td>
                        <input type="text" 
                               id="sisa_${materialName}" 
                               class="handwritten sisa-field" 
                               data-material="${materialName}"
                               readonly>
                    </td>
                </tr>
            `;
        });
        
        return rows;
    }
    
    generateWasteItems(machineConfig) {
        let items = '';
        
        machineConfig.wasteTypes.forEach(waste => {
            items += `
                <div class="waste-item">
                    <label>${waste.name}:</label>
                    <input type="text" 
                           id="waste_${waste.name.replace(/\s+/g, '_')}" 
                           class="handwritten waste-input"
                           data-waste="${waste.name}"
                           value="${waste.default}">
                    <span>${waste.unit}</span>
                </div>
            `;
        });
        
        return items;
    }
    
    initializeFormData(machineConfig) {
        this.formData = {
            machine: this.currentMachine,
            machineConfig: machineConfig,
            materials: {},
            waste: {},
            productionInfo: {},
            notes: {}
        };
        
        // Initialize materials data
        Object.keys(machineConfig.defaultMaterials).forEach(materialName => {
            this.formData.materials[materialName] = {
                masuk: '',
                keluar: '',
                sisa: ''
            };
        });
        
        // Initialize waste data
        machineConfig.wasteTypes.forEach(waste => {
            this.formData.waste[waste.name] = waste.default;
        });
    }
    
    bindFormEvents() {
        // Material input events
        document.querySelectorAll('.material-input').forEach(input => {
            input.addEventListener('input', (e) => {
                this.handleMaterialInput(e);
            });
            
            input.addEventListener('blur', (e) => {
                this.calculateSisa(e.target.dataset.material);
            });
        });
        
        // Waste input events
        document.querySelectorAll('.waste-input').forEach(input => {
            input.addEventListener('input', (e) => {
                this.handleWasteInput(e);
            });
            
            input.addEventListener('blur', () => {
                this.calculateResult();
            });
        });
        
        // Production info events
        document.querySelectorAll('#tanggal, #shift, #operator, #nama1, #nama2, #nama3, #nama4, #nama5').forEach(input => {
            input.addEventListener('input', (e) => {
                this.handleProductionInfoInput(e);
            });
        });
        
        // Notes events
        document.querySelectorAll('#keterangan, #part-diganti').forEach(textarea => {
            textarea.addEventListener('input', (e) => {
                this.handleNotesInput(e);
            });
        });
    }
    
    prefillForm(machineConfig) {
        // Pre-fill material inputs with default values
        Object.entries(machineConfig.defaultMaterials).forEach(([materialName, config]) => {
            const masukInput = document.getElementById(`masuk_${materialName}`);
            if (masukInput) {
                masukInput.value = config.default;
                this.formData.materials[materialName].masuk = config.default;
            }
        });
        
        // Pre-fill waste inputs with default values
        machineConfig.wasteTypes.forEach(waste => {
            const wasteInput = document.getElementById(`waste_${waste.name.replace(/\s+/g, '_')}`);
            if (wasteInput) {
                wasteInput.value = waste.default;
                this.formData.waste[waste.name] = waste.default;
            }
        });
        
        // Pre-fill result with default
        const hasilInput = document.getElementById('hasil');
        if (hasilInput) {
            hasilInput.value = machineConfig.defaultResult;
        }
    }
    
    handleMaterialInput(event) {
        const materialName = event.target.dataset.material;
        const field = event.target.dataset.field;
        const value = event.target.value;
        
        this.formData.materials[materialName][field] = value;
        
        // Auto-calculate SISA when both MASUK and KELUAR are filled
        if (this.formData.materials[materialName].masuk && this.formData.materials[materialName].keluar) {
            this.calculateSisa(materialName);
        }
    }
    
    handleWasteInput(event) {
        const wasteName = event.target.dataset.waste;
        const value = event.target.value;
        
        this.formData.waste[wasteName] = value;
    }
    
    handleProductionInfoInput(event) {
        const fieldName = event.target.id;
        const value = event.target.value;
        
        this.formData.productionInfo[fieldName] = value;
    }
    
    handleNotesInput(event) {
        const fieldName = event.target.id;
        const value = event.target.value;
        
        this.formData.notes[fieldName] = value;
    }
    
    calculateSisa(materialName) {
        const masuk = this.formData.materials[materialName].masuk;
        const keluar = this.formData.materials[materialName].keluar;
        
        const sisa = MachineConfig.calculateSisa(masuk, keluar);
        
        // Update form data
        this.formData.materials[materialName].sisa = sisa;
        
        // Update UI
        const sisaInput = document.getElementById(`sisa_${materialName}`);
        if (sisaInput) {
            sisaInput.value = sisa;
        }
        
        // Recalculate result
        this.calculateResult();
    }
    
    calculateAllSisa() {
        Object.keys(this.formData.materials).forEach(materialName => {
            this.calculateSisa(materialName);
        });
    }
    
    calculateResult() {
        if (this.isCalculating) return;
        
        this.isCalculating = true;
        
        try {
            // Convert waste data to array format for calculation
            const wasteData = Object.entries(this.formData.waste).map(([name, value]) => ({
                name: name,
                value: value
            }));
            
            const result = MachineConfig.calculateResult(
                this.formData.materials, 
                wasteData, 
                this.formData.machineConfig
            );
            
            // Update result field
            const hasilInput = document.getElementById('hasil');
            if (hasilInput) {
                hasilInput.value = result;
            }
            
        } catch (error) {
            console.error('Error calculating result:', error);
        } finally {
            this.isCalculating = false;
        }
    }
    
    saveForm() {
        // Validate form
        if (!this.validateForm()) {
            return;
        }
        
        // Save to localStorage
        const formDataToSave = {
            ...this.formData,
            timestamp: new Date().toISOString(),
            formId: this.generateFormId()
        };
        
        localStorage.setItem(`form_${formDataToSave.formId}`, JSON.stringify(formDataToSave));
        
        // Show success screen
        this.showSuccessScreen();
    }
    
    validateForm() {
        // Basic validation
        const requiredFields = ['operator'];
        const missingFields = [];
        
        requiredFields.forEach(field => {
            const value = this.formData.productionInfo[field];
            if (!value || value.trim() === '') {
                missingFields.push(field);
            }
        });
        
        if (missingFields.length > 0) {
            alert(`Please fill in the following required fields: ${missingFields.join(', ')}`);
            return false;
        }
        
        return true;
    }
    
    generateFormId() {
        return `form_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
    
    resetForm() {
        if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
            this.prefillForm(this.formData.machineConfig);
            this.calculateAllSisa();
            this.calculateResult();
        }
    }
    
    backToScanner() {
        if (confirm('Are you sure you want to go back? All unsaved data will be lost.')) {
            this.hideAllScreens();
            document.getElementById('scanner-screen').classList.add('active');
            
            // Reset scanner
            if (window.scanner) {
                window.scanner.resetScanner();
            }
        }
    }
    
    showSuccessScreen() {
        this.hideAllScreens();
        document.getElementById('success-screen').classList.add('active');
    }
    
    hideAllScreens() {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
    }
    
    printForm() {
        window.print();
    }
    
    startNewForm() {
        this.hideAllScreens();
        document.getElementById('scanner-screen').classList.add('active');
        
        // Reset scanner
        if (window.scanner) {
            window.scanner.resetScanner();
        }
    }
}

// Initialize form handler when DOM is loaded
let formHandler;
document.addEventListener('DOMContentLoaded', () => {
    formHandler = new FormHandler();
    
    // Make formHandler globally accessible
    window.formHandler = formHandler;
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormHandler;
} 