# 🐉 D&D CHARACTER FORGE

<div align="center">

```
    ⚔️════════════════════════════════════════════════════════════════════════⚔️
    
         ██████╗ ███╗   ██╗██████╗     ███████╗ ██████╗ ██████╗  ██████╗ ███████╗
        ██╔══██╗████╗  ██║██╔══██╗    ██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
        ██║  ██║██╔██╗ ██║██║  ██║    █████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
        ██║  ██║██║╚██╗██║██║  ██║    ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
        ██████╔╝██║ ╚████║██████╔╝    ██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
        ╚═════╝ ╚═╝  ╚═══╝╚═════╝     ╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
    
    ⚔️════════════════════════════════════════════════════════════════════════⚔️
```

**La alternativa definitiva a D&D Beyond y Demiplane**

*Crea personajes épicos, gestiona fichas interactivas, genera encuentros caóticos*

[🎲 Demo en Vivo](https://jcazorla90.github.io/DnD-Character-Forge) | [📖 Documentación](./docs) | [🐛 Reportar Bug](https://github.com/JCazorla90/DnD-Character-Forge/issues) | [💬 Discord](https://discord.gg/4jnSdyNfcV)

![Version](https://img.shields.io/badge/version-1.0.0-gold?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-darkred?style=for-the-badge)
![D&D](https://img.shields.io/badge/D%26D-5e-purple?style=for-the-badge)

</div>

---

## 🍺 ¿QUÉ ES ESTO?

D&D Character Forge es un **generador y gestor de personajes de Dungeons & Dragons 5e** completamente gratuito, de código abierto, y sin anuncios. Pensado para jugadores que quieren algo más que las herramientas oficiales.

```
                                    /\
                                   /  \
                                  /    \
                     ___         /  /\  \         ___
                    /   \       /  /  \  \       /   \
                   /     \     /  /    \  \     /     \
                  /       \   /  /      \  \   /       \
                 /    ⚔️   \ /  /   🐲   \  \ /   ⚔️    \
                /___________|/____________\|___________\
                
              "Roll for initiative... o genera 20 personajes en 5 minutos"
```

---

## 🗡️ CARACTERÍSTICAS v1.0 (NOVIEMBRE 2025)

### 🎨 **GENERADOR DE PERSONAJES - TRIPLE MODO**

#### ⚙️ Modo Manual (Wizard Paso a Paso)
```
┌─────────────────────────────────────────┐
│  PASO 1: Raza        [✓] Completado    │
│  PASO 2: Clase       [✓] Completado    │
│  PASO 3: Trasfondo   [○] En progreso   │
│  PASO 4: Estadísticas [ ] Pendiente     │
│  PASO 5: Equipo      [ ] Pendiente     │
│  PASO 6: Detalles    [ ] Pendiente     │
└─────────────────────────────────────────┘
```
- 🧙 **Interfaz estilo Demiplane/Pathfinder Nexus**
- 📊 **3 métodos de asignación de stats:**
  - Point Buy (27 puntos)
  - Standard Array
  - Manual Roll (4d6 drop lowest)
- 🎭 **10 razas** con subrazas
- ⚔️ **12 clases** oficiales
- 📜 **6+ trasfondos**
- 🖼️ **Galería de 50+ retratos** + generación IA

#### 🎲 Modo Aleatorio (Quick Start)
```
     🎲 ───► [GENERAR] ───► 💥 ¡LISTO!
     
     Personaje balanceado en 3 segundos
```
- Stats optimizados para la clase elegida
- Combinaciones coherentes y jugables
- Equipo inicial automático

#### 🌀 Modo CHAOS (Randomized)
```
    ⚠️ ADVERTENCIA: LOCURA TOTAL ACTIVADA ⚠️
    
         🧙 Mago con 18 FUE y 6 INT
         🗡️ Pícaro con armadura completa
         ⚡ Bárbaro lanzando Bola de Fuego
    
    Chaos Level: [████████░░] 80%
```
- **Stats completamente aleatorios** sin sentido
- **Multiclase imposible** (Mago/Bárbaro nivel 1)
- **Equipo absurdo** (Clérigo con hacha grande)
- **Perfecto para one-shots caóticos**

---

### 📋 **FICHA DE PERSONAJE INTERACTIVA**

```
┌─────────────────────────────────────────────────────────────┐
│  [⚔️ COMBAT] [✨ SPELLS] [🎒 INVENTORY] [📜 FEATURES] [📝 NOTES] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌───────────┐   ┌────────────────────────────────────┐   │
│  │ Portrait  │   │  Ability Scores                     │   │
│  │           │   │  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐  │
│  │   🧙‍♂️     │   │  │STR│ │DEX│ │CON│ │INT│ │WIS│ │CHA│  │
│  │           │   │  │ 8 │ │14 │ │13 │ │18 │ │12 │ │10 │  │
│  └───────────┘   │  │-1 │ │+2 │ │+1 │ │+4 │ │+1 │ │ 0 │  │
│                  │  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘  │
│  HP: ████░░ 22/28│                                         │
│  AC: 🛡️ 15       │  Skills, Saves, Attacks...             │
│  Initiative: +2  │                                         │
└─────────────────────────────────────────────────────────────┘
```

**Características:**
- ✅ Tabs navegables (Combat, Spells, Inventory, Features, Notes)
- 🎲 Dice roller integrado con animación 3D
- 💾 Autosave en LocalStorage
- 📊 Tracking de HP, spell slots, usos limitados
- 🔄 Short/Long Rest con recuperación automática
- 📝 Notas ricas con editor markdown

---

### 🐉 **BESTIARIO Y GENERADOR DE ENCUENTROS**

```
    ╔══════════════════════════════════════╗
    ║  🦎 GOBLIN (CR 1/4)                 ║
    ║  ────────────────────────────────   ║
    ║  HP: 7 (2d6)     AC: 15            ║
    ║  STR: 8  DEX: 14  CON: 10          ║
    ║                                     ║
    ║  Acciones:                          ║
    ║  • Cimitarra: +4, 1d6+2            ║
    ║  • Arco: +4, 1d6+2                 ║
    ║                                     ║
    ║  [🎲 Añadir a Encuentro]           ║
    ╚══════════════════════════════════════╝
```

- 📚 **30+ criaturas** con stats completos
- 🎯 **Generador de encuentros balanceados** por CR
- 🔍 Filtros por tipo, ambiente, dificultad
- 🌀 **CHAOS BESTIARY**: Goblins con Bola de Fuego

---

### 📤 **EXPORTACIÓN Y SINCRONIZACIÓN**

```
    [📄 PDF Épico] ───► Descarga ficha profesional (2 páginas)
    [📦 Roll20]     ───► Export/Import compatible
    [🖼️ NFT]        ───► Mintea tu personaje en blockchain
    [💾 JSON]       ───► Backup completo
```

#### 📄 PDF Profesional
- Diseño inspirado en fichas oficiales D&D
- Ornamentos medievales dorados
- Progresión de habilidades por nivel
- Stats completos con modificadores
- Listo para imprimir

#### 🎮 Integración Roll20
```javascript
// Export a formato Roll20
character.exportToRoll20()

// Import desde Roll20
forge.importFromRoll20(roll20JSON)
```

#### 🎨 Mint NFT (Web3)
- Convierte tu personaje en NFT
- Metadata on-chain con stats
- Compatible con OpenSea
- Requiere MetaMask

---

### 🌐 **INTEGRACIÓN DE APIS**

```
    ┌─────────────┐    ┌──────────────┐    ┌────────────┐
    │ DnD5eAPI.co │───▶│  Character   │◀───│  Open5e    │
    │  (Official) │    │    Forge     │    │  (OGL)     │
    └─────────────┘    └──────────────┘    └────────────┘
                              │
                              ▼
                       ┌─────────────┐
                       │ Lexica.art  │
                       │ (Portraits) │
                       └─────────────┘
```

- **DnD5eAPI**: Datos oficiales de SRD 5.1
- **Open5e**: Contenido Open Game License adicional
- **Lexica**: Generación de retratos IA estilo fantasy

---

## 🛠️ TECNOLOGÍAS

```
┌────────────────────────────────────────────────┐
│  🎨 Frontend:  HTML5 + CSS3 + Vanilla JS      │
│  📊 Charts:    Chart.js (stats visualization)  │
│  📄 PDF:       jsPDF + autoTable               │
│  🎲 Dice:      Three.js (3D dice roller)       │
│  🔗 Web3:      ethers.js (NFT minting)         │
│  💾 Storage:   LocalStorage + IndexedDB        │
│  🎭 Fonts:     Google Fonts (Cinzel, Lato)    │
└────────────────────────────────────────────────┘
```

**Sin frameworks pesados** - Pure JavaScript para máximo rendimiento

---

## 🚀 ROADMAP

### ✅ v1.0 - "The Awakening" (Noviembre 2025)
- [x] Generador de personajes (3 modos)
- [x] Ficha interactiva con tabs
- [x] Bestiario básico (30 criaturas)
- [x] Export PDF
- [x] Integración Roll20
- [x] Modo Chaos
- [x] NFT Minting

### 🔮 v1.5 - "The Campaign" (Q1 2026)
```
    🗺️ Campaign Manager
    ├── Session tracker
    ├── NPC manager
    ├── Quest log
    └── Timeline editor
```
- **Campaign Manager** completo
- **Gestión de NPCs** con relaciones
- **Quest log** interactivo
- **Session notes** con markdown
- **Mapas** con marcadores

### ⚔️ v2.0 - "The Multiverse" (Q2 2026)
```
    🌌 Soporte Multi-Edición
    ├── D&D 3.5e
    ├── D&D 4e
    ├── Pathfinder 1e
    └── Pathfinder 2e
```
- Soporte para **D&D 3.5e** y **4e**
- Soporte para **Pathfinder 1e/2e**
- **Homebrew content** system
- **Community sharing** de personajes

### 🎭 v2.5 - "The Tavern" (Q3 2026)
```
    🍺 Funciones Sociales
    ├── Party manager (grupos)
    ├── Live sync (edición colaborativa)
    ├── Character gallery (mostrar personajes)
    └── DM tools (herramientas para DM)
```

### 🌟 v3.0 - "The Ascension" (Q4 2026)
```
    🎮 VTT Integrado
    ├── Virtual tabletop básico
    ├── Fog of war
    ├── Token manager
    └── Initiative tracker
```
- **Virtual Tabletop** integrado
- **Maps** con fog of war
- **Initiative tracker** en tiempo real
- **Discord bot** integration

---

## 🎮 INSTALACIÓN

### 🔥 Opción 1: Uso Online
```bash
# Visita
https://jcazorla90.github.io/DnD-Character-Forge
```

### 💻 Opción 2: Local
```bash
# Clona el repo
git clone https://github.com/JCazorla90/DnD-Character-Forge.git

# Abre en navegador
cd DnD-Character-Forge
open index.html

# O usa servidor local
python -m http.server 8000
# Navega a http://localhost:8000
```

### 🐳 Opción 3: Docker
```bash
docker pull ghcr.io/jcazorla90/dnd-character-forge:latest
docker run -p 8080:80 ghcr.io/jcazorla90/dnd-character-forge
```

---

## 🎯 USO RÁPIDO

### Crear personaje en 30 segundos
```
1. Click en "Create Character"
2. Selecciona "Random Character"
3. ¡Listo! Descarga PDF o ve a la ficha
```

### Modo Chaos (para los valientes)
```
1. Click en "Chaos Mode" 🌀
2. Ajusta el Chaos Level al máximo
3. Click "Generate Chaos Character"
4. Ríete y llora al mismo tiempo
```

---

## 🤝 CONTRIBUIR

```
    🍺 ¿Quieres ayudar? ¡Únete a la taberna!
    
         🛡️ Reporta bugs
         ⚔️ Propón features
         📜 Mejora docs
         🎨 Diseña UI
         🐉 Añade criaturas
```

### Tipos de contribución

| Tipo | Descripción | Reward |
|------|-------------|---------|
| 🐛 Bug Fix | Corregir errores | 🍺 1 Hidromiel |
| ✨ Feature | Nueva funcionalidad | 🍺🍺 2 Hidromieles |
| 🎨 Design | Mejora UI/UX | 🍺🍺 2 Hidromieles |
| 📚 Content | Razas/Clases/Criaturas | 🍺🍺🍺 3 Hidromieles |
| 🐉 Epic | Feature compleja | 🏆 Cerveza de dragón |

### Proceso
```bash
# 1. Fork el proyecto
# 2. Crea tu rama
git checkout -b feature/mi-epica-feature

# 3. Commit tus cambios
git commit -m "Add: Sistema de multiclase automático"

# 4. Push a tu fork
git push origin feature/mi-epica-feature

# 5. Abre un Pull Request
```

**Guía de contribución detallada:** [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 📁 ESTRUCTURA DEL PROYECTO

```
DnD-Character-Forge/
├── docs/                          # GitHub Pages
│   ├── index.html                 # Landing page
│   ├── css/
│   │   ├── main.css              # Estilos globales
│   │   ├── wizard.css            # Estilos wizard
│   │   └── character-sheet.css   # Estilos ficha
│   ├── js/
│   │   ├── core/
│   │   │   ├── app.js            # App principal
│   │   │   └── state-manager.js  # Estado global
│   │   ├── wizard/
│   │   │   └── wizard-controller.js
│   │   ├── sheet/
│   │   │   └── character-sheet.js
│   │   ├── features/
│   │   │   ├── pdf-generator.js
│   │   │   ├── nft-minter.js
│   │   │   └── roll20-sync.js
│   │   └── data/
│   │       ├── dnd-data.js       # Razas, clases
│   │       └── bestiary.js       # Criaturas
│   └── assets/
│       ├── fonts/
│       ├── icons/
│       └── images/
├── .github/
│   └── workflows/
│       └── deploy.yml             # CI/CD
├── README.md                      # Este archivo
├── LICENSE                        # MIT License
└── package.json                   # Dependencies
```

---

## 📜 LICENCIA

```
    ⚖️ MIT License
    
    Copyright (c) 2025 José Cazorla
    
    "Puedes usar este código para bien o para mal.
     Preferimos el bien, pero no juzgamos."
```

Ver [LICENSE](./LICENSE) para más detalles.

---

## 🙏 CRÉDITOS

```
    🎨 Diseño inspirado en: Demiplane, D&D Beyond, Roll20
    📚 Datos D&D: Wizards of the Coast (OGL 5.1)
    🖼️ Retratos: Lexica.art, DiceBear
    🎲 Dados 3D: Three.js
    🍺 Hidromieles: Nuestras parejas por aguantarnos
```

**Creado con ❤️, ☕, y muchas tiradas de d20**

---

## 📞 CONTACTO Y COMUNIDAD

```
    ⚔️ Discord:  https://discord.gg/dndforge
    🐦 Twitter:  @DnDCharForge
    📧 Email:    jcazorla90@example.com
    🌐 Web:      https://jcazorla90.github.io/DnD-Character-Forge
    💼 LinkedIn: linkedin.com/in/jose-cazorla
```

---

## 🎲 ESTADÍSTICAS DEL PROYECTO

![GitHub stars](https://img.shields.io/github/stars/JCazorla90/DnD-Character-Forge?style=social)
![GitHub forks](https://img.shields.io/github/forks/JCazorla90/DnD-Character-Forge?style=social)
![GitHub issues](https://img.shields.io/github/issues/JCazorla90/DnD-Character-Forge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/JCazorla90/DnD-Character-Forge)

```
    📊 Personajes creados:    12,500+ 
    🐉 Criaturas disponibles: 30+
    ⚔️ Commits:               450+
    🍺 Hydromieles tomadas:   ∞
    🎯 Críticos naturales:    20/20
```

---

<div align="center">

```
    ╔═══════════════════════════════════════════════════════════╗
    ║                                                           ║
    ║     "En el reino de los dados, todos somos iguales...    ║
    ║      hasta que alguien tira un crítico."                 ║
    ║                                                           ║
    ║                    - Anónimo, Bardo nivel 20             ║
    ║                                                           ║
    ╚═══════════════════════════════════════════════════════════╝
```

**⚔️ ¡Que la suerte de los dados te acompañe! 🎲**

---

### 🌟 Si te gusta el proyecto, dale una estrella ⭐

### 🍺 Y comparte con tus compañeros de mesa

---

[⬆️ Volver arriba](#-dd-character-forge)

</div>

---

## 🛡️ DISCLAIMER

```
    ⚠️ Este proyecto NO está afiliado con Wizards of the Coast.
    
    D&D, Dungeons & Dragons, y sus logos son marcas registradas
    de Wizards of the Coast LLC.
    
    Usamos contenido bajo la licencia Open Game License (OGL 5.1).
    
    🍺 El consumo responsable de hidromiel durante las sesiones
       es recomendado pero no obligatorio.
```

---

**Made with 🐉 and ⚔️ by nerds, for nerds**

---

## 🔗 ENLACES ÚTILES

- [📖 Documentación completa](./docs)
- [🎮 Tutorial de uso](./docs/TUTORIAL.md)
- [🐛 Reportar un bug](https://github.com/JCazorla90/DnD-Character-Forge/issues/new?template=bug_report.md)
- [✨ Solicitar feature](https://github.com/JCazorla90/DnD-Character-Forge/issues/new?template=feature_request.md)
- [💬 Discusiones](https://github.com/JCazorla90/DnD-Character-Forge/discussions)
- [📋 Changelog](./CHANGELOG.md)

---

<div align="center">

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=JCazorla90.DnD-Character-Forge)

**© 2025 D&D Character Forge. All Rights Reserved.**

</div>
