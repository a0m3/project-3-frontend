import api from './api'

async function getMyCustomGames() {
    const response = await api.get('/custom-games')
    return response.data
}

async function getGameById(id){
    const response = await api.get(`/custom-games/${id}`)
    return response.data
}
async function createCustomGame(body){
    const response = await api.post('/custom-games', body)
    return response.data
}

async function updateCustomGame(id,body){
    const response = await api.put(`/custom-games/${id}`, body)
    return response.data
}
async function deleteGame(id) {
    const response = await api.delete(`/custom-games/${id}`)
    return response.data
}
async function playGame(id) {
    const response = await api.get(`/custom-games/${id}/play`)
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