// ============================================================
// JSON.stringify() — JavaScript Object → JSON String
// ============================================================
// Used when:
//   - Sending data to a server (fetch body)
//   - Storing data in localStorage
//   - Logging/debugging objects as text
//
// Syntax: JSON.stringify(value, replacer, space)

// ============================================================
// BASIC USAGE
// ============================================================

const user = { name: "Riya", age: 20, city: "Delhi" };

const jsonStr = JSON.stringify(user);
console.log(jsonStr);          // {"name":"Riya","age":20,"city":"Delhi"}
console.log(typeof jsonStr);   // "string" — it's now a string, not an object

// Works with arrays too
const skills = ["JavaScript", "React", "Node.js"];
console.log(JSON.stringify(skills)); // ["JavaScript","React","Node.js"]

// ============================================================
// PRETTY PRINTING — 3rd parameter (space)
// ============================================================
// Number = indent by that many spaces
// String = use that string as indent

console.log(JSON.stringify(user, null, 2));
// {
//   "name": "Riya",
//   "age": 20,
//   "city": "Delhi"
// }

console.log(JSON.stringify(user, null, "\t")); // tab-indented

// ============================================================
// FILTERING — 2nd parameter: replacer ARRAY
// ============================================================
// Only include the listed keys in the output.
// Useful for excluding sensitive fields like passwords.

const userWithPassword = {
  name: "Aman",
  age: 22,
  email: "aman@mail.com",
  password: "secret123",
  token: "eyJhbGci..."
};

// Only include name and age — exclude sensitive fields
const safeJson = JSON.stringify(userWithPassword, ["name", "age"], 2);
console.log(safeJson);
// {
//   "name": "Aman",
//   "age": 22
// }

// ============================================================
// FILTERING — 2nd parameter: replacer FUNCTION
// ============================================================
// Called for each key/value pair — return undefined to exclude.

const filtered = JSON.stringify(userWithPassword, (key, value) => {
  if (key === "password" || key === "token") return undefined;  // exclude
  if (typeof value === "string") return value.toUpperCase();    // transform strings
  return value;                                                  // keep everything else
});
console.log(filtered);
// {"name":"AMAN","age":22,"email":"AMAN@MAIL.COM"}

// ============================================================
// WHAT GETS SKIPPED BY JSON.stringify()
// ============================================================

const tricky = {
  name: "A",
  greet: function () { return "Hello"; }, // FUNCTIONS — removed
  age: undefined,                          // undefined in objects — removed
  id: Symbol("user"),                      // Symbols — removed
  arr: [1, undefined, 3, function(){}],   // undefined/functions in arrays → null
};

console.log(JSON.stringify(tricky));
// {"name":"A","arr":[1,null,3,null]}
// Note: greet, age, id are completely gone; undefined/fn in array → null

// ============================================================
// SPECIAL VALUES BEHAVIOR
// ============================================================

console.log(JSON.stringify(undefined));  // undefined (not a string — nothing!)
console.log(JSON.stringify(null));       // "null"
console.log(JSON.stringify(NaN));        // "null"
console.log(JSON.stringify(Infinity));   // "null"
console.log(JSON.stringify(true));       // "true"
console.log(JSON.stringify(42));         // "42"

// ============================================================
// PRACTICAL EXAMPLE: Sending to server
// ============================================================

async function sendDataToServer() {
  const formData = {
    name: "Aman",
    course: "Full Stack",
    enrolled: true,
  };

  // fetch expects body to be a STRING
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),  // <-- must stringify here
  });

  const result = await response.json();
  console.log("Server responded:", result);
}
sendDataToServer();
