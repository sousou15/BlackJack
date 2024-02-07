// Tablero.js
import React, { useState, useEffect } from 'react';
import { Carta, generarCartas } from './Cartas';
import Inicio from './Inicio';
import Modal from './Modal'; // Asegúrate de importar tu componente Modal


const Tablero = () => {
    const [cartasJugador, setCartasJugador] = useState([]);
    const [cartasCrupier, setCartasCrupier] = useState([]);
    const [cartasDisponibles, setCartasDisponibles] = useState(generarCartas());
    const [resultado, setResultado] = useState(null);
    const [juegoTerminado, setJuegoTerminado] = useState(false);

    const [mostrarInicio, setMostrarInicio] = useState(true);
    const [nickname, setNickname] = useState('');
    const [avatarSeleccionado, setAvatar] = useState('');
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
      // Muestra el modal cuando el resultado está disponible
      if (juegoTerminado && resultado) {
        setShowModal(true);
      }
    }, [juegoTerminado, resultado]);
  
    const closeModal = () => {
      // Cierra el modal y reinicia para una nueva ronda
      setShowModal(false);
    };

    const handleIniciarJuego = (nickname, avatarSeleccionado) => {
      setNickname(nickname);
      setAvatar(avatarSeleccionado);
      setMostrarInicio(false);
      // Lógica adicional para iniciar el juego con el nickname
      // Puedes enviar el nickname al servidor si es necesario
    };

    if (mostrarInicio) {
      return <Inicio onIniciarJuego={handleIniciarJuego} />;
    }
    const barajarBaraja = (baraja) => {
      return baraja.sort(() => Math.random() - 0.5);
    };
    
    const repartirCartas = () => {
      const barajaBarajada = barajarBaraja(cartasDisponibles);
      setCartasDisponibles(barajaBarajada);
      // Asegurarse de que hay suficientes cartas disponibles
      if (cartasDisponibles.length < 3) {
          alert('No hay suficientes cartas para repartir. Reinicia el juego.');
          return;
        }

        // Repartir una carta al jugador
        const cartaJugador = cartasDisponibles.pop();
        setCartasJugador([cartaJugador]);


        // Repartir dos cartas al crupier (una boca abajo)
        const cartaCrupier1 = { ...cartasDisponibles.pop(), bocaAbajo: true };
        const cartaCrupier2 = cartasDisponibles.pop();
        setCartasCrupier([cartaCrupier1, cartaCrupier2]);

        // Actualizar el conjunto de cartas disponibles
        setCartasDisponibles(cartasDisponibles);
          // Reiniciar el resultado
        setResultado(null);

      // Reiniciar el estado de juegoTerminado
        setJuegoTerminado(false);
    };
    const iniciarNuevaRonda = () => {
      // Asegurarse de que hay suficientes cartas disponibles
      if (cartasDisponibles.length < 3) {
        alert('No hay suficientes cartas para repartir. Reinicia el juego.');
        return;
      }
  
      // Limpiar estado para iniciar una nueva ronda
      setCartasJugador([]);
      setCartasCrupier([]);
      setResultado(null);
      setJuegoTerminado(false);
  
      // Repartir cartas
      repartirCartas();
    };
    const solicitarCarta = () => {
      // Asegurarse de que hay suficientes cartas disponibles y se pueda seguir jugando
      if (cartasDisponibles.length < 1 || juegoTerminado) {
        alert(`No hay suficientes cartas disponibles o el juego ha terminado.
Reinicia la ronda para seguir jugando.`);
        return;
      }
      

      // Solicitar una carta adicional al jugador
      const nuevaCarta = cartasDisponibles.pop();
      setCartasJugador([...cartasJugador, nuevaCarta]);

      // Actualizar el conjunto de cartas disponibles
      setCartasDisponibles(cartasDisponibles);
      const sumaJugador = calcularSuma([...cartasJugador, nuevaCarta]);

      if (sumaJugador > 21) {
        // Si el jugador se pasa de 21, pierde automáticamente
        setResultado('Perdiste');
        setJuegoTerminado(true);
      } else if (sumaJugador === 21) {
        // Si el jugador alcanza 21, gana automáticamente
        setResultado('Ganaste');
        setJuegoTerminado(true);
      }
    };
  const plantarse = () => {
    // Asegurarse de que el juego no ha terminado
    if (juegoTerminado) {
      return;
    }
    // Descubrir la primera carta del crupier
    const cartasCrupierActualizadas = [...cartasCrupier];
    cartasCrupierActualizadas[0].bocaAbajo = false;
    setCartasCrupier(cartasCrupierActualizadas);

    // Repartir cartas al crupier mientras su mano sume menos de 17
    const jugarCrupier = () => {
      while (calcularSuma(cartasCrupierActualizadas) < 17) {
        const nuevaCartaCrupier = cartasDisponibles.pop();
        cartasCrupierActualizadas.push(nuevaCartaCrupier);
      }

      // Evaluar el resultado después de que el crupier haya completado su jugada
      evaluarResultado(cartasJugador, cartasCrupierActualizadas);
      setJuegoTerminado(true);
    };

    // Llamar a jugarCrupier después de un breve retraso para dar tiempo al jugador a ver la primera carta
    setTimeout(() => {
      jugarCrupier();
    }, 1000); // Puedes ajustar el tiempo según tus preferencias
  };
  const evaluarResultado = (cartasJugador, cartasCrupier) => {
    // Lógica para evaluar el resultado del juego
    // Aquí se muestra una implementación básica donde el jugador gana si suma 21 o tiene una suma mayor que el crupier sin pasarse de 21
    const sumaJugador = calcularSuma(cartasJugador);
    const sumaCrupier = calcularSuma(cartasCrupier);
    console.log(sumaJugador);
    console.log(sumaCrupier);

    if (sumaJugador === 21 || (sumaJugador < 21 && (sumaCrupier > 21 || sumaJugador > sumaCrupier))) {
      setResultado('Ganaste');
    } else if (sumaJugador === sumaCrupier) {
      setResultado('Empate');
    } else {
      setResultado('Perdiste');
    }
  };

    const calcularSuma = (cartas) => {
      // Calcular la suma de los valores numéricos de las cartas, asumiendo que los ases siempre valen 11
      let suma = cartas.reduce((total, carta) => {
        const valorNumerico = parseInt(carta.valor, 10);
    
        if (isNaN(valorNumerico)) {
          console.log(`Valor no parseable: ${carta.valor}`);
        }
    
        return total + valorNumerico;
      }, 0);
      
      return suma;
    };


      return (
      <div className="tablero">
       
{/* CRUPIER */}
        <div className="crupier">
          <img src="../../crupier.png" alt="Crupier" width={200}/>
          {cartasCrupier.map((carta, index) => (
            <Carta
              key={carta.id}
              id={carta.id}
              title={carta.bocaAbajo && index === 0 ? 'Carta Boca Abajo' : carta.title}
              bocaAbajo={carta.bocaAbajo}
              />
          ))}
        </div>
{/* TITULO */}

        <p className="title"><h2>Blackjack<img src="../../logoBJ.png" alt="logo" width={100}/></h2></p>
{/* RESULTADO */}

        {showModal && (
        <Modal>
          <div className="modal-content">
            <h3>{resultado}</h3>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </Modal>
      )}
{/* JUGADOR */}

        <div className="jugador">
          {/* <img src="../../player.png" alt="Jugador" width={200}/> */}
          <img src={avatarSeleccionado} alt="Avatar" width={200} />
          {cartasJugador.map((carta) => (
          <Carta key={carta.id} id={carta.id} title={carta.title} />
        ))}
        </div>

        <p className='usuario'>{nickname}</p>
        <div className="mostrarsuma">
        <h3>Puntos en mi mano: {calcularSuma(cartasJugador)}</h3>
        </div>

        
        <button onClick={juegoTerminado ? iniciarNuevaRonda : repartirCartas}>
          {juegoTerminado && resultado ? 'Nueva Ronda' : 'Empezar Partida'}
        </button>

        <button className='solicitar' onClick={solicitarCarta}>Solicitar Carta</button>
        <button className='plantarse' onClick={plantarse}>Plantarse</button>
    </div>
        );
  };


  export default Tablero;
