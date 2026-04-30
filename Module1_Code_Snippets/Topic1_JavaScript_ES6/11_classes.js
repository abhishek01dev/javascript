// ============================================================
// CLASSES (ES6)
// ============================================================
// Classes are blueprints for creating objects.
// ES6 class syntax is "syntactic sugar" over JS prototype-based inheritance.
// Under the hood it still uses prototypes — just cleaner syntax.

// ============================================================
// BASIC CLASS
// ============================================================

class Student {
  // constructor runs automatically when 'new Student(...)' is called
  constructor(name, marks) {
    this.name = name;
    this.marks = marks;
  }

  // Method (shared by all instances — lives on prototype, not each object)
  result() {
    return this.marks >= 50 ? "Pass" : "Fail";
  }

  grade() {
    if (this.marks >= 90) return "A+";
    if (this.marks >= 80) return "A";
    if (this.marks >= 70) return "B";
    if (this.marks >= 50) return "C";
    return "F";
  }

  intro() {
    return `I am ${this.name}, I scored ${this.marks} — ${this.grade()} (${this.result()})`;
  }
}

const s1 = new Student("Aman", 75);
const s2 = new Student("Riya", 92);
const s3 = new Student("Karan", 40);

console.log(s1.intro()); // I am Aman, I scored 75 — B (Pass)
console.log(s2.intro()); // I am Riya, I scored 92 — A+ (Pass)
console.log(s3.intro()); // I am Karan, I scored 40 — F (Fail)

// ============================================================
// INHERITANCE — extends and super
// ============================================================
// 'extends' = inherit from parent class
// 'super()' = call parent's constructor (MUST call before using 'this')
// A. Inheritance (extends and super)
// Inheritance allows one class to "borrow" everything from another. This prevents code repetition. We use extends to link classes and super() to call the parent’s constructor.


class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hi, I am ${this.name}, age ${this.age}`;
  }

  toString() {
    return `Person(${this.name})`;
  }
}

class Engineer extends Person {
  constructor(name, age, skill) {
    super(name, age);         // calls Person's constructor
    this.skill = skill;
  }

  // Override greet()
  greet() {
    return `${super.greet()} and I specialise in ${this.skill}`;
    // super.greet() calls the PARENT's greet method
  }
}

class Manager extends Engineer {
  constructor(name, age, skill, teamSize) {
    super(name, age, skill);  // calls Engineer's constructor
    this.teamSize = teamSize;
  }

  greet() {
    return `${super.greet()}, managing ${this.teamSize} people`;
  }
}

const e = new Engineer("Riya", 25, "JavaScript");
console.log(e.greet());  // Hi, I am Riya, age 25 and I specialise in JavaScript

const m = new Manager("Vikram", 35, "Python", 10);
console.log(m.greet());  // Hi, I am Vikram... specialise in Python, managing 10 people

// Check inheritance
console.log(e instanceof Engineer); // true
console.log(e instanceof Person);   // true (inherited)
console.log(e instanceof Manager);  // false


// B. Encapsulation (Private Fields)
// Encapsulation is about "hiding" the internal state of an object and requiring all interaction to happen through methods. In modern JS, we use the # symbol to make properties private.
// Why? To prevent outside code from accidentally breaking the object's internal logic.

class BankAccount {
  #balance = 0; // Private property
  deposit(amount) {
    if (amount > 0) this.#balance += amount;
  }

  getBalance() {
    return `Balance: $${this.#balance}`;
  }
}
const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance()); // Balance: $100
// console.log(acc.#balance); // ERROR: Private field cannot be accessed outside the class


// C. Polymorphism
// Polymorphism means "many forms." In JS, this usually means a child class can provide its own specific version of a method that already exists in the parent class (Method Overriding).

//crate example:
class Animal {
  speak() {
    return "Animal makes a sound";
  }
}

class Dog extends Animal {
  speak() {
    return "Woof!";
  }
}

class Cat extends Animal {
  speak() {
    return "Meow!";
  }
}

const animals = [new Dog(), new Cat()];
animals.forEach(a => console.log(a.speak()));
// Output:
// Woof!
// Meow!  


// D. Abstraction
// Abstraction involves hiding complex implementation details and showing only the necessary features of an object. While JS doesn't have "Abstract Classes" built-in like Java, we achieve this by designing simple interfaces for complex logic.

// Example: A simple Logger class that abstracts away the complexity of logging to different targets (console, file, etc.)

class Logger {
  log(message) {
    console.log(`[LOG] ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }
}

const logger = new Logger();
logger.log("This is a log message.");
logger.error("This is an error message.");

//example 2:
//check this example is it correct?

class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error("Cannot instantiate an abstract class!");
    }
  }

  // This is an "abstract" method
  calculateArea() {
    throw new Error("Method 'calculateArea()' must be implemented.");
  }

}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  calculateArea() {
    return this.width * this.height;
  }
}

const rect = new Rectangle(5, 10);
console.log(rect.calculateArea()); // 50
  // const s = new Shape(); // ❌ Throws Error

// ============================================================
// STATIC METHODS — belong to the CLASS, not instances
// ============================================================
// Call on the class itself: ClassName.method()
// Cannot use 'this' to access instance properties

class MathUtil {
  static square(n) { return n * n; }
  static cube(n)   { return n * n * n; }
  static isEven(n) { return n % 2 === 0; }
}

console.log(MathUtil.square(5));  // 25
console.log(MathUtil.cube(3));    // 27
// const m2 = new MathUtil();
// m2.square(5);  // ERROR: square is not a function on instances

// ============================================================
// GETTERS and SETTERS
// ============================================================

class Circle {
  constructor(radius) {
    this._radius = radius;   // _ convention = "private"
  }

  // getter — accessed like a property (no parentheses)
  get radius() { return this._radius; }
  get area()   { return (Math.PI * this._radius ** 2).toFixed(2); }

  // setter — validates before setting
  set radius(value) {
    if (value <= 0) throw new Error("Radius must be positive");
    this._radius = value;
  }
}

const c = new Circle(5);
console.log(c.radius);  // 5
console.log(c.area);    // 78.54

c.radius = 10;
console.log(c.area);    // 314.16

// ============================================================
// EXERCISE: BankAccount + SavingsAccount
// ============================================================

class BankAccount {
  constructor(holder, balance = 0) {
    this.holder = holder;
    this.balance = balance;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`Deposited ₹${amount}. Balance: ₹${this.balance}`);
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log("Insufficient funds!");
      return;
    }
    this.balance -= amount;
    console.log(`Withdrew ₹${amount}. Balance: ₹${this.balance}`);
  }

  getBalance() {
    return `Account holder: ${this.holder} | Balance: ₹${this.balance}`;
  }
}

class SavingsAccount extends BankAccount {
  constructor(holder, balance, interestRate = 0.05) {
    super(holder, balance);
    this.interestRate = interestRate;
  }

  // Add interest method
  addInterest() {
    const interest = this.balance * this.interestRate;
    this.deposit(interest);
    console.log(`Interest of ₹${interest} added.`);
  }
}

const acc = new BankAccount("Aman", 5000);
acc.deposit(2000);
acc.withdraw(1000);
console.log(acc.getBalance());

const savings = new SavingsAccount("Riya", 10000, 0.08);
savings.addInterest();
console.log(savings.getBalance());
