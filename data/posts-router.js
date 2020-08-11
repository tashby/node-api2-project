const express = require("express")
const router = express.Router()
const posts = require("./db")


//works
router.post("/api/posts", (req, res) => {
    try {
        if (!req.body.title || !req.body.contents) {
            res.status(400).json({
                errorMessage: "Please provide title and contents for the post."
            })
        } else {
            posts.insert(req.body)
                .then((post) => {
                    res.status(201).json(post)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).json
                        ({
                            message: "error"
                        })
                })
        }
    }
    catch{
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
})

//works
router.post("/api/posts/:id/comments", (req, res) => {
    try {


        if (!req.body.text) {
            res.status(404).json({
                errorMessage: "Please provide text for the comment."
            })
        } else {
            posts.insertComment(req.body)
                .then((comment) => {
                    res.status(201).json(comment)
                })
                .catch((error) => {
                    console.log(error)
                    res.status(500).json({
                        message: "error"
                    })
                })
        }
    }
    catch{
        res.status(404).json({
            message: "The post with the specified ID does not exist."
        })
    }
})

//works
router.get("/api/posts", (req, res) => {
    posts.find()
        .then((posts) => {
            res.status(200).json(posts)
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({
                error: "The posts information could not be retrieved."
            })
        })
})

//works
router.get("/api/posts/:id", (req, res) => {
    try{
    posts.findById(req.params.id)
        .then((posts) => {
            if (posts) {
                res.status(200).json(posts)
            } else {
                res.status(400).json({
                    message: ""
                })
            }
        })
        .catch((error)=>{
            console.log(error)
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        })
    }
    catch{
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
    }
})

//works
router.get("/api/posts/:id/comments", (req, res) => {
    try{
    posts.findPostComments(req.params.id, req.body)
        .then((comments) => {
            res.status(200).json(comments)
        })
        .catch((error) => {
            console.log(error)
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        })
    }
    catch{
        res.status(500).json({
            error: "The comments information could not be retrieved."
        })
    }
})

//works
router.delete("/api/posts/:id", (req, res) => {
    try{
    posts.remove(req.params.id)
        .then((post) => {
            res.status(200).json({
                message: "The user has been deleted"
            })
                .catch((error) => {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist."
                    })
                })
        })
    }
    catch{
        res.status(500).json({
            error: "The post could not be removed"
        })
    }
})


//works
router.put("/api/posts/:id", (req, res) => {
    try{
    if(!req.body.title || !req.body.contents){
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    posts.update(req.params.id, req.body)
        .then((post) => {
            res.status(200).json(post)
        })
        .catch((error) => {
            console.log(error)
            res.status(404).json({
               message: "The post with the specified ID does not exist."
            })
        })
    }
    catch{
        res.status(500).json({
            error: "The post information could not be modified."
        })
    }
})

module.exports = router