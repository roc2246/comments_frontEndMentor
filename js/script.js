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
          const userComment = {
            user: comments[x].username,
            userName: userInfo.username,
            commentID: comments[x].id
          }

          const setUserComment = setUser.bind(userComment)

          // Checks if comment is from user
          setUserComment(
            "comment",
            "toggle(replyForm, [" + commentFormKey + "])"
          );

          // Generates Comments
          commentBox.innerHTML +=
            setContainer(commentClass, comments[x]) +
            addContainerForm(
              "add-comment",
              "add-comment--add-reply",
              comments[x],
              comments[x],
              userAvatar
            );

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
                
                  const userReply = {
                    user: replies[y].username,
                    userName: userInfo.username,
                    commentID: replies[y].id
                  }
        
                  const setUserReply = setUser.bind(userReply)

                  // Checks if reply is from user
                  setUserReply(
                    "comment reply",
                    "toggle(replyToReply, " + [replyFormKey] + ")"
                  );

                  // Generates Replies
                  replyCommentWrapper[x].innerHTML +=
                    setContainer(commentClass, replies[y]) +
                    addContainerForm(
                      "replyToReply",
                      "add-comment--add-reply reply-to-reply",
                      comments[x],
                      replies[y],
                      userAvatar
                    );
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
        const idContainer =
          document.getElementsByClassName("container-id--you");

        const deleteComment = document.getElementsByClassName(
          "reply-edit-delete__delete"
        );

        for (let x = 0; x < deleteComment.length; x++) {
          deleteComment[x].addEventListener("click", () => {
            document.getElementsByName("delete_comment_id")[0].value = parseInt(
              idContainer[x].innerText
            );
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
