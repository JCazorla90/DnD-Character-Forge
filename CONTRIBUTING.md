# 🤝 CONTRIBUTING TO D&D CHARACTER FORGE

¡Gracias por tu interés en contribuir a D&D Character Forge! 🐉

---

## 🍺 CÓDIGO DE CONDUCTA

```
    🛡️ Sé respetuoso
    ⚔️ Sé constructivo
    🎲 Diviértete
    🍺 Comparte hidromiel (metafóricamente)
```

No toleramos:
- ❌ Acoso o discriminación
- ❌ Spam o autopromoción excesiva
- ❌ Comportamiento tóxico

---

## 🎯 FORMAS DE CONTRIBUIR

### 🐛 Reportar Bugs
1. Busca si ya existe un issue similar
2. Si no existe, crea uno nuevo con esta plantilla:

```markdown
**Descripción del bug:**
Breve descripción de qué salió mal

**Pasos para reproducir:**
1. Ve a '...'
2. Haz click en '...'
3. Observa el error

**Comportamiento esperado:**
Qué debería pasar

**Screenshots:**
Si aplica, añade capturas

**Entorno:**
- Navegador: [Chrome, Firefox, Safari]
- Versión: [ej. 120]
- OS: [Windows, Mac, Linux]
```

### ✨ Proponer Features
1. Abre un issue con etiqueta `enhancement`
2. Describe claramente:
   - ¿Qué problema resuelve?
   - ¿Cómo funcionaría?
   - ¿Por qué es útil para la comunidad?

### 🎨 Mejorar UI/UX
- Mockups en Figma son bienvenidos
- Mantén el estilo medieval/fantasy
- Respeta la paleta de colores

### 📚 Añadir Contenido D&D
- Razas, clases, hechizos, criaturas
- Debe estar bajo OGL o ser homebrew original
- Incluye fuente y referencias

---

## 🔧 PROCESO DE DESARROLLO

### 1️⃣ Fork y Clone
```bash
# Fork el repositorio en GitHub
# Luego clona tu fork:
git clone https://github.com/TU_USUARIO/DnD-Character-Forge.git
cd DnD-Character-Forge
```

### 2️⃣ Crea una Rama
```bash
# Nombre descriptivo
git checkout -b feature/nombre-descriptivo
# Ejemplos:
# - feature/add-dragonborn-race
# - fix/spell-slot-tracking
# - improve/pdf-generation
```

### 3️⃣ Haz tus Cambios
```bash
# Trabaja en tu feature
# Asegúrate de probar localmente

# Commits claros y descriptivos
git commit -m "Add: Sistema de multiclase"
git commit -m "Fix: Bug en cálculo de HP"
git commit -m "Improve: Performance del dice roller"
```

**Convención de commits:**
- `Add:` Nueva funcionalidad
- `Fix:` Corrección de bug
- `Improve:` Mejora existente
- `Refactor:` Cambio de código sin cambio funcional
- `Docs:` Solo documentación
- `Style:` Formateo, punto y coma, etc.

### 4️⃣ Push y Pull Request
```bash
# Push a tu fork
git push origin feature/nombre-descriptivo

# Ve a GitHub y crea un Pull Request
```

**Plantilla de PR:**
```markdown
## Descripción
Breve descripción de los cambios

## Tipo de cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Mejora existente
- [ ] Documentación

## Testing
- [ ] Probado en Chrome
- [ ] Probado en Firefox
- [ ] Probado en Safari
- [ ] Funciona en mobile

## Checklist
- [ ] Mi código sigue el estilo del proyecto
- [ ] He añadido comentarios donde necesario
- [ ] He actualizado la documentación
- [ ] No hay warnings en console
```

---

## 📋 ESTÁNDARES DE CÓDIGO

### JavaScript
```javascript
// ✅ BUENO: Nombres descriptivos, comentarios útiles
/**
 * Calcula el modificador de habilidad basado en el stat
 * @param {number} stat - Valor de la característica (3-30)
 * @returns {number} Modificador calculado
 */
function calculateModifier(stat) {
  return Math.floor((stat - 10) / 2);
}

// ❌ MALO: Sin comentarios, nombres poco claros
function calc(s) {
  return Math.floor((s - 10) / 2);
}
```

### CSS
```css
/* ✅ BUENO: BEM naming, variables CSS */
.character-sheet__header {
  background: var(--color-surface);
  padding: var(--space-16);
}

/* ❌ MALO: Nombres genéricos, valores hardcoded */
.header {
  background: #2a1a0f;
  padding: 16px;
}
```

### HTML
```html
<!-- ✅ BUENO: Semántico, accesible -->
<button class="btn btn--primary" aria-label="Generar personaje">
  🎲 Generar
</button>

<!-- ❌ MALO: No semántico, sin accesibilidad -->
<div onclick="generate()">Generar</div>
```

