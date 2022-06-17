let markdownContent = document.querySelector(".markupContent")
let htmlContent = document.querySelector(".htmlContent")
let postForm = document.querySelector(".postForm")

/*create form entries*/
markdownContent.addEventListener("keyup", function (e) {
    let markup = e.target.value
    renderHtml(markup, htmlContent)    
})

function renderHtml (data, body) {
    let convertor = new showdown.Converter().makeHtml(data)
    body.innerHTML = convertor
}

postForm.addEventListener("submit", function (e) {
    e.preventDefault()
    let form = new FormData()
    form.append("postTitle", document.querySelector(".postTitle").value)
    form.append("postDescription", markdownContent.value)
    form.append("postImage", "")
    let data = {}
    for(var pair of form.entries()) {
        data[pair[0]] = pair[1]
    }
    sendFormData(data, "/createpost")
} )


async function sendFormData (data, url) {
    
    try {

        let request = fetch(url , {
            method : "post",
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        let response = await request.text()
        //display error
    }

    catch (e) {

    }

}
