// ============================================================
// FETCH API — Making HTTP Requests in JavaScript
// ============================================================
// fetch() is built into modern browsers and Node.js 18+.
// Returns a PROMISE that resolves to a Response object.
//
// IMPORTANT: fetch() does NOT reject on HTTP errors (404, 500).
//            It only rejects on NETWORK failure.
//            You must check res.ok or res.status manually!

// ============================================================
// GET REQUEST — fetch data
// ============================================================

// Using .then() chains
fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(res => {
    console.log("Status:", res.status);  // 200
    console.log("OK?:", res.ok);         // true
    return res.json();                   // parse JSON body — also returns a Promise
  })
  .then(user => {
    console.log("User:", user.name, user.email);
  })
  .catch(err => {
    console.log("Network Error:", err.message); // only on complete network failure
  });

// Using async/await (cleaner)
async function getUser(id) {
  const res   = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user  = await res.json();
  if (!user.ok) {
    throw new Error(`HTTP ${res.status} - ${res.statusText}`);
  }
  console.log(`Name: ${user.name} | City: ${user.address.city}`);
}
getUser(2);

// ============================================================
// GET with query parameters
// ============================================================

async function getPostsByUser(userId) {
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  const res  = await fetch(url);
  const posts = await res.json();
  console.log(`User ${userId} has ${posts.length} posts`);
  console.log("First post title:", posts[0]?.title);
}
getPostsByUser(1);

// ============================================================
// POST REQUEST — send data to server
// ============================================================

async function createPost() {
  const newPost = {
    title: "My New Post",
    body: "This is the content of my post.",
    userId: 1
  };

  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",  // tell server we're sending JSON
      "Accept": "application/json",         // tell server we want JSON back
    },
    body: JSON.stringify(newPost)  // convert object to JSON string
  });

  const created = await res.json();
  console.log("Created (status", res.status + "):", created);
  // Status: 201 Created
}
createPost();

// ============================================================
// PUT REQUEST — replace entire resource
// ============================================================

async function replacePost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: id,
      title: "Completely Replaced Title",
      body: "Completely replaced body.",
      userId: 1
    })
  });
  const updated = await res.json();
  console.log("PUT result:", updated);
}
replacePost(1);

// ============================================================
// PATCH REQUEST — update part of a resource
// ============================================================

async function updateTitle(id, newTitle) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: newTitle })  // only send what changes
  });
  const updated = await res.json();
  console.log("PATCH result:", updated);
}
updateTitle(1, "Updated Title Only");

// ============================================================
// DELETE REQUEST — remove a resource
// ============================================================

async function deletePost(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
    method: "DELETE"
  });
  console.log("DELETE status:", res.status);  // 200
}
deletePost(1);

// ============================================================
// CHECKING RESPONSE STATUS (Best Practice)
// ============================================================
// fetch() resolves even for 404/500 — you MUST check res.ok

async function safeFetch(url) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      // res.ok = true when status is 200-299
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    return await res.json();

  } catch (err) {
    console.log("Request failed:", err.message);
    return null;
  }
}

safeFetch("https://jsonplaceholder.typicode.com/posts/1").then(data => {
  console.log("Safe fetch result:", data?.title);
});

safeFetch("https://jsonplaceholder.typicode.com/posts/99999").then(data => {
  console.log("Safe fetch 99999:", data);  // null (handled gracefully)
});

// ============================================================
// SENDING AUTHORIZATION HEADERS
// ============================================================

async function getProtectedData(token) {
  const res = await fetch("https://api.example.com/profile", {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (res.status === 401) {
    console.log("Not authenticated — please log in");
    return;
  }
  if (res.status === 403) {
    console.log("Not authorized — insufficient permissions");
    return;
  }

  return await res.json();
}

// ============================================================
// EXERCISE — Fetch posts, filter, and map
// ============================================================

async function postsExercise() {
  const res   = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const user1Titles = posts
    .filter(p => p.userId === 1)
    .map(p => p.title);

  console.log(`User 1's post titles (${user1Titles.length} total):`);
  user1Titles.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
}
postsExercise();
