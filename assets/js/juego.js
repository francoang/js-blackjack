(() => {
    'use strict'


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    //La posicion del arreglo representa cada jugador
    //El ultimo valor es de la computadora
    let puntosJugadores = [];

    // Referencias de HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevoJuego = document.querySelector('#btnNuevo'),
        divCartasJugadores = document.querySelectorAll('.divCartas'),
        ptosHTML = document.querySelectorAll('small');


    //Esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();

        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
    }


    // Crea un nuevo deck o baraja
    const crearDeck = () => {

        //Reinicializamos el deck
        deck = [];

        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }

        return _.shuffle(deck);
    }

    // Permite tomar una carta
    const pedirCarta = () => {

        if (!deck.length) {
            throw 'No hay cartas en el deck';
        }

        return deck.pop();
    }

    //Retorna el valor en numero de la carta.
    const valorCarta = (carta) => {

        const valor = carta.substring(0, carta.length - 1);

        return (!isNaN(valor)) ? valor * 1
            : (valor === 'A') ? 11 : 10;
    }

    // Turno: 0 = primer jugador y el ultimo sera la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        ptosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = ( carta, turno ) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    //Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        const posCompu = puntosJugadores.length - 1;
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, posCompu);
            crearCarta(carta, posCompu);

        } while (puntosComputadora < puntosMinimos && puntosComputadora <= 21);

        setTimeout(() => {
            mensajeFinal(puntosMinimos, puntosComputadora);
        }, 10);
    }

    const mensajeFinal = (puntosMinimos, puntosComputadora) => {
        if (puntosMinimos === puntosComputadora) {
            alert('EMPATE');
        } else if (puntosComputadora > 21 && puntosMinimos > 21) {
            alert('AMBOS PIERDEN');
        }
        else if (puntosMinimos > 21) {
            alert('La COMPUTADORA ganó la partida');
        } else if (puntosComputadora > 21) {
            alert('El JUGADOR ganó la partida');
        } else {
            alert('La COMPUTADORA ganó la partida');
        }
    }


    //Eventos
    btnPedir.addEventListener('click', () => {

        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            console.warn('Lo siento mucho, perdiste');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
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

        inicializarJuego();

        // puntosJugador = 0;   
        // puntosComputadora = 0;
        // ptosHTML[0].innerText = 0;
        // ptosHTML[1].innerText = 0;

        // divCartasComputadora.innerHTML = '';
        // divCartasJugador.innerHTML = '';

        // btnPedir.disabled = false;
        // btnDetener.disabled = false;
    });


})();
