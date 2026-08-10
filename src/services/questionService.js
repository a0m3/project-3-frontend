import api from "./api";

async function getGameQuestions(){
    const response = await api.get("/questions/game/play")
    return response.data
}

async function getAllQuestions(){
    const response = await api.get("/questions")
    return response.data
}

async function getQuestionById(id){
const response = await api.get(`/questions/${id}`)
return response.data
}

async function createQuestion(body){
    const response = await api.post("/questions", body)
    return response.data
}

async function deleteQuestion(id){
const response = await api.delete(`/questions/${id}`)
return response.data
}

export{
    getGameQuestions,
    getAllQuestions,
    getQuestionById,
    createQuestion,
    deleteQuestion
}