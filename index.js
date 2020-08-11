const express = require("express")
const postsRouter = require("./data/posts-router")
const server = express()
const port = 5000
server.use(express.json())
server.use(postsRouter)

server.listen(port, ()=>{
    console.log(`Serving running at http://localhost:${port}`)
})