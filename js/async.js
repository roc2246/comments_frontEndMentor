
const myForm = document.getElementById("new-comment")
myForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    const comment = document.getElementById("comment").value

    fetch("http://localhost:3000/add", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            comment_text: comment,
        })
    }).then((text) => {
        console.log(text)
    }).catch((error)=>{
        console.log(error)
    });


})