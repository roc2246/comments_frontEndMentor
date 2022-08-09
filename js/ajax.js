const newComment = () => {
  //     const xhr = new XMLHttpRequest()

  //     xhr.open("POST", "http://localhost:3000/add")
  // console.log(xhr.readyState, xhr.status)
  //  xhr.onload = ()=>{
  //         location.reload()
  //     }
  //     xhr.send()



  return false;
};
//   https://www.youtube.com/watch?v=82hnvUYY6QA
// https://www.tutsmake.com/node-js-get-and-send-data-from-ajax-request-example/#google_vignette
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