const setUser = function(container, toggleParam) {
  
  if (this.user=== this.userName) {
    commentClass = "" + container + " comment--you";
    crud =
      "<span class='reply-edit-delete'>" +
      "<input name='comment_index' class='reply-reference-no' style='display:none;' value=" +
      this.commentID +
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

const editText = (source, replyTo, yourEditForm, yourUpdatedComment) => {
  const form =
    "<form  method='POST' class='" +
    yourEditForm +
    "'>" +
    "<input name='comment_index' class='comment-index' style='display:none;' value=" +
    source.id +
    ">" +
    "<textarea name='updated_comment' class='" +
    yourUpdatedComment +
    "'>" +
    replyTo +
    source.content +
    "</textarea>" +
    "<button class='update-comment'>UPDATE</button>" +
    "</form> ";

  return form;
};

const setContainer = (commentClass, source) => {
  if (
    commentClass === "comment reply" ||
    commentClass === "comment reply comment--you"
  ) {
    replyTo = "@" + source.replyTo + " ";
    yourComment = "container-id container-id--reply";
    yourEditForm = "comment__text--edit comment__text--edit--you";
  } else {
    replyTo = "";
    yourComment = "container-id";
    yourEditForm = "comment__text--edit";
  }

  if (commentClass === "comment comment--you") {
    yourComment = "container-id container-id--you";
    yourEditForm = "comment__text--edit comment__text--edit--you";
    yourUpdatedComment = "updated-comment updated-comment--you";
  } else {
    yourComment = "container-id";
    yourEditForm = "comment__text--edit";
    yourUpdatedComment = "updated-comment";
  }

  const voteForm =
    "<form class='comment__vote' method='POST' >" +
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
    "<span class='" +
    yourComment +
    "' style='display:none;'>" +
    source.id +
    "</span>" +
    "</div>";

  const commentText =
    "<div class='comment__text'>" +
    editText(source, replyTo, yourEditForm, yourUpdatedComment) +
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

const addContainerForm = (
  formName,
  formClass,
  source1,
  source2,
  userAvatar
) => {
  const form =
    "<form name='" +
    formName +
    "' class='" +
    formClass +
    "' method='POST'>" +
    "<input name='comment_id' class='comment__id' type='text' value='" +
    source1.id +
    "' style='display:none;'>" +
    "<input name='reply_to' class='reply__to' type='text' value='" +
    source2.username +
    "' style='display:none;'>" +
    "<img class='avatar--you' src='" +
    userAvatar +
    "'>" +
    "<textarea  class='add-comment__comment' name='comment_text' placeholder='Add a comment...'></textarea>" +
    " <button class='add-comment__send add-comment__send--reply'>SEND</button>" +
    "</form>";

  return form;
};
