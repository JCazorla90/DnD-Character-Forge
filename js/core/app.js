/*!
 * D&D Character Forge & NFT Generator
 * © 2025 José Cazorla Gijón (@JCazorla90)
 * Licencia: MIT (ver LICENSE en el repositorio)
 * Repos:
 *  - https://github.com/JCazorla90/DnD-Character-Forge
 *  - https://github.com/JCazorla90/dnd-nft-generator
 */

// =======================
//  I18N / IDIOMAS
// =======================

const SUPPORTED_LANGS = ['es', 'ca', 'eu', 'gl', 'en'];

const I18N_STRINGS = {
  es: {
    'header.title': '🐲 D&D Character Forge 🛡️',
    'header.subtitle': 'Generador de personajes para Dungeons & Dragons 5e con ficha completa y soporte NFT.',
    'header.subtitle2': 'Fusión de D&D Character Forge + DnD NFT Generator – 100% gratis, sin backend y funcionando en GitHub Pages.',
    'language.label': 'Idioma:',
    'language.auto': 'Detectar idioma',
    'generator.title': '⚔️ Crear personaje',
    'generator.random': '🎲 Generar aleatorio',
    'generator.customToggle': '✏️ Personalizar',
    'generator.customTitle': 'Personalizar personaje',
    'generator.charNameLabel': 'Nombre del personaje:',
    'generator.race': 'Raza:',
    'generator.class': 'Clase:',
    'generator.background': 'Trasfondo:',
    'generator.alignment': 'Alineamiento:',
    'generator.customButton': '✨ Crear personalizado',
    'sheet.title': 'Personaje generado',
    'sheet.downloadPdf': '📥 Descargar PDF',
    'sheet.exportNft': '🔗 Exportar NFT (JSON + PNG)',
    'sheet.basicInfo': '📋 Información básica',
    'sheet.name': 'Nombre:',
    'sheet.race': 'Raza:',
    'sheet.class': 'Clase:',
    'sheet.level': 'Nivel:',
    'sheet.background': 'Trasfondo:',
    'sheet.alignment': 'Alineamiento:',
    'sheet.stats': '💪 Características',
    'sheet.combat': '🛡️ Combate',
    'sheet.hp': 'Puntos de golpe:',
    'sheet.ac': 'Clase de armadura:',
    'sheet.speed': 'Velocidad:',
    'sheet.init': 'Iniciativa:',
    'sheet.defenses': '🎲 Salvaciones y habilidades',
    'sheet.savingThrows': 'Tiradas de salvación competentes:',
    'sheet.skills': 'Habilidades clave de clase:',
    'sheet.equipment': '🎒 Equipo inicial',
    'sheet.backgroundTitle': 'Trasfondo:',
    'sheet.backgroundSkills': 'Habilidades:',
    'sheet.backgroundFeature': 'Rasgo:',
    'sheet.backgroundEquipmentTitle': 'Equipo de trasfondo:',
    'sheet.racialTraits': '🎭 Rasgos raciales',
    'sheet.classProficiencies': '⚔️ Competencias y rasgos de clase',
    'sheet.classFeatures': '✨ Características de clase',
    'sheet.newChar': '🔄 Nuevo personaje',
    'sheet.share': '📤 Compartir',
    'footer.brand': 'D&D Character Forge – Ficha D&D 5e + NFT export',
    'footer.legal': 'Sistema de Referencia D&D 5e (SRD 5.1). No afiliado a Wizards of the Coast. Creado con ❤️ por la comunidad.'
  },
  // Por ahora, otros idiomas reutilizan ES como fallback.
  // Más adelante se pueden traducir de verdad.
  en: {},
  ca: {},
  eu: {},
  gl: {}
};

function detectUserLang() {
  const saved = localStorage.getItem('dndcf_lang');
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

  const navLangRaw = (navigator.language || navigator.userLanguage || 'es').toLowerCase();

  if (navLangRaw.startsWith('es')) return 'es';
  if (navLangRaw.startsWith('ca') || navLangRaw.includes('valen')) return 'ca';
  if (navLangRaw.startsWith('eu')) return 'eu';
  if (navLangRaw.startsWith('gl')) return 'gl';
  if (navLangRaw.startsWith('en')) return 'en';

  return 'es';
}

