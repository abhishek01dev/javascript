// ============================================================
// DEFAULT PARAMETERS (ES6)
// ============================================================
// Set a fallback value for a parameter if caller passes
// nothing (undefined). Makes function calls more flexible.

// ------------------------------------------------------------
// OLD WAY vs NEW WAY
// ------------------------------------------------------------

// Old way — manual fallback with ||
function greetOld(name) {
  name = name || "Guest";    // works, but || triggers on 0, "", false too
  return "Hello, " + name;
}

// New way — default parameter (ES6)
const greet = (name = "Guest") => `Hello, ${name}`;

console.log(greet());            // Hello, Guest   (no argument)
console.log(greet(undefined));   // Hello, Guest   (undefined also uses default)
console.log(greet("Aman"));      // Hello, Aman
console.log(greet(null));        // Hello, null    (null is NOT undefined — no default!)
console.log(greet(0));           // Hello, 0       (0 is NOT undefined — no default!)

// ------------------------------------------------------------
// DEFAULT VALUE CAN USE OTHER PARAMETERS
// ------------------------------------------------------------
// Earlier parameters can be referenced by later ones.

const calcTotal = (price, tax = price * 0.18) => price + tax;

console.log(calcTotal(100));       // 118  (tax = 100 * 0.18 = 18)
console.log(calcTotal(100, 25));   // 125  (custom tax = 25)
console.log(calcTotal(200));       // 236  (tax = 200 * 0.18 = 36)

// ------------------------------------------------------------
// DEFAULT VALUE CAN CALL A FUNCTION
// ------------------------------------------------------------

const getDate = () => new Date().toLocaleDateString();

const logEvent = (msg, time = getDate()) => `[${time}] ${msg}`;

console.log(logEvent("Login"));                  // [today's date] Login
console.log(logEvent("Logout", "12:00 PM"));     // [12:00 PM] Logout

// ------------------------------------------------------------
// DEFAULT WITH OBJECTS (common in React/Node)
// ------------------------------------------------------------

function createUser({ name = "Anonymous", role = "user", active = true } = {}) {
  return { name, role, active };
}

console.log(createUser({ name: "Aman" }));          // { name: "Aman", role: "user", active: true }
console.log(createUser({ name: "Riya", role: "admin" })); // { name: "Riya", role: "admin", active: true }
console.log(createUser());                           // { name: "Anonymous", role: "user", active: true }

// Note: The = {} at the end means if NO argument is passed at all,
// it won't crash — it uses an empty object, then applies all defaults.

// ------------------------------------------------------------
// EXERCISE: bookTicket function
// ------------------------------------------------------------

const bookTicket = (passengerName, seats = 1, farePerSeat = 500) => {
  const total = seats * farePerSeat;
  return `Passenger: ${passengerName} | Seats: ${seats} | Total: ₹${total}`;
};

console.log(bookTicket("Aman", 3, 800));   // all 3 args
console.log(bookTicket("Riya", 2));        // 2 args — fare uses default
console.log(bookTicket("Karan"));           // 1 arg — seats and fare use defaults
