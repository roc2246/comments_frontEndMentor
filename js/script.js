fetch("../data.json")
  .then((response) => response.json())
  .then((data) => {
    const { currentUser, comments } = data;

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
