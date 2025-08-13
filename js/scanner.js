// Barcode Scanner Implementation
// Handles camera access, barcode scanning, and machine detection

class BarcodeScanner {
    constructor() {
        this.video = document.getElementById('scanner-video');
        this.canvas = document.getElementById('scanner-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.isScanning = false;
        this.stream = null;
        this.scanInterval = null;
        this.currentBarcode = '';
        this.scanAttempts = 0;
        this.maxScanAttempts = 10;
        
        this.initializeScanner();
    }
    
    initializeScanner() {
        // Add scanner line animation
        this.addScannerLine();
        
        // Bind event listeners
        document.getElementById('start-scan').addEventListener('click', () => {
            this.startScanning();
        });
        
        document.getElementById('manual-input').addEventListener('click', () => {
            this.showManualInput();
        });
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && this.currentBarcode) {
                this.processBarcode(this.currentBarcode);
            }
        });
    }
    
    addScannerLine() {
        const overlay = document.querySelector('.scanner-overlay');
        const scannerLine = document.createElement('div');
        scannerLine.className = 'scanner-line';
        overlay.appendChild(scannerLine);
    }
    
    async startScanning() {
        try {
            this.updateStatus('Initializing camera...', 'scanning');
            
            // Request camera access
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // Use back camera if available
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            
            this.video.srcObject = this.stream;
            this.video.play();
            
            this.isScanning = true;
            this.updateStatus('Scanning for barcode...', 'scanning');
            
            // Start scanning loop
            this.scanInterval = setInterval(() => {
                this.scanFrame();
            }, 100);
            
        } catch (error) {
            console.error('Camera access error:', error);
            this.updateStatus('Camera access denied. Please use manual input.', 'error');
            this.showManualInput();
        }
    }
    
    stopScanning() {
        this.isScanning = false;
        
        if (this.scanInterval) {
            clearInterval(this.scanInterval);
            this.scanInterval = null;
        }
        
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        this.video.srcObject = null;
    }
    
    scanFrame() {
        if (!this.isScanning || !this.video.videoWidth) return;
        
        // Set canvas dimensions
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        
        // Draw video frame to canvas
        this.ctx.drawImage(this.video, 0, 0);
        
        // Get image data for barcode detection
        const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
        
        // Simple barcode detection (simulated)
        // In a real implementation, you would use a barcode library like ZXing or QuaggaJS
        this.simulateBarcodeDetection(imageData);
    }
    
    simulateBarcodeDetection(imageData) {
        // Simulate barcode detection for demo purposes
        // In real implementation, this would use actual barcode detection algorithms
        
        this.scanAttempts++;
        
        // Simulate finding a barcode after some attempts
        if (this.scanAttempts >= this.maxScanAttempts) {
            const barcodes = ['GAR001', 'HIL002', 'JAR003', 'FMC004'];
            const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
            
            this.processBarcode(randomBarcode);
            return;
        }
        
        // Simulate scanning process
        if (this.scanAttempts % 3 === 0) {
            this.updateStatus(`Scanning... Attempt ${this.scanAttempts}/${this.maxScanAttempts}`, 'scanning');
        }
    }
    
    processBarcode(barcode) {
        this.currentBarcode = barcode;
        this.updateStatus(`Barcode detected: ${barcode}`, 'success');
        
        // Stop scanning
        this.stopScanning();
        
        // Check if barcode maps to a machine
        const machineName = MachineConfig.getMachineByBarcode(barcode);
        
        if (machineName) {
            this.updateStatus(`Machine detected: ${machineName}`, 'success');
            
            // Show success animation
            setTimeout(() => {
                this.showMachineSelection(machineName);
            }, 1500);
        } else {
            this.updateStatus(`Unknown barcode: ${barcode}`, 'error');
            setTimeout(() => {
                this.showManualInput();
            }, 2000);
        }
    }
    
    showMachineSelection(detectedMachine = null) {
        // Hide scanner screen
        document.getElementById('scanner-screen').classList.remove('active');
        
        // Show machine selection screen
        const machineSelectScreen = document.getElementById('machine-select-screen');
        machineSelectScreen.classList.add('active');
        
        // Highlight detected machine if any
        if (detectedMachine) {
            const machineCard = document.querySelector(`[data-machine="${detectedMachine}"]`);
            if (machineCard) {
                machineCard.classList.add('selected');
                
                // Auto-select after a short delay
                setTimeout(() => {
                    this.selectMachine(detectedMachine);
                }, 2000);
            }
        }
        
        // Add click listeners to machine cards
        document.querySelectorAll('.machine-card').forEach(card => {
            card.addEventListener('click', () => {
                const machineName = card.dataset.machine;
                this.selectMachine(machineName);
            });
        });
        
        // Back to scanner button
        document.getElementById('back-to-scanner').addEventListener('click', () => {
            this.backToScanner();
        });
    }
    
    selectMachine(machineName) {
        console.log(`Selected machine: ${machineName}`);
        
        // Store selected machine
        localStorage.setItem('selectedMachine', machineName);
        
        // Hide machine selection screen
        document.getElementById('machine-select-screen').classList.remove('active');
        
        // Show form
        this.showProductionForm(machineName);
    }
    
    showProductionForm(machineName) {
        // This will be handled by form-handlers.js
        if (window.FormHandler) {
            window.FormHandler.generateForm(machineName);
        }
    }
    
    showManualInput() {
        // Create modal for manual input
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Manual Machine Selection</h3>
                <div class="field-group">
                    <label for="manual-barcode">Machine Barcode:</label>
                    <input type="text" id="manual-barcode" placeholder="Enter barcode (e.g., GAR001)">
                </div>
                <div class="field-group">
                    <label for="manual-machine">Or Select Machine:</label>
                    <select id="manual-machine">
                        <option value="">Select a machine...</option>
                        <option value="GARANT">GARANT - SEY AK</option>
                        <option value="HILED">HILED - SKY KUCK</option>
                        <option value="JARANT">JARANT - Sky Click</option>
                        <option value="FMC8">FMC 8 - Soy Click</option>
                    </select>
                </div>
                <div class="modal-actions">
                    <button class="btn-secondary" onclick="this.closest('.modal').remove()">Cancel</button>
                    <button class="btn-primary" onclick="scanner.processManualInput()">Continue</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Focus on input
        setTimeout(() => {
            document.getElementById('manual-barcode').focus();
        }, 100);
        
        // Add enter key listener
        document.getElementById('manual-barcode').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.processManualInput();
            }
        });
        
        document.getElementById('manual-machine').addEventListener('change', (e) => {
            if (e.target.value) {
                document.getElementById('manual-barcode').value = '';
            }
        });
    }
    
    processManualInput() {
        const barcodeInput = document.getElementById('manual-barcode').value.trim();
        const machineSelect = document.getElementById('manual-machine').value;
        
        let machineName = null;
        
        if (barcodeInput) {
            machineName = MachineConfig.getMachineByBarcode(barcodeInput);
            if (!machineName) {
                alert('Invalid barcode. Please check and try again.');
                return;
            }
        } else if (machineSelect) {
            machineName = machineSelect;
        } else {
            alert('Please enter a barcode or select a machine.');
            return;
        }
        
        // Remove modal
        document.querySelector('.modal').remove();
        
        // Process the selection
        this.selectMachine(machineName);
    }
    
    backToScanner() {
        // Hide machine selection screen
        document.getElementById('machine-select-screen').classList.remove('active');
        
        // Show scanner screen
        document.getElementById('scanner-screen').classList.add('active');
        
        // Reset scanner
        this.resetScanner();
    }
    
    resetScanner() {
        this.currentBarcode = '';
        this.scanAttempts = 0;
        this.updateStatus('Ready to scan machine barcode', '');
        
        // Remove selected class from machine cards
        document.querySelectorAll('.machine-card').forEach(card => {
            card.classList.remove('selected');
        });
    }
    
    updateStatus(message, type = '') {
        const statusElement = document.getElementById('scan-status');
        const statusContainer = statusElement.parentElement;
        
        statusElement.textContent = message;
        
        // Remove existing status classes
        statusContainer.className = 'scanner-status';
        
        // Add new status class
        if (type) {
            statusContainer.classList.add(type);
        }
    }
    
    // Utility method to simulate barcode scanning for testing
    simulateScan(barcode) {
        this.processBarcode(barcode);
    }
}

// Initialize scanner when DOM is loaded
let scanner;
document.addEventListener('DOMContentLoaded', () => {
    scanner = new BarcodeScanner();
    
    // Make scanner globally accessible for testing
    window.scanner = scanner;
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BarcodeScanner;
} 