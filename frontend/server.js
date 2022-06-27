import express from "express"
import hbs from "hbs"
import { dirname , resolve } from "path"
import { fileURLToPath } from "url"
import { PrismaClient} from '@prisma/client'

let filename = fileURLToPath(import.meta.url)
let directory = dirname(filename)
const prisma = new PrismaClient()

let app = express()
app.use(express.static("public"))
app.set("view engine", "hbs")
hbs.registerPartials(resolve(directory + "/views/partials"))
app.use(express.json({urlencoded : "true"}))

let port = process.env.PORT || 3001

app.get("/", async (req, res) => {
    res.render("index")
})

app.get("/getrecords", async (req, res) => {
    console.log("we are querying")
    try {
        let records = await prisma.Post.findMany()
        res.json({
            status : "ok",
            data : records
        })
    }
    catch(e) {
        console.log(e)
        res.json({
            status : "error",
            data : null
        })
    }
    finally{
        await prisma.$disconnect()
    }
})

app.get("/post/:postTtitle", async (req, res) => {
    let { postTitle } = req.params
    const post = await prisma.Post.findFirst({
        where : {
            postTitle : postTitle
        }
    })
    console.log(post)
    res.render("post", {
        data : post
    })
})

// app.get("/post/getPost", (req, res) => {
//     const post = await prisma.Post.findFirst({
//         where : {
//             postTitle : postTitle
//         }
//     })
// })
app.listen(port , () => {
    console.log("running frontend blog servers")
}) 