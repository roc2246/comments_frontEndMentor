const users = "http://localhost:3002/users";
const session = "http://localhost:3002/session";
const replies = "http://localhost:3002/replies";
const comments = "http://localhost:3002/comments";

const commentBox = document.getElementsByClassName("comment-box")[0];

fetch(comments)
  .then((response) => response.json())
  .then((data) => {
    const comments = data;
    for (let x = 0; x < comments.length; x++) {
      commentBox.innerHTML +=
        "<div class='comment'>" +
        "<div class='comment__vote'>" +
        "<div>" +
        "<img src='images/icon-plus.svg' alt='upvote score' class='upvote'>" +
        "</div>" +
        "<p class='rating'>" +
        comments[x].score +
        "</p>" +
        "<div>" +
        "<img src='images/icon-minus.svg' alt='downvote score' class='downvote'>" +
        "</div>" +
        "</div>" +
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
        "<span class='reply-edit-delete__reply' onclick='toggleForm(replyForm," +
        [x] +
        ")'>" +
        "<img src='images/icon-reply.svg' alt='reply icon' class='reply-edit-delete__reply--image'> Reply</span>" +
        "</span>" +
        "<div class='comment__text'>" +
        "<p>" +
        comments[x].content +
        "</p>" +
        "</div>" +
        "</div>" +
        // Add Reply
        "<form class='add-comment--add-reply' method='POST' action='http://localhost:3002/addReply'>" +
        "<input name='comment_id' type='text' value='" +
        comments[x].id +
        "' style='display:none;'>" +
        "<input name='reply_to' type='text' value='" +
        comments[x].username +
        "' style='display:none;'>" +
        "<img class='avatar--you' src=''>" +
        "<input type='text' class='add-comment__comment' name='comment_text' placeholder='Add a comment...'>" +
        " <button class='add-comment__send add-comment__send--reply'+ onclick='newReply(1)'>SEND</button>" +
        "</form>";

      commentBox.innerHTML +=
        "<div class='reply-wrapper'>" +
        "<hr>" +
        "<div class='reply-comment-wrapper'>" +
        "</div>" +
        "</div>";
      // Generates replies
      fetch(replies)
        .then((response) => response.json())
        .then((data) => {
          const replies = data;
          const replyCommentWrapper = document.getElementsByClassName(
            "reply-comment-wrapper"
          )

          for (let y = 0; y < replies.length; y++) {
            // console.log("------------------------------------------");
            // console.log("Comment id: " +comments[x].id);
            // console.log("------");
            // console.log("Reply id: " +replies[y].comment_id);
            // console.log("------");
            // console.log(comments[x].id === replies[y].comment_id)
            if (comments[x].id === replies[y].comment_id) {
              replyCommentWrapper[x].innerHTML +=
                "<div class='comment reply'>" +
                "<div class='comment__vote'>" +
                "<div>" +
                "<img src='images/icon-plus.svg' alt='' class='upvote'>" +
                "</div>" +
                "<p class='rating'>" +
                replies[y].reply_score +
                "</p>" +
                "<div>" +
                "<img src='images/icon-minus.svg' alt='' class='downvote'>" +
                "</div>" +
                "</div>" +
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
                "<span class='reply-edit-delete__reply' onclick='toggleForm(replyToReply," +
                [y] +
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
                "</div>";
              // Add Reply
              document.getElementsByClassName(
                "reply-comment-wrapper"
              )[0].innerHTML +=
                "<form name='" +
                [x] +
                " 'class='add-comment--add-reply replyToReply'>" +
                "<img class='avatar--you' src=''>" +
                "<input type='text' class='add-comment__comment' name='comment_text' placeholder='Add a comment...'>" +
                " <button class='add-comment__send add-comment__send--reply'+ onclick='newReply(1)'>SEND</button>" +
                "</form>";
            }
          }
        });
    }
  });

fetch(session)
  .then((response) => response.json())
  .then((data) => {
    const userInfo = data;
    const userAvatar = document.getElementsByClassName("avatar--you");
    Object.keys(userAvatar).forEach((avatar) => {
      userAvatar[avatar].src = userInfo.avatar_png;
    });
  });

const replyForm = document.getElementsByClassName("add-comment--add-reply");
const replyToReply = document.getElementsByClassName("replyToReply");

const toggleForm = (formName, form) => {
  if (
    formName[form].style.display === "none" ||
    formName[form].style.display === ""
  ) {
    formName[form].style.display = "grid";
  } else {
    formName[form].style.display = "none";
  }
};
