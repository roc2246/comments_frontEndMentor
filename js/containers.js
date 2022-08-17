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
        "<img src='images/icon-reply.svg' alt='reply icon' class='reply-edit-delete__reply--image'> Reply</span>" +
        "</span>";
      youIcon = "";
    }
  };
  
  const editText = (source, replyTo) => {
    const form =
      "<form  method='POST' class='comment__text--edit'>" +
      "<input name='comment_index' class='comment-index' style='display:none;' value=" +
      source.id +
      ">" +
      "<textarea name='updated_comment' class='updated-comment'>" +
      replyTo +
      source.content +
      "</textarea>" +
      "<button class='update-comment'>UPDATE</button>" +
      "</form> ";
  
    return form;
  };
  
  const setContainer = (commentClass, action, source) => {
    let replyTo;
    let yourComment;
    if (
      commentClass === "comment reply" ||
      commentClass === "comment reply comment--you"
    ) {
      replyTo = "@" + source.replyTo + " ";
      yourComment='container-id--reply'
    } else {
      replyTo = "";
      yourComment='container-id'
    }

    if (
        commentClass === "comment comment--you"
      ) {
        yourComment='container-id--you'
      } else {
        replyTo = "";
        yourComment='container-id'
      }
  
    const voteForm =
      "<form class='comment__vote' method='POST' action='http://localhost:3000/" +
      action +
      "'>" +
      "<input name='comment_index' style='display:none;' value=" +
      source.id +
      ">" +
      "<input name='upvote_or_downvote' class='change' style='display:none;' value=''>" +
      "<button class='upvote' onclick='changeValue(\"+1\")'>" +
      "<img src='images/icon-plus.svg' alt='upvote score'>" +
      "</button>" +
      "<input name='score' class='rating' value=" +
      source.score +
      ">" +
      "<button class='downvote' onclick='changeValue(\"-1\")'>" +
      "<img src='images/icon-minus.svg' alt='downvote score'>" +
      "</button>" +
      "</form>";
  
      

    const topRow =
      "<div class='comment__top-row'>" +
      "<img class='avatar' alt='avatar' src='" +
      source.avatar_png +
      "'>" +
      "<span class='name'>" +
      source.username +
      "</span>" +
      youIcon +
      "<span class='post-date'>" +
      source.createdAt +
      "</span>" +
      "<span class='"+yourComment+"'>"+source.id+"</span>"+
      "</div>";
  
    const commentText =
      "<div class='comment__text'>" +
      editText(source, replyTo) +
      "<span class='comment__text--reply-to'>" +
      replyTo +
      "</span>" +
      "<span class='comment__text--text'>" +
      source.content +
      "</span>" +
      "</div>";
  
    const commentContainer =
      "<div class='" +
      commentClass +
      "'>" +
      voteForm +
      topRow +
      crud +
      commentText +
      "</div>";
  
    return commentContainer;
  };