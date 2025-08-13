// Machine Configuration System
// Contains all machine-specific data and configurations

const MACHINE_CONFIG = {
    "GARANT": {
        name: "GARANT",
        productionType: "SEY AK",
        barcode: "GAR001",
        defaultMaterials: {
            TSG: { 
                unit: "kg", 
                default: "20 (400)", 
                description: "Tobacco Shredded Grade",
                validation: "number"
            },
            "TSG REJECT": { 
                unit: "kg", 
                default: "-", 
                description: "TSG Reject Material",
                validation: "optional"
            },
            FILTER: { 
                unit: "T", 
                default: "1+1.25 + 19T (59)", 
                description: "Filter Material",
                validation: "text"
            },
            AMBRI: { 
                unit: "Roll", 
                default: "1,2575 Roll (23.75)", 
                description: "Ambri Material",
                validation: "text"
            },
            CTP: { 
                unit: "Roll", 
                default: "0.75+29 (11.95)", 
                description: "CTP Material",
                validation: "text"
            }
        },
        wasteTypes: [
            { name: "WASTE BATANG", unit: "Kg", default: "40.15" },
            { name: "WASTE RAJANG", unit: "Kg", default: "17" },
            { name: "WASTE AMBRI / FILTER", unit: "Kg", default: "8" },
            { name: "WOL / DEBU", unit: "Kg", default: "15" },
            { name: "SPARATOR", unit: "Kg", default: "0.15" }
        ],
        trayCalculation: { 
            unit: "TREY", 
            multiplier: 7.10,
            description: "1 Trey = 7.10 kg"
        },
        defaultResult: "87 TREY 617.7 (1 Trey = 7.10)"
    },
    
    "HILED": {
        name: "HILED",
        productionType: "SKY KUCK",
        barcode: "HIL002",
        defaultMaterials: {
            TSG: { 
                unit: "kg", 
                default: "15 (200)", 
                description: "Tobacco Shredded Grade",
                validation: "number"
            },
            "TSG REJECT": { 
                unit: "kg", 
                default: "-", 
                description: "TSG Reject Material",
                validation: "optional"
            },
            FILTER: { 
                unit: "kg", 
                default: "11 (42.35)", 
                description: "Filter Material",
                validation: "text"
            },
            AMBRI: { 
                unit: "Roll", 
                default: "3.05 + 3R / 16.55", 
                description: "Ambri Material",
                validation: "text"
            },
            CTP: { 
                unit: "Roll", 
                default: "4.20 + 1R / 9.8", 
                description: "CTP Material",
                validation: "text"
            }
        },
        wasteTypes: [
            { name: "WASTE BATANG", unit: "Kg", default: "14" },
            { name: "WASTE RAJANG", unit: "Kg", default: "5" },
            { name: "WASTE AMBRI / FILTER", unit: "Kg", default: "4" },
            { name: "WOL / DEBU", unit: "Kg", default: "5" },
            { name: "SPARATOR", unit: "Kg", default: "0" }
        ],
        trayCalculation: { 
            unit: "TREY", 
            multiplier: 7.0,
            description: "1 Trey = 7 kg"
        },
        defaultResult: "67 TREY I TRAY = 7 kg (469 kg)"
    },
    
    "JARANT": {
        name: "JARANT",
        productionType: "Sky Click",
        barcode: "JAR003",
        defaultMaterials: {
            TSG: { 
                unit: "Sak", 
                default: "20 Sak (400)", 
                description: "Tobacco Shredded Grade",
                validation: "text"
            },
            "TSG REJECT": { 
                unit: "kg", 
                default: "-", 
                description: "TSG Reject Material",
                validation: "optional"
            },
            FILTER: { 
                unit: "T", 
                default: "15T (57.75)", 
                description: "Filter Material",
                validation: "text"
            },
            AMBRI: { 
                unit: "Roll", 
                default: "2.85+5R (25.35)", 
                description: "Ambri Material",
                validation: "text"
            },
            CTP: { 
                unit: "Roll", 
                default: "2.70 + 2R (13.9)", 
                description: "CTP Material",
                validation: "text"
            }
        },
        wasteTypes: [
            { name: "WASTE BATANG", unit: "Kg", default: "29" },
            { name: "WASTE RAJANG", unit: "Kg", default: "7" },
            { name: "WASTE AMBRI / FILTER", unit: "Kg", default: "5" },
            { name: "WOL / DEBU", unit: "Kg", default: "12" },
            { name: "SPARATOR", unit: "Kg", default: "" }
        ],
        trayCalculation: { 
            unit: "TREY", 
            multiplier: 7.10,
            description: "1 TRE 7.10"
        },
        defaultResult: "82 TREY 1 TRE 7.10 (582.2)"
    },
    
    "FMC8": {
        name: "FMC 8",
        productionType: "Soy Click",
        barcode: "FMC004",
        defaultMaterials: {
            TSG: { 
                unit: "sak", 
                default: "15 sak", 
                description: "Tobacco Shredded Grade",
                validation: "text"
            },
            "TSG REJECT": { 
                unit: "kg", 
                default: "-", 
                description: "TSG Reject Material",
                validation: "optional"
            },
            FILTER: { 
                unit: "Trey", 
                default: "11.Trey + 3,15 (95,5)", 
                description: "Filter Material",
                validation: "text"
            },
            AMBRI: { 
                unit: "Roll", 
                default: "3R + 1.70 (15.2)", 
                description: "Ambri Material",
                validation: "text"
            },
            CTP: { 
                unit: "Roll", 
                default: "1R + 2.65 (R.25)", 
                description: "CTP Material",
                validation: "text"
            }
        },
        wasteTypes: [
            { name: "WASTE BATANG", unit: "Kg", default: "18.20" },
            { name: "WASTE RAJANG", unit: "Kg", default: "4" },
            { name: "WASTE AMBRI / FILTER", unit: "Kg", default: "5.20" },
            { name: "WOL / DEBU", unit: "Kg", default: "6" },
            { name: "SPARATOR", unit: "Kg", default: "" }
        ],
        trayCalculation: { 
            unit: "TREY", 
            multiplier: 7.0,
            description: "1 The 7-"
        },
        defaultResult: "61 TREY 427 (1 The 7-)"
    }
};

