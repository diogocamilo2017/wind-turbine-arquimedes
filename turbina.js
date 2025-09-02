// Turbina de Fibonacci - Simulador 3D
// Implementação completa com geometria matemática e cálculos elétricos

class FibonacciTurbine {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.turbineGroup = null;
        this.blades = [];
        this.shaft = null;
        this.motor = null;
        this.controls = null;
        
        // Parâmetros da turbina
        this.params = {
            bladeCount: 5,
            diameter: 100, // em centímetros
            length: 50, // em centímetros
            windSpeed: 87.5, // km/h - calibrado para gerar 60Hz (3600 RPM)
            helixAngle: 45, // graus
            shaftDiameter: 1, // em centímetros
            rotationSpeed: 0.02
        };
        
        // Sequência de Fibonacci
        this.fibonacciSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
        this.goldenAngle = 137.5 * Math.PI / 180; // Ângulo dourado em radianos
        
        // Dados elétricos - Padrão 220V/60Hz
        this.electricData = {
            voltage: 220,
            power: 0,
            current: 0,
            rpm: 3600, // 60Hz = 3600 RPM
            shaftDiameter: 0,
            efficiency: 85
        };
        
        this.animationId = null;
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.setupScene();
        this.setupLighting();
        this.createTurbine();
        this.setupEventListeners();
        this.animate();
        
