/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseURL = "https://platzi-avo.vercel.app/";
const API = "https://platzi-avo.vercel.app/api/avo";
const app = document.querySelector('#app');


// WEB API INTL
// Dar formato a fechas ya a monedas

const formatPrice = (price) => {
    const newPrice = new window.Intl.NumberFormat('es',
        {
            style: 'currency',
            currency: 'COP',
        }).format(price);
    return newPrice;
}

// //conectarnos al servidor
// window.fetch(API)
//     // procesar la respuesta y convertirla en JSON
//     .then(response => response.json())
//     .then(respuestaJson => {
//         respuestaJson.data.forEach(element => {
//             console.log(element.name);
//         });
//     });

const getData = async () => {
    try {
        //conectarnos al servidor
        const response = await fetch(API);
        // procesar la respuesta y convertirla en JSONF
        const respuestaJson = await response.json();
        return respuestaJson;
    } catch (error) {
        console.log('Fetch Error', error);
    };
};

const Character = async () => {
    const info = await getData();
    const items = [];
    info.data.forEach(element => {
        //crear Imagen
        const imagen = document.createElement('img');
        imagen.src = `${baseURL}${element.image}`;
        imagen.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6';
        //crear Titulo
        const title = document.createElement('h2');
        title.textContent = element.name;
        title.className = 'text-lg';
        //crear Precio
        const price = document.createElement('div');
        price.textContent = formatPrice(element.price);
        price.className = 'text-lime-600 font-bold';
        //descripcion
        const desc = document.createElement('div');
        desc.textContent = element.attributes.description;
        desc.className = 'text-gray-600';

        //container
        //Wrap price & title
        const priceAndTitle = document.createElement('div')
        priceAndTitle.className = 'text-center md:text-left'
        priceAndTitle.append(title, price, desc)
        //Wrap Img and priceAndTitle
        const card = document.createElement('div')
        card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300"
        card.append(imagen, priceAndTitle)

        items.push(card);
    });
    app.className = 'mt-10 grid grid-cols-2 gap2';
    app.append(...items);
}

Character();