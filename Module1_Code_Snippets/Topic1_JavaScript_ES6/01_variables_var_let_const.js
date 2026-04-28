// ============================================================
// VARIABLES: var, let, const
// ============================================================

// ------------------------------------------------------------
// VAR — the OLD way (avoid using it)
// ------------------------------------------------------------
// Problems with var:
//   1. Function-scoped — leaks outside if/for blocks
//   2. Can be re-declared in the same scope (causes bugs)
//   3. Hoisted with value 'undefined'

var city = "Delhi";
var city = "Mumbai";     // re-declaration allowed — NO error
console.log(city);       // Mumbai

if (true) {
  var leaked = "I leaked!";
}
console.log(leaked);     // "I leaked!" — escaped the block!
4
(function (){
 var  age = 10;
})()
console.log(age) 
// ------------------------------------------------------------
// LET — modern, block-scoped, reassignable 
// ------------------------------------------------------------
// Use let when the value will CHANGE later.
// Block-scoped: only lives inside the { } it was declared in.
// Cannot be re-declared in the same scope.
let age = 22;
age = 23;                 // reassignment allowed
console.log(age);         // 23

// let age = 30;          // ERROR: 'age' already declared

if (true) {
  let blockVar = "I stay here";
  console.log(blockVar);  // "I stay here"
}
// console.log(blockVar); // ERROR: blockVar is not defined

// ------------------------------------------------------------
// CONST — block-scoped, cannot be reassigned
// ------------------------------------------------------------
// Use const when the VALUE (binding) should never change.
// Note: for objects/arrays, the CONTENT can still change.

const PI = 3.14159;
// PI = 3.15;             // ERROR: Assignment to constant variable

const student = { name: "Aman", age: 20 };
student.name = "Riya";   // allowed — changing property, not the variable
// student = {};           // ERROR: cannot reassign the variable
console.log(student);     // { name: "Riya", age: 20 }

const fruits = ["apple", "banana"];
fruits.push("cherry");   // allowed — mutating array content
console.log(fruits);      // ["apple", "banana", "cherry"]

// ------------------------------------------------------------
// COMPARISON TABLE
// ------------------------------------------------------------
//  Feature        | var          | let         | const
// ----------------|--------------|-------------|-------------
//  Scope          | Function     | Block       | Block
//  Reassignable   | Yes          | Yes         | No
//  Re-declarable  | Yes          | No          | No
//  Hoisted        | Yes(undef.)  | Yes (TDZ)   | Yes (TDZ)
//  Use when       | AVOID        | Value changes | Value fixed

// TDZ = Temporal Dead Zone:
// Accessing let/const BEFORE their declaration line throws ReferenceError.
// console.log(x);  // ReferenceError: Cannot access 'x' before initialization
// let x = 5;

// ------------------------------------------------------------
// EXERCISE
// ------------------------------------------------------------
const collegeName = "Tech University";
let semester = 3;
semester = semester + 1;
console.log(`College: ${collegeName}, Semester: ${semester}`);
// collegeName = "Other";  // Try this — it throws an error

// ============================================================
// OUTPUT QUESTIONS — Hard Level
// Predict the output before running. Answers are below each Q.
// ============================================================

// Q1 — Hoisting + var re-declaration in a function
function testVar() {
  console.log(a);         // ? 
  var a = 10;
  console.log(a);         // ?
  var a = 20;
  console.log(a);         // ?
}
testVar();
// Answer: undefined  →  10  →  20
// Why: var is hoisted with value undefined. Re-declaration is fine for var.

// ----------------------------------------------------------

// Q2 — var leaks out of a for-loop, let does NOT
for (var i = 0; i < 3; i++) {}
console.log(i);           // ?

for (let j = 0; j < 3; j++) {}
// console.log(j);        // ?  — uncomment to see the error
// Answer: 3   |   ReferenceError: j is not defined
// Why: var is function-scoped so i survives the loop; let is block-scoped.

// ----------------------------------------------------------

// Q3 — TDZ (Temporal Dead Zone) trap
// console.log(score);    // ?   — uncomment to see
let score = 100;
// Answer: ReferenceError: Cannot access 'score' before initialization
// Why: let/const exist in TDZ from the top of the block until the declaration line.

// ----------------------------------------------------------

// Q4 — const with object mutation
const user = { name: "Abhishek", level: 1 };
user.level = 5;
user.role  = "admin";
console.log(user.name);   // ?
console.log(user.level);  // ?
console.log(user.role);   // ?
// Answer: "Abhishek"  →  5  →  "admin"
// Why: const only locks the BINDING (the reference), not the object's contents.

// ----------------------------------------------------------

// Q5 — const with array mutation + reassignment attempt
const nums = [1, 2, 3];
nums.push(4);
nums[0] = 99;
console.log(nums);        // ?
// nums = [10, 20];       // ?  — uncomment to see
// Answer: [99, 2, 3, 4]   |   TypeError: Assignment to constant variable
// Why: pushing/indexing mutates the same array object — fine for const.
//      Re-assigning nums to a NEW array changes the binding — not allowed.

// ----------------------------------------------------------

// Q6 — Shadowing: inner let hides outer var
var x = "global";
function shadow() {
  console.log(x);         // ?  (before inner x is declared)
  let x = "local";
  console.log(x);         // ?
}
// shadow();              // uncomment to run
// Answer: ReferenceError: Cannot access 'x' before initialization
// Why: The inner `let x` creates a TDZ for x inside the function even though
//      an outer `var x` exists. JS sees the inner declaration and blocks access.

// ----------------------------------------------------------

// Q7 — Closure + var vs let in a loop (classic interview trap)
const varFns = [];
for (var k = 0; k < 3; k++) {
  varFns.push(function () { return k; });
}
console.log(varFns[0]());  // ?
console.log(varFns[1]());  // ?
console.log(varFns[2]());  // ?

const letFns = [];
for (let m = 0; m < 3; m++) {
  letFns.push(function () { return m; });
}
console.log(letFns[0]());  // ?
console.log(letFns[1]());  // ?
console.log(letFns[2]());  // ?
// Answer (var): 3  3  3   — all closures share the SAME k; loop ended at k=3
// Answer (let): 0  1  2   — each iteration gets its OWN block-scoped m

// ----------------------------------------------------------

// Q8 — Mixed scoping brain-teaser
let p = 1;
{
  let p = 2;
  {
    let p = 3;
    console.log(p);       // ?
  }
  console.log(p);         // ?
}
console.log(p);           // ?
// Answer: 3  →  2  →  1
// Why: each { } block creates a new scope; inner p shadows outer p.
