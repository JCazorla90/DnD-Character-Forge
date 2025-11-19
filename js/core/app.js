/**
 * ═══════════════════════════════════════════════════════════════════
 * 🐉 D&D CHARACTER FORGE - MAIN APPLICATION
 * 
 * Copyright (c) 2025 José Cazorla
 * https://github.com/JCazorla90/DnD-Character-Forge
 * Licensed under MIT License
 * 
 * @author José Cazorla
 * @license MIT
 * @version 1.0.0
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

console.log(`
╔════════════════════════════════════════════════════════════════════╗
║                                                                    ║
║     🐉 D&D CHARACTER FORGE v1.0                                   ║
║     https://github.com/JCazorla90/DnD-Character-Forge             ║
║                                                                    ║
║     Copyright (c) 2025 José Cazorla                               ║
║     Licensed under MIT License                                    ║
║                                                                    ║
║     "Roll for initiative... or create 20 characters in 5 min"    ║
║                                                                    ║
╚════════════════════════════════════════════════════════════════════╝
`);

// ═════════════════════════════════════════════════════════════════
// ⚙️ CONFIGURACIÓN GLOBAL
// ═════════════════════════════════════════════════════════════════

const APP_CONFIG = {
  VERSION: '1.0.0',
  AUTHOR: 'José Cazorla',
  GITHUB: 'https://github.com/JCazorla90/DnD-Character-Forge',
  LICENSE: 'MIT',
  STORAGE_KEY: 'dnd_character_forge',
  STORAGE_CHARACTERS: 'dnd_characters',
  STORAGE_PREFERENCES: 'dnd_preferences',
  MAX_SAVED_CHARACTERS: 50,
  DEBUG: true
};

// ═════════════════════════════════════════════════════════════════
// 🏗️ CLASE: APPLICATION CORE
// ═════════════════════════════════════════════════════════════════

class DnDCharacterForge {
  constructor() {
    this.currentPage = 'home';
    this.currentCharacter = null;
    this.characters = [];
    this.preferences = {};
    
    console.log('✅ D&D Character Forge initialized');
    this.log('APP_CONFIG', APP_CONFIG);
  }

  /**
   * Logger con atribución
   * @param {string} context - Contexto del log
   * @param {any} data - Datos a loguear
   */
  log(context, data = null) {
    if (APP_CONFIG.DEBUG) {
      const timestamp = new Date().toLocaleTimeString();
      const prefix = `[${timestamp}] 🐉 ${context}`;
      if (data) {
        console.log(prefix, data);
      } else {
        console.log(prefix);
      }
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 💾 STORAGE MANAGEMENT
  // ─────────────────────────────────────────────────────────────

  /**
   * Guardar personaje en localStorage
   * @param {Object} character - Personaje a guardar
   */
  saveCharacter(character) {
    try {
      let characters = JSON.parse(localStorage.getItem(APP_CONFIG.STORAGE_CHARACTERS)) || [];
      
      // Evitar duplicados
      const existingIndex = characters.findIndex(c => c.id === character.id);
      if (existingIndex >= 0) {
        characters[existingIndex] = character;
      } else {
        characters.unshift(character);
      }
      
      // Limitar a MAX_SAVED_CHARACTERS
      if (characters.length > APP_CONFIG.MAX_SAVED_CHARACTERS) {
        characters = characters.slice(0, APP_CONFIG.MAX_SAVED_CHARACTERS);
      }
      
      localStorage.setItem(APP_CONFIG.STORAGE_CHARACTERS, JSON.stringify(characters));
      this.log('Character saved', character.name);
      return true;
    } catch (error) {
      console.error('❌ Error saving character:', error);
      return false;
    }
  }

  /**
   * Cargar todos los personajes guardados
   * @returns {Array} Array de personajes
   */
  loadCharacters() {
    try {
      const characters = JSON.parse(localStorage.getItem(APP_CONFIG.STORAGE_CHARACTERS)) || [];
      this.characters = characters;
      this.log('Characters loaded', `${characters.length} personajes encontrados`);
      return characters;
    } catch (error) {
      console.error('❌ Error loading characters:', error);
      return [];
    }
  }

  /**
   * Cargar personaje por ID
   * @param {string} characterId - ID del personaje
   * @returns {Object|null} Personaje encontrado o null
   */
  loadCharacterById(characterId) {
    const characters = this.loadCharacters();
    const character = characters.find(c => c.id === characterId);
    if (character) {
      this.currentCharacter = character;
      this.log('Character loaded', character.name);
    }
    return character;
  }

  /**
   * Eliminar personaje
   * @param {string} characterId - ID del personaje
   */
  deleteCharacter(characterId) {
    try {
      let characters = this.loadCharacters();
      characters = characters.filter(c => c.id !== characterId);
      localStorage.setItem(APP_CONFIG.STORAGE_CHARACTERS, JSON.stringify(characters));
      this.log('Character deleted', characterId);
      return true;
    } catch (error) {
      console.error('❌ Error deleting character:', error);
      return false;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // ⚙️ PREFERENCES MANAGEMENT
  // ─────────────────────────────────────────────────────────────

  /**
   * Guardar preferencias
   * @param {Object} prefs - Preferencias a guardar
   */
  savePreferences(prefs) {
    try {
      const preferences = {
        ...this.preferences,
        ...prefs,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(APP_CONFIG.STORAGE_PREFERENCES, JSON.stringify(preferences));
      this.preferences = preferences;
      this.log('Preferences saved', prefs);
      return true;
    } catch (error) {
      console.error('❌ Error saving preferences:', error);
      return false;
    }
  }

  /**
   * Cargar preferencias
   * @returns {Object} Preferencias guardadas
   */
  loadPreferences() {
    try {
      const prefs = JSON.parse(localStorage.getItem(APP_CONFIG.STORAGE_PREFERENCES)) || {
        darkMode: true,
        edition: '5e',
        language: 'es'
      };
      this.preferences = prefs;
      this.log('Preferences loaded');
      return prefs;
    } catch (error) {
      console.error('❌ Error loading preferences:', error);
      return {};
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 📤 EXPORT/IMPORT
  // ─────────────────────────────────────────────────────────────

  /**
   * Exportar personaje a JSON
   * @param {string} characterId - ID del personaje
   * @param {string} filename - Nombre del archivo (opcional)
   */
  exportCharacterJSON(characterId, filename = null) {
    try {
      const character = this.loadCharacterById(characterId);
      if (!character) {
        throw new Error('Character not found');
      }

      const json = JSON.stringify(character, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || `${character.name.replace(/\s+/g, '_')}_character.json`;
      a.click();
      URL.revokeObjectURL(url);

      this.log('Character exported', `${character.name}.json`);
      return true;
    } catch (error) {
      console.error('❌ Error exporting character:', error);
      return false;
    }
  }

  /**
   * Importar personaje desde JSON
   * @param {File} file - Archivo JSON
   */
  async importCharacterJSON(file) {
    try {
      const text = await file.text();
      const character = JSON.parse(text);
      
      // Validar estructura básica
      if (!character.name || !character.class || !character.race) {
        throw new Error('Invalid character format');
      }

      // Generar ID si no existe
      if (!character.id) {
        character.id = this.generateCharacterId();
      }

      // Añadir metadata
      character.imported = new Date().toISOString();
      
      this.saveCharacter(character);
      this.log('Character imported', character.name);
      return character;
    } catch (error) {
      console.error('❌ Error importing character:', error);
      return null;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 🎲 UTILIDADES
  // ─────────────────────────────────────────────────────────────

  /**
   * Generar ID único para personaje
   * @returns {string} ID único
   */
  generateCharacterId() {
    return `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Tirar un dado
   * @param {number} sides - Número de caras del dado
   * @returns {number} Resultado de la tirada
   */
  rollDice(sides = 20) {
    return Math.floor(Math.random() * sides) + 1;
  }

  /**
   * Tirar múltiples dados
   * @param {number} count - Cantidad de dados
   * @param {number} sides - Caras de cada dado
   * @returns {Array} Array de resultados
   */
  rollMultipleDice(count = 1, sides = 20) {
    return Array.from({ length: count }, () => this.rollDice(sides));
  }

  /**
   * Tirar 4d6 drop lowest (método estándar para stats)
   * @returns {number} Resultado
   */
  roll4d6DropLowest() {
    const rolls = this.rollMultipleDice(4, 6);
    rolls.sort((a, b) => a - b);
    const result = rolls.slice(1).reduce((a, b) => a + b, 0);
    this.log('4d6 Drop Lowest', `Rolls: ${rolls.join(', ')} → Total: ${result}`);
    return result;
  }

  /**
   * Calcular modificador de característica
   * @param {number} stat - Valor de la característica
   * @returns {number} Modificador calculado
   */
  calculateModifier(stat) {
    return Math.floor((stat - 10) / 2);
  }

  /**
   * Generar array de 6 stats
   * @returns {Object} Objeto con 6 stats
   */
  generateStats() {
    const stats = [];
    for (let i = 0; i < 6; i++) {
      stats.push(this.roll4d6DropLowest());
    }
    stats.sort((a, b) => b - a);
    return {
      strength: stats[0],
      dexterity: stats[1],
      constitution: stats[2],
      intelligence: stats[3],
      wisdom: stats[4],
      charisma: stats[5]
    };
  }

  // ─────────────────────────────────────────────────────────────
  // 🎨 RENDERIZADO Y UI
  // ─────────────────────────────────────────────────────────────

  /**
   * Mostrar notificación
   * @param {string} message - Mensaje a mostrar
   * @param {string} type - Tipo de notificación (success, error, info, warning)
   * @param {number} duration - Duración en ms (0 = sin auto-cerrar)
   */
  showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Attributo de atribución
    notification.setAttribute('data-app', 'D&D Character Forge');
    notification.setAttribute('data-author', 'José Cazorla');
    
    document.body.appendChild(notification);
    
    // Fade in
    setTimeout(() => notification.classList.add('notification--show'), 10);
    
    // Auto-close
    if (duration > 0) {
      setTimeout(() => {
        notification.classList.remove('notification--show');
        setTimeout(() => notification.remove(), 300);
      }, duration);
    }
  }

  /**
   * Mostrar loading spinner
   * @returns {HTMLElement} Elemento del spinner
   */
  showLoading() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
      <div class="spinner"></div>
      <p>Generando tu personaje épico...</p>
      <p class="text-small">D&D Character Forge by José Cazorla</p>
    `;
    document.body.appendChild(loader);
    return loader;
  }

  /**
   * Ocultar loading spinner
   */
  hideLoading() {
    const loader = document.querySelector('.loader');
    if (loader) {
      loader.remove();
    }
  }

  // ─────────────────────────────────────────────────────────────
  // 🔗 NAVEGACIÓN
  // ─────────────────────────────────────────────────────────────

  /**
   * Navegar a página
   * @param {string} page - Nombre de la página
   * @param {Object} params - Parámetros opcionales
   */
  navigateTo(page, params = {}) {
    this.currentPage = page;
    this.log('Navigation', `Navegando a: ${page}`, params);
    
    // Emitir evento personalizado
    window.dispatchEvent(new CustomEvent('app-navigate', { detail: { page, params } }));
  }

  // ─────────────────────────────────────────────────────────────
  // ℹ️ INFORMACIÓN
  // ─────────────────────────────────────────────────────────────

  /**
   * Mostrar información de la aplicación
   */
  showInfo() {
    return {
      name: 'D&D Character Forge',
      version: APP_CONFIG.VERSION,
      author: APP_CONFIG.AUTHOR,
      license: APP_CONFIG.LICENSE,
      github: APP_CONFIG.GITHUB,
      characters: this.characters.length,
      storagePath: APP_CONFIG.STORAGE_CHARACTERS
    };
  }
}

// ═════════════════════════════════════════════════════════════════
// 🌍 GLOBAL INSTANCE
// ═════════════════════════════════════════════════════════════════

// Crear instancia global
const forge = new DnDCharacterForge();

// Hacer disponible en consola
window.forge = forge;
window.APP_CONFIG = APP_CONFIG;

// Cargar preferencias al iniciar
forge.loadPreferences();
forge.loadCharacters();

console.log('✅ D&D Character Forge - Ready to forge!');
console.log('💡 Usa "forge" en consola para acceder a la aplicación');
console.log('ℹ️ forge.showInfo() para ver detalles');

// ═════════════════════════════════════════════════════════════════
// 🎨 STYLES DE NOTIFICACIONES (inyectados dinámicamente)
// ═════════════════════════════════════════════════════════════════

const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-surface, #2a1a0f);
    color: var(--color-text, #f4e9d8);
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
    z-index: 10000;
    opacity: 0;
    transform: translateX(400px);
    transition: all 300ms ease;
    border-left: 4px solid var(--color-primary, #d4af37);
    max-width: 400px;
    word-break: break-word;
  }

  .notification--show {
    opacity: 1;
    transform: translateX(0);
  }

  .notification--success {
    border-left-color: #4caf50;
    background: rgba(76, 175, 80, 0.1);
  }

  .notification--error {
    border-left-color: #f44336;
    background: rgba(244, 67, 54, 0.1);
  }

  .notification--warning {
    border-left-color: #ff9800;
    background: rgba(255, 152, 0, 0.1);
  }

  .notification--info {
    border-left-color: #2196f3;
    background: rgba(33, 150, 243, 0.1);
  }

  .loader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }

  .spinner {
    border: 4px solid rgba(212, 175, 55, 0.2);
    border-top: 4px solid #d4af37;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .loader p {
    color: #f4e9d8;
    font-family: 'Lato', sans-serif;
    margin: 10px 0;
  }

  .loader p.text-small {
    font-size: 0.85rem;
    color: #8d6e63;
    font-style: italic;
  }
`;
document.head.appendChild(notificationStyles);

// ═════════════════════════════════════════════════════════════════
// 🎯 EVENTOS GLOBALES
// ═════════════════════════════════════════════════════════════════

// Manejar cambios en el storage desde otras pestañas
window.addEventListener('storage', (event) => {
  if (event.key === APP_CONFIG.STORAGE_CHARACTERS) {
    forge.loadCharacters();
    console.log('📡 Characters sync desde otra pestaña');
  }
  if (event.key === APP_CONFIG.STORAGE_PREFERENCES) {
    forge.loadPreferences();
    console.log('📡 Preferences sync desde otra pestaña');
  }
});

// Mostrar info en consola al cargar
console.info(`
📚 D&D CHARACTER FORGE
🐉 by José Cazorla
🔗 ${APP_CONFIG.GITHUB}
📄 ${APP_CONFIG.LICENSE} License

Comandos disponibles en consola:
  forge.showInfo()              - Mostrar información
  forge.generateStats()         - Generar 6 stats
  forge.rollDice(20)            - Tirar d20
  forge.roll4d6DropLowest()     - Tirar 4d6 drop lowest
  forge.loadCharacters()        - Cargar personajes
  forge.saveCharacter(char)     - Guardar personaje
`);
