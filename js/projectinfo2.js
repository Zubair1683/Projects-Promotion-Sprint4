import { saveComment, displayComments } from './checker.js';

// Attach click event listener to the "Submit Comment" button
document.getElementById('addComment').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  saveComment("page2");
  displayComments("page2");
});

// Display stored comments for "page2" when the page loads
displayComments("page2");
