// ============================================================
// SPREAD (...) and REST (...) OPERATORS (ES6)
// ============================================================
// Both use the same '...' syntax but do OPPOSITE things:
//
//   SPREAD — EXPANDS an iterable (array/object) into individual elements
//   REST   — COLLECTS multiple elements into a single array

// ============================================================
// PART 1: SPREAD OPERATOR
// ============================================================

// --- Spread with ARRAYS ---

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine/merge arrays
const combined = [...arr1, ...arr2];
console.log(combined);           // [1, 2, 3, 4, 5, 6]

// Shallow copy (changes to copy don't affect original)
const copy = [...arr1];
copy.push(99);
console.log(arr1);               // [1, 2, 3]  — untouched
console.log(copy);               // [1, 2, 3, 99]

// Insert elements at specific position
const inserted = [0, ...arr1, 99];
console.log(inserted);           // [0, 1, 2, 3, 99]

// Spread a string into individual characters
console.log([..."Hello"]);       // ["H", "e", "l", "l", "o"]

// Pass array elements as individual function arguments
const nums = [4, 7, 2, 9, 1];
console.log(Math.max(...nums));  // 9  (same as Math.max(4, 7, 2, 9, 1))
console.log(Math.min(...nums));  // 1

// --- Spread with OBJECTS ---

const user = { name: "Aman", age: 22 };
const address = { city: "Delhi", pin: "110001" };

// Merge two objects
const profile = { ...user, ...address };
console.log(profile);
// { name: "Aman", age: 22, city: "Delhi", pin: "110001" }

// Add new properties / override existing ones
// (later properties OVERRIDE earlier ones if keys clash)
const updated = { ...user, age: 23, country: "India" };
console.log(updated);
// { name: "Aman", age: 23, country: "India" }

// Shallow copy of an object
const userCopy = { ...user };
userCopy.name = "Riya";
console.log(user.name);          // "Aman" — original untouched
console.log(userCopy.name);      // "Riya"

// ============================================================
// PART 2: REST PARAMETERS
// ============================================================
// Collects all REMAINING function arguments into one array.
// Must be the LAST parameter.

// Collect all arguments
const sum = (...nums) => nums.reduce((acc, n) => acc + n, 0);
console.log(sum(1, 2));           // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum());               // 0

// Mix of fixed + rest parameters
const introduce = (greeting, ...names) => {
  return `${greeting} ${names.join(", ")}!`;
};
console.log(introduce("Hello", "Aman", "Riya", "Karan"));
// Hello Aman, Riya, Karan!

// REST vs ARGUMENTS object:
//   arguments: old way, not a real array, doesn't work in arrow functions
//   ...rest:   real array, works everywhere, modern approach

function oldWay() {
  console.log(arguments);         // not an array — array-like object
}
const newWay = (...args) => {
  console.log(args);              // real array with all methods
};

// ============================================================
// SPREAD vs REST — Key Difference Summary
// ============================================================
//
//   SPREAD is used when CALLING a function or building arrays/objects:
//     Math.max(...nums)       — spread in function call
//     [...arr1, ...arr2]      — spread in array literal
//     { ...obj1, ...obj2 }   — spread in object literal
//
//   REST is used in FUNCTION DEFINITIONS to collect parameters:
//     const fn = (...args) => { }

// ============================================================
// EXERCISE: multiplyAll with rest
// ============================================================

const multiplyAll = (...nums) => {
  if (nums.length === 0) return 0;
  return nums.reduce((product, n) => product * n, 1);
};

console.log(multiplyAll(2, 3, 4));    // 24
console.log(multiplyAll(5, 5));       // 25
console.log(multiplyAll());            // 0
