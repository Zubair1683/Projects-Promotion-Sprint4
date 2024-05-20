import { saveComment, displayComments } from './checker.js';

// Attach click event listener to the "Submit Comment" button
document.getElementById('addComment').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  saveComment("page1");
  displayComments("page1");
});

// Display stored comments for "page1" when the page loads
displayComments("page1");
