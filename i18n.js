// Sistema de Internacionalização - Fibonacci Turbine Simulator
class I18n {
    constructor() {
        this.currentLanguage = 'pt';
        this.translations = {
            pt: {
                // Título e cabeçalhos
                title: 'Turbina de Fibonacci - Simulador 3D',
                controls: 'Controles',
                electricalGeneration: 'Geração Elétrica',
                mechanicalStructure: 'Estrutura Mecânica',
                fibonacciInfo: 'Informações de Fibonacci',
                
                // Controles
                blades: 'Número de Pás',
                diameter: 'Diâmetro (m)',
                length: 'Comprimento (m)',
                windSpeed: 'Velocidade do Vento (km/h)',
                helicalAngle: 'Ângulo Helicoidal (°)',
                
                // Geração Elétrica
                voltage: 'Tensão',
                power: 'Potência',
                current: 'Corrente',
                rpm: 'RPM',
                frequency: 'Frequência',
                sweepArea: 'Área de Varredura',
                shaftDiameter: 'Diâmetro do Eixo',
                motorForce: 'Força do Motor',
                efficiency: 'Eficiência',
                
                // Estrutura Mecânica
                totalMass: 'Massa Total',
                momentInertia: 'Momento de Inércia',
                centerMass: 'Centro de Massa',
                structuralStress: 'Tensão Estrutural',
                
                // Fibonacci
                sequence: 'Sequência de Fibonacci',
                goldenRatio: 'Razão Áurea (φ)',
                goldenAngle: 'Ângulo Áureo',
                
                // Controles de ajuda
                controlsHelp: 'Controles',
                dragToRotate: '🖱️ Arraste para rotacionar',
                scrollToZoom: '🔍 Scroll para zoom',
                autoAnimation: '⚡ Animação automática',
                helixAngle: 'Ângulo Helicoidal (°)',
                
                // Unidades
                volts: 'V',
                watts: 'W',
                amperes: 'A',
                hertz: 'Hz',
                squareMeters: 'm²',
                meters: 'm',
                newtons: 'N',
                percent: '%',
                kilograms: 'kg',
                kgSquareMeters: 'kg⋅m²',
                pascals: 'Pa'
            },
            
            en: {
                // Title and headers
                title: 'Fibonacci Turbine - 3D Simulator',
                controls: 'Controls',
                electricalGeneration: 'Electrical Generation',
                mechanicalStructure: 'Mechanical Structure',
                fibonacciInfo: 'Fibonacci Information',
                
                // Controls
                blades: 'Number of Blades',
                diameter: 'Diameter (m)',
                length: 'Length (m)',
                windSpeed: 'Wind Speed (km/h)',
                helicalAngle: 'Helical Angle (°)',
                
                // Electrical Generation
                voltage: 'Voltage',
                power: 'Power',
                current: 'Current',
                rpm: 'RPM',
                frequency: 'Frequency',
                sweepArea: 'Sweep Area',
                shaftDiameter: 'Shaft Diameter',
                motorForce: 'Motor Force',
                efficiency: 'Efficiency',
                
                // Mechanical Structure
                totalMass: 'Total Mass',
                momentInertia: 'Moment of Inertia',
                centerMass: 'Center of Mass',
                structuralStress: 'Structural Stress',
                
                // Fibonacci
                sequence: 'Fibonacci Sequence',
                goldenRatio: 'Golden Ratio (φ)',
                goldenAngle: 'Golden Angle',
                
                // Help controls
                controlsHelp: 'Controls',
                dragToRotate: '🖱️ Drag to rotate',
                scrollToZoom: '🔍 Scroll to zoom',
                autoAnimation: '⚡ Auto animation',
                helixAngle: 'Helical Angle (°)',
                
                // Units
                volts: 'V',
                watts: 'W',
                amperes: 'A',
                hertz: 'Hz',
                squareMeters: 'm²',
                meters: 'm',
                newtons: 'N',
                percent: '%',
                kilograms: 'kg',
                kgSquareMeters: 'kg⋅m²',
                pascals: 'Pa'
            },
            
            es: {
                // Título y encabezados
                title: 'Turbina de Fibonacci - Simulador 3D',
                controls: 'Controles',
                electricalGeneration: 'Generación Eléctrica',
                mechanicalStructure: 'Estructura Mecánica',
                fibonacciInfo: 'Información de Fibonacci',
                
                // Controles
                blades: 'Número de Palas',
                diameter: 'Diámetro (m)',
                length: 'Longitud (m)',
                windSpeed: 'Velocidad del Viento (km/h)',
                helicalAngle: 'Ángulo Helicoidal (°)',
                
                // Generación Eléctrica
                voltage: 'Voltaje',
                power: 'Potencia',
                current: 'Corriente',
                rpm: 'RPM',
                frequency: 'Frecuencia',
                sweepArea: 'Área de Barrido',
                shaftDiameter: 'Diámetro del Eje',
                motorForce: 'Fuerza del Motor',
                efficiency: 'Eficiencia',
                
                // Estructura Mecánica
                totalMass: 'Masa Total',
                momentInertia: 'Momento de Inercia',
                centerMass: 'Centro de Masa',
                structuralStress: 'Tensión Estructural',
                
                // Fibonacci
                sequence: 'Secuencia de Fibonacci',
                goldenRatio: 'Razón Áurea (φ)',
                goldenAngle: 'Ángulo Áureo',
                
                // Controles de ayuda
                controlsHelp: 'Controles',
                dragToRotate: '🖱️ Arrastra para rotar',
                scrollToZoom: '🔍 Scroll para zoom',
                autoAnimation: '⚡ Animación automática',
                helixAngle: 'Ángulo Helicoidal (°)',
                
                // Unidades
                volts: 'V',
                watts: 'W',
                amperes: 'A',
                hertz: 'Hz',
                squareMeters: 'm²',
                meters: 'm',
                newtons: 'N',
                percent: '%',
                kilograms: 'kg',
                kgSquareMeters: 'kg⋅m²',
                pascals: 'Pa'
            }
        };
    }
    
    // Obter tradução
    t(key) {
        return this.translations[this.currentLanguage][key] || key;
    }
    
    // Mudar idioma
    setLanguage(lang) {
        if (this.translations[lang]) {
            this.currentLanguage = lang;
            this.updateInterface();
            localStorage.setItem('turbine-language', lang);
        }
    }
    
    // Obter idioma atual
    getCurrentLanguage() {
        return this.currentLanguage;
    }
    
    // Carregar idioma salvo
    loadSavedLanguage() {
        const saved = localStorage.getItem('turbine-language');
        if (saved && this.translations[saved]) {
            this.currentLanguage = saved;
        }
    }
    
    // Atualizar interface
    updateInterface() {
        // Atualizar título da página
        document.title = this.t('title');
        
        // Atualizar elementos com data-i18n
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        // Atualizar placeholders e labels específicos
        this.updateSpecificElements();
    }
    
    // Atualizar elementos específicos
    updateSpecificElements() {
        // Atualizar labels dos controles
        const controlLabels = {
            'blades-label': 'blades',
            'diameter-label': 'diameter',
            'length-label': 'length',
            'wind-speed-label': 'windSpeed',
            'helical-angle-label': 'helicalAngle'
        };
        
        Object.entries(controlLabels).forEach(([id, key]) => {
            const element = document.getElementById(id);
            if (element) element.textContent = this.t(key);
        });
    }
}

// Instância global
const i18n = new I18n();