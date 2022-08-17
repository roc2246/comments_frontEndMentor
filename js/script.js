const setUser = (data, username, commentID, container, toggleParam) => {
  if (data === username) {
    commentClass = "" + container + " comment--you";
    crud =
      "<span class='reply-edit-delete'>" +
      "<input name='comment_index' class='reply-reference-no' style='display:none;' value=" +
      commentID +
      ">" +
      "<span class='reply-edit-delete__delete'>" +
      "<img src='images/icon-delete.svg' alt='' class='reply-edit-delete__reply--image'> Delete</span>" +
      "<span class='reply-edit-delete__edit'>" +
      "<img src='images/icon-edit.svg' alt='' class='reply-edit-delete__reply--image'> Edit</span>" +
      "</span>";
    youIcon = "<span class='you-icon'>you</span>";
  } else {
    commentClass = container;
    crud =
        "<span class='reply-edit-delete'>" +
      "<span class='reply-edit-delete__reply' onclick='" +
      toggleParam +
      "')>" +
      "<img src='images/icon-reply.svg' alt='reply icon' class='reply-edit-delete__reply--image'> Reply</span>"+
      "</span>"
    youIcon = "";
  }
};

const port = "3000";
const url = "http://localhost:";

const users = url + port + "/users";
const session = url + port + "/session";
const replies = url + port + "/replies";
const comments = url + port + "/comments";

const commentBox = document.getElementsByClassName("comment-box")[0];

// Keys for forms
let replyFormKey = -1;
let commentFormKey = -1;

// Containers for crud features and class names
let crud;
let commentClass;
let youIcon;

