/**************************************************************
 * TEACHING THE DOM (DOCUMENT OBJECT MODEL) 101
 **************************************************************/

/**
 * 1. WHAT IS THE DOM?
 * 
 * Definition: The DOM is a programming interface for web documents. 
 * It represents the page so that programs (like JavaScript) can change 
 * the document structure, style, and content.
 * 
 * Think of it as a "Tree" where the HTML is the root, and every tag 
 * (div, h1, p) is a "Node" or a "Branch."
 */

// 

/**
 * 2. HOW IS THE DOM CREATED?
 * 
 * When a browser loads your HTML, it "parses" the text and turns it 
 * into an object-oriented model. JavaScript can then talk to this model 
 * using the global 'document' object.
 */


// --- STEP 1: SELECTING ELEMENTS (THE "FINDERS") ---
// You can't change what you can't find!

// Selecting by ID
const mainTitle = document.getElementById('main-title'); 

// Selecting by CSS Selector (The most versatile way)
const firstButton = document.querySelector('.btn-primary'); 
const allListItems = document.querySelectorAll('li'); // Returns a NodeList


// --- STEP 2: CREATING ELEMENTS FROM SCRATCH ---
// Let's create a brand new paragraph without touching the HTML file.

const newParagraph = document.createElement('p'); 

// Adding content to it
newParagraph.innerText = "Hello Class! I was created entirely via JavaScript.";


// --- STEP 3: INSERTING ELEMENTS INTO THE PAGE ---
// Creating it isn't enough; we have to "park" it somewhere in the DOM.

const container = document.querySelector('#container');
container.appendChild(newParagraph); // Adds it as the last child


// --- STEP 4: APPLYING CSS STYLES ---
// You can manipulate the 'style' property directly.

newParagraph.style.color = 'blue';
newParagraph.style.fontWeight = 'bold';
newParagraph.style.fontSize = '20px';

// Better way: Adding a CSS class defined in your stylesheet
newParagraph.classList.add('highlight-box');


// --- STEP 5: MODIFYING ATTRIBUTES ---
// Like changing an 'href' on a link or an 'src' on an image.

const myLink = document.querySelector('a');
if (myLink) {
    myLink.setAttribute('href', 'https://www.google.com');
    myLink.innerText = "Go to Google";
}


// --- STEP 6: HANDLING EVENTS (INTERACTIVITY) ---
// This is how we make the page "react" to the user.

const actionButton = document.getElementById('my-btn');

// The Event Listener listens for a 'click' and runs the function
actionButton.addEventListener('click', function(event) {
    alert('Button was clicked!');
    
    // Changing the background color of the body on click
    document.body.style.backgroundColor = '#f0f0f0';
    
    console.log('Event details:', event);
});


// --- STEP 7: REMOVING ELEMENTS ---
// Sometimes you just have to say goodbye.

// container.removeChild(newParagraph); // Older way
// newParagraph.remove(); // Modern, easier way


/**
 * SUMMARY FOR THE CLASS:
 * 1. Select it (querySelector / getElementById)
 * 2. Change it (.innerText / .style / .classList)
 * 3. Create it (createElement / appendChild)
 * 4. Listen to it (addEventListener)
 */