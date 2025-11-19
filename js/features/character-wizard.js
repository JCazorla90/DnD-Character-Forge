/**
 * ═══════════════════════════════════════════════════════════════════
 * 🐉 D&D CHARACTER FORGE - CHARACTER WIZARD ULTIMATE
 * 
 * Fusión de funcionalidades completas + nuevas features
 * 
 * Copyright (c) 2025 José Cazorla
 * https://github.com/JCazorla90/DnD-Character-Forge
 * Licensed under MIT License
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

class CharacterWizard {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 6;
    this.mode = 'manual'; // 'manual', 'random', 'chaos'
    this.character = {
      id: null,
      name: '',
      race: null,
      class: null,
      background: null,
      alignment: 'Neutral',
      level: 1,
      stats: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
      },
      hp: 0,
      maxHp: 0,
      ac: 10,
      proficiencyBonus: 2,
      initiative: 0,
      speed: 30,
      skills: [],
      equipment: [],
      spells: [],
      features: [],
      portrait: null,
      createdAt: null,
      modifiedAt: null
    };
    
    this.statGenerationMethod = 'point-buy';
    this.pointBuyRemaining = 27;
    
    console.log('🐉 Character Wizard Ultimate initialized');
  }

  // ═══════════════════════════════════════════════════════════════
  // 🎬 WIZARD NAVIGATION & MODES
  // ═══════════════════════════════════════════════════════════════

  start(mode = 'manual') {
    this.mode = mode;
    this.character.id = `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.character.createdAt = new Date().toISOString();
    this.currentStep = 1;
    
    if (mode === 'random') {
      this.generateRandomCharacter();
    } else if (mode === 'chaos') {
      this.generateChaosCharacter();
    } else {
      this.renderWizard();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // ⚡ MODO RANDOM - GENERACIÓN AUTOMÁTICA BALANCEADA
  // ═══════════════════════════════════════════════════════════════

  generateRandomCharacter() {
    console.log('⚡ Generating RANDOM balanced character...');
    
    if (typeof DND_DATA === 'undefined') {
      alert('Error: Datos de D&D no disponibles');
      return;
    }
    
    // Selección aleatoria de raza, clase, trasfondo
    const races = Object.keys(DND_DATA.races);
    const classes = Object.keys(DND_DATA.classes);
    const backgrounds = Object.keys(DND_DATA.backgrounds);
    const alignments = DND_DATA.alignments;
    
    this.character.race = races[Math.floor(Math.random() * races.length)];
    this.character.class = classes[Math.floor(Math.random() * classes.length)];
    this.character.background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    this.character.alignment = alignments[Math.floor(Math.random() * alignments.length)];
    
    // Generar stats BALANCEADAS según la clase
    this.generateBalancedStats();
    
    // Generar nombre aleatorio
    this.character.name = this.generateRandomName();
    
    // Calcular valores derivados
    this.calculateDerivedStats();
    this.assignStartingEquipment();
    
    // Guardar y mostrar resumen
    this.finishWizard();
  }

  // ═══════════════════════════════════════════════════════════════
  // 🌀 MODO CHAOS - GENERACIÓN LOCA SIN LÍMITES
  // ═══════════════════════════════════════════════════════════════

  generateChaosCharacter() {
    console.log('🌀 Generating CHAOS character... Expect madness!');
    
    if (typeof DND_DATA === 'undefined') {
      alert('Error: Datos de D&D no disponibles');
      return;
    }
    
    // Selección completamente aleatoria
    const races = Object.keys(DND_DATA.races);
    const classes = Object.keys(DND_DATA.classes);
    const backgrounds = Object.keys(DND_DATA.backgrounds);
    const alignments = DND_DATA.alignments;
    
    this.character.race = races[Math.floor(Math.random() * races.length)];
    this.character.class = classes[Math.floor(Math.random() * classes.length)];
    this.character.background = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    this.character.alignment = alignments[Math.floor(Math.random() * alignments.length)];
    
    // CHAOS STATS: Completamente random 3-18
    Object.keys(this.character.stats).forEach(stat => {
      this.character.stats[stat] = Math.floor(Math.random() * 16) + 3; // 3-18
    });
    
    // CHAOS FEATURES: Añadir habilidades locas
    this.addChaosFeatures();
    
    // Nombre CHAOS
    this.character.name = `CHAOS-${Math.floor(Math.random() * 9999)}`;
    
    // Calcular valores (aunque sean locos)
    this.calculateDerivedStats();
    this.assignChaosEquipment();
    
    // Guardar y mostrar
    this.finishWizard();
  }

  generateBalancedStats() {
    const className = this.character.class;
    const classData = DND_DATA.classes[className];
    
    // Generar 6 stats usando 4d6 drop lowest
    const rolledStats = [];
    for (let i = 0; i < 6; i++) {
      rolledStats.push(this.roll4d6DropLowest());
    }
    rolledStats.sort((a, b) => b - a); // Mayor a menor
    
    // Asignar stats según la clase
    const statPriority = this.getStatPriorityForClass(className);
    statPriority.forEach((stat, index) => {
      this.character.stats[stat] = rolledStats[index];
    });
  }

  getStatPriorityForClass(className) {
    const priorities = {
      'Guerrero': ['strength', 'constitution', 'dexterity', 'wisdom', 'charisma', 'intelligence'],
      'Mago': ['intelligence', 'constitution', 'dexterity', 'wisdom', 'charisma', 'strength'],
      'Pícaro': ['dexterity', 'intelligence', 'constitution', 'charisma', 'wisdom', 'strength'],
      'Clérigo': ['wisdom', 'constitution', 'strength', 'charisma', 'intelligence', 'dexterity'],
      'Paladín': ['strength', 'charisma', 'constitution', 'wisdom', 'dexterity', 'intelligence'],
      'Bárbaro': ['strength', 'constitution', 'dexterity', 'wisdom', 'charisma', 'intelligence'],
      'Druida': ['wisdom', 'constitution', 'dexterity', 'intelligence', 'strength', 'charisma'],
      'Bardo': ['charisma', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'strength'],
      'Monje': ['dexterity', 'wisdom', 'constitution', 'strength', 'intelligence', 'charisma'],
      'Explorador': ['dexterity', 'wisdom', 'constitution', 'strength', 'intelligence', 'charisma'],
      'Brujo': ['charisma', 'constitution', 'dexterity', 'intelligence', 'wisdom', 'strength'],
      'Hechicero': ['charisma', 'constitution', 'dexterity', 'wisdom', 'intelligence', 'strength']
    };
    
    return priorities[className] || ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
  }

  addChaosFeatures() {
    const chaosFeatures = [
      '🔥 Puede lanzar Bola de Fuego (aunque sea un Bárbaro)',
      '⚔️ Competente con todas las armas (sin entrenamiento)',
      '🎭 Puede usar disfraz perfecto a voluntad',
      '🐉 Habla con dragones (probablemente lo insultan)',
      '💪 Fuerza sobrenatural (+10 a Fuerza temporalmente)',
      '🧠 Genio loco (INT 20 pero WIS 3)',
      '🏃 Velocidad del viento (doble velocidad de movimiento)',
      '🛡️ Piel de hierro (AC +5 natural)',
      '✨ Teletransportación caótica (al azar)',
      '🎲 Suerte del caos (crítico en 15-20)'
    ];
    
    // Añadir 2-4 features caóticas aleatorias
    const numFeatures = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < numFeatures; i++) {
      const feature = chaosFeatures[Math.floor(Math.random() * chaosFeatures.length)];
      if (!this.character.features.includes(feature)) {
        this.character.features.push(feature);
      }
    }
  }

  assignChaosEquipment() {
    const chaosEquipment = [
      '🗡️ Espada del Caos (+∞ daño, -∞ control)',
      '🛡️ Escudo de gelatina (AC ±1d20)',
      '🏹 Arco que dispara pescados',
      '⚗️ Poción de transformación aleatoria',
      '📜 Pergamino de confusión masiva',
      '🔮 Orbe de desastres',
      '👑 Corona de locura',
      '🎺 Trompeta ensordecedora',
      '🍺 Barril infinito de cerveza',
      '🐔 Pollo mascota parlante'
    ];
    
    this.character.equipment = [];
    const numItems = Math.floor(Math.random() * 5) + 3;
    for (let i = 0; i < numItems; i++) {
      const item = chaosEquipment[Math.floor(Math.random() * chaosEquipment.length)];
      this.character.equipment.push(item);
    }
  }

  generateRandomName() {
    const firstNames = [
      'Thorin', 'Gandalf', 'Aragorn', 'Legolas', 'Gimli', 'Elara', 'Thalia', 'Kael',
      'Darian', 'Lyra', 'Vex', 'Grog', 'Pike', 'Scanlan', 'Vax', 'Keyleth',
      'Caleb', 'Jester', 'Fjord', 'Beau', 'Nott', 'Yasha', 'Caduceus', 'Essek'
    ];
    
    const lastNames = [
      'Escudo de Roble', 'Martillo de Piedra', 'Mano Firme', 'Corazón Valiente',
      'Sombra Nocturna', 'Viento del Este', 'Forja de Fuego', 'Luna Plateada',
      'Espada Rota', 'Puño de Hierro', 'Estrella Brillante', 'Lobo Solitario'
    ];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
  }

  // ═══════════════════════════════════════════════════════════════
  // 📊 CÁLCULOS Y DERIVADOS
  // ═══════════════════════════════════════════════════════════════

  calculateDerivedStats() {
    const classData = DND_DATA.classes[this.character.class];
    const conMod = this.calculateModifier(this.character.stats.constitution);
    const dexMod = this.calculateModifier(this.character.stats.dexterity);
    
    // HP
    this.character.hp = classData.hitDie + conMod;
    this.character.maxHp = this.character.hp;
    
    // AC
    this.character.ac = 10 + dexMod;
    
    // Initiative
    this.character.initiative = dexMod;
    
    // Speed (from race)
    const raceData = DND_DATA.races[this.character.race];
    this.character.speed = raceData.speed || 30;
  }

  roll4d6DropLowest() {
    const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
    rolls.sort((a, b) => a - b);
    return rolls.slice(1).reduce((a, b) => a + b, 0);
  }

  calculateModifier(stat) {
    return Math.floor((stat - 10) / 2);
  }

  // ═══════════════════════════════════════════════════════════════
  // 💾 GUARDAR, EXPORTAR, IMPORTAR
  // ═══════════════════════════════════════════════════════════════

  saveCharacter() {
    this.character.modifiedAt = new Date().toISOString();
    
    try {
      let characters = JSON.parse(localStorage.getItem('dnd_characters')) || [];
      
      // Buscar si ya existe
      const existingIndex = characters.findIndex(c => c.id === this.character.id);
      if (existingIndex >= 0) {
        characters[existingIndex] = this.character;
      } else {
        characters.unshift(this.character);
      }
      
      // Limitar a 50 personajes
      if (characters.length > 50) {
        characters = characters.slice(0, 50);
      }
      
      localStorage.setItem('dnd_characters', JSON.stringify(characters));
      console.log('✅ Character saved:', this.character.name);
      return true;
    } catch (e) {
      console.error('❌ Error saving character:', e);
      return false;
    }
  }

  exportToJSON() {
    const json = JSON.stringify(this.character, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.character.name.replace(/\s+/g, '_')}_character.json`;
    a.click();
    URL.revokeObjectURL(url);
    console.log('📥 Character exported to JSON');
  }

  importFromJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        
        // Validar estructura básica
        if (!imported.name || !imported.class || !imported.race) {
          alert('❌ Archivo JSON inválido');
          return;
        }
        
        this.character = imported;
        this.character.modifiedAt = new Date().toISOString();
        this.saveCharacter();
        alert(`✅ Personaje importado: ${this.character.name}`);
        
        // Redirigir a ficha o lista
        window.location.href = './index.html';
      } catch (err) {
        alert('❌ Error al importar archivo');
        console.error(err);
      }
    };
    reader.readAsText(file);
  }

  exportToText() {
    const text = this.generateCharacterSheet();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${this.character.name.replace(/\s+/g, '_')}_ficha.txt`;
    a.click();
    URL.revokeObjectURL(url);
    console.log('📄 Character exported to TXT');
  }

  generateCharacterSheet() {
    const mods = {};
    Object.keys(this.character.stats).forEach(stat => {
      mods[stat] = this.calculateModifier(this.character.stats[stat]);
    });
    
    return `
═══════════════════════════════════════════════════════════════
🐉 FICHA DE PERSONAJE - D&D 5e
═══════════════════════════════════════════════════════════════

NOMBRE: ${this.character.name}
RAZA: ${this.character.race}
CLASE: ${this.character.class}
TRASFONDO: ${this.character.background}
ALINEAMIENTO: ${this.character.alignment}
NIVEL: ${this.character.level}

═══════════════════════════════════════════════════════════════
📊 CARACTERÍSTICAS
═══════════════════════════════════════════════════════════════

FUE: ${this.character.stats.strength} (${mods.strength >= 0 ? '+' : ''}${mods.strength})
DES: ${this.character.stats.dexterity} (${mods.dexterity >= 0 ? '+' : ''}${mods.dexterity})
CON: ${this.character.stats.constitution} (${mods.constitution >= 0 ? '+' : ''}${mods.constitution})
INT: ${this.character.stats.intelligence} (${mods.intelligence >= 0 ? '+' : ''}${mods.intelligence})
SAB: ${this.character.stats.wisdom} (${mods.wisdom >= 0 ? '+' : ''}${mods.wisdom})
CAR: ${this.character.stats.charisma} (${mods.charisma >= 0 ? '+' : ''}${mods.charisma})

═══════════════════════════════════════════════════════════════
⚔️ COMBATE
═══════════════════════════════════════════════════════════════

PUNTOS DE GOLPE: ${this.character.hp}/${this.character.maxHp}
CLASE DE ARMADURA: ${this.character.ac}
INICIATIVA: ${this.character.initiative >= 0 ? '+' : ''}${this.character.initiative}
VELOCIDAD: ${this.character.speed} ft
BONIFICADOR DE COMPETENCIA: +${this.character.proficiencyBonus}

═══════════════════════════════════════════════════════════════
🎒 EQUIPO
═══════════════════════════════════════════════════════════════

${this.character.equipment.map(item => `• ${item}`).join('\n')}

${this.character.features.length > 0 ? `
═══════════════════════════════════════════════════════════════
✨ CARACTERÍSTICAS ESPECIALES
═══════════════════════════════════════════════════════════════

${this.character.features.map(feature => `• ${feature}`).join('\n')}
` : ''}

═══════════════════════════════════════════════════════════════
Creado: ${new Date(this.character.createdAt).toLocaleString()}
ID: ${this.character.id}
═══════════════════════════════════════════════════════════════
    `.trim();
  }

  // ═══════════════════════════════════════════════════════════════
  // 🎨 RENDER WIZARD (modo manual)
  // ═══════════════════════════════════════════════════════════════

  renderWizard() {
    const container = document.getElementById('wizard-container') || this.createWizardContainer();
    
    const html = `
      <div class="wizard">
        <div class="wizard-header">
          ${this.renderProgressBar()}
          <h2 class="wizard-title">${this.getStepTitle()}</h2>
          <p class="wizard-subtitle">${this.getStepSubtitle()}</p>
        </div>
        
        <div class="wizard-content">
          ${this.renderStepContent()}
        </div>
        
        <div class="wizard-footer">
          ${this.renderNavigationButtons()}
        </div>
      </div>
    `;
    
    container.innerHTML = html;
    this.attachEventListeners();
  }

  createWizardContainer() {
    const container = document.createElement('div');
    container.id = 'wizard-container';
    container.className = 'wizard-container';
    document.body.appendChild(container);
    return container;
  }

  goToStep(step) {
    if (step < 1 || step > this.totalSteps) return;
    
    if (step > this.currentStep && !this.validateCurrentStep()) {
      alert('⚠️ Completa el paso actual antes de continuar');
      return;
    }
    
    this.currentStep = step;
    this.renderWizard();
  }

  nextStep() {
    if (this.validateCurrentStep()) {
      this.goToStep(this.currentStep + 1);
    }
  }

  previousStep() {
    this.goToStep(this.currentStep - 1);
  }

  validateCurrentStep() {
    switch (this.currentStep) {
      case 1:
        return this.character.race !== null;
      case 2:
        return this.character.class !== null;
      case 3:
        return this.character.background !== null;
      case 4:
        return this.validateStats();
      case 5:
        return true;
      case 6:
        return this.character.name.trim().length > 0;
      default:
        return true;
    }
  }

  validateStats() {
    const stats = Object.values(this.character.stats);
    
    switch (this.statGenerationMethod) {
      case 'point-buy':
        return this.pointBuyRemaining === 0 && stats.every(s => s >= 8 && s <= 15);
      case 'standard-array':
        return stats.every(s => s >= 8 && s <= 15);
      case 'roll':
        return stats.every(s => s >= 3 && s <= 18);
      default:
        return true;
    }
  }

  renderProgressBar() {
    const steps = [];
    for (let i = 1; i <= this.totalSteps; i++) {
      const isComplete = i < this.currentStep;
      const isCurrent = i === this.currentStep;
      const className = `progress-step ${isComplete ? 'complete' : ''} ${isCurrent ? 'current' : ''}`;
      
      steps.push(`
        <div class="${className}" onclick="wizard.goToStep(${i})">
          <div class="step-number">${isComplete ? '✓' : i}</div>
          <div class="step-label">${this.getStepLabel(i)}</div>
        </div>
      `);
    }
    
    return `
      <div class="wizard-progress">
        ${steps.join('<div class="progress-connector"></div>')}
      </div>
    `;
  }

  getStepLabel(step) {
    const labels = ['Raza', 'Clase', 'Trasfondo', 'Stats', 'Equipo', 'Detalles'];
    return labels[step - 1];
  }

  getStepTitle() {
    const titles = [
      '🎭 Elige tu Raza',
      '⚔️ Elige tu Clase',
      '📜 Elige tu Trasfondo',
      '📊 Asigna tus Características',
      '🎒 Elige tu Equipo Inicial',
      '✨ Detalles Finales'
    ];
    return titles[this.currentStep - 1];
  }

  getStepSubtitle() {
    const subtitles = [
      'Tu herencia determina tus rasgos y habilidades innatas',
      'Tu clase define tus capacidades en combate y exploración',
      'Tu pasado determina tus habilidades y conexiones',
      'Distribuye tus puntos de características',
      'Selecciona las armas y equipo con los que empezarás',
      'Dale vida a tu personaje con nombre, apariencia y personalidad'
    ];
    return subtitles[this.currentStep - 1];
  }

  renderStepContent() {
    switch (this.currentStep) {
      case 1: return this.renderRaceSelection();
      case 2: return this.renderClassSelection();
      case 3: return this.renderBackgroundSelection();
      case 4: return this.renderStatsSelection();
      case 5: return this.renderEquipmentSelection();
      case 6: return this.renderFinalDetails();
      default: return '<p>Paso no implementado</p>';
    }
  }

  renderNavigationButtons() {
    const prevDisabled = this.currentStep === 1;
    const nextLabel = this.currentStep === this.totalSteps ? '✨ Finalizar' : 'Siguiente →';
    const nextAction = this.currentStep === this.totalSteps ? 'wizard.finishWizard()' : 'wizard.nextStep()';
    
    return `
      <button 
        class="btn btn--secondary" 
        onclick="wizard.previousStep()"
        ${prevDisabled ? 'disabled' : ''}
      >
        ← Anterior
      </button>
      
      <button 
        class="btn btn--primary" 
        onclick="${nextAction}"
      >
        ${nextLabel}
      </button>
    `;
  }

  // [CONTINÚA EN EL SIGUIENTE MENSAJE - El archivo es muy largo]
  // Necesito dividirlo en 2 partes para no exceder el límite

  renderRaceSelection() {
    if (typeof DND_DATA === 'undefined' || !DND_DATA.races) {
      return '<p class="text-center">Error: Datos de razas no disponibles.</p>';
    }
    
    const races = Object.keys(DND_DATA.races);
    
    return `
      <div class="selection-grid">
        ${races.map(raceName => {
          const race = DND_DATA.races[raceName];
          const isSelected = this.character.race === raceName;
          
          return `
            <div class="selection-card ${isSelected ? 'selected' : ''}" 
                 onclick="wizard.selectRace('${raceName}')">
              <div class="card-header">
                <h3>${raceName}</h3>
                ${isSelected ? '<span class="badge badge--success">✓ Seleccionado</span>' : ''}
              </div>
              <div class="card-body">
                <p class="card-description">${race.description}</p>
                <ul class="trait-list">
                  ${race.traits.slice(0, 3).map(trait => `<li>${trait}</li>`).join('')}
                </ul>
                <div class="card-stats">
                  <span>Velocidad: ${race.speed} ft</span>
                  <span>Tamaño: ${race.size}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  selectRace(raceName) {
    this.character.race = raceName;
    this.renderWizard();
  }

  renderClassSelection() {
    if (typeof DND_DATA === 'undefined' || !DND_DATA.classes) {
      return '<p class="text-center">Error: Datos de clases no disponibles.</p>';
    }
    
    const classes = Object.keys(DND_DATA.classes);
    
    return `
      <div class="selection-grid">
        ${classes.map(className => {
          const classData = DND_DATA.classes[className];
          const isSelected = this.character.class === className;
          
          return `
            <div class="selection-card ${isSelected ? 'selected' : ''}" 
                 onclick="wizard.selectClass('${className}')">
              <div class="card-header">
                <h3>${className}</h3>
                ${isSelected ? '<span class="badge badge--success">✓ Seleccionado</span>' : ''}
              </div>
              <div class="card-body">
                <p class="card-description">${classData.description}</p>
                <div class="class-info">
                  <div class="info-item">
                    <span class="info-label">Dado de Golpe:</span>
                    <span class="info-value">d${classData.hitDie}</span>
                  </div>
                  ${classData.spellcasting ? '<span class="badge badge--magic">✨ Lanzador de conjuros</span>' : ''}
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  selectClass(className) {
    this.character.class = className;
    this.renderWizard();
  }

  renderBackgroundSelection() {
    if (typeof DND_DATA === 'undefined' || !DND_DATA.backgrounds) {
      return '<p class="text-center">Error: Datos de trasfondos no disponibles.</p>';
    }
    
    const backgrounds = Object.keys(DND_DATA.backgrounds);
    
    return `
      <div class="selection-grid selection-grid--compact">
        ${backgrounds.map(bgName => {
          const bg = DND_DATA.backgrounds[bgName];
          const isSelected = this.character.background === bgName;
          
          return `
            <div class="selection-card selection-card--compact ${isSelected ? 'selected' : ''}" 
                 onclick="wizard.selectBackground('${bgName}')">
              <div class="card-header">
                <h3>${bgName}</h3>
                ${isSelected ? '<span class="badge badge--success">✓</span>' : ''}
              </div>
              <div class="card-body">
                <p class="feature-text">${bg.feature}</p>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  selectBackground(bgName) {
    this.character.background = bgName;
    this.renderWizard();
  }

  renderStatsSelection() {
    return `
      <div class="stats-container">
        <div class="method-selector">
          <button class="btn ${this.statGenerationMethod === 'point-buy' ? 'btn--primary' : 'btn--outline'}"
                  onclick="wizard.setStatMethod('point-buy')">
            📊 Point Buy
          </button>
          <button class="btn ${this.statGenerationMethod === 'standard-array' ? 'btn--primary' : 'btn--outline'}"
                  onclick="wizard.setStatMethod('standard-array')">
            📋 Standard Array
          </button>
          <button class="btn ${this.statGenerationMethod === 'roll' ? 'btn--primary' : 'btn--outline'}"
                  onclick="wizard.setStatMethod('roll')">
            🎲 Roll 4d6
          </button>
        </div>
        ${this.renderStatInputs()}
      </div>
    `;
  }

  renderStatInputs() {
    const stats = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    const labels = ['Fuerza', 'Destreza', 'Constitución', 'Inteligencia', 'Sabiduría', 'Carisma'];
    
    return `
      <div class="stats-grid">
        ${stats.map((stat, i) => {
          const value = this.character.stats[stat];
          const modifier = this.calculateModifier(value);
          
          return `
            <div class="stat-box">
              <label>${labels[i]}</label>
              <div class="stat-controls">
                <button onclick="wizard.decreaseStat('${stat}')">-</button>
                <span class="stat-value">${value}</span>
                <button onclick="wizard.increaseStat('${stat}')">+</button>
              </div>
              <span class="stat-modifier">${modifier >= 0 ? '+' : ''}${modifier}</span>
            </div>
          `;
        }).join('')}
      </div>
      ${this.statGenerationMethod === 'point-buy' ? `
        <div class="points-remaining">
          <span>Puntos restantes: </span>
          <strong>${this.pointBuyRemaining}</strong>
        </div>
      ` : ''}
    `;
  }

  setStatMethod(method) {
    this.statGenerationMethod = method;
    
    if (method === 'standard-array') {
      const array = [15, 14, 13, 12, 10, 8];
      const stats = Object.keys(this.character.stats);
      stats.forEach((stat, i) => {
        this.character.stats[stat] = array[i];
      });
    } else if (method === 'roll') {
      Object.keys(this.character.stats).forEach(stat => {
        this.character.stats[stat] = this.roll4d6DropLowest();
      });
    } else {
      Object.keys(this.character.stats).forEach(stat => {
        this.character.stats[stat] = 8;
      });
      this.pointBuyRemaining = 27;
    }
    
    this.renderWizard();
  }

  increaseStat(stat) {
    if (this.statGenerationMethod === 'point-buy') {
      const currentValue = this.character.stats[stat];
      if (currentValue >= 15 || this.pointBuyRemaining <= 0) return;
      
      if (typeof DND_DATA === 'undefined' || !DND_DATA.pointBuyCosts) return;
      
      const cost = DND_DATA.pointBuyCosts[currentValue + 1] - DND_DATA.pointBuyCosts[currentValue];
      if (cost <= this.pointBuyRemaining) {
        this.character.stats[stat]++;
        this.pointBuyRemaining -= cost;
        this.renderWizard();
      }
    }
  }

  decreaseStat(stat) {
    if (this.statGenerationMethod === 'point-buy') {
      const currentValue = this.character.stats[stat];
      if (currentValue <= 8) return;
      
      if (typeof DND_DATA === 'undefined' || !DND_DATA.pointBuyCosts) return;
      
      const refund = DND_DATA.pointBuyCosts[currentValue] - DND_DATA.pointBuyCosts[currentValue - 1];
      this.character.stats[stat]--;
      this.pointBuyRemaining += refund;
      this.renderWizard();
    }
  }

  renderEquipmentSelection() {
    return `
      <div class="equipment-container">
        <p style="text-align: center; margin-bottom: 24px;">El equipo inicial se asignará automáticamente según tu clase.</p>
        <div class="equipment-preview">
          <h3>Equipo inicial incluido:</h3>
          <ul>
            <li>Armas según clase</li>
            <li>Armadura según clase</li>
            <li>Mochila de explorador</li>
            <li>50 piezas de oro</li>
          </ul>
        </div>
      </div>
    `;
  }

  renderFinalDetails() {
    if (typeof DND_DATA === 'undefined' || !DND_DATA.alignments) {
      return '<p>Error: Datos no disponibles</p>';
    }
    
    return `
      <div class="details-container">
        <div class="form-group">
          <label for="char-name">Nombre del Personaje *</label>
          <input 
            type="text" 
            id="char-name" 
            class="form-control" 
            value="${this.character.name}"
            oninput="wizard.character.name = this.value"
            placeholder="Ej: Thorin Escudo de Roble"
          >
        </div>
        
        <div class="form-group">
          <label for="char-alignment">Alineamiento</label>
          <select id="char-alignment" class="form-control" onchange="wizard.character.alignment = this.value">
            ${DND_DATA.alignments.map(al => `
              <option value="${al}" ${this.character.alignment === al ? 'selected' : ''}>${al}</option>
            `).join('')}
          </select>
        </div>
        
        <div class="character-summary">
          <h3>Resumen de tu Personaje</h3>
          <dl>
            <dt>Raza:</dt><dd>${this.character.race || 'No seleccionada'}</dd>
            <dt>Clase:</dt><dd>${this.character.class || 'No seleccionada'}</dd>
            <dt>Trasfondo:</dt><dd>${this.character.background || 'No seleccionado'}</dd>
            <dt>Nivel:</dt><dd>${this.character.level}</dd>
          </dl>
        </div>
      </div>
    `;
  }

  finishWizard() {
    if (this.mode === 'manual' && !this.validateCurrentStep()) {
      alert('⚠️ Completa todos los campos requeridos');
      return;
    }
    
    this.calculateDerivedStats();
    this.assignStartingEquipment();
    this.saveCharacter();
    
    const modeText = this.mode === 'chaos' ? '🌀 CHAOS' : (this.mode === 'random' ? '⚡ RANDOM' : '✨');
    alert(`${modeText} ¡${this.character.name} ha sido creado!\n\nPersonaje guardado correctamente.\n\nOpciones:\n• Ver ficha\n• Exportar JSON\n• Exportar TXT\n• Crear otro personaje`);
    
    console.log('Character created:', this.character);
    
    // Mostrar opciones
    this.showPostCreationOptions();
  }

  showPostCreationOptions() {
    const container = document.getElementById('wizard-container');
    
    const html = `
      <div class="wizard">
        <div class="wizard-header">
          <h2 class="wizard-title">✅ ¡Personaje Creado!</h2>
          <p class="wizard-subtitle">${this.character.name} está listo para la aventura</p>
        </div>
        
        <div class="wizard-content">
          <div class="character-summary" style="margin-bottom: 24px;">
            <h3>Resumen Final</h3>
            <dl>
              <dt>Nombre:</dt><dd>${this.character.name}</dd>
              <dt>Raza:</dt><dd>${this.character.race}</dd>
              <dt>Clase:</dt><dd>${this.character.class}</dd>
              <dt>Nivel:</dt><dd>${this.character.level}</dd>
              <dt>HP:</dt><dd>${this.character.hp}/${this.character.maxHp}</dd>
              <dt>AC:</dt><dd>${this.character.ac}</dd>
            </dl>
          </div>
          
          <div class="action-buttons" style="display: flex; flex-direction: column; gap: 12px;">
            <button class="btn btn--primary" onclick="wizard.exportToJSON()">
              📥 Descargar JSON
            </button>
            <button class="btn btn--primary" onclick="wizard.exportToText()">
              📄 Descargar Ficha TXT
            </button>
            <button class="btn btn--secondary" onclick="window.location.href='./wizard.html'">
              🎲 Crear Otro Personaje
            </button>
            <button class="btn btn--secondary" onclick="window.location.href='./index.html'">
              🏠 Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    `;
    
    container.innerHTML = html;
  }

  assignStartingEquipment() {
    if (this.mode === 'chaos') {
      // Ya asignado en assignChaosEquipment()
      return;
    }
    
    this.character.equipment = [
      'Mochila de explorador',
      'Arma inicial (según clase)',
      'Armadura inicial (según clase)',
      '50 po',
      'Raciones (10 días)',
      'Cuerda de cáñamo (50 pies)',
      'Antorcha (10)',
      'Pedernal y yesca'
    ];
  }

  attachEventListeners() {
    // Event listeners adicionales si es necesario
  }
}

// ═══════════════════════════════════════════════════════════════
// 🌍 GLOBAL INSTANCE
// ═══════════════════════════════════════════════════════════════

const wizard = new CharacterWizard();
window.wizard = wizard;

console.log('✅ Character Wizard Ultimate loaded - All features enabled');
console.log('🎲 Modes available: manual, random, chaos');
console.log('💾 Export/Import: JSON, TXT');