// Fetches Session Data
fetch(session)
  .then((response) => response.json())
  .then((data) => {
    const userInfo = data;
    const userAvatar = userInfo.avatar_png;
    const userAvatarContainer = document.querySelector(
      ".add-comment > .avatar--you"
    );

    userAvatarContainer.src = userAvatar;

    // Fetches Comments
    fetch(comments)
      .then((response) => response.json())
      .then((data) => {
        const comments = data;

        for (let x = 0; x < comments.length; x++) {
          commentFormKey++;
          const setUserComment = setUser(
            comments[x].username,
            userInfo.username,
            comments[x].id,
            "comment",
            'toggle(replyForm, ['+commentFormKey+'])'
          );

          // Checks if comment is from user
          setUserComment;

          // Generates Comments
          commentBox.innerHTML +=
            "<div class='" +
            commentClass +
            "'>" +
            //Vote Form
            "<form class='comment__vote' method='POST' action='http://localhost:" +
            port +
            "/updateScore'>" +
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
            // Avatar, Post Date, and CRUD Features
            "<div class='comment__top-row'>" +
            "<img class='avatar' alt='avatar' src='" +
            comments[x].avatar_png +
            "'>" +
            "<span class='name'>" +
            comments[x].username +
            "</span>" +
            youIcon +
            "<span class='post-date'>" +
            comments[x].createdAt +
            "</span>" +
            "</div>" +
            "<span class='reply-edit-delete'>" +
            crud +
            "</span>" +
            // Comment Container
            "<div class='comment__text'>" +
            "<p></p>" +
            // Edit Comment
            //  action='http://localhost:" + port + "/updateComment'
            "<form  method='POST' class='comment__text--edit'>" +
            "<input name='comment_index' class='comment-index' style='display:none;' value=" +
            comments[x].id +
            ">" +
            "<textarea name='updated_comment' class='updated-comment'>" +
            comments[x].content +
            "</textarea>" +
            "<button class='update-comment'>UPDATE</button>" +
            "</form> " +
            "<span class='comment__text--reply-to'></span>" +
            "<span class='comment__text--text'>" +
            comments[x].content +
            "</span>" +
            "</div>" +
            "</div>" +
            // Add Reply
            //  action='http://localhost:" +port + "/addReply'
            // onclick='newReply(1)'
            "<form name='add-comment' class='add-comment--add-reply' method='POST'>" +
            "<input name='comment_id' class='comment__id' type='text' value='" +
            comments[x].id +
            "' style='display:none;'>" +
            "<input name='reply_to' class='reply__to' type='text' value='" +
            comments[x].username +
            "' style='display:none;'>" +
            "<img class='avatar--you' src='" +
            userAvatar +
            "'>" +
            "<textarea  class='add-comment__comment' name='comment_text' placeholder='Add a comment...'></textarea>" +
            " <button class='add-comment__send add-comment__send--reply'>SEND</button>" +
            "</form>";

          // Creates reply flexbox for each comment
          commentBox.innerHTML +=
            "<div class='reply-wrapper'>" +
            "<hr class ='reply-line'>" +
            "<div class='reply-comment-wrapper'>" +
            "</div>" +
            "</div>";

          // Fetches Replies
          fetch(replies)
            .then((response) => response.json())
            .then((data) => {
              const replies = data;
              const replyCommentWrapper = document.getElementsByClassName(
                "reply-comment-wrapper"
              );

              const replyLine = document.getElementsByClassName("reply-line");

              // Orgainizes Replies by account reply is responding to
              for (let y = 0; y < replies.length; y++) {
                if (comments[x].id === replies[y].comment_id) {
                  replyFormKey++;
                  commentFormKey++;
                  const setUserReply = setUser(
                    replies[y].username,
                    userInfo.username,
                    replies[y].id,
                    "comment reply",
                    'toggle(replyToReply, '+ [replyFormKey] +')' 
                  );
                  

                  // Checks if reply is from user
                  setUserReply;

                  // Generates Replies
                  replyCommentWrapper[x].innerHTML +=
                    "<div class='" +
                    commentClass +
                    "'>" +
                    //Vote Form
                    "<form class='comment__vote' method='POST' action='http://localhost:" +
                    port +
                    "/updateReplyScore'>" +
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
                    // Avatar, Post Date, and CRUD Features
                    "<div class='comment__top-row'>" +
                    "<img class='avatar' src='" +
                    replies[y].avatar_png +
                    "'>" +
                    "<span class='name'>" +
                    replies[y].username +
                    "</span>" +
                    youIcon +
                    "<span class='post-date'>" +
                    replies[y].reply_createdAt +
                    "</span>" +
                    "</div>" +
                    crud +
                    // Reply Container
                    "<div class='comment__text'>" +
                    "<p></p>" +
                    // Edit Reply
                    "<form method='POST' action='http://localhost:" +
                    port +
                    "/updateReply' class='comment__text--edit'>" +
                    "<input name='reply_index' style='display:none;' value=" +
                    replies[y].id +
                    ">" +
                    "<textarea name='updated_reply'>@" +
                    replies[y].replyTo +
                    " " +
                    replies[y].reply_content +
                    "</textarea>" +
                    "<button class='update-comment'>UPDATE</button>" +
                    "</form> " +
                    "<span class='comment__text--reply-to'>@" +
                    replies[y].replyTo +
                    " </span>" +
                    "<span class='comment__text--text'>" +
                    replies[y].reply_content +
                    "</span>" +
                    "</div>" +
                    "</div>" +
                    // Add Reply
                    //  action='http://localhost:" +port + "/addReplyToReply'
                    // onclick='newReply(1)'
                    "<form name='replyToReply' method='POST' class='add-comment--add-reply reply-to-reply'>" +
                    "<img class='avatar--you' src='" +
                    userAvatar +
                    "'>" +
                    "<input name='comment_id' class='comment__id' type='text' value='" +
                    comments[x].id +
                    "' style='display:none;'>" +
                    "<input name='reply_to' class='reply__to' value ='" +
                    replies[y].username +
                    "' style='display:none;'>" +
                    "<textarea name='comment_text' type='text' class='add-comment__comment'  placeholder='Add a comment...'></textarea>" +
                    " <button class='add-comment__send add-comment__send--reply'>SEND</button>" +
                    "</form>";
                }
              }

              // Prevents vertical line from displaying if there are no replies
              if (replyCommentWrapper[x].childElementCount === 0) {
                replyLine[x].style.display = "none";
              }

              // Edit Reply Edit Comment
              const editBtn = document.getElementsByClassName(
                "reply-edit-delete__edit"
              );
              const editForm = document.querySelectorAll(
                ".comment--you > .comment__text > .comment__text--edit"
              );
              const commentText = document.querySelectorAll(
                ".comment--you > .comment__text > .comment__text--text"
              );
              const replyTo = document.querySelectorAll(
                ".comment--you > .comment__text > .comment__text--reply-to"
              );

              for (let x = 0; x < editBtn.length; x++) {
                editBtn[x].addEventListener("click", () => {
                  if (
                    editForm[x].style.display === "none" ||
                    editForm[x].style.display === ""
                  ) {
                    editForm[x].style.display = "flex";
                    commentText[x].style.display = "none";
                    replyTo[x].style.display = "none";
                  }
                  editBtn[x].onclick = () => {
                    editForm[x].style.display = "none";
                    commentText[x].style.display = "inline";
                    replyTo[x].style.display = "inline";
                    editBtn[x].onclick = "";
                  };
                });
              }

              // Delete Reply
              const replyIdContainer = document.querySelectorAll(
                ".reply-edit-delete > .reply-reference-no"
              );

              const deleteReply = document.querySelectorAll(
                ".reply > .reply-edit-delete > .reply-edit-delete__delete"
              );

              const deleteReplyForm =
                document.getElementsByClassName("modal")[1];

              for (let x = 0; x < deleteReply.length; x++) {
                deleteReply[x].addEventListener("click", () => {
                  document.getElementsByName("delete_comment_id")[1].value =
                    replyIdContainer[x].value;

                  if (
                    deleteReplyForm.style.display === "none" ||
                    deleteReplyForm.style.display === ""
                  ) {
                    deleteReplyForm.style.display = "block";
                    window.scrollTo(0, 0);

                    window.addEventListener("scroll", () => {
                      window.scrollTo(0, 0);
                    });
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
              window.scrollTo(0, 0);

              window.addEventListener("scroll", () => {
                window.scrollTo(0, 0);
              });
            }
          });
        }
      });
  });

const replyForm = document.getElementsByName("add-comment");
const replyToReply = document.getElementsByName("replyToReply");

const modal = document.getElementsByClassName("modal");

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

const deleteAction = (formNo) => {
  modal[formNo].setAttribute("onsubmit", "return true;");
};

const closeModal = (formNo) => {
  modal[formNo].style.display = "none";
  modal[formNo].setAttribute("onsubmit", "return false;");
  window.onscroll = () => {};
};
