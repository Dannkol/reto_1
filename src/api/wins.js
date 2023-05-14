import { reset } from "../main_cronometro.js"

const api_get = async (e) => {

    const url = new URL('https://646014e2fe8d6fb29e2b86dd.mockapi.io/api/wins');
    let data = await fetch(url, {
        method: 'GET',
        headers: { 'content-type': 'application/json' },
    })
    data = await data.json()
    return data
}

const api_post = async (req) => {

    /*  
        req esperadaa
        [
            [
                "00",
                "00",
                "04"
            ],
            "dada"
        ]
    
        req para post 
    
        {
            "nick": "nick 6",
            "time": [
                "00",
                "00",
                "04"
            ],
        }
     */


    let data = {
        nick: `${req[0] === 'null' ? 'Anonimo' : req[0]}`,
        time: req[1]
    }

    await fetch('https://646014e2fe8d6fb29e2b86dd.mockapi.io/api/wins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Error en la solicitud POST');
    })
        .then(function (data) {
            console.log('Respuesta del servidor:', data);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
    reset()
}

export { api_get, api_post } 