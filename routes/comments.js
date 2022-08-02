const express = require('express');
const Comments = require("../schemas/comments")
const Posts = require("../schemas/posts")

const router = express.Router();


//댓글 작성  
router.post("/:postId", async (req, res) => {
    const { postId } = req.params;
    const { user, password, content } = req.body;
    const createdAt = new Date();

    const post = await Posts.find({ _id : postId })
    if (!content){
        await res.status(400).json({Message: "댓글 내용을 입력해주세요."})
    }else{
        await Comments.create({ user, password, content, createdAt, postId });
        res.status(201).json({comment : Comments , message : "댓글을 생성하였습니다."});
    }

});

//댓글 조회  
router.get("/:postId", async (req, res) => {
    const { postId } = req.params; 
    const comments = await (await Comments.find({ postId : postId })).reverse()
  
    res.json({
        data : comments.map((comment)=>({
            commentId : comment._id,
            user : comment.user,
            content : comment.content,
            createdAt : comment.createdAt
        }))
    })
})

//댓글 수정  

router.put("/:commentId", async (req, res) => {
    const { password, content } = req.body;
    const { commentId } = req.params; 
    const [comments] = await Comments.find({ _id :commentId  })
    if (!content){
        res.status(400).json({Message: "댓글 내용을 입력해주세요."})
    }else if (comments.password !== password){
        res.status(400).json({Message: "비밀번호가 틀립니다."})
    }else{    
        await Comments.updateOne({_id : commentId}, {$set: { password, content} }) 
        res.json({ message : "댓글을 수정하였습니다." })
    }
})



//댓글 삭제

router.delete("/:commentId", async (req, res) =>{
    const {password}  = req.body;
    const { commentId } = req.params;
    const [clear] = await Comments.find({ _id : commentId })  
    if (clear.password === password){
        await Comments.deleteOne({_id : commentId})
        res.json({ message : "댓글을 삭제하였습니다."})    
    }else{
        await res.json({ errorMessage: "비밀번호가 틀립니다."})
    }
    
})






module.exports = router;