import getRequest from "/js/modules/getRequest.js"
window.addEventListener('load', function () {

    let postMarkdown = document.querySelector(".postMarkDown")
    document.querySelector(".postContent").innerHTML = new showdown.Converter().makeHtml(postMarkdown.innerText)
    postMarkdown.style.display = "none"
})



