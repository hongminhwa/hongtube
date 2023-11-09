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

/***/ "./src/client/js/commentSection.js":
/*!*****************************************!*\
  !*** ./src/client/js/commentSection.js ***!
  \*****************************************/
/***/ (() => {

eval("const videoContainer = document.getElementById(\"videoContainer\");\nconst form = document.getElementById(\"commentForm\");\nconst videoComments = document.querySelector(\".video__comments ul\");\nconst deleteIcon = document.querySelectorAll(\".delete__icon\");\nconst addComment = (text, id) => {\n  const videoComments = document.querySelector(\".video__comments ul\");\n  const newComments = document.createElement(\"li\");\n  newComments.dataset.id = id;\n  newComments.className = \"video__comment\";\n  const span = document.createElement(\"span\");\n  span.innerText = `${text}`;\n  const deleteIcon = document.createElement(\"span\");\n  deleteIcon.className = \"delete__icon\";\n  deleteIcon.innerText = \"❌\";\n  // console.log(\"Span : \", span);\n\n  newComments.appendChild(span);\n  newComments.appendChild(deleteIcon);\n  // console.log(newComments);\n  videoComments.prepend(newComments);\n  deleteIcon.addEventListener(\"click\", handleDelete);\n};\nconst handleSubmit = async event => {\n  event.preventDefault();\n  const textarea = form.querySelector(\"textarea\");\n  const text = textarea.value;\n  const videoId = videoContainer.dataset.id;\n  if (text === \"\") {\n    return;\n  }\n  const response = await fetch(`/api/videos/${videoId}/comment`, {\n    method: \"POST\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      text\n    })\n  });\n  textarea.value = \"\";\n  if (response.status === 201) {\n    textarea.value = \"\";\n    const {\n      newCommentId\n    } = await response.json();\n    addComment(text, newCommentId);\n  }\n};\nconst handleDelete = async event => {\n  const deleteComment = event.target.parentElement;\n  const {\n    dataset: {\n      id\n    }\n  } = event.target.parentElement;\n  const videoId = videoContainer.dataset.id;\n  const response = await fetch(`/api/videos/${videoId}/comment/delete`, {\n    method: \"DELETE\",\n    headers: {\n      \"Content-Type\": \"application/json\"\n    },\n    body: JSON.stringify({\n      commentId: id\n    })\n  });\n  if (response.status === 200) {\n    deleteComment.remove();\n  }\n};\nif (form) {\n  form.addEventListener(\"submit\", handleSubmit);\n}\nif (deleteIcon) {\n  deleteIcon.forEach(icon => icon.addEventListener(\"click\", handleDelete));\n}\n\n//# sourceURL=webpack://hongtube/./src/client/js/commentSection.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/client/js/commentSection.js"]();
/******/ 	
/******/ })()
;