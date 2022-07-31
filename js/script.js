const users = "http://localhost:3002/users";
const session = "http://localhost:3002/session";
const replies = "http://localhost:3002/replies";
const comments = "http://localhost:3002/comments";

const commentBox = document.getElementsByClassName("comment-box")[0];

// Keys for forms
let replyFormKey = -1;
let commentFormKey = -1;

// Fetches Session Data
fetch(session)
  .then((response) => response.json())
  .then((data) => {
    const userInfo = data;
    const userAvatar = userInfo.avatar_png;

    document.querySelector(".add-comment > .avatar--you").src = userAvatar;

    // Fetches Comments
    fetch(comments)
      .then((response) => response.json())
      .then((data) => {
        const comments = data;

        for (let x = 0; x < comments.length; x++) {
          let crud;
          let commentClass;
          commentFormKey++;
          if (comments[x].username === userInfo.username) {
            commentClass = "comment comment--you";
            crud =
              "<input name='comment_index' class='reference-no' style='display:none;' value=" +
              comments[x].id +
              ">" +
              "<span class='reply-edit-delete__delete'>" +
              "<img src='images/icon-delete.svg' alt='' class='reply-edit-delete__reply--image'> Delete</span>" +
              "<span class='reply-edit-delete__edit'>" +
              "<img src='images/icon-edit.svg' alt='' class='reply-edit-delete__reply--image'> Edit</span>";
          } else {
            commentClass = "comment";
            crud =
              "<span class='reply-edit-delete__reply' onclick='toggle(replyForm," +
              commentFormKey +
              ")'>" +
              "<img src='images/icon-reply.svg' alt='reply icon' class='reply-edit-delete__reply--image'> Reply</span>";
          }
          // Generates Comments
          commentBox.innerHTML +=
            "<div class='" +
            commentClass +
            "'>" +
            //Vote Form
            "<form class='comment__vote' method='POST' action='http://localhost:3002/updateScore'>" +
            "<input name='comment_index' style='display:none;' value=" +
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
            // Edit Comment
            "<div class='comment__text'>" +
            "<p></p>" +
            "<form  method='POST' action='http://localhost:3002/updateComment' class='comment__text--edit'>" +
            "<input name='comment_index' style='display:none;' value=" +
            comments[x].id +
            ">" +
            "<input type='textbox' name='updated_comment' value='"+comments[x].content+"'>" +
            "<button class='update-comment'>UPDATE</button>" +
            "</form> " +
            "<span class='comment__text--reply-to'></span>" +
            "<span class='comment__text--text'>"+ comments[x].content +"</span>" +
            "</div>" +
            // Edit Form

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
                  commentFormKey++;
                  if (replies[y].username === userInfo.username) {
                    commentClass = "comment reply comment--you";
                    crud =
                      "<span class='reply-edit-delete'>" +
                      "<input name='comment_index' class='reply-reference-no' style='display:none;' value=" +
                      replies[y].id +
                      ">" +
                      "<span class='reply-edit-delete__delete'>" +
                      "<img src='images/icon-delete.svg' alt='' class='reply-edit-delete__reply--image'> Delete</span>" +
                      "<span class='reply-edit-delete__edit'>" +
                      "<img src='images/icon-edit.svg' alt='' class='reply-edit-delete__reply--image'> Edit</span>" +
                      "</span>";
                  } else {
                    commentClass = "comment";
                    crud =
                      "<span class='reply-edit-delete'>" +
                      "<span class='reply-edit-delete__reply' onclick='toggle(replyToReply," +
                      [replyFormKey] +
                      ")'>" +
                      "<img src='images/icon-reply.svg' alt='' class='reply-edit-delete__reply--image'> Reply</span>" +
                      "</span>";
                  }
                  replyCommentWrapper[x].innerHTML +=
                    "<div class='" +
                    commentClass +
                    "'>" +
                    //Vote Form
                    "<form class='comment__vote' method='POST' action='http://localhost:3002/updateReplyScore'>" +
                    "<input name='comment_index' style='display:none;' value=" +
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
                    crud +
                    "<div class='comment__text'>" +
                    "<p>" +
                    // Edit Reply
                    "<form method='POST' action='http://localhost:3002/updateReply' class='comment__text--edit'>" +
                    "<input name='reply_index' style='display:none;' value=" +
                    replies[y].id +
                    ">" +
                    "<input type='textbox' name='updated_reply' value='@"+ replies[y].replyTo + " " + replies[y].reply_content +"'>" +
                    "<button class='update-comment'>UPDATE</button>" +
                    "</form> " +
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

              // Edit Reply Edit Comment
              const editReply = document.getElementsByClassName("reply-edit-delete__edit")
              const editReplyForm= document.querySelectorAll(".comment--you > .comment__text > .comment__text--edit")
              const commentText = document.querySelectorAll(".comment--you > .comment__text > .comment__text--text")
              const replyTo = document.querySelectorAll(".comment--you > .comment__text > .comment__text--reply-to")

              for (let x = 0; x < editReply.length; x++) {
                editReply[x].addEventListener("click", () => {
                  if (
                    editReplyForm[x].style.display === "none" ||
                    editReplyForm[x].style.display === ""
                  ) {
                    editReplyForm[x].style.display = "block";
                    commentText[x].style.display = "none"
                    replyTo[x].style.display = "none"
                  }
                });
              }

              // Delete Reply
              const replyIdContainer = document.querySelectorAll(
                ".reply-edit-delete > .reply-reference-no"
              );

              const deleteReplyForm =
                document.getElementsByClassName("modal")[1];

              for (let x = 0; x < deleteComment.length; x++) {
                deleteComment[x].addEventListener("click", () => {
                  document.getElementsByName("delete_comment_id")[1].value =
                    replyIdContainer[x].value;

                  if (
                    deleteReplyForm.style.display === "none" ||
                    deleteReplyForm.style.display === ""
                  ) {
                    deleteReplyForm.style.display = "block";
                  }
                });
              }
            });
        }

        // Delete Comment
        const deleteForm = document.getElementsByClassName("modal")[0];
        const idContainer = document.querySelectorAll(
          ".reply-edit-delete > .reference-no"
        );

        const deleteComment = document.getElementsByClassName(
          "reply-edit-delete__delete"
        );

        for (let x = 0; x < deleteComment.length; x++) {
          deleteComment[x].addEventListener("click", () => {
            document.getElementsByName("delete_comment_id")[0].value =
              idContainer[x].value;
            if (
              deleteForm.style.display === "none" ||
              deleteForm.style.display === ""
            ) {
              deleteForm.style.display = "block";
            }
          });
        }
      });
  });
const replyForm = document.getElementsByName("add-comment");
const replyToReply = document.getElementsByName("replyToReply");

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

const changeValue = (o) => {
  const changeBox = document.getElementsByClassName("change");
  for (x in changeBox) {
    changeBox[x].value = o;
  }
};

// action="http://localhost:3002/deleteComment"
const deleteComment = () => {
  deleteForm[0].setAttribute("action", "");
  console.log("TEST");
};

