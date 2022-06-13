
// TODO ||------------ PARTE 1 [Función para agregar una nueva palabra] -------||

//CAPTURAR PALABRA NUEVA
function capturar (){
    const btn_nueva_palabra = id('guardar');
    let nuevaPalabra = document.getElementById("area").value;
    document.getElementById("area").focus();
       
    if (nuevaPalabra == 0){
        btn_nueva_palabra.addEventListener('click', capturar);
        /*alert("No has agregado una palabra; te rediccionaremos al nuevo juego, recuerda que puedes volver a esta sección cuando quieras.")*/
        Swal.fire({
            text:'No has agregado una palabra',
            icon:'error',
            confirmButtonText: 'Entendido',
            timer: 60000,
            timerProgressBar: true,
            background:'#403536',
            color: 'white',
            allowOutsideClick: false,
            confirmButtonColor: '#480F17'
        });
    }
    
    else {
        Swal.fire({
            text:'¡Palabra agregada!',
            icon:'success',
            confirmButtonText: 'Genial!',
            timer: 10000,
            timerProgressBar: true,
            background:'#403536',
            color: 'white',
            allowOutsideClick: false,    //No deja que el usuario de click afuera de la alerta
            confirmButtonColor: '#480F17',
        });
    }
}


// TODO||---------- PARTE 2 [ Definición de Constantes, Variables y Eventos] ----------||

//Listado de palabras
const palabras = ['EMPANADA','RESISTENCIA', 'PASION','PACIENCIA','ALURA','ORACLE','JAVASCRIPT','TENACIDAD','CUBO','COMIDA','CARACOL','ABAJO','ALUMNO','CESTA','ATARDECER','HORARIO','SOFTSKILLS','HABILIDADES','INVIERNO','MURCIELAGO','QUERYSELECTOR','PARANGUTIRIMICUARO','ESTERNOCLEIDOMASTOIDEO']; /*22 PALABRAS (0-21)*/

//ver la funcion getElementById
const btn = id('jugar');
const imagen = id('imagen');
const btn_letras = document.querySelectorAll("#letras button");

let palabrita;
let cant_errores = 0;
let cant_aciertos = 0;

//Click en iniciar juego
btn.addEventListener('click', iniciar);

for (let i = 0; i < btn_letras.length; i++){
    btn_letras[i].addEventListener('click', click_letras);
}

// TODO||---------- PARTE 3 [ Definición de las FUNCIONES] ----------||

//Toma los getElementById para cada evento
function id(str){
    return document.getElementById(str);
}

//Esta función hará que me de un valor entero, la puedo usar en cualquier ejercicio que necesite numeros aleatorios
function obtener_random(num_min, num_max){
    const amplitud_valores = num_max - num_min;                          //Valor más alto - valor (22 -0)
    const valor_al_azar = Math.floor(Math.random()*amplitud_valores) + num_min;    //Mostrará un número aleatorio y entero (floor elimina el número decimal 1,7 = 1)
    return valor_al_azar;
}

function iniciar (event){
    imagen.src = 'multimedia/img0.png'
    btn.disabled = true; //Desabilita el botón
    cant_errores = 0;
    cant_aciertos = 0;

    const parrafo = id('palabra_a_adivinar');
    parrafo.innerHTML = '';     //Reinicia, toma el espacio de la palabra y lo pone en blanco
    
    const cant_palabras = palabras.length;
    const valor_al_azar = obtener_random(0, cant_palabras);

    palabrita = palabras[valor_al_azar];
    const cant_letras = palabrita.length;

    for (let i = 0; i < btn_letras.length; i++){
        btn_letras[i].disabled = false;
    }
    
    //Crea los espacios de las letras de cada palabra
    for (let i = 0; i< cant_letras; i++){
        const span = document.createElement('span');
        parrafo.appendChild(span);
    }
}

function click_letras(event){
    const spans = document.querySelectorAll('#palabra_a_adivinar span');
    const button = event.target;    //Cuál de todas las letras llamó a la funcións       
    button.disabled = true;
    
    const letra = button.innerHTML.toUpperCase();
    const palabra = palabrita.toUpperCase(); //Todas las letras irán en mayúsculas 

    //Busca si la letra que digitamos está en la palabra a adivinar
    let acierto = false;
    for (let i = 0; i < palabra.length; i++){
        if (letra == palabra[i]){
            spans[i].innerHTML = letra;
            cant_aciertos++;
            acierto = true;
        }
    }

    if (acierto == false){
        cant_errores++;
        const source = `multimedia/img${cant_errores}.png`;
        const imagen = id('imagen');
        imagen.src = source;
    }

    if (cant_errores == 7){
        id('resultado').innerHTML = "😟 Perdiste 😟, la palabra era: " + palabrita;
        game_over();
    }

    else if (cant_aciertos ==palabrita.length) {
        id('resultado').innerHTML = "🤘 ¡Ganaste! 🤘, ¿Otro juego? 😏";
        game_over();
    }
}

function game_over(){
    for (let i = 0; i < btn_letras.length; i++){
        btn_letras[i].disabled = true;
    }

    btn.disabled = false;
}
game_over()