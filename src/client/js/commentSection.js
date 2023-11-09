const videoContainer = document.getElementById("videoContainer"); 
const form = document.getElementById("commentForm"); 
const videoComments = document.querySelector(".video__comments ul"); 
const deleteIcon = document.querySelectorAll(".delete__icon");

const addComment = (text, id) => {
    const videoComments = document.querySelector(".video__comments ul"); 
    const newComments  = document.createElement ("li"); 
    newComments.dataset.id = id;
    newComments.className = "video__comment"; 
    const span = document.createElement("span"); 
    span.innerText = `${text}`;
    const deleteIcon = document.createElement("span");
    deleteIcon.className = "delete__icon";
    deleteIcon.innerText = "❌";
    // console.log("Span : ", span);

    newComments.appendChild(span);
    newComments.appendChild(deleteIcon); 
    // console.log(newComments);
    videoComments.prepend(newComments);
    deleteIcon.addEventListener("click", handleDelete); 

};

const handleSubmit = async (event) => {
    event.preventDefault();
    const textarea = form.querySelector("textarea");
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    if (text === "") {
      return;
    }
    const response = await fetch(`/api/videos/${videoId}/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    textarea.value = "";
    if (response.status === 201) {
      textarea.value = "";
      const { newCommentId } = await response.json();
      addComment(text, newCommentId);
    }
  };

  const handleDelete = async (event) => {
    const deleteComment = event.target.parentElement;   
    const {
        dataset: {id}, 
    }= event.target.parentElement; 

    const videoId = videoContainer.dataset.id; 

    const response = await fetch (`/api/videos/${videoId}/comment/delete`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({commentId: id}),  
    });  
     if(response.status === 200) {
        deleteComment.remove(); 
     }
  };

if(form) {
    form.addEventListener("submit", handleSubmit);
}



if(deleteIcon) {
    deleteIcon.forEach((icon)=> icon.addEventListener("click", handleDelete));
}



