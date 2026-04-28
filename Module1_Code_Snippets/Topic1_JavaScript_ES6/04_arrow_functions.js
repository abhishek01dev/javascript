// ============================================================
// ARROW FUNCTIONS (ES6)
// ============================================================
// Shorter syntax for writing functions using the => symbol.
// Key difference: Arrow functions do NOT have their own 'this'.

// ------------------------------------------------------------
// SYNTAX VARIATIONS
// ------------------------------------------------------------

// 1. Traditional function
function addOld(a, b) {
  return a + b;
}

// 2. Arrow function — full form (with body and explicit return)
const addFull = (a, b) => {
  return a + b;
};

// 3. Implicit return — single expression, no braces needed
const add = (a, b) => a + b;

// 4. Single parameter — parentheses are optional
const square = x => x * x;

// 5. No parameters — empty parentheses required
const greet = () => "Hello!";

// 6. Returning an OBJECT — must wrap in parentheses
//    (otherwise JS thinks { } is a function body, not an object)
const makeUser = (name, age) => ({ name: name, age: age });

// 7. Multiple statements — must use { } and explicit return
const greetUser = (name) => {
  const msg = `Hi ${name}`;
  console.log(msg);
  return msg;
};

console.log(add(3, 4));           // 7
console.log(square(5));           // 25
console.log(greet());             // Hello!
console.log(makeUser("Aman", 22)); // { name: "Aman", age: 22 }

// ------------------------------------------------------------
// THIS BINDING — biggest difference from regular functions
// ------------------------------------------------------------
// Regular function: creates its OWN 'this' (depends on how it's called)
// Arrow function: INHERITS 'this' from the surrounding scope

const team = {
  name: "Avengers",
  members: ["Iron Man", "Thor", "Hulk"],

  // Regular function inside forEach — loses 'this'
  showRegular: function () {
    this.members.forEach(function (m) {
      // 'this' here is undefined (strict) or window (non-strict)
      console.log(this.name + ": " + m); // undefined: Iron Man
    });
  },

  // Arrow function inside forEach — inherits 'this' from showArrow
  showArrow: function () {
    this.members.forEach((m) => {
      // 'this' here refers to the team object
      console.log(this.name + ": " + m); // Avengers: Iron Man
    });
  },
};

team.showArrow();

// ------------------------------------------------------------
// WHEN NOT TO USE ARROW FUNCTIONS
// ------------------------------------------------------------

// 1. As object methods that need their own 'this'
const counter = {
  count: 0,
  // BAD: arrow function — 'this' is not the counter object
  incrementBad: () => counter.count++,
  // GOOD: regular function — 'this' refers to counter
  incrementGood: function () { this.count++; },
};

// 2. As constructor functions (arrow functions can't use 'new')
// const Person = (name) => { this.name = name; };
// const p = new Person("Aman"); // ERROR: Person is not a constructor

// 3. When you need the 'arguments' object
function showArgs() {
  console.log(arguments); // works
}
const showArgsArrow = () => {
  // console.log(arguments); // ERROR: arguments is not defined
  // Use rest parameters instead: (...args) => console.log(args)
};

// ------------------------------------------------------------
// EXERCISE: Convert to arrow functions
// ------------------------------------------------------------

// Original functions:
// function isEven(n) { return n % 2 === 0; }
// function greetPerson(name) { return 'Hello ' + name; }
// function area(l, w) { return l * w; }

const isEven = n => n % 2 === 0;
const greetPerson = name => `Hello ${name}`;
const area = (l, w) => l * w;

console.log(isEven(4));          // true
console.log(greetPerson("Riya")); // Hello Riya
console.log(area(5, 3));         // 15
