// ============================================================
// JSON.parse() — JSON String → JavaScript Object
// ============================================================
// Used when:
//   - Receiving data from a server (res.json() does this for you)
//   - Reading from localStorage
//   - Processing any JSON text
//
// Syntax: JSON.parse(text, reviver)

// ============================================================
// BASIC USAGE
// ============================================================

const jsonString = '{"name":"Riya","age":20,"city":"Delhi"}';

const obj = JSON.parse(jsonString);
console.log(obj);            // { name: "Riya", age: 20, city: "Delhi" }
console.log(obj.name);       // Riya
console.log(typeof obj);     // "object" — now a real JS object

// Parsing a JSON array
const jsonArray = '[1, 2, 3, 4, 5]';
const arr = JSON.parse(jsonArray);
console.log(arr);            // [1, 2, 3, 4, 5]
console.log(arr.length);     // 5
console.log(arr[0]);         // 1

// Parsing nested JSON
const jsonNested = `{
  "name": "Aman",
  "address": {
    "city": "Delhi",
    "pin": "110001"
  },
  "skills": ["JS", "React"]
}`;

const parsed = JSON.parse(jsonNested);
console.log(parsed.address.city);   // Delhi
console.log(parsed.skills[0]);      // JS

// ============================================================
// REVIVER FUNCTION — 2nd parameter: transform values during parsing
// ============================================================
// Called for each key/value pair as it's parsed.
// Return a new value to replace it, or the original value to keep it.

const jsonWithDate = '{"name":"Aman","joinedDate":"2024-01-15","score":95}';

const withDate = JSON.parse(jsonWithDate, (key, value) => {
  if (key === "joinedDate") return new Date(value);  // convert string to Date
  if (key === "score")      return value * 1.1;       // apply 10% bonus
  return value;                                        // keep everything else as-is
});

console.log(withDate.name);                  // Aman
console.log(withDate.joinedDate instanceof Date); // true
console.log(withDate.joinedDate.getFullYear());   // 2024
console.log(withDate.score.toFixed(1));           // 104.5

// ============================================================
// ERROR HANDLING — always use try/catch on untrusted input
// ============================================================
// JSON.parse() throws SyntaxError if the string is not valid JSON.
// Common mistakes: single quotes, trailing commas, comments, undefined.

function safeParse(jsonStr) {
  try {
    return JSON.parse(jsonStr);
  } catch (err) {
    console.log("Invalid JSON:", err.message);
    return null;
  }
}

safeParse('{"name": "Aman"}');        // valid
safeParse("{ name: 'Aman' }");        // INVALID: single quotes
safeParse('{"a": 1,}');               // INVALID: trailing comma
safeParse('{"a": undefined}');        // INVALID: undefined not in JSON

// ============================================================
// ROUNDTRIP: stringify then parse (serialization / deserialization)
// ============================================================

const original = {
  name: "Aman",
  scores: [90, 85, 78],
  address: { city: "Delhi" }
};

// Serialize → string for storage/transport
const serialized = JSON.stringify(original);
console.log("Serialized:", serialized);

// Deserialize → back to object
const deserialized = JSON.parse(serialized);
console.log("Deserialized:", deserialized);
console.log("Are they equal?", JSON.stringify(original) === JSON.stringify(deserialized)); // true

// ============================================================
// PRACTICAL: Read from localStorage
// ============================================================

// Saving:
// localStorage.setItem("user", JSON.stringify({ name: "Aman", age: 22 }));

// Reading:
function getUserFromStorage() {
  const raw = localStorage.getItem("user");  // always a string or null
  if (!raw) return null;
  return JSON.parse(raw);  // convert string back to object
}
// const storedUser = getUserFromStorage();

// ============================================================
// EXERCISE
// ============================================================

const bookObj = {
  title: "Atomic Habits",
  author: "James Clear",
  pages: 320,
  available: true
};

// 1. Convert to pretty-printed JSON string
const bookJson = JSON.stringify(bookObj, null, 2);
console.log("Pretty JSON:\n", bookJson);

// 2. Parse back to object
const bookBack = JSON.parse(bookJson);
console.log("Parsed title:", bookBack.title);
