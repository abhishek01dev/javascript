const { use } = require("react");

const user = { name: "Aman", age: 22, city: "Delhi" };


if(user && user.name){

}

if(user?.name){

}
const username = user?.name || "ram" 
const usernae = user.name ?? "ram"

// 0,"",false,undefined,null
// console.log(Object.entries(user));

// Loop over object key-value pairs
// for (const [key, value] of Object.entries(user)) {
//   console.log(`${key} = ${value}`);
// }
const settings = {
  theme: null,
  fontSize: 0
};

settings.theme ?? "ram"
settings.fontSize ?? "71"

