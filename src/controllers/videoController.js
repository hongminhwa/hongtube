import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";
import { CleanPlugin } from "webpack";

 
export const home = async (req, res) =>{     
    const videos = await Video.find({}).sort({createdAt: "desc"})
    .populate("owner");  
    console.log(videos);
     return  res.render("home", {pageTitle: "Home", videos });
};

export const watch =  async (req, res) => {
    const { id } = req.params;
     const video = await Video.findById(id).populate("owner").populate("comments"); 
     console.log(video);
     if(!video ){
    return res.render("404", {pageTitle:"video Not Found"});
    }
    return res.render("watch", { pageTitle: video.title, video });
};


export const getEdit = async (req, res) => {
    const { id } = req.params;  
    const {user: {_id}} = req.session; 
    const video = await Video.findById(id); 
    if(!video) {
     return res.status(404).render("404", {pageTitle:"video Not Found"});
     }   
     if(String(video.owner) !== String(_id)) {
          req.flash("error", "you are not authorized to Change ");
          return res.status(403).redirect("/");
     }
     return res.render("edit", {pageTitle: ` ${video.title} `, video });
};

export const postEdit =  async (req, res) => {
     const {user: {_id}, } = req.session; 
     const { id } = req.params; 
     const {title, description, hashtags} = req.body; 
     const video = await Video.exists({ _id: id  }); 
     console.log(req.body);
     console.log(hashtags);
     if(!video) {
      return res.status(404).render("404", {pageTitle:"video Not Found"});   
     }
     
     if(String(video.owner) !== String(_id)) {
          return res.status(403).redirect("/");
     }
     
     await Video.findByIdAndUpdate(id, {
        title, 
        description, 
        hashtags: Video.formatHashtags(hashtags),
        
     });
     req.flash("success", "Changes saved" );
     return res.redirect(`/videos/${id}`);
     
}

export const getUpload = (req, res) => {
     return res.render("upload", {pageTitle: "Upload video"}); 

};

export const postUpload =  async (req, res) => {
     const { 
          user: {_id}, 
     } = req.session;
     console.log(req.files);
     const { video, thumb } = req.files;
    const {title, description, hashtags} = req.body;  

try {
    console.log(title, description, hashtags);
     const newVideo =await Video.create({ 
     title, 
     description, 
     fileUrl: video[0].path,
     thumbUrl: thumb[0].path.replace(/[\\]/g, "/"),
     owner: _id,
     hashtags: Video.formatHashtags(hashtags),
    });
    console.log(thumbUrl);
    const user = await User.findById(_id); 
    user.videos.push(newVideo._id); 
    user.save();
   return res.redirect("/");
} catch(error) {
     console.log(error); 

     return res.status(400).render("upload", {
          pageTitle: "Upload video",
          errorMessage: error._message,
     }); 
}
};


export const deleteVideo = async (req, res) => {
     const { id } = req.params;
     const {user:{_id}} = req.session;
      const video = await Video.findById(id); 
      if(!video) {
          return res.status(404).render("404", {pageTitle:"video Not Found"});   
         }

     if(String(video.owner) !== String(_id)) {
          return res.status(403).redirect("/");
     }
     await Video.findByIdAndDelete(id); 
     return res.redirect("/");

};


export const search = async (req, res) => { 
     const { keyword } = req.query;  
     let videos = [];
     if( keyword) {  
          videos = await Video.find({
          title: {
                    $regex: new RegExp(`^${keyword}`, "i"),
               },
          }).populate("owner");
     }
     return res.render("search", { pageTitle: "Search", videos });
}


export const registerView = async (req, res) => {
     const { id } = req.params;
     const video = await Video.findById(id);
     if (!video) {
       return res.sendStatus(404);
     }
     video.meta.views = video.meta.views + 1;
     await video.save();
     return res.sendStatus(200);
   };

   export const createComment = async (req, res) => {
     const {
          session: {user}, 
          body: {text}, 
          params: {id}, 
     }= req; 
     console.log(user, text, id);
     
     const video = await Video.findById(id); 
     if(!video) {
          return res.sendStatus(404); 
     } 
     const comment = await Comment.create({
       text, 
       owner: user._id, 
       video: id, 
     });
     video.comments.push(comment._id);
     video.save(); 
     return res.status(201).json({ newCommentId: comment._id });
  };

  export const deleteComment = async (req, res) => {
      const {
          session: { user }, 
          body: {commentId},
          params: { id }, 
      }= req; 

      const video = await Video.findById(id);

      if(!video) {
          return res.sendStatus(404); 
      }
      video.comments = video.comments.filter((id) => id !== commentId ); 
      video.save(); 

      await Comment.findByIdAndDelete(commentId);
      return res.sendStatus(200); 
  };

