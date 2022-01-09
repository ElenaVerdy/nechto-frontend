const isDev = window.location.hostname === 'localhost'
const baseUrl = isDev ? 'http://localhost:8000/api' : 'https://nechto-rating.herokuapp.com/api'

const api = {
    async fetch (url) {
        try {
            const response = await fetch(`${baseUrl}${url}`);
            const json = await response.json()
    
            return json
        } catch (err) {
            console.error(err)
        }
    },

    async post (url, data = {}) {
        const response = await fetch(`${baseUrl}${url}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const json = await response.json()

        return json;
    }
}

export default api