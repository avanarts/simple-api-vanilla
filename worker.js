onmessage = async (e) => {
    if (e.data === 'begin') {
        try {
            const data = await fetch('https://quoteslate.vercel.app/api/quotes/random')
            const response = await data.json()
            postMessage(response.quote)
        } catch (error) {
            postMessage(error.message)
        }
    }
}