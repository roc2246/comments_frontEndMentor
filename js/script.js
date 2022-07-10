//Sets Data
fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    const { currentUser, comments } = data;

    // Ratings
    const voteContainer = {
      upvote: document.querySelectorAll(
        ".comment > .comment__vote > div > .upvote"
      ),
      rating: document.querySelectorAll(".comment > .comment__vote > .rating"),
      downvote: document.querySelectorAll(
        ".comment > .comment__vote > div > .downvote"
      ),
    };

    const voteContainerReply = {
      upvote: document.querySelectorAll(
        ".reply > .comment__vote > div > .upvote"
      ),
      rating: document.querySelectorAll(".reply > .comment__vote > .rating"),
      downvote: document.querySelectorAll(
        ".reply > .comment__vote > div > .downvote"
      ),
    };

    Object.keys(comments).forEach((vote) => {
      voteContainer.upvote[vote].addEventListener("click", () => {
        comments[vote].score++;
        voteContainer.rating[vote].innerHTML = comments[vote].score;
      });

      voteContainer.downvote[vote].addEventListener("click", () => {
        comments[vote].score--;
        voteContainer.rating[vote].innerHTML = comments[vote].score;
      });

      if (comments[vote].replies.length > 0) {
        Object.keys(comments[vote].replies).forEach((replyVote) => {
          voteContainerReply.upvote[replyVote].addEventListener("click", () => {
            comments[vote].replies[replyVote].score++;
            voteContainerReply.rating[replyVote].innerHTML =
              comments[vote].replies[replyVote].score;
          });

          voteContainerReply.downvote[replyVote].addEventListener(
            "click",
            () => {
              comments[vote].replies[replyVote].score--;
              voteContainerReply.rating[replyVote].innerHTML =
                comments[vote].replies[replyVote].score;
            }
          );
        });
      }
    });

    // Comments
    const postContainer = {
      score: document.getElementsByClassName("rating"),
      comment: document.querySelectorAll(".comment__text > p"),
      user: document.getElementsByClassName("name"),
      date: document.getElementsByClassName("post-date"),
      avatar: document.getElementsByClassName("avatar"),
    };

    const replyContainer = {
      score: document.querySelectorAll(".reply > .comment__vote > .rating"),
      comment: document.querySelectorAll(
        ".reply > .comment__text > p > .comment__text--text"
      ),
      user: document.querySelectorAll(".reply > .comment__top-row > .name"),
      date: document.querySelectorAll(
        ".reply > .comment__top-row > .post-date"
      ),
      avatar: document.querySelectorAll(".reply > .comment__top-row > .avatar"),
      replyTo: document.getElementsByClassName("comment__text--reply-to"),
    };

    // Sets user
    const youAvatar = document.getElementsByClassName("avatar--you");
    Object.keys(youAvatar).forEach((avatar) => {
      youAvatar[avatar].src = currentUser.image.png;
    });

    //Sets other users
    Object.keys(comments).forEach((comment) => {
      postContainer.score[comment].innerHTML = comments[comment].score;
      postContainer.comment[comment].innerHTML = comments[comment].content;
      postContainer.user[comment].innerHTML = comments[comment].user.username;
      postContainer.date[comment].innerHTML = comments[comment].createdAt;
      postContainer.avatar[comment].src = comments[comment].user.image.png;

      // Replies
      if (Object.keys(comments[comment].replies).length > 0) {
        Object.keys(comments[comment].replies).forEach((reply) => {
          replyContainer.score[reply].innerHTML =
            comments[comment].replies[reply].score;
          replyContainer.avatar[reply].src =
            comments[comment].replies[reply].user.image.png;
          replyContainer.user[reply].innerHTML =
            comments[comment].replies[reply].user.username;
          replyContainer.date[reply].innerHTML =
            comments[comment].replies[reply].createdAt;
          replyContainer.comment[reply].innerHTML =
            comments[comment].replies[reply].content;
          replyContainer.replyTo[reply].innerHTML =
            "@" + comments[comment].replies[reply].replyingTo;
        });
      }
    });
  });

//Toggles Modal and reply/edit forms
const replyBtn = document.getElementsByClassName("reply-edit-delete__reply");
const replyFrm = document.getElementsByClassName("add-comment--add-reply");

Object.keys(replyBtn).forEach((form) => {
  replyFrm[form].style.display = "none"
  replyBtn[form].addEventListener("click", () => {
    if (replyFrm[form].style.display === "none") {
      replyFrm[form].style.display = "grid";
    } else {
      replyFrm[form].style.display = "none";
    }
  });
});
