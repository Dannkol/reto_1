import { api_post } from "./api/wins.js";

const myCronometro = (nick) => {
    document.querySelector('my-cronometro').setAttribute('estado','fin');
    document.querySelector('my-cronometro').setAttribute('nick',nick);
}

const reset = () => {
    document.querySelector('#my-ranking').innerHTML = '';
    document.querySelector('#my-ranking').innerHTML = '<my-ranking><h1>TOP Campers</h1></my-ranking>';
}

const post_win = (data) => {
    api_post(data)
}
export {myCronometro , post_win , reset}