const express = require("express");
const nunjucks = require("nunjucks")

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function(req, res) {
    const about = {
        avatar_url: "/img/273767161_751385479172176_851141969886152262_n.jpg",
        name: "Matheus Peres",
        role: "Programador - Sei lá",
        discription: 'Programador full-stack, focado para trazer ensino para iniciantes bla bla bla bla bla <a href="https://google.com" target="_blank">bla</a>',
        links: [
            { name: "Github", url: "/"},
            { name: "Twitter", url: "/"},
            { name: "Linkedin", url: "/"}
        ]
    }

    return res.render("about", { about })
})

server.get("/portifolio", function(req, res) {

    return res.render("portifolio", { items: videos })
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video){
        return video.id == id
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", {item: video})
})

server.listen(5000, function(){
})