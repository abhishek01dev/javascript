//get nav li bar using querySelectorall
const navItems = document.querySelectorAll('li');
console.log(navItems); // NodeList of all nav items 
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault
        alert(`You clicked on ${item.innerText}`);
    }); 
});