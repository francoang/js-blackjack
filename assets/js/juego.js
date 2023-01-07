/**
 * 2C = Two of Clubs 
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

    console.log(deck);
    console.log(carta); //Cara debe de ser de la baraja
    return carta;
}

pedirCarta();