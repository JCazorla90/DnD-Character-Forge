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


const DND_BESTIARY = {
  // Metadatos
  version: "5e",
  
  creatureTypes: [
    "Aberración", "Bestia", "Celestial", "Constructo", "Dragón", 
    "Elemental", "Feérico", "Demonio", "Gigante", "Humanoide", 
    "Monstruosidad", "Cieno", "Planta", "No-muerto"
  ],
  
  environments: [
    "Mazmorra", "Bosque", "Montaña", "Pantano", "Desierto", 
    "Subterráneo", "Ciudad", "Costa", "Ártico", "Plano Abismal",
    "Caverna", "Ruinas", "Torre"
  ],
  
  challengeRatings: [
    { cr: "0", xp: 10 }, { cr: "1/8", xp: 25 }, { cr: "1/4", xp: 50 },
    { cr: "1/2", xp: 100 }, { cr: "1", xp: 200 }, { cr: "2", xp: 450 },
    { cr: "3", xp: 700 }, { cr: "4", xp: 1100 }, { cr: "5", xp: 1800 },
    { cr: "6", xp: 2300 }, { cr: "7", xp: 2900 }, { cr: "8", xp: 3900 },
    { cr: "9", xp: 5000 }, { cr: "10", xp: 5900 }, { cr: "11", xp: 7200 },
    { cr: "12", xp: 8400 }, { cr: "13", xp: 10000 }, { cr: "14", xp: 11500 },
    { cr: "15", xp: 13000 }, { cr: "16", xp: 15000 }, { cr: "17", xp: 18000 },
    { cr: "18", xp: 20000 }, { cr: "19", xp: 22000 }, { cr: "20", xp: 25000 },
    { cr: "21", xp: 33000 }, { cr: "22", xp: 41000 }, { cr: "23", xp: 50000 },
    { cr: "24", xp: 62000 }, { cr: "25", xp: 75000 }, { cr: "26", xp: 90000 },
    { cr: "27", xp: 105000 }, { cr: "28", xp: 120000 }, { cr: "29", xp: 135000 },
    { cr: "30", xp: 155000 }
  ],
  
  // CRIATURAS BASE
  "Goblin": {
    type: "Humanoide", cr: "1/4", xp: 50, size: "Pequeño", alignment: "Malvado neutral",
    ac: 15, hp: 7, speed: "30 ft", 
    stats: { str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8 },
    environments: ["Bosque", "Mazmorra", "Urbano"],
    traits: ["Evasión Ágil: puede Desengancharse o Esconderse como acción adicional."],
    actions: ["Hoja curva: +4, 1d6 + 2 daño cortante.", "Arco corto: +4, 1d6 + 2 daño perforante."]
  },
  
  "Orco": {
    type: "Humanoide", cr: "1/2", xp: 100, size: "Mediano", alignment: "Caótico malvado",
    ac: 13, hp: 15, speed: "40 ft", 
    stats: { str: 16, dex: 12, con: 16, int: 7, wis: 11, cha: 10 },
    environments: ["Montaña", "Llanura"],
    traits: ["Agresividad: Como acción adicional, puede moverse hasta su velocidad hacia una criatura hostil."],
    actions: ["Hacha de mano: +5, 1d6 + 3 daño cortante."]
  },

  "Trol": {
    type: "Gigante", cr: "5", xp: 1800, size: "Grande", alignment: "Caótico malvado",
    ac: 15, hp: 84, speed: "30 ft",
    stats: { str: 18, dex: 13, con: 20, int: 7, wis: 9, cha: 7 },
    environments: ["Pantano", "Cueva", "Montaña"],
    traits: ["Regeneración: recupera 10 PG al inicio de su turno si no ha recibido daño de fuego o ácido."],
    actions: ["Multiataque: una mordida y dos zarpazos.", "Mordida: +7, 1d6 + 4 daño perforante.", "Zarpazo: +7, 2d6 + 4 daño cortante."]
  },
  
  "Dragon Joven Rojo": {
    type: "Dragón", cr: "10", xp: 5900, size: "Grande", alignment: "Caótico malvado",
    ac: 18, hp: 178, speed: "40 ft, vuelo 80 ft",
    stats: { str: 23, dex: 10, con: 21, int: 14, wis: 11, cha: 19 },
    environments: ["Montaña", "Caverna"],
    traits: ["Sentido Ciego 30 ft", "Percepción Pasiva 21"],
    actions: ["Multiataque: Tres ataques: uno con mordida y dos con garras.", "Mordida: +10, 2d6 + 7 daño perforante + 1d6 fuego.", "Aliento de Fuego: Cono de 30ft, CD 17, 12d6 daño de fuego."]
  },

  "Liche": {
    type: "No-muerto", cr: "21", xp: 33000, size: "Mediano", alignment: "Legal malvado",
    ac: 17, hp: 135, speed: "30 ft",
    stats: { str: 11, dex: 16, con: 16, int: 20, wis: 14, cha: 16 },
    environments: ["Fortaleza", "Torre", "Mazmorra"],
    traits: ["Paralizador Toque: Tira salvación CON CD 18 o queda paralizado.", "Resistencia a la Expulsión"],
    actions: ["Toque Paralizador: +10, 3d6 + 5 daño frío."],
    legendaryActions: ["Cantar Hechizo", "Movimiento de Invocación", "Toque Paralizador"]
  }
};
