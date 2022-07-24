const users = "http://localhost:3002/users";
const session = "http://localhost:3002/session";
const replies = "http://localhost:3002/replies";
const comments = "http://localhost:3002/comments";

const commentBox = document.getElementsByClassName("comment-box")[0];

// Keys for forms
let replyFormKey = -1;
let commentFormKey = -1;

fetch(session)
  .then((response) => response.json())
  .then((data) => {
    const userInfo = data;
    const userAvatar = userInfo.avatar_png;

    document.querySelector(".add-comment > .avatar--you").src = userAvatar;

    fetch(comments)
      .then((response) => response.json())
      .then((data) => {
        const comments = data;

        for (let x = 0; x < comments.length; x++) {
          let crud;
          let commentClass;
          commentFormKey++;
          if (comments[x].username === userInfo.username) {
            commentClass = "comment comment--you"
            crud =
              "<span class='reply-edit-delete__delete' onclick='toggleModal(deleteForm, "+0+")'>" +
              "<img src='images/icon-delete.svg' alt='' class='reply-edit-delete__reply--image'> Delete</span>" +
              "<span class='reply-edit-delete__edit'>" +
              "<img src='images/icon-edit.svg' alt='' class='reply-edit-delete__reply--image'> Edit</span>";
          } else {
            commentClass = "comment"
            crud =
              "<span class='reply-edit-delete__reply' onclick='toggle(replyForm," +
              commentFormKey +
              ")'>" +
              "<img src='images/icon-reply.svg' alt='reply icon' class='reply-edit-delete__reply--image'> Reply</span>";
          }
          // Generates Comments
          commentBox.innerHTML +=
            "<div class='"+commentClass+"'>" +
            //Vote Form
            "<form class='comment__vote' method='POST' action='http://localhost:3002/updateScore'>" +
            "<input name='vote_user_id' style='display:none;' value=" +
            comments[x].id +
            ">" +
            "<input name='upvote_or_downvote' class='change' style='display:none;' value=''>" +
            "<button class='upvote' onclick='changeValue(\"+1\")'>" +
            "<img src='images/icon-plus.svg' alt='upvote score'>" +
            "</button>" +
            "<input name='score' class='rating' value=" +
            comments[x].score +
            ">" +
            "<button class='downvote' onclick='changeValue(\"-1\")'>" +
            "<img src='images/icon-minus.svg' alt='downvote score'>" +
            "</button>" +
            "</form>" +
            //End Vote Form
            "<div class='comment__top-row'>" +
            "<img class='avatar' alt='avatar' src='" +
            comments[x].avatar_png +
            "'>" +
            "<span class='name'>" +
            comments[x].username +
            "</span>" +
            "<span class='post-date'>" +
            comments[x].createdAt +
            "</span>" +
            "</div>" +
            "<span class='reply-edit-delete'>" +
            crud +
            "</span>" +
            "<div class='comment__text'>" +
            "<p>" +
            comments[x].content +
            "</p>" +
            "</div>" +
            "</div>" +
            // Add Reply
            "<form name='add-comment' class='add-comment--add-reply' method='POST' action='http://localhost:3002/addReply'>" +
            "<input name='comment_id' type='text' value='" +
            comments[x].id +
            "' style='display:none;'>" +
            "<input name='reply_to' type='text' value='" +
            comments[x].username +
            "' style='display:none;'>" +
            "<img class='avatar--you' src='" +
            userAvatar +
            "'>" +
            "<input type='text' class='add-comment__comment' name='comment_text' placeholder='Add a comment...'>" +
            " <button class='add-comment__send add-comment__send--reply'+ onclick='newReply(1)'>SEND</button>" +
            "</form>";

          // Creates reply flexbox for each comment
          commentBox.innerHTML +=
            "<div class='reply-wrapper'>" +
            "<hr>" +
            "<div class='reply-comment-wrapper'>" +
            "</div>" +
            "</div>";
          fetch(replies)
            .then((response) => response.json())
            .then((data) => {
              const replies = data;
              const replyCommentWrapper = document.getElementsByClassName(
                "reply-comment-wrapper"
              );
              for (let y = 0; y < replies.length; y++) {
                if (comments[x].id === replies[y].comment_id) {
                  replyFormKey++;
                  // Generates replies
                  replyCommentWrapper[x].innerHTML +=
                    "<div class='comment reply'>" +
                    //Vote Form
                    "<form class='comment__vote' method='POST' action='http://localhost:3002/updateReplyScore'>" +
                    "<input name='vote_user_id' style='display:none;' value=" +
                    replies[y].id +
                    ">" +
                    "<input name='upvote_or_downvote' class='change' style='display:none;' value=''>" +
                    "<button class='upvote' onclick='changeValue(\"+1\")'>" +
                    "<img src='images/icon-plus.svg' alt='upvote score'>" +
                    "</button>" +
                    "<input name='score' class='rating' value=" +
                    replies[y].reply_score +
                    ">" +
                    "<button class='downvote' onclick='changeValue(\"-1\")'>" +
                    "<img src='images/icon-minus.svg' alt='downvote score'>" +
                    "</button>" +
                    "</form>" +
                    //End Vote Form
                    "<div class='comment__top-row'>" +
                    "<img class='avatar' src='" +
                    replies[y].avatar_png +
                    "'>" +
                    "<span class='name'>" +
                    replies[y].username +
                    "</span>" +
                    "<span class='post-date'>" +
                    replies[y].reply_createdAt +
                    "</span>" +
                    "</div>" +
                    "<span class='reply-edit-delete'>" +
                    "<span class='reply-edit-delete__reply' onclick='toggle(replyToReply," +
                    [replyFormKey] +
                    ")'>" +
                    "<img src='images/icon-reply.svg' alt='' class='reply-edit-delete__reply--image'> Reply</span>" +
                    "</span>" +
                    "<div class='comment__text'>" +
                    "<p>" +
                    "<span class='comment__text--reply-to'>@" +
                    replies[y].replyTo +
                    " </span>" +
                    "<span class='comment__text--text'>" +
                    replies[y].reply_content +
                    "</span>" +
                    "</p>" +
                    "</div>" +
                    "</div>" +
                    // Add Reply
                    "<form name='replyToReply' method='POST' class='add-comment--add-reply' action='http://localhost:3002/addReplyToReply'>" +
                    "<img class='avatar--you' src='" +
                    userAvatar +
                    "'>" +
                    "<input name='comment_id' type='text' value='" +
                    comments[x].id +
                    "' style='display:none;'>" +
                    "<input name='reply_to' value ='" +
                    replies[y].username +
                    "' style='display:none;'>" +
                    "<input name='comment_text' type='text' class='add-comment__comment'  placeholder='Add a comment...'>" +
                    " <button class='add-comment__send add-comment__send--reply'+ onclick='newReply(1)'>SEND</button>" +
                    "</form>";
                }
              }
            });
        }
      });
  });
