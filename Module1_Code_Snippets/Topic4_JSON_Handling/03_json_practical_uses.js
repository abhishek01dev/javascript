// ============================================================
// JSON PRACTICAL USE CASES
// ============================================================

// ============================================================
// USE CASE 1: Storing objects in localStorage
// ============================================================
// localStorage can only store STRINGS — JSON bridges the gap.

// --- Save ---
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// --- Load ---
function loadFromStorage(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

// --- Example ---
const cartItems = [
  { id: 1, name: "Pen",  qty: 2, price: 10 },
  { id: 2, name: "Book", qty: 1, price: 250 },
];

// saveToStorage("cart", cartItems);
// const savedCart = loadFromStorage("cart");
// console.log(savedCart);

// ============================================================
// USE CASE 2: Sending JSON with fetch POST
// ============================================================

async function registerUser(userData) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // must set this when sending JSON
      },
      body: JSON.stringify(userData),          // object → JSON string
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const newUser = await response.json();    // JSON string → object
    console.log("User registered:", newUser);
    return newUser;

  } catch (err) {
    console.log("Registration failed:", err.message);
  }
}

registerUser({ name: "Aman Singh", email: "aman@mail.com", role: "student" });

// ============================================================
// USE CASE 3: Deep cloning an object
// ============================================================
// Quick trick: stringify → parse = deep copy.
// LIMITATION: loses functions, Date objects, undefined, Symbols.

const original = {
  name: "Aman",
  scores: [90, 85, 78],
  address: { city: "Delhi", pin: "110001" }
};

// Shallow copy — nested objects are still SHARED
const shallowCopy = { ...original };
shallowCopy.address.city = "Mumbai";
console.log(original.address.city);   // "Mumbai" — original changed! (bad)

// Deep copy with JSON — fully independent
const original2 = {
  name: "Aman",
  scores: [90, 85, 78],
  address: { city: "Delhi", pin: "110001" }
};
const deepCopy = JSON.parse(JSON.stringify(original2));
deepCopy.address.city = "Mumbai";
console.log(original2.address.city);  // "Delhi" — original untouched (good)

// ============================================================
// USE CASE 4: Logging and debugging objects
// ============================================================
// console.log() shows [Object object] in some environments.
// JSON.stringify gives a readable string.

const config = {
  env: "production",
  db: { host: "localhost", port: 5432 },
  features: ["auth", "payments"]
};

console.log("Config:", JSON.stringify(config, null, 2)); // readable in all environments

// ============================================================
// USE CASE 5: Processing API response data
// ============================================================

async function processUsers() {
  const res   = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json(); // JSON string → array of user objects

  // Now use array methods on the parsed data
  const summary = users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    city: u.address.city
  }));

  console.log("User Summary:");
  console.log(JSON.stringify(summary, null, 2));
}
processUsers();

// ============================================================
// JSON RULES CHEAT SHEET
// ============================================================
//
//  VALID JSON:
//    { "name": "Aman" }          — double quotes only
//    { "age": 22 }               — number, no quotes
//    { "active": true }          — boolean lowercase
//    { "data": null }            — null allowed
//    { "scores": [1, 2, 3] }     — arrays allowed
//
//  INVALID JSON (common mistakes):
//    { name: "Aman" }            — key not in quotes
//    { 'name': 'Aman' }          — single quotes not allowed
//    { "name": "Aman", }         — trailing comma not allowed
//    { "fn": function() {} }     — functions not allowed
//    { "val": undefined }        — undefined not allowed
//    // comments not allowed     — no comments in JSON

// ============================================================
// JSON vs JavaScript Object — Comparison
// ============================================================
//
//  Feature            | JS Object          | JSON
//  -------------------|--------------------|-----------------
//  Key quotes         | Optional           | Required (double)
//  String quotes      | Single or double   | Double only
//  Functions          | Allowed            | NOT allowed
//  undefined          | Allowed            | NOT allowed
//  Comments           | Allowed            | NOT allowed
//  Trailing commas    | Allowed            | NOT allowed
//  Date objects       | Allowed            | NOT (becomes string)
