// Add comment
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

// Update comment
setTimeout(() => {
  const updatedComment = document.getElementsByClassName("updated-comment");
  const editCommentForm = document.querySelectorAll(
    ".comment:not(.reply) > .comment__text > .comment__text--edit"
  );
  const commentId = document.querySelectorAll(
    ".comment > .comment__text > .comment__text--edit > .comment-index"
  );

  for (let x = 0; x < editCommentForm.length; x++) {
    editCommentForm[x].addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(commentId[x].value);
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

// Add reply
setTimeout(() => {
  const newReplyForm = document.querySelectorAll(".add-comment--add-reply:not(.reply-to-reply)")
  const replyText = document.querySelectorAll(
    ".add-comment--add-reply:not(.reply-to-reply) > .add-comment__comment"
  );


  const comment_id = document.querySelectorAll(".add-comment--add-reply:not(.reply-to-reply) > .comment__id");
  const reply_to = document.getElementsByClassName("reply__to")

  for (let x = 0; x < newReplyForm.length; x++) {
    newReplyForm[x].addEventListener("submit", (e) => {
      e.preventDefault();

      fetch("http://localhost:3000/addReply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment_id: comment_id[x].value,
          reply_to: reply_to[x].value,
          comment_text: replyText[x].value
        }),
      })
        .then((text) => {
          console.log(text);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
}, 1000);

// Update reply
/* setTimeout(() => {
  const updatedComment = document.getElementsByClassName("updated-comment");
  const editCommentForm = document.querySelectorAll(
    ".comment:not(.reply) > .comment__text > .comment__text--edit"
  );
  const commentId = document.querySelectorAll(
    ".comment > .comment__text > .comment__text--edit > .comment-index"
  );

  for (let x = 0; x < editCommentForm.length; x++) {
    editCommentForm[x].addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(commentId[x].value);
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
}, 1000); */
