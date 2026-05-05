// ============================================================
// PROMISES (ES6)
// ============================================================
// A Promise represents the eventual SUCCESS or FAILURE
// of an asynchronous operation and its resulting value.
//
// 3 States:
//   pending   — work is in progress (initial state)
//   fulfilled — resolved successfully (resolve() was called)
//   rejected  — failed (reject() was called)
//
// Once fulfilled or rejected, a promise is SETTLED and cannot change.

// ============================================================
// CREATING A PROMISE
// ============================================================

const orderPizza = new Promise((resolve, reject) => {
  console.log("Pizza is being prepared...");

  setTimeout(() => {
    const isAvailable = true;  // change to false to test rejection

    if (isAvailable) {
      resolve("Pizza is ready!");   // success — calls .then()
    } else {
      reject("Out of ingredients"); // failure — calls .catch()
    }
  }, 1500);
});

// ============================================================
// CONSUMING A PROMISE — .then() / .catch() / .finally()
// ============================================================
// .then(fn)    — runs when promise RESOLVES (success)
// .catch(fn)   — runs when promise REJECTS (failure)
// .finally(fn) — ALWAYS runs, regardless of result (like cleanup)

orderPizza
  .then(message => {
    console.log("Success:", message);  // Success: Pizza is ready!
  })
  .catch(error => {
    console.log("Error:", error);      // Error: Out of ingredients
  })
  .finally(() => {
    console.log("Order processing done."); // always runs
  });

// ============================================================
// PROMISE CHAINING — flat, readable async sequences
// ============================================================
// Each .then() returns a NEW Promise — enables chaining.
// ONE .catch() at the end handles errors from ANY step.

function loginUser(name) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ id: 1, name }), 500);
  });
}

function getProfile(user) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ ...user, age: 22, bio: "Developer" }), 500);
  });
}

function getPosts(profile) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(["Post 1", "Post 2", "Post 3"]), 500);
    // setTimeout(() => reject("Posts unavailable"), 500); // test error
  });
}

// Chained — flat and readable (compare to callback hell!)
loginUser("Aman")
  .then(user    => getProfile(user))
  .then(profile => getPosts(profile))
  .then(posts   => console.log("Posts:", posts))
  .catch(err    => console.log("Something failed:", err));

// ============================================================
// Promise.all() — Run multiple promises IN PARALLEL
// ============================================================
// Resolves when ALL promises resolve.
// If ANY one rejects → the whole thing rejects immediately.
// Use when tasks are INDEPENDENT and you need ALL results.

const p1 = new Promise(r => setTimeout(() => r("Data A"), 1000));
const p2 = new Promise(r => setTimeout(() => r("Data B"), 2000));
const p3 = new Promise(r => setTimeout(() => r("Data C"), 1500));

Promise.all([p1, p2, p3])
  .then(results => console.log("All done:", results))
  // All done: ["Data A", "Data B", "Data C"] after ~2 seconds
  .catch(err => console.log("One failed:", err));

// ============================================================
// Promise.allSettled() — Wait for ALL, even if some fail
// ============================================================
// NEVER rejects — always waits for all to settle.
// Returns array of { status, value } or { status, reason }.
// Use when you want results of ALL promises regardless of failures.

Promise.allSettled([
  Promise.resolve("OK"),
  Promise.reject("Failed!"),
  Promise.resolve("Done"),
]).then(results => {
  results.forEach(r => {
    if (r.status === "fulfilled") {
      console.log("OK:", r.value);
    } else {
      console.log("FAIL:", r.reason);
    }
  });
});
// OK: OK
// FAIL: Failed!
// OK: Done

// ============================================================
// Promise.race() — First to settle WINS
// ============================================================
// Resolves or rejects with the value of the FIRST settled promise.
// Use for timeouts, fastest response, etc.

const fast = new Promise(r => setTimeout(() => r("Fast!"), 500));
const slow = new Promise(r => setTimeout(() => r("Slow..."), 2000));

Promise.race([fast, slow])
  .then(winner => console.log("Winner:", winner));  // Winner: Fast!

// ============================================================
// CREATING UTILITY PROMISE WRAPPERS
// ============================================================

// Promisify a delay (useful for demos and testing)
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function demo() {
  console.log("Waiting 1 second...");
  await delay(1000);
  console.log("Done waiting!");
}
demo();

// ============================================================
// Promise.resolve() and Promise.reject() — instant promises
// ============================================================
Promise.resolve(42).then(v => console.log("Instant resolve:", v)); // 42
Promise.reject("Oops").catch(e => console.log("Instant reject:", e)); // Oops
