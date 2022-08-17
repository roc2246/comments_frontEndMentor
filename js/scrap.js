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

     
     
     // "<div class='" +
          // commentClass +
          // "'>" +
          // //Vote Form
          // "<form class='comment__vote' method='POST' action='http://localhost:" +
          // port +
          // "/updateScore'>" +
          // "<input name='comment_index' style='display:none;' value=" +
          // comments[x].id +
          // ">" +
          // "<input name='upvote_or_downvote' class='change' style='display:none;' value=''>" +
          // "<button class='upvote' onclick='changeValue(\"+1\")'>" +
          // "<img src='images/icon-plus.svg' alt='upvote score'>" +
          // "</button>" +
          // "<input name='score' class='rating' value=" +
          // comments[x].score +
          // ">" +
          // "<button class='downvote' onclick='changeValue(\"-1\")'>" +
          // "<img src='images/icon-minus.svg' alt='downvote score'>" +
          // "</button>" +
          // "</form>" +
          // // Avatar, Post Date, and CRUD Features
          // "<div class='comment__top-row'>" +
          // "<img class='avatar' alt='avatar' src='" +
          // comments[x].avatar_png +
          // "'>" +
          // "<span class='name'>" +
          // comments[x].username +
          // "</span>" +
          // youIcon +
          // "<span class='post-date'>" +
          // comments[x].createdAt +
          // "</span>" +
          // "</div>" +
          // "<span class='reply-edit-delete'>" +
          // crud +
          // "</span>" +
          // // Comment Container
          // "<div class='comment__text'>" +
          // "<p></p>" +
          // // Edit Comment
          // "<form  method='POST' class='comment__text--edit'>" +
          // "<input name='comment_index' class='comment-index' style='display:none;' value=" +
          // comments[x].id +
          // ">" +
          // "<textarea name='updated_comment' class='updated-comment'>" +
          // comments[x].content +
          // "</textarea>" +
          // "<button class='update-comment'>UPDATE</button>" +
          // "</form> " +
          // "<span class='comment__text--reply-to'></span>" +
          // "<span class='comment__text--text'>" +
          // comments[x].content +
          // "</span>" +
          // "</div>" +
          // "</div>" +
          // // Add Reply
          // "<form name='add-comment' class='add-comment--add-reply' method='POST'>" +
          // "<input name='comment_id' class='comment__id' type='text' value='" +
          // comments[x].id +
          // "' style='display:none;'>" +
          // "<input name='reply_to' class='reply__to' type='text' value='" +
          // comments[x].username +
          // "' style='display:none;'>" +
          // "<img class='avatar--you' src='" +
          // userAvatar +
          // "'>" +
          // "<textarea  class='add-comment__comment' name='comment_text' placeholder='Add a comment...'></textarea>" +
          // " <button class='add-comment__send add-comment__send--reply'>SEND</button>" +
          // "</form>";