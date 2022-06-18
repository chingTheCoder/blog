import express from "express"
import hbs from "hbs"
import { dirname , resolve } from "path"
import { fileURLToPath } from "url"
import { PrismaClient} from '@prisma/client'

let filename = fileURLToPath(import.meta.url)
let directory = dirname(filename)
const prisma = new PrismaClient()

let app = express()
let port = process.env.PORT || 3000

app.use(express.static("public"))
app.set("view engine", "hbs")
hbs.registerPartials(resolve(directory + "/views/partials"))
app.use(express.json({urlencoded : "true"}))


app.get("/", (req, res) => {
    res.render("index")    
})

app.get("/allposts", (req, res) => {
    res.render("posts")
})

app.post("/createpost", async (req, res) => {
    let { postTitle , postDescription, postImage } = req.body

    try {

        let query = await prisma.Post.create({
            data : {
                postTitle,
                postDescription,
                postImage
            }
        })
        res.send("success")
    }

    catch(e) {
        res.send("Database error")
    }

    finally {
        await prisma.$disconnect()
    }

})

app.listen(port, () => {
    console.log("listenning from admin servers")
})