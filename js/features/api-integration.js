/**
 * ═══════════════════════════════════════════════════════════════════
 * 🌐 D&D CHARACTER FORGE - API INTEGRATION
 * 
 * Integración con DnD5eAPI, Open5e y Lexica para imágenes
 * 
 * Copyright (c) 2025 José Cazorla
 * https://github.com/JCazorla90/DnD-Character-Forge
 * Licensed under MIT License
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

class APIIntegration {
  constructor() {
    this.dnd5eAPIBase = 'https://www.dnd5eapi.co/api';
    this.open5eAPIBase = 'https://api.open5e.com';
    this.lexicaAPIBase = 'https://lexica.art/api/v1';
    
    this.cache = {
      spells: null,
      equipment: null,
      classes: null,
      races: null,
      monsters: null,
      images: {}
    };
    
    this.cacheExpiry = 3600000; // 1 hora
    
    console.log('🌐 API Integration initialized');
  }

  // ═══════════════════════════════════════════════════════════════
  // 📖 DND5E API - SPELLS
  // ═══════════════════════════════════════════════════════════════

  async getSpells() {
    if (this.cache.spells && this.cache.spells.timestamp > Date.now() - this.cacheExpiry) {
      console.log('✅ Returning cached spells');
      return this.cache.spells.data;
    }
    
    try {
      console.log('🔄 Fetching spells from DnD5eAPI...');
      const response = await fetch(`${this.dnd5eAPIBase}/spells`);
      const data = await response.json();
      
      // Obtener detalles de los primeros 50 conjuros
      const spellPromises = data.results.slice(0, 50).map(async (spell) => {
        try {
          const detailResponse = await fetch(`${this.dnd5eAPIBase}${spell.url}`);
          return await detailResponse.json();
        } catch (err) {
          console.error(`Error loading ${spell.name}:`, err);
          return null;
        }
      });
      
      const spells = await Promise.all(spellPromises);
      const filteredSpells = spells.filter(s => s !== null);
      
      this.cache.spells = {
        data: filteredSpells,
        timestamp: Date.now()
      };
      
      console.log(`✅ Loaded ${filteredSpells.length} spells`);
      return filteredSpells;
      
    } catch (error) {
      console.error('❌ Error fetching spells:', error);
      return [];
    }
  }

  async getSpellByIndex(index) {
    try {
      const response = await fetch(`${this.dnd5eAPIBase}/spells/${index}`);
      return await response.json();
    } catch (error) {
      console.error(`❌ Error fetching spell ${index}:`, error);
      return null;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 🎒 DND5E API - EQUIPMENT
  // ═══════════════════════════════════════════════════════════════

  async getEquipment() {
    if (this.cache.equipment && this.cache.equipment.timestamp > Date.now() - this.cacheExpiry) {
      console.log('✅ Returning cached equipment');
      return this.cache.equipment.data;
    }
    
    try {
      console.log('🔄 Fetching equipment from DnD5eAPI...');
      const response = await fetch(`${this.dnd5eAPIBase}/equipment`);
      const data = await response.json();
      
      this.cache.equipment = {
        data: data.results,
        timestamp: Date.now()
      };
      
      console.log(`✅ Loaded ${data.results.length} equipment items`);
      return data.results;
      
    } catch (error) {
      console.error('❌ Error fetching equipment:', error);
      return [];
    }
  }

  async getEquipmentByIndex(index) {
    try {
      const response = await fetch(`${this.dnd5eAPIBase}/equipment/${index}`);
      return await response.json();
    } catch (error) {
      console.error(`❌ Error fetching equipment ${index}:`, error);
      return null;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 🐉 DND5E API - MONSTERS
  // ═══════════════════════════════════════════════════════════════

  async getMonsters() {
    if (this.cache.monsters && this.cache.monsters.timestamp > Date.now() - this.cacheExpiry) {
      console.log('✅ Returning cached monsters');
      return this.cache.monsters.data;
    }
    
    try {
      console.log('🔄 Fetching monsters from DnD5eAPI...');
      const response = await fetch(`${this.dnd5eAPIBase}/monsters`);
      const data = await response.json();
      
      // Cargar detalles de primeros 50 monstruos
      const monsterPromises = data.results.slice(0, 50).map(async (monster) => {
        try {
          const detailResponse = await fetch(`${this.dnd5eAPIBase}${monster.url}`);
          return await detailResponse.json();
        } catch (err) {
          console.error(`Error loading ${monster.name}:`, err);
          return null;
        }
      });
      
      const monsters = await Promise.all(monsterPromises);
      const filteredMonsters = monsters.filter(m => m !== null);
      
      this.cache.monsters = {
        data: filteredMonsters,
        timestamp: Date.now()
      };
      
      console.log(`✅ Loaded ${filteredMonsters.length} monsters`);
      return filteredMonsters;
      
    } catch (error) {
      console.error('❌ Error fetching monsters:', error);
      return [];
    }
  }

  async getMonsterByIndex(index) {
    try {
      const response = await fetch(`${this.dnd5eAPIBase}/monsters/${index}`);
      return await response.json();
    } catch (error) {
      console.error(`❌ Error fetching monster ${index}:`, error);
      return null;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 🖼️ LEXICA API - CHARACTER PORTRAITS
  // ═══════════════════════════════════════════════════════════════

  async searchCharacterPortrait(character) {
    const searchTerms = this.buildCharacterSearchTerms(character);
    
    // Verificar cache primero
    const cacheKey = searchTerms.join('_');
    if (this.cache.images[cacheKey]) {
      console.log('✅ Returning cached image');
      return this.cache.images[cacheKey];
    }
    
    try {
      console.log(`🔄 Searching Lexica for: ${searchTerms.join(' ')}`);
      
      const query = searchTerms.join(' ');
      const response = await fetch(`${this.lexicaAPIBase}/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        console.warn(`⚠️ Lexica API returned ${response.status}`);
        return null;
      }
      
      const data = await response.json();
      
      if (data.images && data.images.length > 0) {
        // Seleccionar imagen aleatoria de los primeros 10 resultados
        const randomIndex = Math.floor(Math.random() * Math.min(10, data.images.length));
        const selectedImage = data.images[randomIndex];
        
        const imageData = {
          url: selectedImage.src,
          thumbnail: selectedImage.srcSmall,
          prompt: selectedImage.prompt,
          id: selectedImage.id
        };
        
        // Guardar en cache
        this.cache.images[cacheKey] = imageData;
        
        console.log(`✅ Found character portrait`);
        return imageData;
      } else {
        console.warn('⚠️ No images found for character');
        return null;
      }
      
    } catch (error) {
      console.error('❌ Error searching Lexica:', error);
      return null;
    }
  }

  buildCharacterSearchTerms(character) {
    const terms = ['fantasy character portrait'];
    
    // Añadir raza
    if (character.race) {
      if (character.race.toLowerCase().includes('elfo')) {
        terms.push('elf');
      } else if (character.race.toLowerCase().includes('enano')) {
        terms.push('dwarf');
      } else if (character.race.toLowerCase().includes('humano')) {
        terms.push('human');
      } else if (character.race.toLowerCase().includes('orco')) {
        terms.push('orc');
      } else {
        terms.push(character.race.toLowerCase());
      }
    }
    
    // Añadir clase
    if (character.class) {
      if (character.class.toLowerCase().includes('guerrero')) {
        terms.push('warrior knight');
      } else if (character.class.toLowerCase().includes('mago')) {
        terms.push('wizard mage');
      } else if (character.class.toLowerCase().includes('pícaro')) {
        terms.push('rogue thief');
      } else if (character.class.toLowerCase().includes('clérigo')) {
        terms.push('cleric priest');
      } else if (character.class.toLowerCase().includes('bárbaro')) {
        terms.push('barbarian');
      } else {
        terms.push(character.class.toLowerCase());
      }
    }
    
    terms.push('dnd character art');
    
    return terms;
  }

  async searchMonsterImage(monsterName) {
    const cacheKey = `monster_${monsterName}`;
    
    if (this.cache.images[cacheKey]) {
      console.log('✅ Returning cached monster image');
      return this.cache.images[cacheKey];
    }
    
    try {
      console.log(`🔄 Searching Lexica for monster: ${monsterName}`);
      
      const query = `fantasy ${monsterName} creature dnd monster`;
      const response = await fetch(`${this.lexicaAPIBase}/search?q=${encodeURIComponent(query)}`);
      
      if (!response.ok) {
        console.warn(`⚠️ Lexica API returned ${response.status}`);
        return null;
      }
      
      const data = await response.json();
      
      if (data.images && data.images.length > 0) {
        const randomIndex = Math.floor(Math.random() * Math.min(5, data.images.length));
        const selectedImage = data.images[randomIndex];
        
        const imageData = {
          url: selectedImage.src,
          thumbnail: selectedImage.srcSmall,
          prompt: selectedImage.prompt,
          id: selectedImage.id
        };
        
        this.cache.images[cacheKey] = imageData;
        
        console.log(`✅ Found monster image`);
        return imageData;
      } else {
        console.warn('⚠️ No images found for monster');
        return null;
      }
      
    } catch (error) {
      console.error('❌ Error searching monster image:', error);
      return null;
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 📚 OPEN5E API - ADDITIONAL CONTENT
  // ═══════════════════════════════════════════════════════════════

  async getOpen5eSpells() {
    try {
      console.log('🔄 Fetching spells from Open5e...');
      const response = await fetch(`${this.open5eAPIBase}/spells/?limit=50`);
      const data = await response.json();
      
      console.log(`✅ Loaded ${data.results.length} Open5e spells`);
      return data.results;
      
    } catch (error) {
      console.error('❌ Error fetching Open5e spells:', error);
      return [];
    }
  }

  async getOpen5eMonsters() {
    try {
      console.log('🔄 Fetching monsters from Open5e...');
      const response = await fetch(`${this.open5eAPIBase}/monsters/?limit=50`);
      const data = await response.json();
      
      console.log(`✅ Loaded ${data.results.length} Open5e monsters`);
      return data.results;
      
    } catch (error) {
      console.error('❌ Error fetching Open5e monsters:', error);
      return [];
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // 🔄 CACHE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════

  clearCache() {
    this.cache = {
      spells: null,
      equipment: null,
      classes: null,
      races: null,
      monsters: null,
      images: {}
    };
    console.log('🗑️ Cache cleared');
  }

  getCacheStats() {
    return {
      spells: this.cache.spells ? this.cache.spells.data.length : 0,
      equipment: this.cache.equipment ? this.cache.equipment.data.length : 0,
      monsters: this.cache.monsters ? this.cache.monsters.data.length : 0,
      images: Object.keys(this.cache.images).length
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // 🛠️ UTILITY FUNCTIONS
  // ═══════════════════════════════════════════════════════════════

  async testAPIs() {
    console.log('🧪 Testing API connections...');
    
    const results = {
      dnd5eAPI: false,
      open5eAPI: false,
      lexicaAPI: false
    };
    
    // Test DnD5eAPI
    try {
      const response = await fetch(`${this.dnd5eAPIBase}/spells`, { method: 'HEAD' });
      results.dnd5eAPI = response.ok;
    } catch (e) {
      results.dnd5eAPI = false;
    }
    
    // Test Open5e
    try {
      const response = await fetch(`${this.open5eAPIBase}/spells/`, { method: 'HEAD' });
      results.open5eAPI = response.ok;
    } catch (e) {
      results.open5eAPI = false;
    }
    
    // Test Lexica
    try {
      const response = await fetch(`${this.lexicaAPIBase}/search?q=test`, { method: 'HEAD' });
      results.lexicaAPI = response.ok;
    } catch (e) {
      results.lexicaAPI = false;
    }
    
    console.log('📊 API Test Results:', results);
    return results;
  }

  async preloadEssentialData() {
    console.log('⚡ Preloading essential data...');
    
    await Promise.all([
      this.getSpells(),
      this.getEquipment(),
      this.getMonsters()
    ]);
    
    console.log('✅ Essential data preloaded');
  }
}

// ═══════════════════════════════════════════════════════════════
// 🌍 GLOBAL INSTANCE
// ═══════════════════════════════════════════════════════════════

const apiIntegration = new APIIntegration();
window.apiIntegration = apiIntegration;

// Auto-test APIs on load
apiIntegration.testAPIs().then(results => {
  console.log('🌐 API Integration ready');
  console.log(`   DnD5eAPI: ${results.dnd5eAPI ? '✅' : '❌'}`);
  console.log(`   Open5e: ${results.open5eAPI ? '✅' : '❌'}`);
  console.log(`   Lexica: ${results.lexicaAPI ? '✅' : '❌'}`);
});

console.log('✅ API Integration module loaded');
