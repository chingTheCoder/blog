export default async function getRequest(url) {

    try {
        let request = await fetch(url, {
            method : "get",
            headers : {
                "content-type" : "application/json"
            }
        })  
        let response = await request.json()
        return response
    }
    catch (e) {
        return e
    }

}