const replyForm = document.getElementsByName("add-comment");
const replyToReply = document.getElementsByName("replyToReply");
const deleteForm = document.getElementsByClassName("modal")
console.log(deleteForm)
const toggle = (formName, form) => {
  if (
    formName[form].style.display === "none" ||
    formName[form].style.display === ""
  ) {
    formName[form].style.display = "grid";
  } else {
    formName[form].style.display = "none";
  }
};

const toggleModal = (formName, form) => {
  if (
    formName[form].style.display === "none" ||
    formName[form].style.display === ""
  ) {
    formName[form].style.display = "block";
  } else {
    formName[form].style.display = "none";
  }
};

const changeValue = (o) => {
  const changeBox = document.getElementsByClassName("change");
  for (x in changeBox) {
    changeBox[x].value = o;
  }
};


// Edit Button
// Object.keys(commentBtns.edit).forEach((form) => {
//   forms.edit[form].style.display = "none";
//   forms.textToEditInput[form].value =
//     "@" +
//     replyContainer.user[form].innerHTML +
//     " " +
//     replyContainer.comment[form].innerHTML;
//   commentBtns.edit[form].addEventListener("click", () => {
//     if (forms.edit[form].style.display === "none") {
//       forms.edit[form].style.display = "grid";
//       activeUser.commentText[form].style.display = "none";
//     } else {
//       forms.edit[form].style.display = "none";
//       activeUser.commentText[form].style.display = "inline";
//     }
//   });
// });

// // Delete Button
// Object.keys(commentBtns.delete).forEach((btn) => {
//   deleteModal.box.style.display = "none";
//   commentBtns.delete[btn].addEventListener("click", () => {
//     if (deleteModal.box.style.display === "none") {
//       deleteModal.box.style.display = "block";
//     }
//   });
//   deleteModal.deleteComment.addEventListener("click", () => {
//     activeUser.replies[btn].remove();
//     if (deleteModal.box.style.display === "block") {
//       deleteModal.box.style.display = "none";
//     }
//   });
// });
// deleteModal.cancelDelete.addEventListener("click", () => {
//   if (deleteModal.box.style.display === "block") {
//     deleteModal.box.style.display = "none";
//   }
// });
