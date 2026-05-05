// ============================================================
// SYNCHRONOUS vs ASYNCHRONOUS + CALLBACKS
// ============================================================

// ============================================================
// SYNCHRONOUS CODE — runs line by line, each waits for previous
// ============================================================

console.log("Step 1");
console.log("Step 2");
console.log("Step 3");
// Output: Step 1 → Step 2 → Step 3 (in order, no surprise)

// ============================================================
// ASYNCHRONOUS CODE — some tasks start and JS moves on
// ============================================================

console.log("--- Async Demo ---");
console.log("Start");

setTimeout(() => {
  console.log("Timer done (after 2 sec)");
}, 2000);

console.log("End");
// Output: Start → End → Timer done (after 2 sec)
// JS does NOT wait for setTimeout — it continues and comes back later.

// ============================================================
// EVENT LOOP (concept)
// ============================================================
// JavaScript is SINGLE-THREADED — only one thing runs at a time.
//
//   Call Stack   — where synchronous code runs (LIFO)
//   Web APIs     — handles setTimeout, fetch, DOM events (in browser)
//   Task Queue   — finished async callbacks wait here
//   Event Loop   — when stack is EMPTY, picks from queue and runs
//
// This is why "End" prints before "Timer done" — setTimeout goes to
// Web APIs, JS finishes the stack, then event loop picks the callback.

// ============================================================
// CALLBACKS — function passed as argument, called later
// ============================================================
// Oldest async pattern. Simple but leads to "callback hell" if nested.

// --- Simple synchronous callback ---
function greet(name, callback) {
  console.log("Hi " + name);
  callback();  // call the function passed in
}

function sayBye() {
  console.log("Goodbye!");
}

greet("Aman", sayBye);
// Hi Aman
// Goodbye!

// --- Async callback with setTimeout (simulates API delay) ---
function fetchUserData(userId, callback) {
  console.log(`Fetching user ${userId}...`);
  setTimeout(() => {
    const user = { id: userId, name: "Aman", score: 90 };
    callback(user);  // data is ready — "call back" with it
  }, 1500);
}

fetchUserData(1, (user) => {
  console.log("Got user:", user);
});
// Fetching user 1...
// (1.5 sec later) Got user: { id: 1, name: "Aman", score: 90 }

// --- ERROR-FIRST CALLBACK PATTERN (Node.js convention) ---
// First argument is always an error (or null if success).
// Second argument is the result.

function divide(a, b, callback) {
  if (b === 0) {
    callback(new Error("Cannot divide by zero"), null); // error case
  } else {
    callback(null, a / b);  // success case: error=null, result=value
  }
}

divide(10, 2, (err, result) => {
  if (err) {
    console.log("Error:", err.message);
  } else {
    console.log("Result:", result);  // Result: 5
  }
});

divide(10, 0, (err, result) => {
  if (err) {
    console.log("Error:", err.message);  // Error: Cannot divide by zero
  } else {
    console.log("Result:", result);
  }
});

// ============================================================
// CALLBACK HELL — the problem that Promises solve
// ============================================================
// When async tasks depend on each other, callbacks nest deeply.
// This is called the "pyramid of doom" — hard to read and maintain.

// EXAMPLE (don't actually run — just shows the pattern):
/*
loginUser("aman", (user) => {
  getProfile(user.id, (profile) => {
    getPosts(profile.id, (posts) => {
      getComments(posts[0].id, (comments) => {
        renderComments(comments, (result) => {
          // deeper and deeper...
        });
      });
    });
  });
});
*/

// Problems with callback hell:
//   1. Hard to read (nesting grows right)
//   2. Hard to handle errors (need try/catch at every level)
//   3. Hard to debug
//   SOLUTION → Promises (next file)
