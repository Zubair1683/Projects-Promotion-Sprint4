
const forbiddenwords = ["example1", "example2", "example3", "example4", "example5"];// We can add some forbidden words we dont want to be written 

// Function to save a comment to local storage
export function saveComment(pageIdentifier) {

  // Get values from input fields
  var fullName = document.getElementById("fullName").value;
  var commentText = document.getElementById("comment").value;

  // Split them and store them to arrays
  const re = /\s+/;
  const nameWords = fullName.split(re);
  const commentWords = commentText.split(re);

  let nflag = false;
  let cflag = false;

  // check if the nameWords array includes any forbidden word
  nameWords.forEach(element => {
    if (forbiddenwords.includes(element.toLowerCase())) {
      nflag = true;
    }
  });

  // check if the commentWords array includes any forbidden word
  commentWords.forEach(element => {
    if (forbiddenwords.includes(element.toLowerCase())) {
      nflag = true;
    }
  });

  // In the case of including any forbidden words in the name or comment a alert will be shown 
  if (nflag || cflag) {
    window.alert("You can't use inappropriate words.");
    document.getElementById("fullName").value = "";
    document.getElementById("comment").value = "";
  }
  else {// Otherwise add and store them to the local storage
    addComment(fullName, commentText, pageIdentifier);
  }

}

// Adding fullname and comment
export function addComment(fullName, commentText, pageIdentifier) {
  var key = `comments_${pageIdentifier}`;

  // Retrieve existing comments from local storage
  var comments = JSON.parse(localStorage.getItem(key)) || {};

  // Create a unique identifier for the new comment
  var commentId = `comment_${new Date().getTime()}`;

  // Create a new comment object
  var comment = {
    fullName: fullName,
    commentText: commentText,
    date: new Date().toLocaleString(),
    emojis: [] 
  };

  // Add the new comment to the comments object
  comments[commentId] = comment;

  // Store the updated comments object back in local storage
  localStorage.setItem(key, JSON.stringify(comments));

  // Clear the input fields
  document.getElementById("fullName").value = "";
  document.getElementById("comment").value = "";
}

// Display all comments stored in local storage for a specific page, ordered by time
export function displayComments(pageIdentifier) {
  var allCommentsDiv = document.getElementById("allComments");
  allCommentsDiv.innerHTML = "";

  var key = `comments_${pageIdentifier}`;

  // Retrieve the comments object from local storage
  var comments = JSON.parse(localStorage.getItem(key)) || {};

  // Array to store comments
  var commentsArray = [];

  // Iterate over the comments object
  for (var commentId in comments) {
    if (comments.hasOwnProperty(commentId)) {
      commentsArray.push({ id: commentId, ...comments[commentId] });
    }
  }

  // Sort the comments array by date in descending order
  commentsArray.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // Display the sorted comments
  commentsArray.forEach(function (comment) {
    var commentDiv = document.createElement("div");
    commentDiv.innerHTML = `<br><br><span style="font-weight: bold;">${comment.fullName}</span>
        <sub style="font-size: 12px; padding-left: 20px;">Date and Time: ${comment.date}</sub><br><br>
        <span style="font-size: 14px; margin-left: 20px">${comment.commentText}</span>`;

    // Emoji button setup
    var emojiButton = document.createElement("button");
    emojiButton.style.cursor = 'pointer';
    emojiButton.textContent = String.fromCodePoint(128077);
    emojiButton.classList.add("initialEmojiButton");
    emojiButton.dataset.key = comment.id;
// Append the emoji button to the comment div
commentDiv.appendChild(emojiButton);
    var emojiDiv = document.createElement("div");
    emojiDiv.innerHTML = `
          <input type="checkbox" name="emoji[]" value="128077">
          <label for="1">&#128077</label>
          <input type="checkbox" name="emoji[]" value="128078">
          <label for="2">&#128078</label>
          <input type="checkbox" name="emoji[]" value="128512">
          <label for="3">&#128512</label>
          <input type="checkbox" name="emoji[]" value="128514">
          <label for="4">&#128514</label>
          <input type="checkbox" name="emoji[]" value="128546">
          <label for="5">&#128546</label>
          <input type="checkbox" name="emoji[]" value="128545">
          <label for="6">&#128545</label>
          <input type="checkbox" name="emoji[]" value="128564">
          <label for="7">&#128564</label>
          <input type="checkbox" name="emoji[]" value="128564">
          <label for="8">❌</label>  `;

    emojiDiv.style.visibility = 'hidden';
    var deleteLabel = emojiDiv.querySelector('label[for="8"]');
    deleteLabel.style.visibility = 'hidden';
    emojiButton.addEventListener("click", function () {
      emojiButton.textContent = "";
      emojiDiv.style.visibility = 'visible';
      emojiButton.appendChild(emojiDiv);
      emojiButton.style.cursor = 'default';
    });

    var checkboxes = emojiDiv.querySelectorAll('input[type="checkbox"]');
    var selectedEmoji = document.createElement("div");

    if(comment.emojis[0]){
      selectedEmoji.innerHTML = "&#" + comment.emojis[0];
      commentDiv.appendChild(selectedEmoji);
    }
    else{
      selectedEmoji.style.visibility = 'hidden';
      commentDiv.appendChild(selectedEmoji); // Append to comment div
      deleteLabel.style.visibility = 'hidden';
      checkboxes[7].style.visibility = 'hidden';
    }

    

    checkboxes.forEach((checkbox, index) => {
      if (index < 7) {
        checkbox.addEventListener("change", function () {
          emojiButton.style.cursor = 'pointer';
          var selectedEmojiValue = "&#" + this.value;
          emojiButton.textContent = String.fromCodePoint(128077);
          emojiButton.classList.add("initialEmojiButton");
          emojiButton.dataset.key = comment.id;

          // Update comment object in local storage
          comments[comment.id].emojis = [this.value];
          localStorage.setItem(key, JSON.stringify(comments));

          // Display the selected emoji
          selectedEmoji.innerHTML = selectedEmojiValue;
          selectedEmoji.style.visibility = 'visible';
          deleteLabel.style.visibility = 'visible';
          checkboxes[7].style.visibility = 'visible';

          // Unselect the checkbox
          checkboxes.forEach(function (checkbox) {
            checkbox.checked = false;
          });
        });
      }
    });

    checkboxes[7].addEventListener("change", function () {
      emojiButton.style.cursor = 'pointer';
      selectedEmoji.style.visibility = 'hidden';
      emojiButton.textContent = String.fromCodePoint(128077);
      emojiButton.classList.add("initialEmojiButton");
      emojiButton.dataset.key = comment.id;

      // Update comment object in local storage
      comments[comment.id].emojis = [];
      localStorage.setItem(key, JSON.stringify(comments));

      deleteLabel.style.visibility = 'hidden';
      checkboxes[7].style.visibility = 'hidden';
      // Unselect the checkbox
      checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
      });
    });

    

    allCommentsDiv.appendChild(commentDiv);

    document.addEventListener("click", function(event) {
      var isClickInsideEmojiDiv = event.target.closest('div') === emojiDiv;
      var isClickInsideEmojiButton = event.target.closest('button') === emojiButton;
  
      if (!isClickInsideEmojiDiv && !isClickInsideEmojiButton) {
        emojiDiv.style.visibility = 'hidden';
        emojiButton.textContent = String.fromCodePoint(128077);
          emojiButton.classList.add("initialEmojiButton");
          emojiButton.dataset.key = comment.id;
      }
    });
  });
}




