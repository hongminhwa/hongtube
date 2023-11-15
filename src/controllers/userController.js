import User from "../models/User";
import Video from "../models/Video";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { token } from "morgan";





export const getJoin = (req, res ) => 
res.render("join", { pageTitle: "Create Account"}); 

export const postJoin = async(req, res) => {
   const {name, username, email, password, password2, location} = req.body; 
   const pageTitle = "Join"; 
   if(password !== password2 ) {
        return res.status(400).render("join", {
         pageTitle, 
         errorMessage: "비밀번호가 일치하지않습니다."
        });
   }
   const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
         return res.status(400).render("join", {
            pageTitle, 
            errorMessage: "이미 사용중인 이메일 또는 아이디입니다."   
        });
    }
 
    try {
   await User.create({
    name,
    username,
    email,
    password,
    location, 
   });
    return res.redirect("/login");
   } catch(error) {
      return res.status(400).render("join", {
         pageTitle: "Upload Video", 
         errorMessage: error._message,
      });
   }
};


export const getLogin = (req, res) => 
  res.render("login", {pageTitle: "login"});

export const postLogin = async(req, res)=> {  

   const pageTitle="로그인";

   const {username, password}= req.body; 
   const user = await User.findOne({username, socialOnly: false }); 
   if(!user) {
      return res.status(400).render("login", {
      pageTitle,
      errorMessage: "존재하지 않은 계정입니다.",
   });
}
// console.log(user.password); 
const ok = await bcrypt.compare(password, user.password);
if(!ok) {
   return res.status(400).render("login", {
   pageTitle,
   errorMessage: "비밀번호가 일치하지않습니다.", 
});
} 
   req.session.loggedIn = true; 
   req.session.user = user; 
   console.log("로그인 절반성공");
    return res.redirect("/");
};


export const startGithubLogin = (req, res) =>  {
   const baseUrl = 'https://github.com/login/oauth/authorize';

   const config = {
      client_id: process.env.GH_CLIENT,
      allow_signup: false,
      scope:"read:user user:email",
   };

   const params = new URLSearchParams(config).toString(); //인코딩
    console.log(params);
   const finalUrl = `${baseUrl}?${params}`;
   return res.redirect(finalUrl);
};


export const finishGithubLogin = async(req, res) => { 
   console.log("여기까지 들어온거니"); 
   const baseUrl= "https://github.com/login/oauth/access_token";
   const config = {
      client_id: process.env.GH_CLIENT,
      client_secret: process.env.GH_SECRET, 
      code: req.query.code,
   }; 

   const params = new  URLSearchParams(config).toString(); 
   const finalUrl = `${baseUrl}?${params};` 
   const tokenRequest = await (
      await fetch(finalUrl, {
        method: "POST",
        headers:{
         Accept: "application/json",     
      },
   })
   ).json();  
   if("access_token" in tokenRequest) {
   const {access_token} = tokenRequest;  
   const apiUrl = "https://api.github.com";

   const userData =  await (await fetch(`${apiUrl}/user`, { 
      headers: {
         Authorization: `token ${access_token}`,
      },
   })).json();
   console.log("userData:", userData);
   const emailData = await
    (await fetch(`${apiUrl}/user/emails`, {
      headers: {
         Authorization: `token ${access_token}`,
      },
   })).json(); 
   console.log(emailData);
   const emailObject = emailData.find(
      (email) => email.primary === true && email.verified === true
   ); 
   if(!emailObject) {
         return res.redirect("/login"); 
   }
   let user = await User.findOne({ email: emailObject.email}); 
   if(!user){
         user = await User.create({
         avatarUrl: userData.avatar_url, 
         name: userData.name, 
         username: userData.login, 
         email: emailObject.email, 
         password: "",
         location: userData.location,
         socialOnly: true, 
       });
      }
       req.session.loggedIn = true; 
       req.session.user = user; //오류 생기면 여기가 문제임. 
       return res.redirect("/");
   }else {
       //github 계정이 홈페이지에 가입되어있지 않을 때 
       return res.redirect("/login");
   }
   
};



export const logout = (req, res) => {
   req.session.destroy();
   req.flash("info", "logouted");

   return res.redirect("/");

}; 

export const getEdit = (req, res) => {
   return res.render("edit-profile", { pageTitle: "Edit profile", user: req.session.user });
};
   
export const postEdit = async (req, res) => {  
   //ES6문법
    const {
       session: { 
         user: { _id, avatarUrl },
       },
       body: {name, email, username, location },  
       file,
    } = req;
    console.log("내가 올린 파일: " , file);
   const updatedUser = await User.findByIdAndUpdate(_id, {
      avatarUrl: file ? file.path : avatarUrl, 
      name, 
      email, 
      username,
      location, 
   }); 
   req.session.user = updatedUser;
   return res.redirect("/users/edit");
};

export const getChangePassword = (req, res) => {  
   if(req.session.user.socialOnly === true) {
      req.flash("error", "Can't change password");
      return res.redirect("/");
   }   
   return res.render("users/change-password", { pageTitle: "Change Password"});
};

export const postChangePassword = async (req, res) => {
   const {
     session: {
       user: { _id, password },
     },
     body: { oldPassword, newPassword, passwordCheck },
   } = req; 

   console.log("기존비밀번호", req.body.oldPassword);
   console.log("변경할 비밀번호", req.body.newPassword);
   console.log("변경할 비밀번호 확인", req.body.passwordCheck);

   const ok = await bcrypt.compare(oldPassword, password);
   if (!ok) {
     return res.status(400).render("users/change-password", {
       pageTitle: "Change Password",
       errorMessage: "기존 비밀번호를 확인해주세요",
     });
   }
   if (newPassword !== passwordCheck) {
     return res.status(400).render("users/change-password", {
       pageTitle: "Change Password",
       errorMessage: "변경할 비밀번호가 일치하지 않습니다.",
      });
   }

   const user = await User.findById(_id); 
   user.password = newPassword;
   await user.save();  
   req.flash("info", "password updated");
   return res.redirect("/users/logout");
 };


 export const see = async (req, res) => {
   const { id } = req.params;
   const user = await User.findById(id);
   console.log("나는 유저입니다",user);
   if (!user) {
     return res.status(404).render("404", { pageTitle: "User not found." });
   }
   const videos = await Video.find({owner: user._id});
   return res.render("users/profile", {
     pageTitle: user.name,
     user,
     videos
   });
 };


export const remove = (req, res) => res.send("Remove user"); 

