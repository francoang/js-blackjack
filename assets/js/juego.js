/**
 * 2C = Two of Clubs 
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

// Referencias de HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevoJuego = document.querySelector('#btnNuevo');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const ptosHTML = document.querySelectorAll('small');

// Crea un nuevo deck o baraja
const crearDeck = () => {

    for( let i = 2; i <= 10; i++){
        for( let tipo of tipos){            
            deck.push(i + tipo);
        }
    }

    for( let tipo of tipos){
        for( let especial of especiales){            
            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle(deck);    
    console.log(deck);
    
    return deck;
    
}

crearDeck();



// Permite tomar una carta
const pedirCarta = () => {

    if(!deck.length){
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();

    return carta;
}


const valorCarta = ( carta ) => {
    
    const valor = carta.substring(0, carta.length - 1);
    
    return ( !isNaN(valor) ) ? valor * 1 
            : ( valor === 'A' ) ? 11 : 10 ;
}

//Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        ptosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

    } while ( puntosComputadora < puntosMinimos && puntosComputadora <= 21);

    setTimeout(() => {
        mensajeFinal(puntosMinimos);
    }, 10);
}

const mensajeFinal = (puntosMinimos) =>{
    if( puntosMinimos === puntosComputadora ){
        alert('EMPATE');
    }else if(puntosComputadora > 21 && puntosMinimos > 21){
        alert('AMBOS PIERDEN');
    }
    else if(puntosMinimos > 21){
        alert('La COMPUTADORA ganó la partida');
    }else if(puntosComputadora > 21){
        alert('El JUGADOR ganó la partida');
    }else{
        alert('La COMPUTADORA ganó la partida');
    }
}


//Eventos
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta(carta);

    ptosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if( puntosJugador > 21){
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if( puntosJugador === 21){
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }

});


btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

btnNuevoJuego.addEventListener('click', () => {
    deck = [];
    crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    ptosHTML[0].innerText = 0;
    ptosHTML[1].innerText = 0;
    
    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
    
    btnPedir.disabled = false;
    btnDetener.disabled = false;
});