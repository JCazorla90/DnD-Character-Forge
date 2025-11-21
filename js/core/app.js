/*!
 * D&D Character Forge – Lógica principal
 * © 2025 José Cazorla Gijón (@JCazorla90)
 * Licencia: MIT (ver LICENSE en el repositorio)
 * Repo: https://github.com/JCazorla90/DnD-Character-Forge
 */

// Estado global
let currentCharacter = null;
let currentLang = "es";

/* =========================================================
 * I18N (internacionalización básica)
 * =======================================================*/

const I18N_DICTIONARY = {
  es: {
    "app.title": "🐲 D&D Character Forge 🛡️",
    "app.subtitle": "Generador de Personajes para Dragones y Mazmorras",
    "nav.github": "⭐ Ver en GitHub",

    "generator.title": "⚔️ Crear Personaje",
    "generator.btnRandom": "🎲 Generar Aleatorio",
    "generator.btnCustomToggle": "✏️ Personalizar",
    "generator.customTitle": "Personalizar Personaje",
    "generator.field.name": "Nombre del Personaje:",
    "generator.field.name.placeholder": "Ej: Thorin Escudo de Roble",
    "generator.field.race": "Raza:",
    "generator.field.class": "Clase:",
    "generator.field.background": "Trasfondo:",
    "generator.field.alignment": "Alineamiento:",
    "generator.btnCustomGenerate": "✨ Crear Personalizado",

    "sheet.title": "Personaje Generado",
    "sheet.basicSection": "📋 Información Básica",
    "sheet.statsSection": "💪 Características",
    "sheet.combatSection": "❤️ Combate",
    "sheet.savesSection": "🛡️ Salvaciones y Habilidades",
    "sheet.equipmentSection": "🎒 Equipo Inicial",
    "sheet.backgroundSection": "💼 Trasfondo",
    "sheet.backgroundEquipmentSubtitle": "Equipo de trasfondo:",
    "sheet.racialTraitsSection": "🎭 Rasgos Raciales",
    "sheet.classProficienciesSection": "⚔️ Competencias y Rasgos de Clase",
    "sheet.classFeaturesSection": "✨ Características de Clase",

    "label.name": "Nombre:",
    "label.race": "Raza:",
    "label.class": "Clase:",
    "label.level": "Nivel:",
    "label.background": "Trasfondo:",
    "label.alignment": "Alineamiento:",
    "label.hp": "Puntos de Golpe:",
    "label.ac": "Clase de Armadura:",
    "label.speed": "Velocidad:",
    "label.initiative": "Iniciativa:",
    "label.saves": "Salvaciones:",
    "label.skills": "Habilidades:",
    "label.backgroundSkills": "Habilidades:",
    "label.backgroundFeature": "Rasgo:",

    "actions.downloadPdf": "Descargar PDF",
    "actions.mintNftBtn": "🔗 Exportar NFT (JSON)",
    "actions.newCharacterBtn": "🔄 Nuevo Personaje",
    "actions.shareBtn": "📤 Compartir",

    "library.title": "📚 Biblioteca de Personajes",
    "library.description":
      "Tus últimos personajes se guardan en tu navegador. Puedes volver a cargarlos cuando quieras.",
    "library.empty": "Todavía no hay personajes guardados.",
    "library.clearBtn": "Vaciar biblioteca",
    "library.levelLabel": "Nivel",
    "library.powerLabel": "Poder",
    "library.loadBtn": "Cargar",
    "library.deleteBtn": "Eliminar",

    "msg.noCharacter": "Primero
