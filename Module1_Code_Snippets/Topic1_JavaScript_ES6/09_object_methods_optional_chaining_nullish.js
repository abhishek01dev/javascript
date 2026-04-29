// ============================================================
// OBJECT UTILITY METHODS + OPTIONAL CHAINING + NULLISH COALESCING
// ============================================================

const user = { name: "Aman", age: 22, city: "Delhi" };

// ============================================================
// Object.keys() — returns array of property NAMES
// ============================================================
const keys = Object.keys(user);
console.log(keys);  // ["name", "age", "city"]

// ============================================================
// Object.values() — returns array of property VALUES
// ============================================================
const values = Object.values(user);
console.log(values); // ["Aman", 22, "Delhi"]

// ============================================================
// Object.entries() — returns array of [key, value] PAIRS
// ============================================================
const entries = Object.entries(user);
console.log(entries);
// [["name","Aman"], ["age",22], ["city","Delhi"]]

// Loop over object key-value pairs
for (const [key, value] of Object.entries(user)) {
  console.log(`${key} = ${value}`);
}

// ============================================================
// Object.assign() — copy/merge objects (shallow)
// ============================================================
// Syntax: Object.assign(target, source1, source2, ...)
// Mutates the TARGET object.

const a = { x: 1 };
const b = { y: 2, z: 3 };
const merged = Object.assign({}, a, b);  // {} = empty target (don't mutate a)
console.log(merged);  // { x: 1, y: 2, z: 3 }

// Modern alternative — spread operator (preferred)
const merged2 = { ...a, ...b };
console.log(merged2); // { x: 1, y: 2, z: 3 }

// ============================================================
// Object.freeze() — prevent any modifications
// ============================================================
const config = Object.freeze({ apiUrl: "https://api.example.com", timeout: 5000 });
config.apiUrl = "changed";   // silently ignored (throws in strict mode)
console.log(config.apiUrl);  // "https://api.example.com"

// ============================================================
// OPTIONAL CHAINING (?.)
// ============================================================
// Safely access nested properties WITHOUT crashing if
// any part of the chain is null or undefined.
// Returns undefined instead of throwing a TypeError.

const person = { name: "Riya" };  // no 'address' property

// Without optional chaining — CRASHES
// console.log(person.address.city);  // TypeError!

// With optional chaining — SAFE
console.log(person.address?.city);         // undefined (no crash)
console.log(person?.profile?.age);         // undefined
console.log(person?.name);                 // "Riya"

// Works with methods too
console.log(person.greet?.());             // undefined (greet doesn't exist)

// Works with arrays
const data = null;
console.log(data?.[0]);                    // undefined

// Real-world example: API response may be incomplete
const apiResponse = {
  user: {
    profile: null  // profile not loaded yet
  }
};
console.log(apiResponse?.user?.profile?.name); // undefined — no crash

// ============================================================
// NULLISH COALESCING (??)
// ============================================================
// Returns the RIGHT side ONLY if the left side is null or undefined.
// Different from || which also triggers on: 0, "", false, NaN

// ?? vs || comparison:
const val1 = null ?? "default";      // "default"  (null → use right)
const val2 = undefined ?? "default"; // "default"  (undefined → use right)
const val3 = 0 ?? "default";         // 0          (0 is not null/undefined!)
const val4 = "" ?? "default";        // ""         ("" is not null/undefined!)
const val5 = false ?? "default";     // false      (false is not null/undefined!)

console.log(val1, val2, val3, val4, val5);

// With || (old way — has unintended behavior)
const score1 = 0 || "No score";     // "No score" — WRONG! 0 is a valid score
const score2 = 0 ?? "No score";     // 0          — CORRECT

console.log(score1); // "No score"  — unintended
console.log(score2); // 0           — correct

// ============================================================
// COMBINING ?. and ??
// ============================================================

const profile = null;

// Get name safely, with a fallback
const displayName = profile?.name ?? "Anonymous";
console.log(displayName);  // "Anonymous"

// Real-world: user settings
const settings = {
  theme: null,
  fontSize: 0
};

const theme    = settings?.theme    ?? "light";   // "light"  (null → default)
const fontSize = settings?.fontSize ?? 16;         // 0        (0 is valid — keep it)

console.log(theme, fontSize);  // light 0
