import getRequest from "/js/modules/getRequest.js"
window.addEventListener('load', async function () {
    let response = await getRequest("/getrecords")
    if (response.status === "error") {
        return false
    }
    updateUi(document.querySelector(".content"))
    renderPosts(response.data, document.querySelector(".content"))
})


function updateUi (parent) {
    parent.removeChild(parent.children[0])
    parent.style.alignItems = "normal"
    parent.style.justifyContent = "normal"
}

function renderPosts(data, parent) {

    console.log(parent.children)
    data.forEach(element => {
        let div = document.createElement("div") 
        div.setAttribute("class", "postContentWrapper")   
        div.innerHTML = `
            <div class="post">
                <a href='/post/${element.postTitle}'>
                    <img class="postImage" src=${element.postImage} width="100%" height="300">
                </a>
                <div class="postInfo">
                    <a href="/post/${element.postTitle}">
                        <h3>${element.postTitle}</h3>
                    </a>
                </div>       
            </div>
        `
        parent.appendChild(div)
    })
}
// async function makeGetRequest(url){
    
//     try{
//         let request = await fetch(url, {
//             method : "get",
//             headers : {
//                 "content-type" : "application//json"
//             }
//         })
//         let response = await request.json()
//         return response
//     }
//     catch(e) {
//         console.log(e)
//         console.log("no internet connection")
//     }
// }


// function renderPosts (data) {
//     console.log(data.data)
//     console.log(data.data[0].postDescription)
//     let converter = new showdown.Converter(),
//     text      = data.data[1].postDescription,
//     html      = converter.makeHtml(text);
//     let parentNode = document.querySelector(".container")
//     parentNode.innerHTML = `${html}`

// }
