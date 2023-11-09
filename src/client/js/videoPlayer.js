const video = document.querySelector("video");
const playbutton = document.getElementById("play"); 
const playbuttonIcon = playbutton.querySelector("i");
const mutebutton = document.getElementById("mute");
const mutebuttonIcon = mutebutton.querySelector("i");
const volumeLevel = document.getElementById("volume");
const currentTime = document.getElementById("currentTime"); 
const totalTime = document.getElementById("totalTime");
const timeLine = document.getElementById("timeline");
const fullScreenbtn = document.getElementById("fullScreen"); 
const fullScreenIcon = fullScreenbtn.querySelector("i"); 
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls"); 
console.log(videoContainer.dataset);

let controlsTimeout = null; 
let controlsMoveTimeout = null; 
let volumeStats = 0.5; 
video.volume = volumeStats;


const handlePlayBtn = (e) => { 
     if(video.paused) {
        video.play();         
    }else {
        video.pause(); 
    } 
    // playbutton.innerText = video.paused ? "Play" : "Pause";     
    playbuttonIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause"; 
};

const handleMuteBtn = (e) => { 
    if(video.muted) {
        video.muted =  false; 
    }else {
        video.muted = true;
    }  
    mutebuttonIcon.classList = video.muted ? "fas fa-volume-mute" : "fas fa-volume-up";

    volumeLevel.value = video.muted ? 0 : volumeStats; 
}; 
 const handleVolumeChange = ( event ) => { 
    const {
        target: { value },
    }= event; 
    if(video.muted) {
        video.muted = false; 
        mutebutton.innerText = "Mute"; 
    } 
    volumeStats = value;
    video.volume = value; 
  }; 

  const formatTime = (seconds) => 
  new Date(seconds *1000).toISOString().substr(11, 8);

  const handleloadedMetadata = () => {
      totalTime.innerText = formatTime(Math.floor(video.duration)); 
      timeLine.max = Math.floor(video.duration); 
  };

  const handleTimeUpdate = () => {
    currentTime.innerText= formatTime(Math.floor(video.currentTime));
    timeLine.value = Math.floor(video.currentTime); 
};

const handleTimelineChange = (event) => { 
     const {target: {value}, 
    }= event;  

    video.currentTime= value; 
};

const handlingFullScreen = () => {
    // video.requestFullscreen(); 브라우저 제공 전체화면
    const fullScreen = document.fullscreenElement;  

    if(fullScreen)  {
        document.exitFullscreen(); 
        // fullScreenbtn.innerText = "Enter fullScreen";
        fullScreenIcon.classList = "fas-fa-expand"; 

    }else { 
        videoContainer.requestFullscreen();  
        // fullScreenbtn.innerText = "Exit fullScreen";
        fullScreenIcon.classList = "fas-fa-compress";
    }     
    
};

const hideControls = () =>   videoControls.classList.remove("showing");


const handleMouseMove = () => {
    if(controlsTimeout){
        clearTimeout(controlsTimeout); 
        controlsTimeout = null; 
    }
    if(controlsMoveTimeout) {
        clearTimeout(controlsMoveTimeout); 
        controlsMoveTimeout = null;
    }
    videoControls.classList.add("showing"); 
    controlsMoveTimeout = setTimeout(hideControls, 3000); 
};
 
const handleMouseLeave = () => {
    controlsTimeout =  setTimeout(hideControls, 3000);
};

const changevideoTime = (seconds) => {
    video.currentTime +=seconds; 
};

const handleEnded = () => {
    const { id } = videoContainer.dataset; 
    console.log(id);
  fetch(`/api/videos/${id}/view`,{
    method: "POST",
  });
};

playbutton.addEventListener("click", handlePlayBtn );
mutebutton.addEventListener("click", handleMuteBtn );
volumeLevel.addEventListener("input",handleVolumeChange);
video.addEventListener("loadedmetadata", handleloadedMetadata);
video.addEventListener("timeupdate", handleTimeUpdate); 
video.addEventListener("ended", handleEnded );
timeLine.addEventListener("input", handleTimelineChange); 
fullScreenbtn.addEventListener("click", handlingFullScreen); 
video.addEventListener("mousemove", handleMouseMove);
video.addEventListener("mouseleave", handleMouseLeave);
video.addEventListener("click", handlePlayBtn);

document.addEventListener("keyup", (event) => {
    if(event.code === "Space") {
        handlePlayBtn(); 
    }
    if(event.code === "ArrowRight") {
        changevideoTime(1); 
    }
    if(event.code === "ArrowLeft") {
        changevideoTime(-1);
    }
});

