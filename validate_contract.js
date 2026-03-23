/**
 * @file validate_contract.js
 * @description Script de Auditoría Automatizada para el Showcase de Arquitectura Staff.
 * @author Senior Architect | Pablo Matías Lescano
 * @date 23 de Marzo, 2026
 */

const fs = require('fs');
const path = require('path');

const MAX_LINES = 300;
const REQUIRED_PATHS = [
  'src/app/core/store',
  'src/app/domain/mappers',
  'src/app/domain/models',
  'src/app/features',
  'src/app/shared'
];

const stats = {
  totalFiles: 0,
  violations: [],
  structureOk: true
};

/**
 * Valida la estructura de directorios DDD.
 */
function validateStructure() {
  console.log('--- 🔍 AUDITANDO ESTRUCTURA DDD ---');
  REQUIRED_PATHS.forEach(p => {
    if (fs.existsSync(path.join(__dirname, p))) {
      console.log(`✅ [OK] ${p}`);
    } else {
      console.log(`❌ [ERROR] Falta carpeta crítica: ${p}`);
      stats.structureOk = false;
    }
  });
}

/**
 * Valida el Pilar 1: Modularidad Atómica (Límite 300 líneas).
 */
function validateFileLines(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      validateFileLines(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.html')) {
      stats.totalFiles++;
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n').length;

      if (lines > MAX_LINES) {
        stats.violations.push(`${fullPath} (${lines} líneas)`);
      }
    }
  });
}

// Ejecución de la Auditoría
console.log('\n🚀 Iniciando Auditoría Gold Standard...\n');
validateStructure();

if (fs.existsSync(path.join(__dirname, 'src'))) {
  validateFileLines(path.join(__dirname, 'src'));
}

console.log('\n--- 📊 REPORTE DE MODULARIDAD ---');
console.log(`Archivos analizados: ${stats.totalFiles}`);

if (stats.violations.length > 0) {
  console.log('\n❌ VIOLACIONES DETECTADAS (Pilar 1):');
  stats.violations.forEach(v => console.log(` - ${v}`));
} else {
  console.log('✅ Todos los archivos cumplen con el límite de 300 líneas.');
}

console.log('\n--- 🏁 VEREDICTO FINAL ---');
if (stats.structureOk && stats.violations.length === 0) {
  console.log('🏆 ESTADO: GOLD STANDARD CERTIFIED 🏆\n');
  process.exit(0);
} else {
  console.log('⚠️ ESTADO: AUDITORÍA FALLIDA. Revisar requerimientos.\n');
  process.exit(1);
}
