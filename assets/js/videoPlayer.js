/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/videoPlayer.js":
/*!**************************************!*\
  !*** ./src/client/js/videoPlayer.js ***!
  \**************************************/
/***/ (() => {

eval("const video = document.querySelector(\"video\");\nconst playbutton = document.getElementById(\"play\");\nconst playbuttonIcon = playbutton.querySelector(\"i\");\nconst mutebutton = document.getElementById(\"mute\");\nconst mutebuttonIcon = mutebutton.querySelector(\"i\");\nconst volumeLevel = document.getElementById(\"volume\");\nconst currentTime = document.getElementById(\"currentTime\");\nconst totalTime = document.getElementById(\"totalTime\");\nconst timeLine = document.getElementById(\"timeline\");\nconst fullScreenbtn = document.getElementById(\"fullScreen\");\nconst fullScreenIcon = fullScreenbtn.querySelector(\"i\");\nconst videoContainer = document.getElementById(\"videoContainer\");\nconst videoControls = document.getElementById(\"videoControls\");\nconsole.log(videoContainer.dataset);\nlet controlsTimeout = null;\nlet controlsMoveTimeout = null;\nlet volumeStats = 0.5;\nvideo.volume = volumeStats;\nconst handlePlayBtn = e => {\n  if (video.paused) {\n    video.play();\n  } else {\n    video.pause();\n  }\n  // playbutton.innerText = video.paused ? \"Play\" : \"Pause\";     \n  playbuttonIcon.classList = video.paused ? \"fas fa-play\" : \"fas fa-pause\";\n};\nconst handleMuteBtn = e => {\n  if (video.muted) {\n    video.muted = false;\n  } else {\n    video.muted = true;\n  }\n  mutebuttonIcon.classList = video.muted ? \"fas fa-volume-mute\" : \"fas fa-volume-up\";\n  volumeLevel.value = video.muted ? 0 : volumeStats;\n};\nconst handleVolumeChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  if (video.muted) {\n    video.muted = false;\n    mutebutton.innerText = \"Mute\";\n  }\n  volumeStats = value;\n  video.volume = value;\n};\nconst formatTime = seconds => new Date(seconds * 1000).toISOString().substr(11, 8);\nconst handleloadedMetadata = () => {\n  totalTime.innerText = formatTime(Math.floor(video.duration));\n  timeLine.max = Math.floor(video.duration);\n};\nconst handleTimeUpdate = () => {\n  currentTime.innerText = formatTime(Math.floor(video.currentTime));\n  timeLine.value = Math.floor(video.currentTime);\n};\nconst handleTimelineChange = event => {\n  const {\n    target: {\n      value\n    }\n  } = event;\n  video.currentTime = value;\n};\nconst handlingFullScreen = () => {\n  // video.requestFullscreen(); 브라우저 제공 전체화면\n  const fullScreen = document.fullscreenElement;\n  if (fullScreen) {\n    document.exitFullscreen();\n    // fullScreenbtn.innerText = \"Enter fullScreen\";\n    fullScreenIcon.classList = \"fas-fa-expand\";\n  } else {\n    videoContainer.requestFullscreen();\n    // fullScreenbtn.innerText = \"Exit fullScreen\";\n    fullScreenIcon.classList = \"fas-fa-compress\";\n  }\n};\nconst hideControls = () => videoControls.classList.remove(\"showing\");\nconst handleMouseMove = () => {\n  if (controlsTimeout) {\n    clearTimeout(controlsTimeout);\n    controlsTimeout = null;\n  }\n  if (controlsMoveTimeout) {\n    clearTimeout(controlsMoveTimeout);\n    controlsMoveTimeout = null;\n  }\n  videoControls.classList.add(\"showing\");\n  controlsMoveTimeout = setTimeout(hideControls, 3000);\n};\nconst handleMouseLeave = () => {\n  controlsTimeout = setTimeout(hideControls, 3000);\n};\nconst changevideoTime = seconds => {\n  video.currentTime += seconds;\n};\nconst handleEnded = () => {\n  const {\n    id\n  } = videoContainer.dataset;\n  console.log(id);\n  fetch(`/api/videos/${id}/view`, {\n    method: \"POST\"\n  });\n};\nplaybutton.addEventListener(\"click\", handlePlayBtn);\nmutebutton.addEventListener(\"click\", handleMuteBtn);\nvolumeLevel.addEventListener(\"input\", handleVolumeChange);\nvideo.addEventListener(\"loadedmetadata\", handleloadedMetadata);\nvideo.addEventListener(\"timeupdate\", handleTimeUpdate);\nvideo.addEventListener(\"ended\", handleEnded);\ntimeLine.addEventListener(\"input\", handleTimelineChange);\nfullScreenbtn.addEventListener(\"click\", handlingFullScreen);\nvideo.addEventListener(\"mousemove\", handleMouseMove);\nvideo.addEventListener(\"mouseleave\", handleMouseLeave);\nvideo.addEventListener(\"click\", handlePlayBtn);\ndocument.addEventListener(\"keyup\", event => {\n  if (event.code === \"Space\") {\n    handlePlayBtn();\n  }\n  if (event.code === \"ArrowRight\") {\n    changevideoTime(1);\n  }\n  if (event.code === \"ArrowLeft\") {\n    changevideoTime(-1);\n  }\n});\n\n//# sourceURL=webpack://hongtube/./src/client/js/videoPlayer.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/videoPlayer.js"]();
/******/ 	
/******/ })()
;