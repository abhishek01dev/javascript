// ============================================================
// DATA TYPES IN JAVASCRIPT
// ============================================================
// Two categories:
//   1. Primitive  — stored by VALUE (7 types)
//   2. Reference  — stored by REFERENCE (Object, Array, Function)

// ------------------------------------------------------------
// PRIMITIVE TYPES
// ------------------------------------------------------------

// STRING — text in quotes (single, double, or backtick)
const firstName = "Aman";
const lastName = 'Sharma';
console.log(typeof firstName);   // "string"

// NUMBER — integers AND decimals (no separate int/float)
const score = 95;
const price = 99.99;
const negative = -10;
console.log(typeof score);       // "number"

// BOOLEAN — only true or false
const isLoggedIn = true;
const isPremium = false;
console.log(typeof isLoggedIn);  // "boolean"

// UNDEFINED — variable declared but no value assigned
let address;
console.log(address);            // undefined
console.log(typeof address);     // "undefined"

// NULL — intentional absence of value (you set it yourself)
const car = null;
console.log(car);                // null
console.log(typeof null);        // "object"  <-- FAMOUS JS BUG! (historical)
// To check for null, use: value === null
console.log(car === null);       // true  <-- correct way

// BIGINT — for very large integers beyond Number.MAX_SAFE_INTEGER
const bigNumber = 9007199254740993n;   // notice the 'n' suffix
console.log(typeof bigNumber);         // "bigint"

// SYMBOL — unique identifier (used in advanced patterns)
const id1 = Symbol("id");
const id2 = Symbol("id");
console.log(id1 === id2);        // false — every Symbol is unique
console.log(typeof id1);         // "symbol"

// ------------------------------------------------------------
// REFERENCE TYPE (Non-Primitive)
// ------------------------------------------------------------
// Objects, Arrays, and Functions are all typeof "object" (except function)

// OBJECT — key/value pairs
const person = { name: "Riya", age: 20 };
console.log(typeof person);      // "object"

// ARRAY — ordered list (it's an object internally)
const colors = ["red", "green", "blue"];
console.log(typeof colors);      // "object"
console.log(Array.isArray(colors)); // true  <-- use this to check arrays

// FUNCTION — also an object
function greet() { return "Hello"; }
console.log(typeof greet);       // "function"

// ------------------------------------------------------------
// KEY DIFFERENCE: Primitive vs Reference (Memory Behavior)
// ------------------------------------------------------------

// Primitives are copied by VALUE
let a = 10;
let b = a;
b = 99;
console.log(a);  // 10 — a is NOT affected

// Objects are copied by REFERENCE
const obj1 = { x: 1 };
const obj2 = obj1;       // both point to the SAME object in memory
obj2.x = 99;
console.log(obj1.x);     // 99 — obj1 IS affected!

// ------------------------------------------------------------
// typeof QUICK REFERENCE
// ------------------------------------------------------------
console.log(typeof "hello");       // "string"
console.log(typeof 42);            // "number"
console.log(typeof true);          // "boolean"
console.log(typeof undefined);     // "undefined"
console.log(typeof null);          // "object"   <-- BUG, check with === null
console.log(typeof Symbol());      // "symbol"
console.log(typeof 9n);            // "bigint"
console.log(typeof {});            // "object"
console.log(typeof []);            // "object"   <-- use Array.isArray()
console.log(typeof function(){}); // "function"