// Barcode to Machine Mapping
const BARCODE_MAPPING = {
    "GAR001": "GARANT",
    "HIL002": "HILED", 
    "JAR003": "JARANT",
    "FMC004": "FMC8"
};

// Machine Utility Functions
class MachineConfig {
    static getMachineByBarcode(barcode) {
        return BARCODE_MAPPING[barcode] || null;
    }
    
    static getMachineConfig(machineName) {
        return MACHINE_CONFIG[machineName] || null;
    }
    
    static getAllMachines() {
        return Object.keys(MACHINE_CONFIG);
    }
    
    static getMachinePreview(machineName) {
        const config = this.getMachineConfig(machineName);
        if (!config) return null;
        
        return {
            name: config.name,
            productionType: config.productionType,
            materials: Object.entries(config.defaultMaterials).slice(0, 2).map(([key, value]) => ({
                name: key,
                default: value.default
            }))
        };
    }
    
    static calculateSisa(masuk, keluar) {
        if (!masuk || masuk === '-' || !keluar || keluar === '-') {
            return '-';
        }
        
        // Extract numbers from complex strings like "20 (400)" or "1+1.25 + 19T (59)"
        const masukNum = this.extractNumber(masuk);
        const keluarNum = this.extractNumber(keluar);
        
        if (masukNum === null || keluarNum === null) {
            return '-';
        }
        
        const sisa = masukNum - keluarNum;
        return sisa > 0 ? sisa.toFixed(2) : '-';
    }
    
    static extractNumber(str) {
        if (!str || str === '-') return null;
        
        // Try to extract numbers from various formats
        const matches = str.match(/(\d+(?:\.\d+)?)/g);
        if (matches && matches.length > 0) {
            // Return the first number found
            return parseFloat(matches[0]);
        }
        
        return null;
    }
    
    static calculateResult(materials, wasteData, machineConfig) {
        // Calculate total waste
        const totalWaste = wasteData.reduce((sum, waste) => {
            const value = parseFloat(waste.value) || 0;
            return sum + value;
        }, 0);
        
        // Calculate total material input
        const totalInput = Object.values(materials).reduce((sum, material) => {
            const value = this.extractNumber(material.masuk) || 0;
            return sum + value;
        }, 0);
        
        // Calculate production (input - waste)
        const production = totalInput - totalWaste;
        
        // Calculate trays
        const trays = Math.floor(production / machineConfig.trayCalculation.multiplier);
        const totalKg = (trays * machineConfig.trayCalculation.multiplier).toFixed(1);
        
        return `${trays} ${machineConfig.trayCalculation.unit} ${totalKg} (${machineConfig.trayCalculation.description})`;
    }
    
    static validateMaterialInput(input, validation) {
        switch (validation) {
            case 'number':
                return /^\d+(\.\d+)?$/.test(input) || input === '-';
            case 'text':
                return input.length > 0;
            case 'optional':
                return true;
            default:
                return true;
        }
    }
    
    static formatDate() {
        const now = new Date();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayName = days[now.getDay()];
        const date = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        
        return `${dayName} ${date}/${month}/${year}`;
    }
    
    static getShift() {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 14) return "1 Pagi";
        if (hour >= 14 && hour < 22) return "2 Siang";
        return "3 Malam";
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MACHINE_CONFIG, BARCODE_MAPPING, MachineConfig };
} 