function translateDocument(lang) {
  const realLang = SUPPORTED_LANGS.includes(lang) ? lang : 'es';
  document.documentElement.lang = realLang;

  const strings = I18N_STRINGS[realLang] || {};
  const esStrings = I18N_STRINGS.es;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const value =
      (strings && strings[key]) ||
      (esStrings && esStrings[key]) ||
      el.textContent;
    if (value) el.textContent = value;
  });

  // Título del documento
  if (realLang === 'es') {
    document.title = '🐲 D&D Character Forge – Generador de Personajes D&D + NFT';
  } else if (realLang === 'en') {
    document.title = '🐲 D&D Character Forge – D&D Character Generator + NFT Export';
  }
}

function initI18n() {
  const langSelect = document.getElementById('languageSelect');
  if (!langSelect) return;

  const lang = detectUserLang();
  translateDocument(lang);

  // Ajustar el selector (si coincide con uno soportado)
  if (SUPPORTED_LANGS.includes(lang)) {
    langSelect.value = lang;
  } else {
    langSelect.value = 'auto';
  }

  langSelect.addEventListener('change', () => {
    const value = langSelect.value;
    if (value === 'auto') {
      localStorage.removeItem('dndcf_lang');
      translateDocument(detectUserLang());
    } else {
      localStorage.setItem('dndcf_lang', value);
      translateDocument(value);
    }
  });
}

// =======================
//  ESTADO GLOBAL Y UTILIDADES
// =======================

let currentCharacter = null;

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rollDice(sides) {
  return Math.floor(Math.random() * sides) + 1;
}

function calculateModifier(stat) {
  return Math.floor((stat - 10) / 2);
}

function generateStats() {
  // 4d6 drop lowest
  const rollStat = () => {
    const rolls = [rollDice(6), rollDice(6), rollDice(6), rollDice(6)];
    rolls.sort((a, b) => a - b);
    return rolls.slice(1).reduce((a, b) => a + b, 0);
  };

  return {
    strength: rollStat(),
    dexterity: rollStat(),
    constitution: rollStat(),
    intelligence: rollStat(),
    wisdom: rollStat(),
    charisma: rollStat()
  };
}

// =======================
//  GENERACIÓN DE PERSONAJE
// =======================

function generateCharacter(customData = {}) {
  const race = customData.race || randomFromArray(Object.keys(DND_DATA.races));
  const charClass = customData.class || randomFromArray(Object.keys(DND_DATA.classes));
  const background = customData.background || randomFromArray(Object.keys(DND_DATA.backgrounds));
  const alignment = customData.alignment || randomFromArray(DND_DATA.alignments);

  const stats = generateStats();
  const classData = DND_DATA.classes[charClass];
  const raceData = DND_DATA.races[race];
  const backgroundData = DND_DATA.backgrounds[background];

  const hp = classData.hitDie + calculateModifier(stats.constitution);
  const ac = 10 + calculateModifier(stats.dexterity);

  return {
    name: customData.name || `${race} el ${charClass}`,
    race,
    class: charClass,
    background,
    alignment,
    level: 1,
    stats,
    hp,
    ac,
    speed: raceData.speed,
    racialTraits: raceData.traits,
    classProficiencies: classData.proficiencies,
    classFeatures: classData.features,
    savingThrows: classData.savingThrows,
    skills: classData.skills,
    equipment: classData.equipment,
    backgroundData
  };
}