        // Esconder loading
        setTimeout(() => {
            document.getElementById('loading').style.display = 'none';
        }, 1000);
    }
    
    setupScene() {
        // Cena
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87ceeb);
        this.scene.fog = new THREE.Fog(0x87ceeb, 50, 200);
        
        // Câmera - Posição otimizada para melhor enquadramento
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(-15, 8, 12); // Aproximada para melhor visualização
        this.camera.lookAt(0, 0, 0);
        
        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.2;
        
        document.getElementById('canvas-container').appendChild(this.renderer.domElement);
        
        // Controles de órbita otimizados para vista lateral
        this.setupOrbitControls();
    }
    
    setupOrbitControls() {
        // Implementação básica de controles de mouse
        let isMouseDown = false;
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;
        let currentRotationX = 0;
        let currentRotationY = 0;
        
        this.renderer.domElement.addEventListener('mousedown', (event) => {
            isMouseDown = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
        });
        
        this.renderer.domElement.addEventListener('mousemove', (event) => {
            if (isMouseDown) {
                const deltaX = event.clientX - mouseX;
                const deltaY = event.clientY - mouseY;
                
                targetRotationY += deltaX * 0.01;
                targetRotationX += deltaY * 0.01;
                
                mouseX = event.clientX;
                mouseY = event.clientY;
            }
        });
        
        this.renderer.domElement.addEventListener('mouseup', () => {
            isMouseDown = false;
        });
        
        this.renderer.domElement.addEventListener('wheel', (event) => {
            const zoom = event.deltaY > 0 ? 1.1 : 0.9;
            this.camera.position.multiplyScalar(zoom);
            event.preventDefault();
        });
        
        // Atualizar rotação da câmera
        const updateCamera = () => {
            currentRotationX += (targetRotationX - currentRotationX) * 0.05;
            currentRotationY += (targetRotationY - currentRotationY) * 0.05;
            
            const radius = this.camera.position.length();
            this.camera.position.x = radius * Math.sin(currentRotationY) * Math.cos(currentRotationX);
            this.camera.position.y = radius * Math.sin(currentRotationX);
            this.camera.position.z = radius * Math.cos(currentRotationY) * Math.cos(currentRotationX);
            this.camera.lookAt(0, 0, 0);
            
            requestAnimationFrame(updateCamera);
        };
        updateCamera();
    }
    
    setupLighting() {
        // Luz ambiente
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Luz direcional (sol)
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(50, 50, 50);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        directionalLight.shadow.camera.left = -50;
        directionalLight.shadow.camera.right = 50;
        directionalLight.shadow.camera.top = 50;
        directionalLight.shadow.camera.bottom = -50;
        this.scene.add(directionalLight);
        
        // Luz pontual dourada
        const pointLight = new THREE.PointLight(0xffd700, 0.5, 100);
        pointLight.position.set(0, 20, 0);
        this.scene.add(pointLight);
        
        // Chão
        const groundGeometry = new THREE.PlaneGeometry(200, 200);
        const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x3a5f3a });
        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -10;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }
    
    createTurbine() {
        this.turbineGroup = new THREE.Group();
        this.scene.add(this.turbineGroup);
        
        this.createShaft();
        this.createMotor();
        this.createBlades();
        this.updateElectricCalculations();
    }
    
    createShaft() {
        // Usar diâmetro do eixo definido pelo slider
        const shaftDiameter = this.params.shaftDiameter / 100; // Converter cm para metros
        this.electricData.shaftDiameter = this.params.shaftDiameter; // cm
        
        const lengthM = this.params.length / 100; // Converter cm para metros
        
        const shaftGeometry = new THREE.CylinderGeometry(
            shaftDiameter / 2, shaftDiameter / 2, lengthM, 16
        );
        const shaftMaterial = new THREE.MeshPhongMaterial({
            color: 0x444444,
            shininess: 100,
            specular: 0x222222
        });
        
        if (this.shaft) {
            this.turbineGroup.remove(this.shaft);
        }
        
        this.shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
        this.shaft.rotation.z = Math.PI / 2; // Rotacionar para horizontal
        this.shaft.position.x = lengthM / 2;
        this.shaft.castShadow = true;
        this.shaft.receiveShadow = true;
        this.turbineGroup.add(this.shaft);
    }
    
    createMotor() {
        // Motor de 220V/15kg alinhado horizontalmente com o eixo
        const motorGroup = new THREE.Group();
        
        const lengthM = this.params.length / 100; // Converter cm para metros
        
        // Base do motor (proporcional ao motor de 10cm x 7cm)
        const baseWidth = 0.15; // 15cm de largura
        const baseHeight = 0.02; // 2cm de altura
        const baseDepth = 0.15; // 15cm de profundidade
        const baseGeometry = new THREE.BoxGeometry(baseWidth, baseHeight, baseDepth);
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x2c2c2c });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(-lengthM/2 - 0.1, -baseHeight/2, 0);
        base.castShadow = true;
        motorGroup.add(base);
        
        // Corpo do motor (10cm diâmetro x 7cm comprimento)
        const motorRadius = 0.05; // 5cm de raio = 10cm de diâmetro
        const motorLength = 0.07; // 7cm de comprimento
        const motorGeometry = new THREE.CylinderGeometry(motorRadius, motorRadius, motorLength, 16);
        const motorMaterial = new THREE.MeshPhongMaterial({ color: 0x1a1a1a });
        const motorBody = new THREE.Mesh(motorGeometry, motorMaterial);
        motorBody.rotation.z = Math.PI / 2; // Alinhar horizontalmente
        motorBody.position.set(-lengthM/2 - 0.1, 0, 0);
        motorBody.castShadow = true;
        motorGroup.add(motorBody);
        
        // Etiqueta do motor
        const labelGeometry = new THREE.PlaneGeometry(2, 0.5);
        const labelMaterial = new THREE.MeshBasicMaterial({ color: 0xffd700 });
        const label = new THREE.Mesh(labelGeometry, labelMaterial);
        label.position.set(0, -lengthM / 2 - 2, 1.3);
        motorGroup.add(label);
        
        if (this.motor) {
            this.turbineGroup.remove(this.motor);
        }
        
        this.motor = motorGroup;
        this.turbineGroup.add(this.motor);
    }
    
    createBlades() {
        // Remover pás existentes
        this.blades.forEach(blade => {
            this.turbineGroup.remove(blade);
        });
        this.blades = [];
        
        // Criar hélices helicoidais no estilo Turbina Arquimedes (360º)
        const lengthM = this.params.length / 100; // Converter cm para metros
        const diameterM = this.params.diameter / 100; // converter cm para m
        const radius = diameterM / 2;
        
        // Número de hélices baseado no slider
        const numHelices = this.params.bladeCount;
        
        for (let helixIndex = 0; helixIndex < numHelices; helixIndex++) {
            // Offset angular para cada hélice (distribuição uniforme)
            const helixOffset = (helixIndex / numHelices) * Math.PI * 2;
            
            // Criar geometria helicoidal usando pontos para curva suave
            const points = [];
            const segments = 150; // Alta resolução para suavidade máxima
            const turns = 2.5; // Número otimizado de voltas para melhor captura do vento
            
            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                const x = (t - 0.5) * lengthM; // Posição ao longo do eixo horizontal
                const angle = helixOffset + t * turns * Math.PI * 2; // Ângulo helicoidal
                
                // Variação do raio para criar formato mais aerodinâmico
                // Perfil otimizado para turbinas Arquimedes
                const radiusVariation = radius * (0.8 + 0.2 * Math.cos(t * Math.PI * 2));
                
                const y = Math.cos(angle) * radiusVariation;
                const z = Math.sin(angle) * radiusVariation;
                
                points.push(new THREE.Vector3(x, y, z));
            }
            
            // Criar curva suave a partir dos pontos
            const curve = new THREE.CatmullRomCurve3(points);
            
            // Criar geometria de tubo para hélice suave
            const tubeRadius = diameterM * 0.025; // Espessura otimizada da pá
            const tubularSegments = 120; // Mais segmentos para suavidade
            const radialSegments = 12; // Mais detalhes radiais
            
            const tubeGeometry = new THREE.TubeGeometry(
                curve, 
                tubularSegments, 
                tubeRadius, 
                radialSegments, 
                false
            );
            
            // Material com cores diferentes para cada hélice
            const colors = [0x4CAF50, 0x2196F3, 0xFF9800]; // Verde, Azul, Laranja
            const helixMaterial = new THREE.MeshPhongMaterial({ 
                color: colors[helixIndex],
                shininess: 80,
                transparent: true,
                opacity: 0.9,
                side: THREE.DoubleSide
            });
            
            const helixMesh = new THREE.Mesh(tubeGeometry, helixMaterial);
            
            helixMesh.castShadow = true;
            helixMesh.receiveShadow = true;
            
            this.blades.push(helixMesh);
            this.turbineGroup.add(helixMesh);
            
            // Adicionar pás laterais para melhor captura do vento
            const bladeSections = 30; // Mais seções para distribuição uniforme
            for (let section = 0; section < bladeSections; section++) {
                const t = section / bladeSections;
                const point = curve.getPoint(t);
                const tangent = curve.getTangent(t).normalize();
                
                // Criar pá lateral com dimensões otimizadas
                const bladeWidth = diameterM * 0.12; // Largura otimizada
                const bladeHeight = diameterM * 0.08; // Altura aumentada para melhor captura
                const bladeThickness = 0.008; // Espessura ligeiramente maior
                
                const bladeGeometry = new THREE.BoxGeometry(
                    bladeThickness, bladeWidth, bladeHeight
                );
                
                const bladeMaterial = new THREE.MeshPhongMaterial({ 
                    color: colors[helixIndex],
                    shininess: 60,
                    transparent: true,
                    opacity: 0.7
                });
                
                const bladeMesh = new THREE.Mesh(bladeGeometry, bladeMaterial);
                
                // Posicionar pá na curva
                bladeMesh.position.copy(point);
                
                // Orientar pá perpendicular à curva
                const normal = new THREE.Vector3(0, 1, 0);
                const binormal = new THREE.Vector3().crossVectors(tangent, normal).normalize();
                
                // Criar matriz de rotação
                const matrix = new THREE.Matrix4();
                matrix.makeBasis(tangent, binormal, normal);
                bladeMesh.setRotationFromMatrix(matrix);
                
                // Adicionar inclinação otimizada para captura do vento
                // Ângulo variável ao longo da hélice para melhor aerodinâmica
                const optimalAngle = Math.PI / 6 + (t * Math.PI / 12);
                bladeMesh.rotation.z += optimalAngle;
                
                bladeMesh.castShadow = true;
                bladeMesh.receiveShadow = true;
                
                this.blades.push(bladeMesh);
                this.turbineGroup.add(bladeMesh);
            }
        }
    }
    
    createFibonacciBlade(index) {
        const bladeGroup = new THREE.Group();
        
        // Ângulo baseado na sequência de Fibonacci e ângulo dourado
        const fibIndex = index % this.fibonacciSequence.length;
        const baseAngle = index * this.goldenAngle;
        const fibonacciRadius = this.fibonacciSequence[fibIndex] * 0.1;
        
        // Criar geometria da pá usando espiral de Fibonacci
        const points = [];
        const segments = 50;
        
        for (let j = 0; j <= segments; j++) {
            const t = j / segments;
            const angle = baseAngle + t * this.params.helixAngle * Math.PI / 180;
            const diameterM = this.params.diameter / 100; // converter cm para m
            const radius = (diameterM / 2) * (0.3 + 0.7 * t);
            const height = (t - 0.5) * lengthM;
            
            // Aplicar espiral de Fibonacci
            const spiralAngle = t * 4 * Math.PI + baseAngle;
            const spiralRadius = fibonacciRadius * Math.sqrt(t);
            
            const x = (radius + spiralRadius * Math.cos(spiralAngle)) * Math.cos(angle);
            const z = (radius + spiralRadius * Math.cos(spiralAngle)) * Math.sin(angle);
            const y = height + spiralRadius * Math.sin(spiralAngle) * 0.5;
            
            points.push(new THREE.Vector3(x, y, z));
        }
        
        // Criar geometria da pá
        const bladeGeometry = new THREE.BufferGeometry();
        const vertices = [];
        const indices = [];
        const normals = [];
        const uvs = [];
        
        // Criar superfície da pá
        const width = 0.5;
        for (let j = 0; j < points.length - 1; j++) {
            const p1 = points[j];
            const p2 = points[j + 1];
            
            // Calcular normal
            const direction = new THREE.Vector3().subVectors(p2, p1).normalize();
            const normal = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
            
            // Vértices da seção
            const v1 = p1.clone().add(normal.clone().multiplyScalar(width));
            const v2 = p1.clone().add(normal.clone().multiplyScalar(-width));
            const v3 = p2.clone().add(normal.clone().multiplyScalar(width));
            const v4 = p2.clone().add(normal.clone().multiplyScalar(-width));
            
            // Adicionar vértices
            vertices.push(v1.x, v1.y, v1.z);
            vertices.push(v2.x, v2.y, v2.z);
            vertices.push(v3.x, v3.y, v3.z);
            vertices.push(v4.x, v4.y, v4.z);
            
            // Adicionar normais
            const faceNormal = new THREE.Vector3().crossVectors(
                new THREE.Vector3().subVectors(v3, v1),
                new THREE.Vector3().subVectors(v2, v1)
            ).normalize();
            
            for (let k = 0; k < 4; k++) {
                normals.push(faceNormal.x, faceNormal.y, faceNormal.z);
            }
            
            // Adicionar UVs
            const u = j / (points.length - 1);
            uvs.push(u, 0, u, 1, u + 1/(points.length-1), 0, u + 1/(points.length-1), 1);
            
            // Adicionar índices
            const base = j * 4;
            indices.push(base, base + 1, base + 2);
            indices.push(base + 1, base + 3, base + 2);
        }
        
        bladeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        bladeGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
        bladeGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
        bladeGeometry.setIndex(indices);
        
        // Material da pá com cores baseadas na proporção áurea
        const hue = (index * this.goldenAngle) % (2 * Math.PI) / (2 * Math.PI);
        const color = new THREE.Color().setHSL(hue, 0.7, 0.6);
        
        const bladeMaterial = new THREE.MeshPhongMaterial({
            color: color,
            shininess: 30,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide
        });
        
        const bladeMesh = new THREE.Mesh(bladeGeometry, bladeMaterial);
        bladeMesh.castShadow = true;
        bladeMesh.receiveShadow = true;
        
        bladeGroup.add(bladeMesh);
        
        return bladeGroup;
    }
    
    calculateElectricalOutput() {
        const lengthM = this.params.length / 100; // Converter cm para metros
        const diameterM = this.params.diameter / 100; // converter cm para m
        const area = Math.PI * Math.pow(diameterM / 2, 2);
        const airDensity = 1.225; // kg/m³
        const windSpeedMs = this.params.windSpeed / 3.6; // converter km/h para m/s
        
        // Se não há vento, todos os valores elétricos devem ser zero
        if (this.params.windSpeed === 0 || windSpeedMs === 0) {
            this.electricData.voltage = 0;
            this.electricData.power = 0;
            this.electricData.current = 0;
            this.electricData.rpm = 0;
            this.params.rotationSpeed = 0;
            return 0; // Sem torque
        }
        
        // Coeficiente de potência (Cp) baseado no número de pás
        // Turbinas com mais pás capturam mais energia mas têm mais arrasto
        const Cp = Math.min(0.45, 0.25 + (this.params.bladeCount * 0.025)); // Máximo teórico ~0.45
        
        // Fórmula completa de potência: P = 0.5 × ρ × A × V³ × Cp
        const windPower = 0.5 * airDensity * area * Math.pow(windSpeedMs, 3) / 1000; // kW
        const power = windPower * Cp; // Aplicar coeficiente de potência diretamente
        
        // Cálculo do RPM baseado na velocidade do vento e diâmetro
        const tipSpeedRatio = 6; // Relação típica para turbinas eólicas
        const rpm = (windSpeedMs * tipSpeedRatio * 60) / (Math.PI * diameterM);
        
        // Cálculos elétricos baseados no RPM - Padrão 220V/60Hz
        const baseVoltage = 220; // Voltagem nominal
        const nominalRPM = 3600; // RPM nominal para 220V (60Hz)
        const frequency = rpm / 60;
        
        // Voltagem proporcional ao RPM com limite mínimo
        let voltage = rpm > 500 ? (baseVoltage * (rpm / nominalRPM)) : 0; // Mínimo 500 RPM
        
        // Cálculo da corrente com fator de potência
        const powerFactor = 0.9; // Fator de potência típico
        const maxCurrent = 100; // Limite máximo de corrente (100A)
        let current = power > 0 && voltage > 0 ? (power * 1000 / (voltage * powerFactor)) : 0;
        current = Math.min(current, maxCurrent); // Limitar corrente máxima
        
        // Velocidade de rotação para animação
        this.params.rotationSpeed = rpm / 3000; // Normalizado para animação
        
        // Atualizar dados
        this.electricData.voltage = voltage;
        this.electricData.power = power;
        this.electricData.current = current;
        this.electricData.rpm = rpm;
        this.electricData.frequency = frequency;
        this.electricData.sweepArea = area; // Área de varredura em m²
        
        return power * 1000 / (rpm * 2 * Math.PI / 60); // Nm
    }
    
    updateElectricCalculations() {
        this.calculateElectricalOutput();
        this.updateElectricDisplay();
    }
    
    updateElectricDisplay() {
        // Atualizar displays dos valores elétricos
        document.getElementById('voltage').textContent = `${this.electricData.voltage.toFixed(1)} V`;
        document.getElementById('power').textContent = `${this.electricData.power.toFixed(1)} kW`;
        document.getElementById('current').textContent = `${this.electricData.current.toFixed(1)} A`;
        document.getElementById('rpm').textContent = `${this.electricData.rpm.toFixed(0)}`;
        document.getElementById('frequency').textContent = `${this.electricData.frequency.toFixed(1)} Hz`;
        document.getElementById('sweep-area').textContent = `${this.electricData.sweepArea.toFixed(1)} m²`;
        document.getElementById('shaft-diameter').textContent = `${this.electricData.shaftDiameter.toFixed(1)} cm`;
        
        // Eficiência deve ser zero se não há vento
        const efficiency = this.params.windSpeed === 0 ? 0 : (this.electricData.efficiency * Math.min(1.0, 0.6 + (this.params.bladeCount * 0.05)));
        document.getElementById('efficiency').textContent = `${efficiency.toFixed(0)}%`;
    }
    
    setupEventListeners() {
        // Sliders
        const sliders = {
            'blades': (value) => {
                this.params.bladeCount = parseInt(value);
                document.getElementById('blades-value').textContent = value;
                this.createBlades();
                this.updateFibonacciDisplay();
            },
            'diameter': (value) => {
                this.params.diameter = parseFloat(value);
                document.getElementById('diameter-value').textContent = value + ' cm';
                this.createBlades();
                this.createShaft();
                this.updateElectricCalculations();
            },
            'length': (value) => {
                this.params.length = parseFloat(value);
                document.getElementById('length-value').textContent = value + ' cm';
                this.createShaft();
                this.createMotor();
                this.createBlades();
                this.updateElectricCalculations();
            },
            'wind-speed': (value) => {
                this.params.windSpeed = parseInt(value);
                document.getElementById('wind-speed-value').textContent = value;
                this.updateElectricCalculations();
            },
            'helix-angle': (value) => {
                this.params.helixAngle = parseInt(value);
                document.getElementById('helix-angle-value').textContent = value;
                this.createBlades();
            },
            'shaft-diameter': (value) => {
                this.params.shaftDiameter = parseFloat(value);
                document.getElementById('shaft-diameter-value').textContent = value;
                this.createShaft();
                this.updateElectricCalculations();
            }
        };
        
        Object.keys(sliders).forEach(id => {
            const slider = document.getElementById(id);
            slider.addEventListener('input', (e) => {
                sliders[id](e.target.value);
            });
        });
        
        // Redimensionamento da janela
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        this.updateFibonacciDisplay();
    }
    
    updateFibonacciDisplay() {
        const sequence = this.fibonacciSequence.slice(0, this.params.bladeCount + 2).join(', ');
        document.getElementById('fibonacci-sequence').textContent = sequence + '...';
    }
    
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());
        
        // Atualizar cálculos elétricos em tempo real
        this.updateElectricDisplay();
        
        // Rotacionar turbina
        if (this.turbineGroup && this.params.windSpeed > 0) {
            this.turbineGroup.rotation.x += this.params.rotationSpeed;
        }
        
        // Renderizar
        this.renderer.render(this.scene, this.camera);
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Inicializar aplicação quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
    const turbine = new FibonacciTurbine();
    
    // Disponibilizar globalmente para debug
    window.turbine = turbine;
});