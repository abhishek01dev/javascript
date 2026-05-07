// // 1. The Fetcher (GET Request)
// // Goal: Retrieve names and emails from a list of users.
// // fetch('https://jsonplaceholder.typicode.com/users')
// //   .then(response => {
// //     if (!response.ok) throw new Error('Network response was not ok');
// //     return response.json();
// //   })
// //   .then(users => {
// //     users.forEach(user => {
// //       console.log(`Name: ${user.name} | Email: ${user.email}`);
// //     });
// //   })
// //   .catch(error => console.error('Error fetching users:', error));

// //   2. The Error Handler (Handling 404s)
// // Goal: Understand that fetch only rejects on network failure, so we must manually check response.ok for 404 errors.
// // fetch('https://jsonplaceholder.typicode.com/posts/9999')
// //   .then(response => {
// //     if (!response.ok) {
// //       // Manually throwing an error to trigger the .catch() block
// //       throw new Error("Post not found!");
// //     }
// //     return response.json();
// //   })
// //   .then(data => console.log(data))
// //   .catch(error => {
// //     console.error('Caught Exception:', error.message);
// //   });

// //   3. The Creator (POST Request)
// // Goal: Send data to the server and verify the 201 Created status code.

// const newTodo = {
//   title: 'Finish JavaScript Homework',
//   completed: false,
//   userId: 1
// };

// // // fetch('https://jsonplaceholder.typicode.com/todos', {
// // //   method: 'POST',
// // //   body: JSON.stringify(newTodo),
// // //   headers: { 'Content-type': 'application/json; charset=UTF-8' }
// // // })
// // //   .then(response => {
// // //     console.log('Status Code:', response.status); // Should be 201
// // //     return response.json();
// // //   })
// // //   .then(data => console.log('Successfully Created:', data))
// // //   .catch(error => console.error('Post failed:', error));

// // //   4. The Updater (PUT Request)
// // // Goal: Modify an existing resource and log the response.
// // fetch('https://jsonplaceholder.typicode.com/posts/1', {
// //   method: 'PUT',
// //   body: JSON.stringify({
// //     id: 1,
// //     title: 'Modern Web Development',
// //     body: 'Learning how to use Promises efficiently.',
// //     userId: 1
// //   }),
// //   headers: { 'Content-type': 'application/json; charset=UTF-8' }
// // })
// //   .then(response => response.json())
// //   .then(updatedPost => console.log('Updated Post:', updatedPost))
// //   .catch(error => console.error('Update failed:', error));

// //   5. Chain Challenge (Sequential Requests)
// // Goal: Use the result of the first request to trigger a second request (Promise chaining).
// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then(posts => {
//     const firstPostId = posts[0].id;
//     console.log(`Fetching comments for Post ID: ${firstPostId}`);
    
//     // Return a new promise to continue the chain
//     return fetch(`https://jsonplaceholder.typicode.com/posts/${firstPostId}/comments`);
//   })
//   .then(response => response.json())
//   .then(comments => {
//     console.log('Comments for first post:', comments);
//   })
//   .catch(error => {
//     console.error('An error occurred in the chain:', error);
//   });
// const newTodo = {
//   title: 'Finish JavaScript Homework',
//   completed: false,
//   userId: 1
// };
// console.log(newTodo)
// console.log(JSON.stringify(newTodo));
// console.log(JSON.parse(JSON.stringify(newTodo)));

; // Convert object to JSON string for sending in request body

function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// --- Load ---
function loadFromStorage(key) {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : null;
}

const cartItems = [
  { id: 1, name: "Pen",  qty: 2, price: 10 },
  { id: 2, name: "Book", qty: 1, price: 250 },
];

saveToStorage("cart", cartItems);
const savedCart = loadFromStorage("cart");
console.log(savedCart);