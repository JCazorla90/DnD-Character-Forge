/**
 * ═══════════════════════════════════════════════════════════════════
 * 🐉 D&D CHARACTER FORGE - BESTIARY & ENCOUNTER GENERATOR
 * 
 * Sistema completo de bestiario con generador de encuentros
 * 
 * Copyright (c) 2025 José Cazorla
 * https://github.com/JCazorla90/DnD-Character-Forge
 * Licensed under MIT License
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

class Bestiary {
  constructor() {
    this.creatures = [];
    this.filteredCreatures = [];
    this.selectedCreatures = [];
    this.filters = {
      cr: 'all',
      type: 'all',
      environment: 'all',
      search: ''
    };
    
    console.log('🐉 Bestiary initialized');
  }

  // ═══════════════════════════════════════════════════════════════
  // 🔄 LOAD CREATURES FROM API
  // ═══════════════════════════════════════════════════════════════

  async loadCreatures() {
    console.log('🔄 Loading creatures from DnD5eAPI...');
    
    try {
      // Intentar cargar desde cache primero
      const cached = localStorage.getItem('dnd_creatures_cache');
      const cacheTime = localStorage.getItem('dnd_creatures_cache_time');
      
      // Cache válido por 24 horas
      if (cached && cacheTime && (Date.now() - parseInt(cacheTime)) < 86400000) {
        this.creatures = JSON.parse(cached);
        this.filteredCreatures = [...this.creatures];
        console.log(`✅ Loaded ${this.creatures.length} creatures from cache`);
        this.renderBestiary();
        return;
      }
      
      // Cargar desde API
      const response = await fetch('https://www.dnd5eapi.co/api/monsters');
      const data = await response.json();
      
      // Cargar detalles de cada criatura (limitamos a primeras 50 para performance)
      const monsterPromises = data.results.slice(0, 50).map(async (monster) => {
        try {
          const detailResponse = await fetch(`https://www.dnd5eapi.co${monster.url}`);
          return await detailResponse.json();
        } catch (err) {
          console.error(`Error loading ${monster.name}:`, err);
          return null;
        }
      });
      
      const monsters = await Promise.all(monsterPromises);
      this.creatures = monsters.filter(m => m !== null);
      this.filteredCreatures = [...this.creatures];
      
      // Guardar en cache
      localStorage.setItem('dnd_creatures_cache', JSON.stringify(this.creatures));
      localStorage.setItem('dnd_creatures_cache_time', Date.now().toString());
      
      console.log(`✅ Loaded ${this.creatures.length} creatures from API`);
      this.renderBestiary();
      
    } catch (error) {
      console.error('❌ Error loading creatures:', error);
      
      // Fallback a datos locales si existen
      if (typeof DND_DATA !== 'undefined' && DND_DATA.monsters) {
        this.creatures = DND_DATA.monsters;
        this.filteredCreatures = [...this.creatures];
        console.log(`✅ Loaded ${this.creatures.length} creatures from local data`);
        this.renderBestiary();
      } else {
        this.showError('No se pudieron cargar las criaturas. Verifica tu conexión.');
      }
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 🔍 FILTERS
  // ═══════════════════════════════════════════════════════════════

  applyFilters() {
    this.filteredCreatures = this.creatures.filter(creature => {
      // Filtro por CR
      if (this.filters.cr !== 'all') {
        if (creature.challenge_rating !== parseFloat(this.filters.cr)) {
          return false;
        }
      }
      
      // Filtro por tipo
      if (this.filters.type !== 'all') {
        if (creature.type.toLowerCase() !== this.filters.type.toLowerCase()) {
          return false;
        }
      }
      
      // Filtro por búsqueda
      if (this.filters.search) {
        const searchLower = this.filters.search.toLowerCase();
        if (!creature.name.toLowerCase().includes(searchLower)) {
          return false;
        }
      }
      
      return true;
    });
    
    console.log(`🔍 Filtered to ${this.filteredCreatures.length} creatures`);
    this.renderBestiary();
  }

  setFilter(filterType, value) {
    this.filters[filterType] = value;
    this.applyFilters();
  }

  // ═══════════════════════════════════════════════════════════════
  // 🎨 RENDER BESTIARY
  // ═══════════════════════════════════════════════════════════════

  renderBestiary() {
    const container = document.getElementById('bestiary-container');
    if (!container) {
      console.error('Bestiary container not found');
      return;
    }
    
    const html = `
      <div class="bestiary">
        <div class="bestiary-header">
          <h1 class="bestiary-title">🐉 Bestiario de Criaturas</h1>
          <p class="bestiary-subtitle">${this.filteredCreatures.length} criaturas disponibles</p>
        </div>
        
        ${this.renderFilters()}
        ${this.renderCreatureGrid()}
        ${this.renderEncounterBuilder()}
      </div>
    `;
    
    container.innerHTML = html;
  }

  renderFilters() {
    const crOptions = ['all', '0', '0.125', '0.25', '0.5', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'];
    const typeOptions = ['all', 'aberration', 'beast', 'celestial', 'construct', 'dragon', 'elemental', 'fey', 'fiend', 'giant', 'humanoid', 'monstrosity', 'ooze', 'plant', 'undead'];
    
    return `
      <div class="bestiary-filters">
        <div class="filter-group">
          <label for="filter-search">🔍 Buscar:</label>
          <input 
            type="text" 
            id="filter-search" 
            class="form-control" 
            placeholder="Nombre de criatura..."
            value="${this.filters.search}"
            oninput="bestiary.setFilter('search', this.value)"
          >
        </div>
        
        <div class="filter-group">
          <label for="filter-cr">📊 CR (Challenge Rating):</label>
          <select id="filter-cr" class="form-control" onchange="bestiary.setFilter('cr', this.value)">
            ${crOptions.map(cr => `
              <option value="${cr}" ${this.filters.cr === cr ? 'selected' : ''}>
                ${cr === 'all' ? 'Todos' : `CR ${cr}`}
              </option>
            `).join('')}
          </select>
        </div>
        
        <div class="filter-group">
          <label for="filter-type">🦎 Tipo:</label>
          <select id="filter-type" class="form-control" onchange="bestiary.setFilter('type', this.value)">
            ${typeOptions.map(type => `
              <option value="${type}" ${this.filters.type === type ? 'selected' : ''}>
                ${type === 'all' ? 'Todos' : type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            `).join('')}
          </select>
        </div>
        
        <button class="btn btn--secondary" onclick="bestiary.clearFilters()">
          🔄 Limpiar Filtros
        </button>
      </div>
    `;
  }

  clearFilters() {
    this.filters = {
      cr: 'all',
      type: 'all',
      environment: 'all',
      search: ''
    };
    this.applyFilters();
  }

  renderCreatureGrid() {
    if (this.filteredCreatures.length === 0) {
      return `
        <div class="empty-state">
          <p>🔍 No se encontraron criaturas con estos filtros</p>
          <button class="btn btn--primary" onclick="bestiary.clearFilters()">
            Limpiar Filtros
          </button>
        </div>
      `;
    }
    
    return `
      <div class="creature-grid">
        ${this.filteredCreatures.map(creature => this.renderCreatureCard(creature)).join('')}
      </div>
    `;
  }

  renderCreatureCard(creature) {
    const isSelected = this.selectedCreatures.some(c => c.index === creature.index);
    
    return `
      <div class="creature-card ${isSelected ? 'selected' : ''}" onclick="bestiary.toggleCreature('${creature.index}')">
        <div class="creature-header">
          <h3 class="creature-name">${creature.name}</h3>
          ${isSelected ? '<span class="badge badge--success">✓ Seleccionado</span>' : ''}
        </div>
        
        <div class="creature-stats-mini">
          <span class="stat-badge">CR ${creature.challenge_rating}</span>
          <span class="stat-badge">${creature.type}</span>
          <span class="stat-badge">${creature.size}</span>
        </div>
        
        <div class="creature-info">
          <div class="info-row">
            <span class="info-label">AC:</span>
            <span class="info-value">${this.getAC(creature)}</span>
          </div>
          <div class="info-row">
            <span class="info-label">HP:</span>
            <span class="info-value">${creature.hit_points}</span>
          </div>
          <div class="info-row">
            <span class="info-label">Speed:</span>
            <span class="info-value">${this.getSpeed(creature)}</span>
          </div>
        </div>
        
        <button class="btn btn--outline btn--sm" onclick="event.stopPropagation(); bestiary.showCreatureDetail('${creature.index}')">
          Ver Detalles →
        </button>
      </div>
    `;
  }

  getAC(creature) {
    if (Array.isArray(creature.armor_class)) {
      return creature.armor_class[0]?.value || 10;
    }
    return creature.armor_class || 10;
  }

  getSpeed(creature) {
    if (typeof creature.speed === 'object') {
      return creature.speed.walk || '30 ft';
    }
    return creature.speed || '30 ft';
  }

  toggleCreature(creatureIndex) {
    const creature = this.creatures.find(c => c.index === creatureIndex);
    if (!creature) return;
    
    const index = this.selectedCreatures.findIndex(c => c.index === creatureIndex);
    
    if (index >= 0) {
      this.selectedCreatures.splice(index, 1);
      console.log(`❌ Removed ${creature.name}`);
    } else {
      this.selectedCreatures.push(creature);
      console.log(`✅ Added ${creature.name}`);
    }
    
    this.renderBestiary();
  }

  showCreatureDetail(creatureIndex) {
    const creature = this.creatures.find(c => c.index === creatureIndex);
    if (!creature) return;
    
    const modal = document.getElementById('creature-modal') || this.createModal();
    
    const html = `
      <div class="modal-content">
        <div class="modal-header">
          <h2>${creature.name}</h2>
          <button class="modal-close" onclick="bestiary.closeModal()">✕</button>
        </div>
        
        <div class="modal-body">
          <div class="creature-detail">
            <p><em>${creature.size} ${creature.type}, ${creature.alignment}</em></p>
            
            <hr>
            
            <div class="creature-stats-full">
              <div class="stat-block">
                <strong>Armor Class:</strong> ${this.getAC(creature)}
              </div>
              <div class="stat-block">
                <strong>Hit Points:</strong> ${creature.hit_points} (${creature.hit_dice})
              </div>
              <div class="stat-block">
                <strong>Speed:</strong> ${this.getSpeed(creature)}
              </div>
            </div>
            
            <hr>
            
            <div class="ability-scores">
              <div class="ability">
                <div class="ability-name">STR</div>
                <div class="ability-score">${creature.strength}</div>
                <div class="ability-mod">${this.calculateMod(creature.strength)}</div>
              </div>
              <div class="ability">
                <div class="ability-name">DEX</div>
                <div class="ability-score">${creature.dexterity}</div>
                <div class="ability-mod">${this.calculateMod(creature.dexterity)}</div>
              </div>
              <div class="ability">
                <div class="ability-name">CON</div>
                <div class="ability-score">${creature.constitution}</div>
                <div class="ability-mod">${this.calculateMod(creature.constitution)}</div>
              </div>
              <div class="ability">
                <div class="ability-name">INT</div>
                <div class="ability-score">${creature.intelligence}</div>
                <div class="ability-mod">${this.calculateMod(creature.intelligence)}</div>
              </div>
              <div class="ability">
                <div class="ability-name">WIS</div>
                <div class="ability-score">${creature.wisdom}</div>
                <div class="ability-mod">${this.calculateMod(creature.wisdom)}</div>
              </div>
              <div class="ability">
                <div class="ability-name">CHA</div>
                <div class="ability-score">${creature.charisma}</div>
                <div class="ability-mod">${this.calculateMod(creature.charisma)}</div>
              </div>
            </div>
            
            <hr>
            
            ${creature.special_abilities ? `
              <div class="special-abilities">
                <h3>🌟 Habilidades Especiales</h3>
                ${creature.special_abilities.map(ability => `
                  <div class="ability-item">
                    <strong>${ability.name}:</strong> ${ability.desc}
                  </div>
                `).join('')}
              </div>
            ` : ''}
            
            ${creature.actions ? `
              <div class="actions">
                <h3>⚔️ Acciones</h3>
                ${creature.actions.map(action => `
                  <div class="action-item">
                    <strong>${action.name}:</strong> ${action.desc}
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>
        
        <div class="modal-footer">
          <button class="btn btn--primary" onclick="bestiary.addToEncounter('${creature.index}'); bestiary.closeModal()">
            ➕ Añadir a Encuentro
          </button>
          <button class="btn btn--secondary" onclick="bestiary.closeModal()">
            Cerrar
          </button>
        </div>
      </div>
    `;
    
    modal.innerHTML = html;
    modal.style.display = 'flex';
  }

  calculateMod(score) {
    const mod = Math.floor((score - 10) / 2);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  }

  createModal() {
    const modal = document.createElement('div');
    modal.id = 'creature-modal';
    modal.className = 'modal';
    document.body.appendChild(modal);
    return modal;
  }

  closeModal() {
    const modal = document.getElementById('creature-modal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  addToEncounter(creatureIndex) {
    this.toggleCreature(creatureIndex);
  }

  // ═══════════════════════════════════════════════════════════════
  // 🎲 ENCOUNTER BUILDER
  // ═══════════════════════════════════════════════════════════════

  renderEncounterBuilder() {
    if (this.selectedCreatures.length === 0) {
      return `
        <div class="encounter-builder">
          <h2>🎲 Constructor de Encuentros</h2>
          <p>Selecciona criaturas para construir un encuentro</p>
        </div>
      `;
    }
    
    const totalXP = this.calculateTotalXP();
    const difficulty = this.calculateDifficulty(totalXP, 4); // Asumiendo 4 jugadores nivel 5
    
    return `
      <div class="encounter-builder">
        <h2>🎲 Constructor de Encuentros</h2>
        
        <div class="encounter-summary">
          <div class="summary-item">
            <span class="summary-label">Criaturas:</span>
            <span class="summary-value">${this.selectedCreatures.length}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">XP Total:</span>
            <span class="summary-value">${totalXP}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Dificultad:</span>
            <span class="summary-value ${difficulty.class}">${difficulty.label}</span>
          </div>
        </div>
        
        <div class="encounter-creatures">
          ${this.selectedCreatures.map(creature => `
            <div class="encounter-creature">
              <span class="creature-name">${creature.name}</span>
              <span class="creature-cr">CR ${creature.challenge_rating}</span>
              <button class="btn btn--sm" onclick="bestiary.toggleCreature('${creature.index}')">✕</button>
            </div>
          `).join('')}
        </div>
        
        <div class="encounter-actions">
          <button class="btn btn--primary" onclick="bestiary.generateEncounter()">
            🎲 Generar Encuentro Aleatorio
          </button>
          <button class="btn btn--secondary" onclick="bestiary.clearEncounter()">
            🗑️ Limpiar Encuentro
          </button>
        </div>
      </div>
    `;
  }

  calculateTotalXP() {
    const xpByCR = {
      0: 10, 0.125: 25, 0.25: 50, 0.5: 100, 1: 200, 2: 450, 3: 700, 4: 1100,
      5: 1800, 6: 2300, 7: 2900, 8: 3900, 9: 5000, 10: 5900, 11: 7200,
      12: 8400, 13: 10000, 14: 11500, 15: 13000, 16: 15000, 17: 18000,
      18: 20000, 19: 22000, 20: 25000, 21: 33000, 22: 41000, 23: 50000,
      24: 62000, 25: 75000, 26: 90000, 27: 105000, 28: 120000, 29: 135000, 30: 155000
    };
    
    return this.selectedCreatures.reduce((total, creature) => {
      return total + (xpByCR[creature.challenge_rating] || 0);
    }, 0);
  }

  calculateDifficulty(xp, partySize) {
    const threshold = partySize * 500; // Asumiendo nivel 5
    
    if (xp < threshold * 0.5) {
      return { label: 'Fácil', class: 'easy' };
    } else if (xp < threshold) {
      return { label: 'Medio', class: 'medium' };
    } else if (xp < threshold * 1.5) {
      return { label: 'Difícil', class: 'hard' };
    } else {
      return { label: 'Mortal', class: 'deadly' };
    }
  }

  generateEncounter() {
    // Limpiar selección actual
    this.selectedCreatures = [];
    
    // Seleccionar 2-5 criaturas aleatorias
    const numCreatures = Math.floor(Math.random() * 4) + 2;
    const shuffled = [...this.filteredCreatures].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < numCreatures && i < shuffled.length; i++) {
      this.selectedCreatures.push(shuffled[i]);
    }
    
    console.log(`🎲 Generated encounter with ${this.selectedCreatures.length} creatures`);
    this.renderBestiary();
  }

  clearEncounter() {
    this.selectedCreatures = [];
    this.renderBestiary();
  }

  showError(message) {
    const container = document.getElementById('bestiary-container');
    if (container) {
      container.innerHTML = `
        <div class="error-state">
          <p>❌ ${message}</p>
          <button class="btn btn--primary" onclick="bestiary.loadCreatures()">
            🔄 Reintentar
          </button>
        </div>
      `;
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// 🌍 GLOBAL INSTANCE
// ═══════════════════════════════════════════════════════════════

const bestiary = new Bestiary();
window.bestiary = bestiary;

console.log('✅ Bestiary loaded');
