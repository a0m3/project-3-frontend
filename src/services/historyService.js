import api from "./api";


async function createHistory(body){
const response = await api.post("/history", body)
return response.data
}

async function getMyHistory(){
    const response = await api.get("/history")
    return response.data
}

export {
    createHistory,
    getMyHistory
}