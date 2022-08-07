const newComment = () => {
    const data= new FormData()
  
    const xhr = new XMLHttpRequest()
    xhr.open("POST", "http://localhost:3000/add")
    xhr.onload = ()=>{
      console.log(this.response)
    }
    xhr.send(data)
  
    return false;
  }