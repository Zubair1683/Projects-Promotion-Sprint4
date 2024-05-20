import { saveComment, displayComments } from './checker.js';

// Attach click event listener to the "Submit Comment" button
document.getElementById('addComment').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent default form submission

  saveComment("page4");
  displayComments("page4");
});

// Display stored comments for "page4" when the page loads
displayComments("page4");
