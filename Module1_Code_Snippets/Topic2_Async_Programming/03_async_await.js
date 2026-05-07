// ============================================================
// ASYNC / AWAIT (ES2017)
// ============================================================
// Syntactic sugar over Promises — lets you write async code
// that LOOKS and READS like synchronous code.
//
//   async  — makes a function always return a Promise
//   await  — pauses the function until a Promise settles,
//            returns its resolved value
//            (can ONLY be used inside an async function)

// ============================================================
// ASYNC FUNCTION — always returns a Promise
// ============================================================
// new Pr
async function sayHello() {
  return "Hello!";  // automatically wrapped in Promise.resolve()
}

sayHello().then(v => console.log(v));  // Hello!

// Same as:
// function sayHello() { return Promise.resolve("Hello!"); }

// ============================================================
// AWAIT — pause until Promise resolves
// ============================================================

const delay = (ms, value) => new Promise(r => setTimeout(() => r(value), ms));

async function run() {
  console.log("Starting...");
  const result = await delay(1000, "Data loaded"); // pause here
  console.log(result);  // Data loaded (after 1 sec)
  console.log("Finished.");
}
run();

// ============================================================
// ERROR HANDLING — try / catch / finally
// ============================================================
// Same structure as synchronous error handling — clean and familiar.

async function fetchPost(id) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);  // manually throw on bad status
    }

    const post = await res.json();
    console.log("Title:", post.title);
    return post;

  } catch (err) {
    console.log("Failed:", err.message);  // catches both network and HTTP errors
    return null;

  } finally {
    console.log("Request completed.");    // always runs (cleanup, loading=false, etc.)
  }
}

fetchPost(1);   // success
fetchPost(9999); // likely 404

// ============================================================
// SEQUENTIAL vs PARALLEL — critical performance difference
// ============================================================

// --- SEQUENTIAL (slow) — each await waits for the previous ---
// Total time = sum of all delays (1+1+1 = 3 seconds)

async function sequential() {
  const a = await delay(1000, "A");  // wait 1s
  const b = await delay(1000, "B");  // wait another 1s
  const c = await delay(1000, "C");  // wait another 1s
  console.log("Sequential:", a, b, c);  // after 3 seconds
}

// --- PARALLEL (fast) — all start simultaneously ---
// Total time = longest delay (~1 second)

async ();function parallel() {
  const [a, b, c] = await Promise.all([
    delay(1000, "A"),  // all 3 start at the same time
    delay(1000, "B"),
    delay(1000, "C"),
  ]);
  console.log("Parallel:", a, b, c);  // after 1 second
}

// Use sequential only when result of one depends on the previous.
// Use parallel when tasks are INDEPENDENT.

sequential();
parallel();

// ============================================================
// ASYNC IN REAL-WORLD: Fetch User then their Posts
// ============================================================

async function loadUserAndPosts(userId) {
  try {
    // Step 1: fetch user
    const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
    if (!userRes.ok) throw new Error("User not found");
    const user = await userRes.json

    // Step 2: fetch posts for that user (depends on userId from step 1)
    const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const posts = await postsRes.json();

    console.log(`User: ${user.name}`);
    console.log(`Posts: ${posts.length}`);
    console.log("First post:", posts[0]?.title);

  } catch (err) {
    console.log("Error loading data:", err.message);
  }
}

loadUserAndPosts(2);

// ============================================================
// ASYNC/AWAIT vs PROMISES vs CALLBACKS — Quick Comparison
// ============================================================
//
//  CALLBACKS (old)
//    loginUser("a", (u) => getProfile(u.id, (p) => getPosts(p.id, ...)))
//    Pros: simple   Cons: nesting, error handling hard
//
//  PROMISES
//    loginUser("a").then(getProfile).then(getPosts).catch(err => ...)
//    Pros: flat, one catch   Cons: .then() chains can get complex
//
//  ASYNC/AWAIT
//    const u = await loginUser("a");
//    const p = await getProfile(u.id);
//    const posts = await getPosts(p.id);
//    Pros: reads like sync code, easy try/catch
//    They all use Promises under the hood — await/async is just cleaner syntax.

// ============================================================
// EXERCISE — fetch user 2 and their posts
// ============================================================

async function exercise() {
  try {
    const [userRes, postsRes] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/2"),
      fetch("https://jsonplaceholder.typicode.com/posts?userId=2"),
    ]);

    const user  = await userRes.json();
    const posts = await postsRes.json();

    console.log(`Name: ${user.name}`);
    console.log(`Number of posts: ${posts.length}`);

  } catch (err) {
    console.log("Exercise error:", err.message);
  }
}

exercise();
