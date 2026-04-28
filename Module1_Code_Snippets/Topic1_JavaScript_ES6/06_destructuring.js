// ============================================================
// DESTRUCTURING (ES6)
// ============================================================
// Extract values from arrays or properties from objects
// into variables in a single, clean statement.

// ============================================================
// PART 1: ARRAY DESTRUCTURING
// ============================================================
// Extracts values BY POSITION

const colors = ["red", "green", "blue", "yellow", "purple"];

// Basic extraction
const [first, second] = colors;
console.log(first, second);      // red green

// Skip elements using commas
const [, , third] = colors;
console.log(third);              // blue

// Default value (used if position is undefined)
const [a, b, c, d, e, f = "white"] = colors;
console.log(f);                  // white (index 5 doesn't exist)

// Rest pattern — collect remaining into a new array
const [head, ...tail] = colors;
console.log(head);               // red
console.log(tail);               // ["green", "blue", "yellow", "purple"]

// Swap variables WITHOUT a temp variable
let x = 1, y = 2;
[x, y] = [y, x];
console.log(x, y);               // 2 1

// Destructure from a function return value
function getCoords() { return [10, 20]; }
const [lat, lng] = getCoords();
console.log(lat, lng);           // 10 20

// ============================================================
// PART 2: OBJECT DESTRUCTURING
// ============================================================
// Extracts values BY PROPERTY NAME

const student = {
  name: "Riya",
  age: 20,
  course: "B.Tech",
  city: "Delhi"
};

// Basic — variable name MUST match property name
const { name, course } = student;
console.log(name, course);       // Riya B.Tech

// Rename while destructuring (propertyName: newVariableName)
const { name: studentName, age: studentAge } = student;
console.log(studentName);        // Riya
console.log(studentAge);         // 20

// Default values (used if property doesn't exist)
const { name: sName, country = "India" } = student;
console.log(country);            // India (student has no 'country' property)

// Rest pattern — collect remaining properties
const { name: n, ...rest } = student;
console.log(rest);               // { age: 20, course: "B.Tech", city: "Delhi" }

// ============================================================
// PART 3: NESTED DESTRUCTURING
// ============================================================

const user = {
  id: 1,
  profile: {
    name: "Aman",
    address: {
      city: "Delhi",
      pin: "110001"
    }
  }
};

// Go deep in one statement
const { profile: { name: userName, address: { city } } } = user;
console.log(userName, city);     // Aman Delhi

// ============================================================
// PART 4: DESTRUCTURING IN FUNCTION PARAMETERS
// ============================================================
// Very common in React — destructure props directly in the parameter.

// Without destructuring
function showUserOld(user) {
  console.log(user.name + " from " + user.city);
}

// With destructuring
const showUser = ({ name: uName, city: uCity }) => {
  console.log(`${uName} from ${uCity}`);
};
showUser({ name: "Aman", city: "Delhi" });  // Aman from Delhi

// With defaults in parameters
const showProduct = ({ title, price = 0, stock = "In Stock" }) => {
  console.log(`${title}: ₹${price} (${stock})`);
};
showProduct({ title: "Pen", price: 10 });   // Pen: ₹10 (In Stock)

// ============================================================
// EXERCISE: Nested destructuring
// ============================================================

const book = {
  title: "Atomic Habits",
  author: { name: "James Clear", country: "USA" },
  pages: 320
};

// Destructure title and author's name in ONE statement
const { title, author: { name: authorName } } = book;
console.log(title, authorName);  // Atomic Habits James Clear
