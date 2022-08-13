const newCommentForm = document.getElementById("new-comment");

newCommentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const comment = document.getElementById("comment").value;

  fetch("http://localhost:3000/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      comment_text: comment,
    }),
  })
    .then((text) => {
      console.log(text);
      fetch("http://localhost:3000/comments")
        .then((response) => response.json())
        .then((data) => {
          const newComment = data;
          console.log(newComment[newComment.length - 1]);
        });
    })
    .catch((error) => {
      console.log(error);
    });
});

setTimeout(() => {
  const updatedComment = document.getElementsByClassName("updated-comment");
  const editCommentForm = document.querySelectorAll(
    ".comment:not(.reply) > .comment__text > .comment__text--edit"
  );
  const commentId = document.querySelectorAll(
    ".comment > .comment__text > .comment__text--edit > .comment-index"
  );
  console.log(updatedComment)

  for (let x = 0; x < editCommentForm.length; x++) {
    editCommentForm[x].addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(commentId[x].value)
      fetch(`http://localhost:3000/updateComment/${commentId[x].value}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updated_comment: updatedComment[x].value,
        }),
      }).then((text) => {
        console.log(text);
      });
    });
  }
}, 1000);
