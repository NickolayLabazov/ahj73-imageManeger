import './css/style.css';
import favicon from './img/favicon.ico';

import './js/app.js';

const fav = document.createElement('link');
fav.setAttribute('rel', 'shortcut icon');
fav.setAttribute('href', `.${favicon}`);
fav.setAttribute('type', 'image/x-icon');
document.head.appendChild(fav);

/*  document.querySelector('[data-id=upload-form]').addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:7071');
    // TODO: subscribe to response
    xhr.send(formData);

    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
        const img = document.createElement('img');
        img.src = `http://localhost:7071/${xhr.response}`;
        console.log(xhr.response);
        document.body.appendChild(img);
        }
        });
    })   */

/*   document.querySelector('[data-id=upload-form]').addEventListener('change', async (evt) => {
        evt.preventDefault();

        const formData = new FormData(evt.currentTarget);

        const response = await fetch('http://localhost:7071', {
            method: 'POST',
            body: formData
        })

        if(response.ok){
            // const url = await response.json();
            const url = await response.text();
             console.log(url);
             const img = document.createElement('img');
             img.src = `http://localhost:7071/${url}`;
             document.body.appendChild(img);
         }

        })   */
