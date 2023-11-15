// Video.find().then(function (videos) { 
//      console.log("videos", videos); 
// })
// .catch(function (err) {
// console.log(err);
// }); 

//  };     



 // export const home = async (req, res) =>{     
//   Video.find().then(function (videos) {
//      console.log("render once");
//      res.render("home", {pageTitle: "Home", videos });  
//      console.log("render again"); 
//      res.sendStatus(200); 

//   })
//   .catch(function (err) {
//      console.log(err);
//   });  
// }; 

// mongodb://localhost:27017/hongtube

//kakao login Api 활용해서 추가하기 


          //- br
          //- small=video.createdAt
          //- hr



    //       div
    //       p=video.description
    //       small=video.createdAt
    //   div 
    //       small Uploaded by 
    //           a(href=`/users/${video.owner._id}`)=video.owner.name
    //   if String(video.owner.id) === String(loggedInUser._id)   
    //       a(href=`${video.id}/edit`) Edit Video &rarr;
    //       br
    //       a(href=`${video.id}/delete`) Delete Video &rarr;

      // setTimeout(()=> {
    //     recorder.stop();    
    // }, 10000);    
        //-   a(href=`/videos/${video.id}`)=video.title


        //kakaologin 
// export const startKakaoLogin = async (req, res) => { 
//    const baseUrl = "https://kauth.kakao.com/oauth/authorize";
//    const config = {
//        client_id: process.env.KAKAO_REST_API_KEY,
//        redirect_uri: "http://localhost:4000/users/kakao/finish", 
//        response_type: "code",        
//    }; 
//    const params = new URLSearchParams(config).toString();
//    const finalUrl = `${baseUrl}?${params}`; 
//    return res.redirect(finalUrl); 
// };

// export const finishKakaoLogin = async (req, res) => { 
//    console.log("finsh 단계로들어왔어요 "); 
//      const baseUrl = "https://kauth.kakao.com/oauth/token"; 
//      console.log("토큰값은: ", baseUrl);
//      const config = {
//        grant_type: "authorization_code", 
//        client_id: process.env.KAKAO_REST_API_KEY, 
//        redirect_uri: "http://localhost:4000/users/kakao/finish", 
//        code: req.query.code, 
//      };
     
   
// };
//social login pug 

// div.social-login
//     a(href="/users/kakao/start").social__btn.social__btn--github
//         i.fab.fa-github
//         |  Continue with Kakao &rarr;

// router 
// userRouter.get("/kakao/start", publicOnlyMiddleware, startKakaoLogin); 
// userRouter.get("/kakao/finish", publicOnlyMiddleware, finishKakaoLogin); 