---

## ⚖️ ATRIBUCIÓN Y LICENCIA

### 🚨 MUY IMPORTANTE: ATRIBUCIÓN OBLIGATORIA

**TODOS los derivados, forks, o usos de este código DEBEN incluir atribución visible a:**

```
D&D Character Forge por José Cazorla
https://github.com/JCazorla90/DnD-Character-Forge
```

**Dónde debe aparecer:**
1. ✅ **En la interfaz de usuario** (footer, about page)
2. ✅ **En archivos de código modificados** (header comments)
3. ✅ **En la documentación** (README, docs)

**Ejemplo en código:**
```javascript
/**
 * D&D Character Forge
 * Copyright (c) 2025 José Cazorla
 * 
 * Modificado por: [Tu Nombre]
 * Fecha: [Fecha]
 * Cambios: [Descripción breve]
 * 
 * Original: https://github.com/JCazorla90/DnD-Character-Forge
 */
```

**Ejemplo en UI:**
```html
<footer>
  <p>
    Powered by 
    <a href="https://github.com/JCazorla90/DnD-Character-Forge">
      D&D Character Forge
    </a> 
    by José Cazorla
  </p>
</footer>
```

### ✅ Al contribuir, aceptas que:
- Tu código se licencia bajo MIT License
- Mantendrás la atribución al proyecto original
- Tu contribución es original o tienes derechos sobre ella

---

## 🎁 RECOMPENSAS POR CONTRIBUIR

| Contribución | Reward | Badge |
|--------------|--------|-------|
| 🐛 First Bug Fix | 🍺 1 Hidromiel | `contributor` |
| ✨ First Feature | 🍺🍺 2 Hidromieles | `feature-hero` |
| 🎨 UI Improvement | 🍺🍺 2 Hidromieles | `designer` |
| 📚 10+ Content Additions | 🍺🍺🍺 3 Hidromieles | `lorekeeper` |
| 🐉 Major Feature | 🏆 Cerveza de Dragón | `epic-contributor` |

*Las "hidromieles" son simbólicas - ¡pero la gratitud es real!*

---

## 🏷️ LABELS Y PRIORIDADES

### Labels disponibles:
- `bug` - Algo no funciona
- `enhancement` - Nueva feature
- `good first issue` - Bueno para principiantes
- `help wanted` - Se busca ayuda
- `documentation` - Mejoras en docs
- `priority: high` - Urgente
- `priority: low` - Cuando se pueda

### Prioridades:
1. 🔴 **Critical bugs** (app no funciona)
2. 🟠 **High priority** (features v1.0)
3. 🟡 **Medium priority** (mejoras UX)
4. 🟢 **Low priority** (nice to have)

---

## 📞 COMUNICACIÓN

- 💬 **Discord:** Para discusiones en tiempo real
- 📧 **Email:** jcazorla90@example.com
- 🐛 **Issues:** Para bugs y features formales
- 💡 **Discussions:** Para ideas y preguntas

---

## ✅ CHECKLIST ANTES DE HACER PR

```
[ ] Mi código funciona localmente
[ ] He probado en múltiples navegadores
[ ] No hay errores en console
[ ] He añadido comentarios donde necesario
[ ] He actualizado README si añadí features
[ ] Mi código sigue los estándares del proyecto
[ ] He incluido la atribución correcta
[ ] Los commits tienen mensajes descriptivos
[ ] No he subido archivos innecesarios (node_modules, .DS_Store)
```

---

## 🎲 CÓDIGO DE HONOR DEL CONTRIBUIDOR

```
    ╔════════════════════════════════════════════╗
    ║                                            ║
    ║  "Un desarrollador nunca llega tarde,     ║
    ║   ni pronto, llega exactamente            ║
    ║   cuando el merge lo requiere."           ║
    ║                                            ║
    ║           - Gandalf el Programador        ║
    ║                                            ║
    ╚════════════════════════════════════════════╝
```

**Como contribuidor, me comprometo a:**
- ✅ Mantener la atribución al autor original
- ✅ Respetar la licencia MIT
- ✅ Escribir código limpio y documentado
- ✅ Ser paciente y respetuoso con otros
- ✅ Ayudar a otros contributors
- ✅ Reportar bugs de forma constructiva

---

## 🙏 AGRADECIMIENTOS

Gracias a todos los que contribuyen a hacer este proyecto mejor:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Aquí se añadirán automáticamente los contributors -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

<div align="center">

**⚔️ ¡Gracias por contribuir! 🎲**

¿Dudas? Abre un issue o únete a Discord

[🏠 Volver al README](./README.md)

</div>
