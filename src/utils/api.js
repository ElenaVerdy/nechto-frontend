const baseUrl = 'http://localhost:8000'

const api = {
    async fetch (url) {
        try {
            const response = await fetch(`${baseUrl}${url}`);
            const json = await response.json()
    
            return json
        } catch (err) {
            console.error(err)
        }
    }
}

export default api