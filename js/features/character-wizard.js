/**
 * ═══════════════════════════════════════════════════════════════════
 * 🧙 D&D CHARACTER FORGE - CHARACTER WIZARD
 * 
 * Sistema completo de generación de personajes paso a paso
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
      ac: 10,
      proficiencyBonus: 2,
      skills: [],
      equipment: [],
      spells: [],
      features: [],
      portrait: null,
      createdAt: null
    };
    
    this.statGenerationMethod = 'point-buy'; // 'point-buy', 'standard-array', 'roll'
    this.pointBuyRemaining = 27;
    
    console.log('🧙 Character Wizard initialized');
  }

  // ═══════════════════════════════════════════════════════════════
  // 🎬 WIZARD NAVIGATION
  // ═══════════════════════════════════════════════════════════════

  /**
   * Iniciar el wizard
   */
  start() {
    this.character.id = `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.character.createdAt = new Date().toISOString();
    this.currentStep = 1;
    this.renderWizard();
  }

  /**
   * Navegar a un paso específico
   */
  goToStep(step) {
    if (step < 1 || step > this.totalSteps) return;
    
    // Validar paso actual antes de continuar
    if (step > this.currentStep && !this.validateCurrentStep()) {
      forge.showNotification('⚠️ Completa el paso actual antes de continuar', 'warning');
      return;
    }
    
    this.currentStep = step;
    this.renderWizard();
  }

  /**
   * Siguiente paso
   */
  nextStep() {
    if (this.validateCurrentStep()) {
      this.goToStep(this.currentStep + 1);
    }
  }

  /**
   * Paso anterior
   */
  previousStep() {
    this.goToStep(this.currentStep - 1);
  }

  /**
   * Validar paso actual
   */
  validateCurrentStep() {
    switch (this.currentStep) {
      case 1: // Raza
        return this.character.race !== null;
      case 2: // Clase
        return this.character.class !== null;
      case 3: // Trasfondo
        return this.character.background !== null;
      case 4: // Stats
        return this.validateStats();
      case 5: // Equipo
        return this.character.equipment.length > 0;
      case 6: // Detalles
        return this.character.name.trim().length > 0;
      default:
        return true;
    }
  }

  /**
   * Validar stats según método
   */
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

  // ═══════════════════════════════════════════════════════════════
  // 🎨 RENDER WIZARD
  // ═══════════════════════════════════════════════════════════════

  /**
   * Renderizar wizard completo
   */
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

  /**
   * Crear contenedor del wizard
   */
  createWizardContainer() {
    const container = document.createElement('div');
    container.id = 'wizard-container';
    container.className = 'wizard-container';
    document.body.appendChild(container);
    return container;
  }

  /**
   * Renderizar barra de progreso
   */
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

  /**
   * Obtener label del paso
   */
  getStepLabel(step) {
    const labels = ['Raza', 'Clase', 'Trasfondo', 'Stats', 'Equipo', 'Detalles'];
    return labels[step - 1];
  }

  /**
   * Obtener título del paso
   */
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

  /**
   * Obtener subtítulo del paso
   */
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

  /**
   * Renderizar contenido del paso
   */
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

  /**
   * Renderizar botones de navegación
   */
  renderNavigationButtons() {
    const prevDisabled = this.currentStep === 1;
    const nextLabel = this.currentStep === this.totalSteps ? '✨ Finalizar' : 'Siguiente →';
    
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
        onclick="${this.currentStep === this.totalSteps ? 'wizard.finishWizard()' : 'wizard.nextStep()'}"
      >
        ${nextLabel}
      </button>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  // 📝 PASO 1: SELECCIÓN DE RAZA
  // ═══════════════════════════════════════════════════════════════

  renderRaceSelection() {
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
    forge.log('Race selected', raceName);
  }

  // ═══════════════════════════════════════════════════════════════
  // ⚔️ PASO 2: SELECCIÓN DE CLASE
  // ═══════════════════════════════════════════════════════════════

  renderClassSelection() {
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
                  <div class="info-item">
                    <span class="info-label">Característica Principal:</span>
                    <span class="info-value">${classData.primaryAbility}</span>
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
    const classData = DND_DATA.classes[className];
    this.character.hp = classData.hitDie + this.calculateModifier(this.character.stats.constitution);
    this.renderWizard();
    forge.log('Class selected', className);
  }

  // ═══════════════════════════════════════════════════════════════
  // 📜 PASO 3: SELECCIÓN DE TRASFONDO
  // ═══════════════════════════════════════════════════════════════

  renderBackgroundSelection() {
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
                <div class="skills-list">
                  <strong>Competencias:</strong> ${bg.skills.join(', ')}
                </div>
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
    forge.log('Background selected', bgName);
  }

  // ═══════════════════════════════════════════════════════════════
  // 📊 PASO 4: ASIGNACIÓN DE STATS (continuará...)
  // ═══════════════════════════════════════════════════════════════

  renderStatsSelection() {
    return `
      <div class="stats-container">
        <div class="method-selector">
          <button class="btn ${this.statGenerationMethod === 'point-buy' ? 'btn--primary' : 'btn--outline'}"
                  onclick="wizard.setStatMethod('point-buy')">
            📊 Point Buy (27 puntos)
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
        this.character.stats[stat] = forge.roll4d6DropLowest();
      });
    } else {
      // Reset to 10 for point buy
      Object.keys(this.character.stats).forEach(stat => {
        this.character.stats[stat] = 10;
      });
      this.pointBuyRemaining = 27;
    }
    
    this.renderWizard();
  }

  increaseStat(stat) {
    // Implementar lógica según método
    if (this.statGenerationMethod === 'point-buy') {
      const currentValue = this.character.stats[stat];
      if (currentValue >= 15 || this.pointBuyRemaining <= 0) return;
      
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
      
      const refund = DND_DATA.pointBuyCosts[currentValue] - DND_DATA.pointBuyCosts[currentValue - 1];
      this.character.stats[stat]--;
      this.pointBuyRemaining += refund;
      this.renderWizard();
    }
  }

  calculateModifier(stat) {
    return Math.floor((stat - 10) / 2);
  }

  // ═══════════════════════════════════════════════════════════════
  // 🎒 PASO 5: EQUIPO (simplificado por ahora)
  // ═══════════════════════════════════════════════════════════════

  renderEquipmentSelection() {
    return `
      <div class="equipment-container">
        <p>El equipo inicial se asignará automáticamente según tu clase.</p>
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

  // ═══════════════════════════════════════════════════════════════
  // ✨ PASO 6: DETALLES FINALES
  // ═══════════════════════════════════════════════════════════════

  renderFinalDetails() {
    return `
      <div class="details-container">
        <div class="form-group">
          <label for="char-name">Nombre del Personaje *</label>
          <input 
            type="text" 
            id="char-name" 
            class="form-control" 
            value="${this.character.name}"
            onchange="wizard.character.name = this.value"
            placeholder="Ej: Thorin Escudo de Roble"
          >
        </div>
        
        <div class="form-group">
          <label>Alineamiento</label>
          <select class="form-control" onchange="wizard.character.alignment = this.value">
            ${DND_DATA.alignments.map(al => `
              <option value="${al}" ${this.character.alignment === al ? 'selected' : ''}>${al}</option>
            `).join('')}
          </select>
        </div>
        
        <div class="character-summary">
          <h3>Resumen de tu Personaje</h3>
          <dl>
            <dt>Raza:</dt><dd>${this.character.race}</dd>
            <dt>Clase:</dt><dd>${this.character.class}</dd>
            <dt>Trasfondo:</dt><dd>${this.character.background}</dd>
            <dt>Nivel:</dt><dd>${this.character.level}</dd>
            <dt>HP:</dt><dd>${this.character.hp}</dd>
          </dl>
        </div>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════════
  // ✅ FINALIZAR WIZARD
  // ═══════════════════════════════════════════════════════════════

  finishWizard() {
    if (!this.validateCurrentStep()) {
      forge.showNotification('⚠️ Completa todos los campos requeridos', 'warning');
      return;
    }
    
    // Calcular AC basado en clase y dex
    this.calculateAC();
    
    // Asignar equipo básico
    this.assignStartingEquipment();
    
    // Guardar personaje
    forge.saveCharacter(this.character);
    
    forge.showNotification(`✅ ¡${this.character.name} ha sido creado!`, 'success');
    console.log('Character created:', this.character);
    
    // Navegar a ficha
    // TODO: Implementar navegación a ficha
    forge.log('Character created successfully', this.character);
  }

  calculateAC() {
    const dexMod = this.calculateModifier(this.character.stats.dexterity);
    // Simplificado: AC base + dex
    this.character.ac = 10 + dexMod;
  }

  assignStartingEquipment() {
    this.character.equipment = [
      'Mochila de explorador',
      'Arma inicial (según clase)',
      'Armadura inicial (según clase)',
      '50 po'
    ];
  }

  // ═══════════════════════════════════════════════════════════════
  // 🎧 EVENT LISTENERS
  // ═══════════════════════════════════════════════════════════════

  attachEventListeners() {
    // Event listeners adicionales si es necesario
  }
}

// ═══════════════════════════════════════════════════════════════
// 🌍 GLOBAL INSTANCE
// ═══════════════════════════════════════════════════════════════

const wizard = new CharacterWizard();
window.wizard = wizard;

console.log('✅ Character Wizard loaded');