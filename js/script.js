const users = "http://localhost:3002/users";

const commentBox = document.getElementsByClassName("comment-box")[0];
const comments = "http://localhost:3002/comments";

fetch(comments)
  .then((response) => response.json())
  .then((data) => {
    for (let x in data) {
      commentBox.innerHTML +=
        "<div class='comment'>" +
          "<div class='comment__vote'>" +
            "<div>" +
              "<img src='images/icon-plus.svg' alt='' class='upvote'>" +
            "</div>" +
            "<p class='rating'>" + data[x].score + "</p>" +
            "<div>" +
              "<img src='images/icon-minus.svg' alt='' class='downvote'>" +
            "</div>" +
          "</div>" +
          "<div class='comment__top-row'>" +
            "<img class='avatar' src='" + data[x].avatar_png + "'>" +
            "<span class='name'>" + data[x].username + "</span>" +
            "<span class='post-date'>" + data[x].createdAt + "</span>" +
          "</div>" +
          "<span class='reply-edit-delete'>" +
            "<span class='reply-edit-delete__reply'>" +
            "<img src='images/icon-reply.svg' alt='' class='reply-edit-delete__reply--image'>Reply</span>" +
          "</span>" +
          "<div class='comment__text'>" +
            "<p>" + data[x].content + "</p>" +
          "</div>" +
        "</div>";
    }
  });
