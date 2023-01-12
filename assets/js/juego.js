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
const divCartasJugador = document.querySelector('#jugador-cartas');
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


//Eventos
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();
    
    puntosJugador = puntosJugador + valorCarta(carta);

    ptosHTML[0].innerText = puntosJugador;

    divCartasJugador.append();

});