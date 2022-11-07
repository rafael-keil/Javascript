import axios from 'axios'

async function imagemDog() {
    const resposta = await axios.get('https://dog.ceo/api/breeds/image/random')
    console.log(resposta.data)
}