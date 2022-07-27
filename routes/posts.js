// routes/posts.js
const express = require('express');
const Posts = require("../schemas/posts");
const router = express.Router();

//게시글 작성
router.post("/", async (req, res) => {
    const { user, password, title, content } = req.body;
    const createdAt = new Date();
    const createdPosts = await Posts.create({ user, password, title, content, createdAt })
    res.status(201).send({message : "게시글을 생성하였습니다."});
});

//전체 게시글 
router.get("/", async (req, res) => {  
    const posts = await (await Posts.find()).reverse()
    res.json({ 
        data : posts.map((posts) =>({
            postId : posts._id,
            user : posts.user,
            title :posts.title,
            createdAt : posts.createdAt

        })) 
    })
})
//게시글 상세조회

router.get("/:postId", async (req, res) => {
    const { postId } = req.params; 
    const [post] = await Posts.find({ _id : postId })
  
    res.json({
        data :{
            user : post.user,
            title :post.title,
            content : post.content,
            createdAt : post.createdAt
        }
    })
})

//게시글 수정  *수정해야됨
router.put("/:postId", async (req, res) => {
    const { password, title, content } = req.body;
    const { postId } = req.params; 
    const [post] = await Posts.find({ _id : postId })
    if  (post.password === password){
        await Posts.updateOne({_id : postId}, {$set: { password, title, content} }) 
        res.json({ message : "게시글을 수정하였습니다." })
    }else{
        await res.json({ errorMessage: "비밀번호가 틀립니다."})
    }
    
    
})

//게시글 삭제
router.delete("/:postId", async (req, res) =>{
    const {password}  = req.body;
    const { postId } = req.params;
    const [clear] = await Posts.find({ _id : postId }) 
    if (clear.password === password){
        await Posts.deleteOne({_id : postId})
        res.json({ message : "게시글을 삭제하였습니다."})
    }else{
        await res.json({ errorMessage: "비밀번호가 틀립니다."})
    }
    
})




module.exports = router;