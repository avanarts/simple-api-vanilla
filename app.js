import { API_KEY } from "./config.js";


const URL = `https://api.nasa.gov/planetary/apod?`

const photo = document.getElementById('photo-placeholder')

const description = document.getElementById('description')

const button = document.getElementById('submit-btn')

const myWorker = new Worker('worker.js')



async function submitData(e) {
    e.preventDefault();

    const dateValue = document.getElementById('date').value;
    const params = new URLSearchParams({
        api_key: API_KEY,
        date: dateValue
    }).toString();

    try {
    const res = await fetch(`${URL}${params}`)
    const data = await res.json()


    displayData(data)

    } catch (error) {
        alert(error)
    }
}

const displayData = data => {
    photo.src = data.hdurl
    description.textContent = data.explanation
}

button.addEventListener('click', submitData)
button.addEventListener('click', () => {myWorker.postMessage('begin')})

myWorker.onmessage = (e) => {
    console.log(`Congratulations, you found the secret quote stash! Have a random quote: ${e.data}`)
}