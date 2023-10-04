const fetch = require('node-fetch');


const API_ENDPOINT = 'https://www.giantbomb.com/api/search/';
const API_KEY = 'fbd05e4ef39ba9943fe9db71a7967ff8f4ecc368';

exports.searchGames = async (query) => {
    const response = await fetch(`${API_ENDPOINT}?api_key=${API_KEY}&format=json&query=${query}&resources=game`, {
        headers: {
            'Authorization': `Bearer ${API_KEY}`
        }
    });
    
    return response.json();
};