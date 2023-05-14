
import { api_get } from "../../src/api/wins.js";

async function get() {
    let data = await api_get()
      
      data.sort((a, b) => {
        const timeA = a.time.join('');
        const timeB = b.time.join('');
        
        if (timeA < timeB) {
          return -1;
        }
        
        if (timeA > timeB) {
          return 1;
        }
        
        return 0;
      });
      
    return data.slice(0,10);
}


async function themplate (){
    let plantilla = ''
    let data = await get();
    data.forEach((items,ids) => {
        plantilla += `
        <li style="--item_idx: ${ids};">
            <span>${ids + 1}</span>
            <span>${items.nick} -> ${items.time.join(':')}</span>
        </li>
        `
    });
    return [plantilla, data.length]
}

self.addEventListener("message", async (e) => {
    postMessage(
        await themplate()
    );
});