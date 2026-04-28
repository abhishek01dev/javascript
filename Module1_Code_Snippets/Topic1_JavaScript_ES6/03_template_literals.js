// ============================================================
// TEMPLATE LITERALS (ES6)
// ============================================================
// Written with BACKTICKS ( ` ) instead of quotes.
// Enable: string interpolation, expressions, multi-line strings.

// ------------------------------------------------------------
// FEATURE 1: String Interpolation — embed variables with ${}
// ------------------------------------------------------------

const name = "Priya";
const marks = 89;

// Old way — concatenation (messy)
const old = "Hello " + name + ", you scored " + marks + " marks.";

// Modern way — template literal (clean)
const modern = `Hello ${name}, you scored ${marks} marks.`;

console.log(old);     // Hello Priya, you scored 89 marks.
console.log(modern);  // Hello Priya, you scored 89 marks.

// ------------------------------------------------------------
// FEATURE 2: Expressions inside ${}
// ------------------------------------------------------------
// Anything inside ${} is evaluated as JavaScript

const a = 5, b = 3;

console.log(`Sum: ${a + b}`);                     // Sum: 8
console.log(`Max: ${Math.max(a, b)}`);            // Max: 5
console.log(`Status: ${a > b ? "Pass" : "Fail"}`); // Status: Pass
console.log(`Uppercase: ${"hello".toUpperCase()}`); // Uppercase: HELLO
console.log(`Square of a: ${a ** 2}`);             // Square of a: 25

// ------------------------------------------------------------
// FEATURE 3: Multi-line Strings (no \n needed)
// ------------------------------------------------------------

// Old way
const oldLetter = "Dear Student,\nWelcome to JavaScript.\nRegards,\nInstructor";

// Modern way — preserve actual line breaks
const newLetter = `Dear Student,

Welcome to the JavaScript course.
Your batch starts on Monday.

Regards,
Instructor`;

console.log(newLetter);

// ------------------------------------------------------------
// FEATURE 4: Nested Template Literals
// ------------------------------------------------------------

const items = ["pen", "book", "bag"];
const list = `Items: ${items.map(item => `[${item}]`).join(", ")}`;
console.log(list);  // Items: [pen], [book], [bag]

// ------------------------------------------------------------
// FEATURE 5: Tagged Templates (Advanced)
// ------------------------------------------------------------
// A function processes the template — receives string parts and values.

function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] !== undefined ? `**${values[i]}**` : "");
  }, "");
}

const role = "Student";
console.log(highlight`Hello ${name}, you are a ${role}.`);
// Hello **Priya**, you are a **Student**.

// ------------------------------------------------------------
// EXERCISE: Student Report Card
// ------------------------------------------------------------

function getReport(studentName, course, fee, discount) {
  const finalAmount = fee - discount;
  return `
--- Student Report ---
Name    : ${studentName}
Course  : ${course}
Fee     : ₹${fee}
Discount: ₹${discount}
Payable : ₹${finalAmount}
Status  : ${finalAmount > 0 ? "Payment Pending" : "Fully Paid"}
----------------------`;
}

console.log(getReport("Aman", "Full Stack", 15000, 2000));