function displayCharacter(character) {
  currentCharacter = character;

  // Información básica
  document.getElementById('displayName').textContent = character.name;
  document.getElementById('displayRace').textContent = character.race;
  document.getElementById('displayClass').textContent = character.class;
  document.getElementById('displayLevel').textContent = character.level;
  document.getElementById('displayBackground').textContent = character.background;
  document.getElementById('displayAlignment').textContent = character.alignment;

  // Stats
  const stats = [
    { id: 'Str', value: character.stats.strength },
    { id: 'Dex', value: character.stats.dexterity },
    { id: 'Con', value: character.stats.constitution },
    { id: 'Int', value: character.stats.intelligence },
    { id: 'Wis', value: character.stats.wisdom },
    { id: 'Cha', value: character.stats.charisma }
  ];

  stats.forEach(stat => {
    const modifier = calculateModifier(stat.value);
    const statEl = document.getElementById(`stat${stat.id}`);
    const modEl = document.getElementById(`mod${stat.id}`);
    if (statEl) statEl.textContent = stat.value;
    if (modEl) modEl.textContent = (modifier >= 0 ? '+' : '') + modifier;
  });

  // Combate
  document.getElementById('displayHP').textContent = character.hp;
  document.getElementById('displayAC').textContent = character.ac;
  document.getElementById('displaySpeed').textContent = `${character.speed} ft`;
  document.getElementById('displayInit').textContent =
    (calculateModifier(character.stats.dexterity) >= 0 ? '+' : '') +
    calculateModifier(character.stats.dexterity);

  // Salvaciones / skills
  document.getElementById('displaySavingThrows').textContent = character.savingThrows.join(', ');
  document.getElementById('displaySkills').textContent = character.skills;

  // Equipo clase
  document.getElementById('equipment').innerHTML = character.equipment
    .map(item => `<li>• ${item}</li>`)
    .join('');

  // Trasfondo
  document.getElementById('backgroundName').textContent = character.background;
  document.getElementById('backgroundSkills').textContent = character.backgroundData.skills.join(', ');
  document.getElementById('backgroundFeature').textContent = character.backgroundData.feature;
  document.getElementById('backgroundEquipment').innerHTML = character.backgroundData.equipment
    .map(item => `<li>• ${item}</li>`)
    .join('');

  // Rasgos raciales
  document.getElementById('racialTraits').innerHTML = character.racialTraits
    .map(trait => `<li>• ${trait}</li>`)
    .join('');

  // Competencias / características de clase
  document.getElementById('classProficiencies').innerHTML = character.classProficiencies
    .map(prof => `<li>• ${prof}</li>`)
    .join('');

  document.getElementById('classFeatures').innerHTML = character.classFeatures
    .map(feature => `<li>• ${feature}</li>`)
    .join('');

  // Mostrar ficha
  document.getElementById('characterSheet').classList.remove('hidden');
  const nftBtn = document.getElementById('mintNFTBtn');
  if (nftBtn) nftBtn.style.display = 'inline-block';

  document.getElementById('characterSheet').scrollIntoView({ behavior: 'smooth' });

  saveCharacterToStorage(character);
  celebrateCharacterCreation();
}

// =======================
//  SELECTS / FORMULARIO
// =======================

function populateSelects() {
  const raceSelect = document.getElementById('raceSelect');
  const classSelect = document.getElementById('classSelect');
  const backgroundSelect = document.getElementById('backgroundSelect');
  const alignmentSelect = document.getElementById('alignmentSelect');

  if (!raceSelect || !classSelect || !backgroundSelect || !alignmentSelect) return;

  // Razas
  Object.keys(DND_DATA.races).forEach(race => {
    const option = document.createElement('option');
    option.value = race;
    option.textContent = race;
    raceSelect.appendChild(option);
  });

  // Clases
  Object.keys(DND_DATA.classes).forEach(cls => {
    const option = document.createElement('option');
    option.value = cls;
    option.textContent = cls;
    classSelect.appendChild(option);
  });

  // Trasfondos
  Object.keys(DND_DATA.backgrounds).forEach(bg => {
    const option = document.createElement('option');
    option.value = bg;
    option.textContent = bg;
    backgroundSelect.appendChild(option);
  });

  // Alineamientos
  DND_DATA.alignments.forEach(align => {
    const option = document.createElement('option');
    option.value = align;
    option.textContent = align;
    alignmentSelect.appendChild(option);
  });
}

// =======================
//  GENERACIÓN DE PDF (igual que antes)
// =======================

