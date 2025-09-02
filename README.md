# Fibonacci Turbine - 3D Simulator

An interactive 3D wind turbine simulator based on the Fibonacci sequence, developed with Three.js and complete internationalization system.

## 🌟 Main Features

### Fibonacci Geometry
- **Fibonacci Helix**: Blades follow the Fibonacci sequence (1, 1, 2, 3, 5, 8, 13, 21...)
- **Golden Angle**: Uses the golden angle (137.5°) for optimized blade positioning
- **Golden Ratio**: Based on the φ (phi) ratio = 1.618...

### Interactive Controls
- **Number of Blades**: 1-8 adjustable blades
- **Diameter**: Configurable in centimeters
- **Length**: Adjustable in centimeters
- **Wind Speed**: 0-200 km/h with automatic conversion to m/s
- **Helical Angle**: 0°-90° for aerodynamic optimization

### 🌍 Internationalization System
- **Portuguese (PT)**: Default language 🇧🇷
- **English (EN)**: Complete translation 🇺🇸
- **Spanish (ES)**: Complete translation 🇪🇸
- **Language Selector**: Instant interface switching
- **Persistence**: Language automatically saved in browser

### Advanced Features
- **3D Rotation**: Complete 360° visualization
- **Interactive Zoom**: Smooth zoom in and out
- **Realistic Animation**: Rotation based on wind speed
- **Dynamic Lighting**: Realistic light and shadow effects
- **Physical Calculations**: Real-time energy generation simulation
- **Responsive Interface**: Adaptable to different screen sizes

### 🎨 Visual Improvements
- **High Contrast**: Text with shadows for better readability
- **Golden Gradients**: Interface with colors based on golden ratio
- **Optimized Typography**: Fonts with weight and shadows for clarity
- **Harmonic Colors**: Palette based on Fibonacci sequence

### 📊 Calculated Technical Data

#### Electrical Generation
- **Voltage**: Proportional to RPM (220V × RPM/3600)
- **Power**: Complete formula P = 0.5 × ρ × A × V³ × Cp
- **Current**: Calculated by I = P/V
- **RPM**: Based on wind speed and turbine characteristics
- **Efficiency**: Variable power coefficient (Cp) based on number of blades
- **Sweep Area**: Calculated based on real diameter
- **Air Density**: 1.225 kg/m³ (standard conditions)

#### Mechanical Structure
- **Total Mass**: Calculated based on material and dimensions
- **Moment of Inertia**: For rotational stability analysis
- **Center of Mass**: Gravitational center positioning
- **Structural Stress**: Material resistance analysis

## 🚀 How to Use

### Installation
1. **Clone or download** the project files
2. **Open the `index.html` file** in a modern browser
3. **Wait for loading** of Three.js libraries

### Interface Controls
1. **Language Selector**: Choose between PT 🇧🇷, EN 🇺🇸 or ES 🇪🇸
2. **Adjust parameters** on the left side:
   - Modify the number of blades (1-8)
   - Change dimensions (diameter and length)
   - Adjust wind speed (0-200 km/h)
   - Configure helical angle (0-90°)
3. **Interact with 3D visualization**:
   - 🖱️ Drag with mouse to rotate view
   - 🔍 Use scroll to zoom
   - ⚡ Observe automatic turbine animation
4. **Monitor data** on the right panel:
   - Real-time electrical generation
   - Mechanical structure information
   - Fibonacci sequence data

### Special Features
- **Persistence**: Your language settings are automatically saved
- **Responsiveness**: Interface adaptable to different screen sizes
- **Realistic Calculations**: Precise physical formulas for simulation

## 🎯 Educational Objectives

### Mathematics
- **Fibonacci Sequence**: Practical application of Fibonacci numbers
- **Golden Ratio**: Visual demonstration of φ ratio = 1.618...
- **Spatial Geometry**: Conversion of 2D spirals into 3D structures
- **Trigonometry**: Angle calculations and positioning

### Engineering
- **Aerodynamics**: Wind energy capture principles
- **Electrical Engineering**: Energy generation and conversion
- **Mechanics**: Analysis of forces, torque and rotation
- **Optimized Design**: Application of golden ratio in engineering

### Physics
- **Kinetic Energy**: Conversion of air movement into energy
- **Angular Momentum**: Principles of rotation and inertia
- **Energy Efficiency**: Optimization of energy capture

## 🔬 Practical Applications

### Education
- **Mathematics**: Visual demonstration of Fibonacci sequence
- **Physics**: Renewable energy principles
- **Engineering**: Turbine design and optimization
- **Sustainability**: Clean energy education
- **Languages**: Multilingual interface for international education

### Research
- **Biomimetics**: Study of natural patterns applied to technology
- **Optimization**: Efficiency analysis based on mathematical proportions
- **Simulation**: Virtual testing of different configurations
- **Visualization**: 3D representation of complex concepts

## 💻 Technical Specifications

### Compatibility
- **Browsers**: Chrome, Firefox, Safari, Edge (recent versions)
- **Devices**: Desktop, tablet, smartphone
- **Technologies**: HTML5, CSS3, JavaScript ES6+, Three.js
- **Requirements**: WebGL support for 3D rendering

### Project Files
- `index.html` - Main interface
- `turbina.js` - Simulation logic and 3D rendering
- `i18n.js` - Internationalization system
- `README.md` - Complete documentation

## 🛠️ Technologies Used

- **Three.js**: 3D rendering
- **JavaScript ES6+**: Application logic
- **HTML5 Canvas**: Graphics rendering
- **CSS3**: Modern and responsive interface
- **Advanced Mathematics**: Fibonacci sequence and golden ratio
- **i18n System**: Complete internationalization

## 📚 Mathematical Principles

### Fibonacci Sequence
```
F(n) = F(n-1) + F(n-2)
1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89...
```

### Golden Angle
```
θ = 360° × (1 - 1/φ) = 137.5°
φ = (1 + √5) / 2 ≈ 1.618
```

### Power Calculation
```
P = 0.5 × ρ × A × V³ × Cp
where:
ρ = air density (1.225 kg/m³)
A = sweep area (πr²)
V = wind speed (m/s)
Cp = power coefficient (variable by number of blades)
```

### Power Coefficient (Cp)
```
Cp = 0.2 + (numBlades - 1) × 0.1
Examples:
- 1 blade: Cp = 0.2
- 3 blades: Cp = 0.4
- 8 blades: Cp = 0.9
```

## 🌟 Implemented Improvements

### v2.0 - Multilingual System
- ✅ Interface in Portuguese, English and Spanish
- ✅ Language selector with flags
- ✅ Preference persistence
- ✅ Complete translation of all elements

### v1.5 - Visual Improvements
- ✅ High contrast for better readability
- ✅ Text shadows for clarity
- ✅ Gradients based on golden ratio
- ✅ Optimized typography

### v1.0 - Base Features
- ✅ Interactive 3D simulation
- ✅ Precise physical calculations
- ✅ Responsive interface
- ✅ Intuitive controls

## 🎨 Credits

- **Developed by**: Diôgo Camilo
- **Inspiration**: Fibonacci sequence in nature
- **Technology**: Three.js, JavaScript ES6+
- **Design**: Based on golden ratio
- **Education**: Focused on STEM and sustainability

---

**Fibonacci Turbine Simulator** - Where mathematics, physics and engineering meet to create sustainable energy! 🌱⚡

*Explore, learn and discover the power of nature through technology.*
