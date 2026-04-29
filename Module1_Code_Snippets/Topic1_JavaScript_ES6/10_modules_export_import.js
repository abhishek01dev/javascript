// ============================================================
// MODULES — import / export (ES6)
// ============================================================
// Modules let you split code across multiple files.
// This file is a DEMONSTRATION — to actually run ES modules:
//   - In browser: use <script type="module">
//   - In Node.js: use .mjs extension OR "type": "module" in package.json

// ============================================================
// TYPES OF EXPORTS
// ============================================================

// --- FILE: math.js (what it would look like) ---
/*
// NAMED EXPORTS — can have many per file
export const PI = 3.14159;
export const add = (a, b) => a + b;
export const subtract = (a, b) => a - b;
export const multiply = (a, b) => a * b;

// DEFAULT EXPORT — only ONE per file, imported without curly braces
export default function divide(a, b) {
  if (b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}
*/

// --- FILE: app.js (how to import) ---
/*
// Import NAMED exports (must use exact names, with curly braces)
import { PI, add, subtract } from "./math.js";

// Import DEFAULT export (any name, no curly braces)
import divide from "./math.js";

// Import BOTH default and named in one line
import divide, { PI, add } from "./math.js";

// Rename named import
import { add as sum, subtract as diff } from "./math.js";

// Import EVERYTHING as a namespace
import * as MathUtils from "./math.js";
console.log(MathUtils.PI);       // 3.14159
console.log(MathUtils.add(2,3)); // 5
*/

// ============================================================
// SIMULATING MODULES (CommonJS style — works in Node.js directly)
// ============================================================
// In older Node.js (without type:module), use module.exports / require

// --- math-utils.js would export: ---
const mathUtils = {
  PI: 3.14159,
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
  }
};

// --- Using it locally to demonstrate: ---
const { PI, add, subtract, multiply, divide } = mathUtils;

console.log(PI);              // 3.14159
console.log(add(10, 5));      // 15
console.log(subtract(10, 5)); // 5
console.log(multiply(4, 3));  // 12
console.log(divide(20, 4));   // 5

// ============================================================
// KEY RULES TO REMEMBER
// ============================================================
//
// Named Export/Import:
//   export const x = 1;           → import { x } from "./file.js"
//   Must use SAME name (or rename with 'as')
//
// Default Export/Import:
//   export default function fn()  → import anyName from "./file.js"
//   Only ONE default per file
//   Can be renamed to anything on import
//
// Re-export (barrel files):
//   export { add, subtract } from "./math.js"
//   Used in index.js to group and re-export from one place
//
// Dynamic import (lazy loading):
//   const module = await import("./math.js");  // loads only when needed
