// ============================================================
// ARRAY METHODS (ES6+)
// ============================================================
// Each method takes a CALLBACK function that receives:
//   (element, index, array)
// These methods do NOT mutate the original array (except sort/splice).

const students = [
  { name: "Aman",  marks: 80 },
  { name: "Riya",  marks: 92 },
  { name: "Karan", marks: 45 },
  { name: "Priya", marks: 67 },
  { name: "Dev",   marks: 30 },
];

// ============================================================
// forEach() — run code for every element, returns undefined
// ============================================================
// Use for SIDE EFFECTS only (logging, updating DOM).
// Does NOT return a new array.

console.log("--- forEach ---");
students.forEach((student, index) => {
  console.log(`${index + 1}. ${student.name}: ${student.marks}`);
});

// ============================================================
// map() — transform each element, returns NEW array (same length)
// ============================================================
// Use when you want to TRANSFORM every item.
// Always returns array of SAME LENGTH as original.

console.log("--- map ---");
const names = students.map(s => s.name);
console.log(names);  // ["Aman", "Riya", "Karan", "Priya", "Dev"]

const withGrade = students.map(s => ({
  name: s.name,
  marks: s.marks,
  grade: s.marks >= 70 ? "A" : s.marks >= 50 ? "B" : "C"
}));
console.log(withGrade);

// map with index
const numbered = students.map((s, i) => `${i + 1}. ${s.name}`);
console.log(numbered); // ["1. Aman", "2. Riya", ...]

// ============================================================
// filter() — keep only matching elements, returns NEW array
// ============================================================
// Use when you want a SUBSET of the array.
// Returns array that may be SHORTER than original (or empty).

console.log("--- filter ---");
const passed = students.filter(s => s.marks >= 50);
console.log(passed.map(s => s.name));  // ["Aman", "Riya", "Priya"]

const failed = students.filter(s => s.marks < 50);
console.log(failed.map(s => s.name));  // ["Karan", "Dev"]

// ============================================================
// reduce() — combine all elements into ONE value
// ============================================================
// Use to compute: sum, product, object, string, grouped data.
// ALWAYS provide an initialValue (2nd argument after callback).

console.log("--- reduce ---");
const nums = [1, 2, 3, 4, 5];

// Sum
const total = nums.reduce((acc, n) => acc + n, 0);
console.log(total);   // 15

// Product
const product = nums.reduce((acc, n) => acc * n, 1);
console.log(product); // 120

// Count occurrences
const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
console.log(count);   // { apple: 3, banana: 2, cherry: 1 }

// Group students by result
const grouped = students.reduce((acc, s) => {
  const key = s.marks >= 50 ? "pass" : "fail";
  acc[key] = acc[key] || [];
  acc[key].push(s.name);
  return acc;
}, {});
console.log(grouped); // { pass: [...], fail: [...] }

// ============================================================
// find() — returns FIRST matching element (or undefined)
// ============================================================

console.log("--- find ---");
const topStudent = students.find(s => s.marks > 90);
console.log(topStudent); // { name: "Riya", marks: 92 }

const missing = students.find(s => s.marks > 100);
console.log(missing);    // undefined

// ============================================================
// findIndex() — returns INDEX of first match (or -1)
// ============================================================

console.log("--- findIndex ---");
const idx = students.findIndex(s => s.name === "Karan");
console.log(idx);  // 2

// ============================================================
// some() — true if AT LEAST ONE element passes the test
// ============================================================

console.log("--- some ---");
console.log(students.some(s => s.marks > 90));   // true (Riya)
console.log(students.some(s => s.marks > 100));  // false

// ============================================================
// every() — true only if ALL elements pass the test
// ============================================================

console.log("--- every ---");
console.log(students.every(s => s.marks > 0));   // true
console.log(students.every(s => s.marks >= 50)); // false (Karan, Dev failed)

// ============================================================
// includes() — check if a VALUE exists (for simple arrays)
// ============================================================

console.log("--- includes ---");
const cities = ["Delhi", "Mumbai", "Pune"];
console.log(cities.includes("Mumbai")); // true
console.log(cities.includes("Jaipur")); // false

// ============================================================
// indexOf() / lastIndexOf() — find position of a value
// ============================================================

console.log("--- indexOf ---");
const arr = [10, 20, 30, 20, 10];
console.log(arr.indexOf(20));     // 1 (first occurrence)
console.log(arr.lastIndexOf(20)); // 3 (last occurrence)
console.log(arr.indexOf(99));     // -1 (not found)

// ============================================================
// sort() — sort IN PLACE (modifies original array!)
// ============================================================
// Without compareFn: sorts as STRINGS — wrong for numbers!
// With compareFn(a, b):  a - b = ascending, b - a = descending

console.log("--- sort ---");
const scores = [40, 100, 1, 5, 25];

// WRONG — sorts as strings
const wrongSort = [...scores].sort();
console.log(wrongSort); // [1, 100, 25, 40, 5] — treats as strings!

// CORRECT ascending
const asc = [...scores].sort((a, b) => a - b);
console.log(asc);  // [1, 5, 25, 40, 100]

// CORRECT descending
const desc = [...scores].sort((a, b) => b - a);
console.log(desc); // [100, 40, 25, 5, 1]

// Sort objects by property
const sortedStudents = [...students].sort((a, b) => b.marks - a.marks);
console.log(sortedStudents.map(s => `${s.name}:${s.marks}`));

// ============================================================
// METHOD CHAINING — combine methods for powerful pipelines
// ============================================================

console.log("--- Method Chaining ---");

// Get total marks of students who passed (marks >= 50)
const totalPassMarks = students
  .filter(s => s.marks >= 50)       // keep only passed students
  .map(s => s.marks)                // extract marks
  .reduce((sum, m) => sum + m, 0);  // sum them up

console.log(totalPassMarks);  // 80 + 92 + 67 = 239

// ============================================================
// EXERCISE: Products pipeline
// ============================================================

const products = [
  { name: "Laptop",  price: 50000, category: "Electronics" },
  { name: "Phone",   price: 20000, category: "Electronics" },
  { name: "Shirt",   price: 800,   category: "Clothing" },
  { name: "TV",      price: 35000, category: "Electronics" },
];

// 1. Get Electronics  2. Apply 10% discount  3. Sum total
const discountedTotal = products
  .filter(p => p.category === "Electronics")
  .map(p => p.price * 0.9)
  .reduce((sum, p) => sum + p, 0);

console.log(`Discounted Electronics Total: ₹${discountedTotal}`);
// (50000 + 20000 + 35000) * 0.9 = 94500
