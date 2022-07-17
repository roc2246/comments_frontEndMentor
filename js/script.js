const users = "http://localhost:3002/users";
const comments = "http://localhost:3002/comments";

const main = document.getElementsByClassName("comment-box")[0];

fetch("http://localhost:3002/users")
  .then((response) => response.json())
  .then((data) => {
    const users = data;

    Object.keys(users).forEach((user) => {
      const divContainer = document.createElement("div");
      divContainer.className = "comment";

      // Top Row
      const toprowContainer = document.createElement("div");
      toprowContainer.className = "comment__top-row";

      // Image Container
      const avatar = document.createElement("img");
      avatar.className = "avatar";
      avatar.src = users[user].avatar_png;
      toprowContainer.appendChild(avatar);

      // Username
      const username = document.createElement("span");
      username.className = "name";
      username.innerHTML = users[user].username;
      toprowContainer.appendChild(username);

      // Append to main tag
      divContainer.appendChild(toprowContainer)
      main.appendChild(divContainer);
    });
  });

fetch(comments)
  .then((response) => response.json())
  .then((data) => {
    const comments = data;
    Object.keys(comments).forEach((comment) => {
      const divContainer = document.getElementsByClassName("comment")
      // Vote
      const voteContainer = document.createElement("div");
      voteContainer.className = "comment__vote";

      const upvoteContainer = document.createElement("div");
      const upvoteIcon = document.createElement("img");
      upvoteIcon.className = "upvote";
      upvoteIcon.src = "images/icon-plus.svg";
      upvoteIcon.onclick = () => {
        comments[comment].score++;
        ratingContainer.innerHTML = comments[comment].score;
      };
      upvoteContainer.appendChild(upvoteIcon);

      const ratingContainer = document.createElement("p");
      ratingContainer.innerHTML = comments[comment].score;
      ratingContainer.className = "rating";

      const downvoteContainer = document.createElement("div");
      const downvoteIcon = document.createElement("img");
      downvoteIcon.className = "downvote";
      downvoteIcon.src = "images/icon-minus.svg";
      downvoteIcon.onclick = () => {
        comments[comment].score--;
        ratingContainer.innerHTML = comments[comment].score;
      };
      downvoteContainer.appendChild(downvoteIcon);

      // Reply, Edit, Delete
      const replyeditdelete = document.createElement("span");
      replyeditdelete.className = "reply-edit-delete";

      const reply = document.createElement("span");
      reply.className = "reply-edit-delete__reply";
      reply.innerText = "Reply";
      replyeditdelete.appendChild(reply);

      const replyImg = document.createElement("img");
      replyImg.className = "reply-edit-delete__reply--image";
      replyImg.src = "images/icon-reply.svg";
      reply.appendChild(replyImg);

      // Comment Text
      const content = document.createElement("div");
      content.className = "comment__text";
      const text = document.createElement("p");
      if(comments[comment].replyTo !== '') {
        const replyTo = document.createElement("span")
        replyTo.className = "comment__text--reply-to"
        replyTo.innerHTML = "@" + comments[comment].replyTo + " "
        text.appendChild(replyTo)

        const commentText = document.createElement("span")
        commentText.className = "comment__text--text"
        commentText.innerHTML = comments[comment].content
        text.appendChild(commentText)
      } else{
        text.innerHTML = comments[comment].content;
      }
      content.appendChild(text);

      voteContainer.appendChild(upvoteContainer);
      voteContainer.appendChild(ratingContainer);
      voteContainer.appendChild(downvoteContainer);

      divContainer[comment].appendChild(voteContainer);
      divContainer[comment].appendChild(replyeditdelete);
      divContainer[comment].appendChild(content);
    });
  });
