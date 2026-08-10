import api from './api'

async function getMyCustomGames() {
    const response = await api.get('/customgames')
    return response.data
}

async function getGameById(id){
    const response = await api.get(`/customgames/${id}`)
    return response.data
}
async function createCustomGame(body){
    const response = await api.post('/customgames', body)
    return response.data
}

async function updateCustomGame(id,body){
    const response = await api.put(`/customgames/${id}`, body)
    return response.data
}
async function deleteGame(id) {
    const response = await api.delete(`/customgames/${id}`)
    return response.data
}
async function playGame(id) {
    const response = await api.get(`/customgames/${id}/play`)
    return response.data
}

export{
    getMyCustomGames,
    getGameById,
    createCustomGame,
    updateCustomGame,
    deleteGame,
    playGame
}