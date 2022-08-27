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
  const updatedComment = document.getElementsByClassName("updated-comment--you");
  const editCommentForm = document.getElementsByClassName("comment__text--edit--you");
  const commentId = document.getElementsByClassName("container-id--you");

  for (let x = 0; x < commentId.length; x++) {
    editCommentForm[x].addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/updateComment/${parseInt(commentId[x].innerText)}`, {
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
  const reply_to = document.querySelectorAll(".add-comment--add-reply:not(.reply-to-reply) > .reply__to")

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

// Add reply to reply
setTimeout(() => {
  const newReplyForm = document.querySelectorAll(".reply-to-reply")
  const replyText = document.querySelectorAll(
    ".reply-to-reply > .add-comment__comment"
  );

  const comment_id = document.querySelectorAll(".reply-to-reply > .comment__id");
  const reply_to = document.querySelectorAll(".reply-to-reply > .reply__to")

  for (let x = 0; x < newReplyForm.length; x++) {
    newReplyForm[x].addEventListener("submit", (e) => {
      e.preventDefault();

      fetch("http://localhost:3000/addReplyToReply", {
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
setTimeout(() => {
  const updatedComment = document.getElementsByClassName("updated-comment");
  const editCommentForm = document.getElementsByClassName("comment__text--edit");
  const commentId = document.getElementsByClassName("comment-index");

  for (let x = 0; x < editCommentForm.length; x++) {
    editCommentForm[x].addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(commentId[x].value);
      fetch(`http://localhost:3000/updateReply/${commentId[x].value}`, {
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


// Update score
setTimeout(() => {
  let vote = document.querySelectorAll(".comment:not(.reply) > .comment__vote > .rating");
  let voteChange = document.querySelectorAll(".comment:not(.reply) > .comment__vote > .change");
  const updateVoteForm = document.querySelectorAll(".comment:not(.reply) > .comment__vote");
  const commentId = document.querySelectorAll(".comment:not(.reply) > .comment__top-row > .container-id");

  for (let x = 0; x < commentId.length; x++) {
    updateVoteForm[x].addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/updateScore/${parseInt(commentId[x].innerText)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: parseInt(vote[x].value) + parseInt(voteChange[x].value)
        }),
      }).then((text) => {
        console.log(text);
      });
    });
  }
}, 1000);


// Update reply score
setTimeout(() => {
  let vote = document.querySelectorAll(".reply > .comment__vote > .rating");
  let voteChange = document.querySelectorAll(".reply > .comment__vote > .change");
  const updateVoteForm = document.querySelectorAll(".reply > .comment__vote");
  const commentId = document.querySelectorAll(".reply > .comment__top-row > .container-id");

  for (let x = 0; x < commentId.length; x++) {
    updateVoteForm[x].addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/updateReplyScore/${parseInt(commentId[x].innerText)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: parseInt(vote[x].value) + parseInt(voteChange[x].value)
        }),
      }).then((text) => {
        console.log(text);
      });
    });
  }
}, 1000);

// Delete Comment
setTimeout(() => {;
  const deleteForm = document.querySelectorAll(".modal > .modal__content> .modal__btn-box")[0];
  const commentId = document.querySelectorAll(".modal > .modal__content> .modal__btn-box> .delete-comment-id")[0];
    deleteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/deleteComment/${commentId.value}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((text) => {
        console.log(text);
      });
    });
}, 1000);

// Delete REply
setTimeout(() => {;
  const deleteForm = document.querySelectorAll(".modal > .modal__content> .modal__btn-box")[1];
  const commentId = document.querySelectorAll(".modal > .modal__content> .modal__btn-box> .delete-comment-id")[1];
    deleteForm.addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(`http://localhost:3000/deleteReply/${commentId.value}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((text) => {
        console.log(text);
      });
    });
}, 1000);