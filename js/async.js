const waitTime = 100
const portNo = 3000
const localHost = 'http://localhost:' + portNo 

// Add comment
const newCommentForm = document.getElementById("new-comment");
newCommentForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const comment = document.getElementById("comment").value;

  fetch(`${localHost}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      comment_text: comment,
    }),
  })
    .then((text) => {
      console.log(text);
      fetch(localHost + "/comments")
        .then((response) => response.json())
        .then((data) => {
          const newComment = data;
          console.log(newComment[newComment.length - 1]);
          location.reload()
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
      fetch(`${localHost}/updateComment/${parseInt(commentId[x].innerText)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updated_comment: updatedComment[x].value,
        }),
      }).then((text) => {
        console.log(text);
        location.reload()
      });
    });
  }
}, waitTime);

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

      fetch(`${localHost}/addReply`, {
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
          location.reload()
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
}, waitTime);

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

      fetch(`${localHost}/addReplyToReply`, {
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
          location.reload()
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }
}, waitTime);

// Update reply
setTimeout(() => {
  const updatedComment = document.getElementsByClassName("updated-comment");
  const editCommentForm = document.getElementsByClassName("comment__text--edit");
  const commentId = document.getElementsByClassName("comment-index");

  for (let x = 0; x < editCommentForm.length; x++) {
    editCommentForm[x].addEventListener("submit", (e) => {
      e.preventDefault();
      console.log(commentId[x].value);
      fetch(`${localHost}/updateReply/${commentId[x].value}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          updated_comment: updatedComment[x].value,
        }),
      }).then((text) => {
        console.log(text);
        location.reload()
      });
    });
  }
}, waitTime);


// Update score
setTimeout(() => {
  let vote = document.querySelectorAll(".comment:not(.reply) > .comment__vote > .rating");
  let voteChange = document.querySelectorAll(".comment:not(.reply) > .comment__vote > .change");
  const updateVoteForm = document.querySelectorAll(".comment:not(.reply) > .comment__vote");
  const commentId = document.querySelectorAll(".comment:not(.reply) > .comment__top-row > .container-id");

  for (let x = 0; x < commentId.length; x++) {
    updateVoteForm[x].addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(`${localHost}/updateScore/${parseInt(commentId[x].innerText)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: parseInt(vote[x].value) + parseInt(voteChange[x].value)
        }),
      }).then((text) => {
        console.log(text);
        location.reload()
      });
    });
  }
}, waitTime);


// Update reply score
setTimeout(() => {
  let vote = document.querySelectorAll(".reply > .comment__vote > .rating");
  let voteChange = document.querySelectorAll(".reply > .comment__vote > .change");
  const updateVoteForm = document.querySelectorAll(".reply > .comment__vote");
  const commentId = document.querySelectorAll(".reply > .comment__top-row > .container-id");

  for (let x = 0; x < commentId.length; x++) {
    updateVoteForm[x].addEventListener("submit", (e) => {
      e.preventDefault();
      fetch(`${localHost}/updateReplyScore/${parseInt(commentId[x].innerText)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score: parseInt(vote[x].value) + parseInt(voteChange[x].value)
        }),
      }).then((text) => {
        console.log(text);
        location.reload()
      });
    });
  }
}, waitTime);
