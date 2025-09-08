 function openPopup() {
      document.getElementById("popup").style.display = "block";
      document.getElementById("overlay").style.display = "block";
    }

    function closePopup() {
      document.getElementById("popup").style.display = "none";
      document.getElementById("overlay").style.display = "none";
    }
    
    // eeee //
 // Load saved comments on page load
    window.onload = function() {
      let savedComments = JSON.parse(localStorage.getItem("comments")) || [];
      savedComments.forEach(comment => displayComment(comment.name, comment.message));
    };

    function addComment(event) {
      event.preventDefault();

      let name = document.getElementById("name").value;
      let message = document.getElementById("message").value;

      // Save comment in localStorage
      let comments = JSON.parse(localStorage.getItem("comments")) || [];
      comments.push({ name, message });
      localStorage.setItem("comments", JSON.stringify(comments));

      // Display it on the page
      displayComment(name, message);

      // Clear form fields
      document.getElementById("name").value = "";
      document.getElementById("message").value = "";
    }

    function displayComment(name, message) {
      let commentsDiv = document.getElementById("comments");
      let newComment = document.createElement("div");
      newComment.classList.add("comment-box");
      newComment.innerHTML = `<strong>${name}</strong><br>${message}`;
      commentsDiv.appendChild(newComment);
    }