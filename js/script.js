fetch ('../data.json')
.then(response => response.json())
.then((data) => {
    const{currentUser, comments} = data
const replies = comments[1].replies


    // Sets user
    document.getElementsByClassName("avatar--you")[0].src= currentUser.image.png

    //Sets other users
    Object.keys(comments).forEach(comment => {
        const scoreContainer = document.getElementsByClassName("rating")

        const commentContainer = document.querySelectorAll(".comment__text > p")
        const nameContainer = document.getElementsByClassName("name")
        const dateContainer = document.getElementsByClassName("post-date")
        const avatarContainer = document.getElementsByClassName("avatar")


        scoreContainer[comment].innerHTML = comments[comment].score

        commentContainer[comment].innerHTML = comments[comment].content
        nameContainer[comment].innerHTML = comments[comment].user.username
        dateContainer[comment].innerHTML = comments[comment].createdAt
        avatarContainer[comment].src = comments[comment].user.image.png
    });

    //Sets replies
    Object.keys(replies).forEach(comment => {
        const scoreContainer = document.querySelectorAll(".reply > .comment__vote > .rating")

        const commentContainer = document.querySelectorAll(".reply > .comment__text > p > .comment__text--text")
        const nameContainer = document.querySelectorAll(".reply > .comment__top-row > .name")
        const dateContainer = document.querySelectorAll(".reply > .comment__top-row > .post-date")
        const avatarContainer = document.querySelectorAll(".reply > .comment__top-row > .avatar")

        document.getElementsByClassName("comment__text--reply-to")[0].innerHTML = "@" + comments[1].user.username
        document.getElementsByClassName("comment__text--reply-to")[1].innerHTML = "@" + replies[0].user.username


        scoreContainer[comment].innerHTML = replies[comment].score

        commentContainer[comment].innerHTML = replies[comment].content

        nameContainer[0].innerHTML = replies[0].user.username
        nameContainer[1].innerHTML = replies[1].user.username + " <span class='logged-user'>you</span>"
        
        
        dateContainer[comment].innerHTML = replies[comment].createdAt
        avatarContainer[comment].src = replies[comment].user.image.png

    })

});