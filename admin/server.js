import express from "express"
import hbs from "hbs"
import { dirname , resolve } from "path"
import { fileURLToPath } from "url"
let filename = fileURLToPath(import.meta.url)
let directory = dirname(filename)

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


app.post("/createpost", (req, res) => {
    console.log(req.body)
    res.send("success")
})

app.listen(port, () => {
    console.log("listenning from admin servers")
})