async function generatePDF() {
  if (!currentCharacter) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 20;

  // Header
  doc.setFontSize(22);
  doc.setTextColor(102, 126, 234);
  doc.text(currentCharacter.name, 105, y, { align: 'center' });

  y += 10;
  doc.setFontSize(12);
  doc.setTextColor(118, 75, 162);
  doc.text(
    `${currentCharacter.race} ${currentCharacter.class} - Nivel ${currentCharacter.level}`,
    105,
    y,
    { align: 'center' }
  );

  y += 15;
  doc.setLineWidth(0.5);
  doc.setDrawColor(102, 126, 234);
  doc.line(20, y, 190, y);

  // Info básica
  y += 10;
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.setFont(undefined, 'bold');
  doc.text('INFORMACIÓN BÁSICA', 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Raza: ${currentCharacter.race}`, 20, y); y += 5;
  doc.text(`Clase: ${currentCharacter.class}`, 20, y); y += 5;
  doc.text(`Nivel: ${currentCharacter.level}`, 20, y); y += 5;
  doc.text(`Trasfondo: ${currentCharacter.background}`, 20, y); y += 5;
  doc.text(`Alineamiento: ${currentCharacter.alignment}`, 20, y); y += 5;

  // Stats
  y += 10;
  if (y > 260) { doc.addPage(); y = 20; }
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('CARACTERÍSTICAS', 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');

  const statLines = [
    `FUE: ${currentCharacter.stats.strength} (${formatModifier(calculateModifier(currentCharacter.stats.strength))})`,
    `DES: ${currentCharacter.stats.dexterity} (${formatModifier(calculateModifier(currentCharacter.stats.dexterity))})`,
    `CON: ${currentCharacter.stats.constitution} (${formatModifier(calculateModifier(currentCharacter.stats.constitution))})`,
    `INT: ${currentCharacter.stats.intelligence} (${formatModifier(calculateModifier(currentCharacter.stats.intelligence))})`,
    `SAB: ${currentCharacter.stats.wisdom} (${formatModifier(calculateModifier(currentCharacter.stats.wisdom))})`,
    `CAR: ${currentCharacter.stats.charisma} (${formatModifier(calculateModifier(currentCharacter.stats.charisma))})`
  ];

  statLines.forEach(line => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.text(line, 20, y);
    y += 5;
  });

  // Combate
  y += 10;
  if (y > 260) { doc.addPage(); y = 20; }
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('COMBATE', 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(`Puntos de golpe: ${currentCharacter.hp}`, 20, y); y += 5;
  doc.text(`CA: ${currentCharacter.ac}`, 20, y); y += 5;
  doc.text(`Velocidad: ${currentCharacter.speed} ft`, 20, y); y += 5;
  doc.text(`Iniciativa: ${formatModifier(calculateModifier(currentCharacter.stats.dexterity))}`, 20, y); y += 5;

  // Salvaciones y habilidades
  y += 10;
  if (y > 260) { doc.addPage(); y = 20; }
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('SALVACIONES Y HABILIDADES', 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text('Tiradas de salvación: ' + currentCharacter.savingThrows.join(', '), 20, y); y += 5;
  doc.text('Habilidades: ' + currentCharacter.skills, 20, y); y += 5;

  // Rasgos raciales
  y += 10;
  if (y > 260) { doc.addPage(); y = 20; }
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('RASGOS RACIALES', 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  currentCharacter.racialTraits.forEach(trait => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.text(`• ${trait}`, 20, y);
    y += 5;
  });

  // Competencias de clase
  y += 10;
  if (y > 260) { doc.addPage(); y = 20; }
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('COMPETENCIAS Y RASGOS DE CLASE', 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  currentCharacter.classProficiencies.forEach(prof => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.text(`• ${prof}`, 20, y);
    y += 5;
  });

  // Características de clase
  y += 10;
  if (y > 260) { doc.addPage(); y = 20; }
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('CARACTERÍSTICAS DE CLASE', 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  currentCharacter.classFeatures.forEach(feature => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.text(`• ${feature}`, 20, y);
    y += 5;
  });

  // Equipo
  y += 10;
  if (y > 260) { doc.addPage(); y = 20; }
  doc.setFontSize(14);
  doc.setFont(undefined, 'bold');
  doc.text('EQUIPO INICIAL', 20, y);

  y += 8;
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  currentCharacter.equipment.forEach(item => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.text(`• ${item}`, 20, y);
    y += 5;
  });

  // Equipo de trasfondo
  y += 8;
  if (y > 270) { doc.addPage(); y = 20; }
  doc.setFont(undefined, 'bold');
  doc.text('Equipo de trasfondo:', 20, y);
  y += 6;
  doc.setFont(undefined, 'normal');
  currentCharacter.backgroundData.equipment.forEach(item => {
    if (y > 270) { doc.addPage(); y = 20; }
    doc.text(`• ${item}`, 20, y);
    y += 5;
  });

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Generado en D&D Character Forge', 105, 285, { align: 'center' });
  doc.text(new Date().toLocaleString(), 105, 290, { align: 'center' });

  // Guardar
  doc.save(`${currentCharacter.name.replace(/\s/g, '_')}.pdf`);
}

function formatModifier(mod) {
  return (mod >= 0 ? '+' : '') + mod;
}

// =======================
//  NFT: EXPORTAR JSON + PNG (OFFLINE, GRATIS)
// =======================

function generateNFTImageDataUrl(character) {
  const canvas = document.createElement('canvas');
  const size = 800;
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Fondo tipo carta
  const gradient = ctx.createLinearGradient(0, 0, size, size);
  gradient.addColorStop(0, '#1a202c');
  gradient.addColorStop(1, '#4c51bf');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // Marco
  ctx.strokeStyle = '#ecc94b';
  ctx.lineWidth = 12;
  ctx.strokeRect(30, 30, size - 60, size - 60);

  // Título
  ctx.fillStyle = '#f7fafc';
  ctx.font = 'bold 40px "Cinzel", serif';
  ctx.textAlign = 'center';
  ctx.fillText(character.name, size / 2, 120);

  // Subtítulo
  ctx.font = '28px "Cinzel", serif';
  ctx.fillText(`${character.race} ${character.class}`, size / 2, 170);

  // Nivel / alineamiento
  ctx.font = '22px "Inter", sans-serif';
  ctx.fillText(`Nivel ${character.level} · ${character.alignment}`, size / 2, 210);

  // Stats
  const stats = [
    ['FUE', character.stats.strength],
    ['DES', character.stats.dexterity],
    ['CON', character.stats.constitution],
    ['INT', character.stats.intelligence],
    ['SAB', character.stats.wisdom],
    ['CAR', character.stats.charisma]
  ];

  ctx.font = 'bold 26px "Inter", sans-serif';
  const cols = 3;
  const rows = 2;
  const startX = 150;
  const startY = 280;
  const cellW = 200;
  const cellH = 90;

  stats.forEach((stat, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = startX + col * cellW;
    const y = startY + row * cellH;

    ctx.fillText(`${stat[0]}: ${stat[1]}`, x, y);
  });

  // Footer
  ctx.font = '18px "Inter", sans-serif';
  ctx.fillText('D&D Character Forge · NFT-ready', size / 2, size - 80);

  return canvas.toDataURL('image/png');
}

function buildNFTMetadata(character, imageDataUrl) {
  const attributes = [
    { trait_type: 'Race', value: character.race },
    { trait_type: 'Class', value: character.class },
    { trait_type: 'Background', value: character.background },
    { trait_type: 'Alignment', value: character.alignment },
    { trait_type: 'Level', value: character.level },
    { trait_type: 'Strength', value: character.stats.strength },
    { trait_type: 'Dexterity', value: character.stats.dexterity },
    { trait_type: 'Constitution', value: character.stats.constitution },
    { trait_type: 'Intelligence', value: character.stats.intelligence },
    { trait_type: 'Wisdom', value: character.stats.wisdom },
    { trait_type: 'Charisma', value: character.stats.charisma }
  ];

  return {
    name: character.name,
    description: `Personaje D&D generado con D&D Character Forge: ${character.race} ${character.class}, nivel ${character.level}.`,
    image: imageDataUrl,
    external_url: 'https://jcazorla90.github.io/DnD-Character-Forge',
    attributes
  };
}

function downloadBlob(filename, mimeType, data) {
  const blob = new Blob([data], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// Acción de "mint" NFT -> exporta assets NFT-ready
async function exportNFTAssets() {
  if (!currentCharacter) {
    alert('Primero genera un personaje.');
    return;
  }

  try {
    const imageDataUrl = generateNFTImageDataUrl(currentCharacter);
    const metadata = buildNFTMetadata(currentCharacter, imageDataUrl);

    const safeName = currentCharacter.name.replace(/[^\w\-]+/g, '_');

    // PNG
    const pngData = await (async () => {
      const res = await fetch(imageDataUrl);
      return await res.arrayBuffer();
    })();
    downloadBlob(`${safeName}.png`, 'image/png', pngData);

    // JSON metadata
    downloadBlob(
      `${safeName}.json`,
      'application/json',
      JSON.stringify(metadata, null, 2)
    );

    alert('✅ Paquete NFT exportado.\n\nSe han descargado:\n- Imagen PNG\n- Metadata JSON\n\nPuedes subir estos ficheros a cualquier plataforma que soporte NFTs.');

  } catch (error) {
    console.error('Error exportando NFT:', error);
    alert('Error exportando el NFT. Revisa la consola para más detalles.');
  }
}

// =======================
//  PERSISTENCIA / EXTRAS
// =======================

function saveCharacterToStorage(character) {
  try {
    const savedCharacters = JSON.parse(localStorage.getItem('dnd_characters') || '[]');
    savedCharacters.unshift({
      ...character,
      savedAt: new Date().toISOString()
    });
    localStorage.setItem('dnd_characters', JSON.stringify(savedCharacters.slice(0, 10)));
  } catch (e) {
    console.log('No se pudo guardar en localStorage');
  }
}

function loadLastCharacter() {
  try {
    const savedCharacters = JSON.parse(localStorage.getItem('dnd_characters') || '[]');
    if (savedCharacters.length > 0) {
      const lastChar = savedCharacters[0];
      delete lastChar.savedAt;
      displayCharacter(lastChar);
      return true;
    }
  } catch (e) {
    console.log('No se pudo cargar personaje guardado');
  }
  return false;
}

// Confeti
function celebrateCharacterCreation() {
  const colors = ['#667eea', '#764ba2', '#FFD700', '#48bb78'];
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -10px;
        left: ${Math.random() * 100}vw;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: fall ${2 + Math.random() * 2}s linear forwards;
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    }, i * 20);
  }
}

// Keyframes confeti
const style = document.createElement('style');
style.textContent = `
  @keyframes fall {
    to {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// =======================
//  BACKSTORY / NIVEL DE PODER (igual que antes)
// =======================

function calculatePowerLevel(character) {
  const statsTotal = Object.values(character.stats).reduce((a, b) => a + b, 0);
  const avgStat = statsTotal / 6;

  if (avgStat >= 16) return '⭐⭐⭐⭐⭐ Legendario';
  if (avgStat >= 14) return '⭐⭐⭐⭐ Épico';
  if (avgStat >= 12) return '⭐⭐⭐ Heroico';
  if (avgStat >= 10) return '⭐⭐ Promedio';
  return '⭐ Novato';
}

function generateBackstory(character) {
  const stories = {
    'Guerrero': 'forjado en el campo de batalla',
    'Mago': 'estudiante de las artes arcanas',
    'Pícaro': 'superviviente de las calles',
    'Clérigo': 'elegido por los dioses',
    'Paladín': 'campeón de la justicia',
    'Bardo': 'viajero de mil historias',
    'Bárbaro': 'hijo de las tierras salvajes',
    'Druida': 'guardián de la naturaleza',
    'Monje': 'maestro del cuerpo y mente',
    'Explorador': 'cazador de las tierras inhóspitas',
    'Hechicero': 'portador de magia innata',
    'Brujo': 'pactante de poderes oscuros'
  };

  return `${character.name}, ${character.race} ${stories[character.class] || ''}, busca su destino en un mundo lleno de magia y peligros.`;
}

// =======================
//  EVENTOS / INICIALIZACIÓN
// =======================

document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  populateSelects();

  // Intentar cargar último personaje
  const hasLoadedCharacter = loadLastCharacter();
  if (hasLoadedCharacter) {
    console.log('✨ Último personaje cargado');
  }

  // Generar aleatorio
  document.getElementById('randomBtn').addEventListener('click', () => {
    try {
      const character = generateCharacter();
      displayCharacter(character);

      setTimeout(() => {
        const powerLevel = calculatePowerLevel(character);
        const backstory = generateBackstory(character);
        console.log(`🎲 ${character.name} - ${powerLevel}`);
        console.log(`📖 ${backstory}`);
      }, 500);
    } catch (error) {
      console.error('Error generando personaje:', error);
      alert('Error al generar personaje. Por favor, recarga la página.');
    }
  });

  // Toggle panel personalizado
  document.getElementById('toggleCustom').addEventListener('click', () => {
    const panel = document.getElementById('customPanel');
    panel.classList.toggle('hidden');
  });

  // Generar personalizado
  document.getElementById('customGenerateBtn').addEventListener('click', () => {
    try {
      const customData = {
        name: document.getElementById('charName').value,
        race: document.getElementById('raceSelect').value,
        class: document.getElementById('classSelect').value,
        background: document.getElementById('backgroundSelect').value,
        alignment: document.getElementById('alignmentSelect').value
      };

      const character = generateCharacter(customData);
      displayCharacter(character);
    } catch (error) {
      console.error('Error generando personaje personalizado:', error);
      alert('Error al generar personaje. Verifica los datos.');
    }
  });

  // Descargar PDF
  document.getElementById('downloadBtn').addEventListener('click', generatePDF);

  // "Mint" NFT → exportar assets
  const nftBtn = document.getElementById('mintNFTBtn');
  if (nftBtn) {
    nftBtn.addEventListener('click', exportNFTAssets);
  }

  // Nuevo personaje
  document.getElementById('newCharBtn').addEventListener('click', () => {
    document.getElementById('characterSheet').classList.add('hidden');
    const nftBtn = document.getElementById('mintNFTBtn');
    if (nftBtn) nftBtn.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Compartir
  document.getElementById('shareBtn').addEventListener('click', () => {
    if (!currentCharacter) return;

    const powerLevel = calculatePowerLevel(currentCharacter);
    const shareText =
      `¡He creado un personaje D&D!\n\n` +
      `${currentCharacter.name}\n` +
      `${currentCharacter.race} ${currentCharacter.class}\n` +
      `${powerLevel}\n\n` +
      `Crea el tuyo en: https://jcazorla90.github.io/DnD-Character-Forge/`;

    if (navigator.share) {
      navigator.share({
        title: 'Mi personaje D&D',
        text: shareText
      });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      alert('¡Texto copiado al portapapeles!');
    } else {
      alert(shareText);
    }
  });

  // Atajos de teclado
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + R = Generar aleatorio
    if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
      e.preventDefault();
      document.getElementById('randomBtn').click();
    }
    // Ctrl/Cmd + S = Descargar PDF
    if ((e.ctrlKey || e.metaKey) && e.key === 's' && currentCharacter) {
      e.preventDefault();
      generatePDF();
    }
  });
});

// Konami code → personaje legendario
let konamiCode = [];
const konamiSequence = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);

  if (konamiCode.join(',') === konamiSequence.join(',')) {
    const legendaryChar = generateCharacter();
    legendaryChar.stats = {
      strength: 18,
      dexterity: 18,
      constitution: 18,
      intelligence: 18,
      wisdom: 18,
      charisma: 18
    };
    legendaryChar.name = '⭐ ' + legendaryChar.name + ' el Legendario';
    displayCharacter(legendaryChar);
    alert('🎉 ¡Código Konami activado! Personaje legendario generado con stats máximos!');
  }
});
