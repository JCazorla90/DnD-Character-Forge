/**
 * ═══════════════════════════════════════════════════════════════════
 * 🐉 D&D CHARACTER FORGE - GAME DATA
 * 
 * Datos de Razas, Clases, Trasfondos y más para D&D 5e
 * 
 * Copyright (c) 2025 José Cazorla
 * https://github.com/JCazorla90/DnD-Character-Forge
 * Licensed under MIT License
 * 
 * Contenido bajo OGL 5.1
 * 
 * @author José Cazorla
 * @license MIT
 * ═══════════════════════════════════════════════════════════════════
 */

'use strict';

// ═════════════════════════════════════════════════════════════════
// 📚 D&D 5e GAME DATA
// ═════════════════════════════════════════════════════════════════

const DND_DATA = {
  version: '5e',
  lastUpdated: new Date().toISOString(),
  attribution: 'D&D Character Forge by José Cazorla (https://github.com/JCazorla90/DnD-Character-Forge)',

  // ═════════════════════════════════════════════════════════════════
  // 🎭 RAZAS
  // ═════════════════════════════════════════════════════════════════
  
  races: {
    'Humano': {
      speed: 30,
      size: 'Mediano',
      alignment: 'Cualquiera',
      languages: ['Común'],
      traits: [
        '+1 a todas las características',
        'Idioma adicional de tu elección',
        'Dote adicional en nivel 1'
      ],
      description: 'Los humanos son versátiles y ambiciosos. Viven poco en comparación con otras razas, pero logran mucho en ese tiempo.'
    },
    'Elfo': {
      speed: 30,
      size: 'Mediano',
      alignment: 'Típicamente caótico',
      languages: ['Común', 'Élfico'],
      traits: [
        'Visión en la oscuridad (60 ft)',
        'Ventaja contra encantamiento',
        'Inmune a sueño mágico',
        'Percepción competente'
      ],
      subraces: ['Alto', 'Bosque', 'Oscuro'],
      description: 'Los elfos son un pueblo hermoso y elegante, magnífico en su arte y lore. Viven poco comparándose con sus civilizaciones, pero se destacan profundamente en su ser.'
    },
    'Enano': {
      speed: 25,
      size: 'Mediano',
      alignment: 'Típicamente legal',
      languages: ['Común', 'Enano'],
      traits: [
        'Visión en la oscuridad (60 ft)',
        'Ventaja contra veneno',
        'Competente con herramientas de artesano',
        'Conocimiento de piedra'
      ],
      subraces: ['Montaña', 'Colina'],
      description: 'Los enanos son guerreros robustos que resultan ser excelentes mineros. Su capacidad para el trabajo es famosa en todo el reino.'
    },
    'Mediano': {
      speed: 25,
      size: 'Pequeño',
      alignment: 'Típicamente legal',
      languages: ['Común', 'Medianos'],
      traits: [
        '+2 Destreza',
        'Afortunado: repite 1s en dados de ataque',
        'Valiente: ventaja contra miedo',
        'Agilidad mediana: atravesar criaturas grandes'
      ],
      subraces: ['Pies Ligeros', 'Robustos'],
      description: 'Los medianos son pueblos pequeños pero resistentes, conocidos por su suerte y ingenio. Son muy aficionados a la comodidad de su hogar.'
    },
    'Orco': {
      speed: 30,
      size: 'Mediano',
      alignment: 'Típicamente caótico',
      languages: ['Común', 'Orco'],
      traits: [
        '+2 Fuerza, +1 Constitución',
        'Visión en la oscuridad (60 ft)',
        'Agresivo: bonus action para moverse',
        'Amenazador: competente en Intimidación'
      ],
      description: 'Los orcos son los hijos de Gruumsh, de gran estatura, fuerza y poder. Son conocidos como una raza brutal pero noble.'
    },
    'Tiefling': {
      speed: 30,
      size: 'Mediano',
      alignment: 'Típicamente caótico',
      languages: ['Común', 'Infernal'],
      traits: [
        '+2 Carisma, +1 Inteligencia',
        'Visión en la oscuridad (60 ft)',
        'Resistencia infernal: resistencia a fuego',
        'Legado infernal: magia innata'
      ],
      description: 'Los tieflings son descendientes parcialmente infernales, distinguidos por su apariencia demoniaca. Muchos soportan una carga de prejuicio por su naturaleza.'
    },
    'Dracónido': {
      speed: 30,
      size: 'Mediano',
      alignment: 'Típicamente legal',
      languages: ['Común', 'Dracónico'],
      traits: [
        '+2 Fuerza, +1 Carisma',
        'Ancestro dracónico: resistencia elemental',
        'Arma de aliento: 1 uso por descanso corto',
        'Daño del aliento: 2d6'
      ],
      description: 'Los dracónidos son descendientes de dragones con cuerpos humanoides. Tienen habilidades y capacidades heredadas de sus ancestros dracónicos.'
    },
    'Gnomo': {
      speed: 25,
      size: 'Pequeño',
      alignment: 'Típicamente neutral',
      languages: ['Común', 'Gnómico'],
      traits: [
        '+2 Inteligencia',
        'Visión en la oscuridad (60 ft)',
        'Astucia gnómica: ventaja vs magia',
        'Pequeño pero valiente'
      ],
      subraces: ['Bosque', 'Roca'],
      description: 'Los gnomos son criaturas brillantes y maestros de la ingeniería. Tienen una gran afinidad por la magia y los trabajos mágicos.'
    },
    'Semielfo': {
      speed: 30,
      size: 'Mediano',
      alignment: 'Típicamente caótico',
      languages: ['Común', 'Élfico'],
      traits: [
        '+2 Carisma, +1 a otras dos características',
        'Visión en la oscuridad (60 ft)',
        'Ventaja contra encantamiento',
        'Dos habilidades adicionales competentes'
      ],
      description: 'Los semieifos tienen la flexibilidad del carácter humano y el potencial artístico de los elfos.'
    },
    'Semiorco': {
      speed: 30,
      size: 'Mediano',
      alignment: 'Típicamente caótico',
      languages: ['Común', 'Orco'],
      traits: [
        '+2 Fuerza, +1 Constitución',
        'Visión en la oscuridad (60 ft)',
        'Amenazador: competente en Intimidación',
        'Resistencia implacable: 1/día quedar con 1 HP'
      ],
      description: 'Los semiorcos tienen la agilidad de los humanos y el poder de los orcos. A menudo sufren por su herencia mixta.'
    }
  },

  // ═════════════════════════════════════════════════════════════════
  // ⚔️ CLASES
  // ═════════════════════════════════════════════════════════════════

  classes: {
    'Guerrero': {
      hitDie: 10,
      primaryAbility: 'Fuerza o Destreza',
      savingThrows: ['Fuerza', 'Constitución'],
      proficiencies: ['Todas las armaduras', 'Todos los escudos', 'Todas las armas'],
      skills: 'Elige 2: Acrobacias, Trato con animales, Atletismo, Historia, Perspicacia, Intimidación, Percepción, Supervivencia',
      features: ['Segundo aliento', 'Estilo de lucha', 'Oleada de acción', 'Ataque extra'],
      description: 'Un guerrero adiestrado en combate, maestro de armas y armadura.'
    },
    'Mago': {
      hitDie: 6,
      primaryAbility: 'Inteligencia',
      savingThrows: ['Inteligencia', 'Sabiduría'],
      proficiencies: ['Armas simples', 'Dagas, dardos, hondas, bastones, ballestas ligeras'],
      skills: 'Elige 2: Arcana, Historia, Perspicacia, Investigación, Medicina, Religión',
      features: ['Lanzamiento de conjuros', 'Libro de conjuros', 'Recuperación arcana', 'Tradición arcana'],
      spellcasting: true,
      description: 'Un eruditado practicante del arte arcano, maestro de la magia.'
    },
    'Pícaro': {
      hitDie: 8,
      primaryAbility: 'Destreza',
      savingThrows: ['Destreza', 'Inteligencia'],
      proficiencies: ['Armadura ligera', 'Armas simples', 'Ballestas de mano, estoques, espadas cortas'],
      skills: 'Elige 4: Acrobacias, Atletismo, Engaño, Perspicacia, Intimidación, Investigación, Percepción, Interpretación, Persuasión, Juego de manos, Sigilo',
      features: ['Ataque furtivo', 'Pericia', 'Acción astuta', 'Esquiva asombrosa', 'Evasión'],
      description: 'Un experto en sigilo y emboscadas, maestro de la destreza.'
    },
    'Clérigo': {
      hitDie: 8,
      primaryAbility: 'Sabiduría',
      savingThrows: ['Sabiduría', 'Carisma'],
      proficiencies: ['Armadura ligera, media y escudos', 'Armas simples'],
      skills: 'Elige 2: Historia, Perspicacia, Medicina, Persuasión, Religión',
      features: ['Lanzamiento de conjuros', 'Dominio divino', 'Canalizar divinidad', 'Imposición de manos'],
      spellcasting: true,
      description: 'Un devoto de una deidad, un mediador entre el mundo mortal y el divino.'
    },
    'Paladín': {
      hitDie: 10,
      primaryAbility: 'Fuerza, Carisma',
      savingThrows: ['Sabiduría', 'Carisma'],
      proficiencies: ['Todas las armaduras', 'Todos los escudos', 'Todas las armas'],
      skills: 'Elige 2: Atletismo, Perspicacia, Intimidación, Medicina, Persuasión, Religión',
      features: ['Imposición de manos', 'Estilo de lucha', 'Juramento sagrado', 'Golpe divino', 'Salud divina'],
      spellcasting: true,
      description: 'Un guerrero consagrado, ligado a un juramento sagrado.'
    },
    'Bárbaro': {
      hitDie: 12,
      primaryAbility: 'Fuerza',
      savingThrows: ['Fuerza', 'Constitución'],
      proficiencies: ['Armadura ligera, media', 'Escudos', 'Todas las armas simples', 'Todas las armas marciales'],
      skills: 'Elige 2: Trato con animales, Atletismo, Intimidación, Naturaleza, Percepción, Supervivencia',
      features: ['Furia', 'Defensa sin armadura', 'Ataque temerario', 'Sentido del peligro'],
      description: 'Un guerrero salvaje, alimentado por la ira primitiva.'
    },
    'Druida': {
      hitDie: 8,
      primaryAbility: 'Sabiduría',
      savingThrows: ['Inteligencia', 'Sabiduría'],
      proficiencies: ['Armadura ligera, media (no metal)', 'Escudos (no metal)', 'Armas simples'],
      skills: 'Elige 2: Trato con animales, Arcana, Perspicacia, Medicina, Naturaleza, Percepción, Religión, Supervivencia',
      features: ['Lanzamiento de conjuros', 'Forma salvaje', 'Círculo druídico', 'Mejora salvaje'],
      spellcasting: true,
      description: 'Un guardián de la naturaleza, uno con el mundo salvaje.'
    },
    'Bardo': {
      hitDie: 8,
      primaryAbility: 'Carisma',
      savingThrows: ['Destreza', 'Carisma'],
      proficiencies: ['Armadura ligera', 'Armas simples', 'Ballestas de mano, estoques, espadas cortas'],
      skills: 'Elige 3 cualquiera',
      features: ['Lanzamiento de conjuros', 'Inspiración bárdica', 'Canción de descanso', 'Pericia', 'Colegio de bardos'],
      spellcasting: true,
      description: 'Un hechicero músico, un tejedot de magia y palabra.'
    },
    'Monje': {
      hitDie: 8,
      primaryAbility: 'Destreza o Sabiduría',
      savingThrows: ['Fuerza', 'Destreza'],
      proficiencies: ['Armas simples', 'Estoques cortos'],
      skills: 'Elige 2: Acrobacias, Atletismo, Historia, Perspicacia, Religión, Sigilo',
      features: ['Defensa sin armadura', 'Artes marciales', 'Ki', 'Movimiento sin armadura', 'Tradición monástica'],
      description: 'Un maestro de combate desarmado, entrenado en el arte de la disciplina.'
    },
    'Explorador': {
      hitDie: 10,
      primaryAbility: 'Destreza, Sabiduría',
      savingThrows: ['Fuerza', 'Destreza'],
      proficiencies: ['Armadura ligera, media', 'Escudos', 'Todas las armas simples', 'Todas las armas marciales'],
      skills: 'Elige 3: Trato con animales, Atletismo, Perspicacia, Investigación, Naturaleza, Percepción, Sigilo, Supervivencia',
      features: ['Enemigo predilecto', 'Explorador nato', 'Estilo de lucha', 'Lanzamiento de conjuros', 'Arquetipo'],
      spellcasting: true,
      description: 'Un aventurero de las tierras salvajes, maestro del rastreo y la caza.'
    },
    'Brujo': {
      hitDie: 8,
      primaryAbility: 'Carisma',
      savingThrows: ['Sabiduría', 'Carisma'],
      proficiencies: ['Armadura ligera', 'Armas simples'],
      skills: 'Elige 2: Arcana, Engaño, Historia, Intimidación, Investigación, Naturaleza, Religión',
      features: ['Lanzamiento de conjuros', 'Pacto sobrenatural', 'Característica de patrón', 'Invocaciones arcanas'],
      spellcasting: true,
      description: 'Un hacedor de pactos, que ha vendido su alma por poder sobrenatural.'
    },
    'Hechicero': {
      hitDie: 6,
      primaryAbility: 'Carisma',
      savingThrows: ['Constitución', 'Carisma'],
      proficiencies: ['Armas simples', 'Dagas, dardos, hondas, bastones, ballestas ligeras'],
      skills: 'Elige 2: Arcana, Engaño, Perspicacia, Intimidación, Persuasión, Religión',
      features: ['Lanzamiento de conjuros', 'Magia innata', 'Origen sobrenatural', 'Fuente de hechicería'],
      spellcasting: true,
      description: 'Un poseedor de magia innata, un canalizador de poder arcano natural.'
    }
  },

  // ═════════════════════════════════════════════════════════════════
  // 📜 TRASFONDOS
  // ═════════════════════════════════════════════════════════════════

  backgrounds: {
    'Acolito': {
      skills: ['Perspicacia', 'Religión'],
      tools: ['Kit de herbolario'],
      equipment: ['Símbolo sagrado', 'Libro de plegarias', 'Ropa de religioso', '15 gp'],
      feature: 'Asilo seguro - Los templos te proporcionarán refugio y sustento'
    },
    'Criminal': {
      skills: ['Engaño', 'Sigilo'],
      tools: ['Kit de herramientas de ladrón', 'Dado'],
      equipment: ['Seda roja', 'Kit de herramientas de ladrón', 'Dado trucos', '15 gp'],
      feature: 'Contacto criminal - Tienes una conexión con la red criminal'
    },
    'Folkheroi': {
      skills: ['Trato con animales', 'Supervivencia'],
      tools: ['Herramientas de artesano', 'Vehículos (tierra)'],
      equipment: ['Hoz', 'Manta de viajero', '10 gp'],
      feature: 'Rusticidad - Los pueblos te proporcionan refugio y alimento'
    },
    'Noble': {
      skills: ['Perspicacia', 'Persuasión'],
      tools: ['Un juego de mesa o instrumento musical'],
      equipment: ['Fina ropa', 'Sello de casa', '25 gp'],
      feature: 'Posición - Tienes conexiones e influencia en tu hogar'
    },
    'Sabio': {
      skills: ['Arcana', 'Historia'],
      tools: ['Kit de escolástico'],
      equipment: ['Fina ropa', 'Tintero', 'Pergamino', 'Libro de conocimiento', '10 gp'],
      feature: 'Investigador - Tienes acceso a las bibliotecas'
    },
    'Soldado': {
      skills: ['Atletismo', 'Intimidación'],
      tools: ['Juegos de mesa o vehículos'],
      equipment: ['Uniforme militar', 'Insignia de rango', 'Manta de viajero', '10 gp'],
      feature: 'Rango militar - Tienes autoridad militar en tu ejército'
    },
    'Charlatán': {
      skills: ['Engaño', 'Juego de manos'],
      tools: ['Kit de disfraz', 'Kit de falsificación'],
      equipment: ['Ropa elegante', 'Kit de disfraz', 'Kit de falsificación', '15 gp'],
      feature: 'Falsificador de identidades - Puedes crear documentos falsos'
    },
    'Aventurero': {
      skills: ['Atletismo', 'Supervivencia'],
      tools: ['Herramientas de escalada'],
      equipment: ['Mochila de explorador', 'Cuerda de 50 pies', '10 gp'],
      feature: 'Explorador nato - Encuentras camino más fácilmente'
    }
  },

  // ═════════════════════════════════════════════════════════════════
  // 🔄 ALINEAMIENTOS
  // ═════════════════════════════════════════════════════════════════

  alignments: [
    'Legal Bueno',
    'Neutral Bueno',
    'Caótico Bueno',
    'Legal Neutral',
    'Neutral',
    'Caótico Neutral',
    'Legal Malo',
    'Neutral Malo',
    'Caótico Malo'
  ],

  // ═════════════════════════════════════════════════════════════════
  // 📊 ESTÁNDARES
  // ═════════════════════════════════════════════════════════════════

  standardArray: [15, 14, 13, 12, 10, 8],

  pointBuyCosts: {
    8: 0,
    9: 1,
    10: 2,
    11: 3,
    12: 4,
    13: 5,
    14: 7,
    15: 9
  },

  // ═════════════════════════════════════════════════════════════════
  // 🛡️ HABILIDADES (resumen)
  // ═════════════════════════════════════════════════════════════════

  skills: [
    'Acrobacias',
    'Trato con Animales',
    'Arcana',
    'Atletismo',
    'Engaño',
    'Historia',
    'Perspicacia',
    'Intimidación',
    'Investigación',
    'Medicina',
    'Naturaleza',
    'Percepción',
    'Interpretación',
    'Persuasión',
    'Religión',
    'Sigilo',
    'Supervivencia',
    'Juego de manos'
  ]
};

// ═════════════════════════════════════════════════════════════════
// 🌍 EXPORTAR GLOBAL
// ═════════════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
  window.DND_DATA = DND_DATA;
  console.log('✅ D&D Game Data cargado');
  console.log(`📚 ${Object.keys(DND_DATA.races).length} razas disponibles`);
  console.log(`⚔️ ${Object.keys(DND_DATA.classes).length} clases disponibles`);
  console.log(`📜 ${Object.keys(DND_DATA.backgrounds).length} trasfondos disponibles`);
  console.log(`📊 ${DND_DATA.skills.length} habilidades disponibles`);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DND_DATA;
}
