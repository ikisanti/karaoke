const sideLetters = document.querySelector(".side-right");
const sideLeft = document.querySelector(".side-left");
const searchLetters = document.querySelector(".search-letters");

const artista = document.querySelector(".artist");
const cancion = document.querySelector(".song");

searchLetters.addEventListener("click", (e) => {
    e.preventDefault();
    //console.log(artista.value);
    //console.log(cancion.value);
    if (artista.value === "" || cancion.value === "") {
        mostrarError("Ambos campos son obligatorios...");
        return;
    }

    callApiSong(artista.value, cancion.value);
    Swal.fire('Cancion guardada')
    //formulario.reset();
})

function callApiSong(artista, cancion) {
    fetch(`https://api.lyrics.ovh/v1/${artista}/${cancion}`)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            //console.log(resultado);
            // if (resultado.lyrics) {
            //     const {lyrics} = resultado;
            //     mostrarLetra(lyrics);
            // } else {
            //     mostrarError("La cancion no existe...");
            // }
            move(resultado)
        })
        .catch(error =>
            console.log(error));
}

// function mostrarLetra(lyrics){
//     sideLetters.innerHTML = "";
//     const title = document.createElement("h3");
//     title.innerText = `${cancion.value} de: ${artista.value}`;
//     sideLetters.appendChild(title);

//     const letra = document.createElement("p");
//     letra.innerText = lyrics;
//     sideLetters.appendChild(letra);
// }

function mostrarError(mensaje) {
    const error = document.createElement("p");
    error.classList.add("error-mensaje");
    error.innerText = mensaje;

    sideLeft.appendChild(error);
    setTimeout(() => {
        error.remove();
    }, 2000);
}

function move(resultado) {

    //console.log(resultado);
    if (resultado.lyrics === undefined) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Escribiste mal la cancion!',
        })
    }


    let bobReplace = resultado.lyrics.replaceAll("\r", "\n").replaceAll('\n\n\n\n', "\n").replaceAll("\n\n",'\n')

    let bobSplit = bobReplace.split('\n')

    console.log(bobSplit);


    const futuro = document.querySelector('#futuro');
    const presente = document.querySelector('#presente')
    const pasado = document.querySelector('#pasado')

    let html = '';
    let html_2 = '';
    let html_3 = '';

    let n = 0;

    document.addEventListener('keypress', (e) => {

        if (e.key === '1') {
            n = n + 1;
            //! presente
            if (bobSplit[n] === undefined) {
                html = `<div><h1>__________</h1></div>`;
                futuro.innerHTML = html;
            } else {
                html = `<div class="Presente"><h1 class="LetraPresente">${bobSplit[n]}</h1></div>`;
                futuro.innerHTML = html;
            }
            //! futuro
            if (bobSplit[n - 1] === undefined) {
                html_2 = `<div><h1>__________</h1></div>`;
                presente.innerHTML = html_2;
            } else {
                html_2 = `<div class="Futuro"><h1 class="LetraFuturo">${bobSplit[n - 1]}</h1></div>`;
                presente.innerHTML = html_2;
            }
            //!pasado
            if (bobSplit[n + 1] === undefined) {
                html_3 = `<div><h1>__________</h1></div>`;
                pasado.innerHTML = html_3;
            } else {
                html_3 = `<div class="Pasado"><h1 class="LetraPasado">${bobSplit[n + 1]}</h1></div>`;
                pasado.innerHTML = html_3;
            }
            console.log(n, n + 1, n - 1)

        }
        e.preventDefault();

    });

    document.addEventListener('keypress', (e) => {


        if (e.key === '2') {
            n = n - 1;
            //! presente
            if (bobSplit[n] === undefined) {
                html = `<div><h1>__________</h1></div>`;
                futuro.innerHTML = html;
            } else {
                html = `<div class="Presente"><h1 class="LetraPresente">${bobSplit[n]}</h1></div>`;
                futuro.innerHTML = html;
            }
            //! futuro
            if (bobSplit[n - 1] === undefined) {
                html_2 = `<div><h1>__________</h1></div>`;
                presente.innerHTML = html_2;
            } else {
                html_2 = `<div class="Futuro"><h1 class="LetraFuturo">${bobSplit[n - 1]}</h1></div>`;
                presente.innerHTML = html_2;
            }
            //! pasado
            if (bobSplit[n + 1] === undefined) {
                html_3 = `<div><h1>__________</h1></div>`;
                pasado.innerHTML = html_3;
            } else {
                html_3 = `<div class="Pasado"><h1 class="LetraPasado">${bobSplit[n + 1]}</h1></div>`;
                pasado.innerHTML = html_3;
            }
        }
        e.preventDefault();
    });

}

