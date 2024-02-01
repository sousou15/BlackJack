// Cartas.js
import React from 'react';

const Carta = ({ id, title, bocaAbajo,  }) => {
    // const imagePath = `../../public/cartasPNG/${id}.png`
    const imagePath = bocaAbajo
    ? `${window.location.origin}/cartasPNG/bocaAbajo.png`
    : `${window.location.origin}/cartasPNG/${id}.png`;    // Estilo para cambiar el tamaño de la imagen
    const estiloImagen = {
        width: '150px',  // Ajusta el ancho según tus necesidades
        height: 'auto',  // Mantiene la proporción original
    };
    return (
      <div className="carta">
        <img src={imagePath} alt={title} style={estiloImagen}/>
      </div>
    );
  };

const generarCartas = () => {
  const palos = ['Corazones', 'Rombos', 'Picas', 'Tréboles'];
  const nums = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  // Generar las cartas de la baraja inglesa sin comodines
  const cardsData = [];
  for (const palo of palos) {
    for (const num of nums) {
        let valor = !isNaN(parseInt(num, 10)) ? parseInt(num, 10) : 10; // Asignar el valor numérico o 10
        if (num === 'A') {
            valor = 11; // Si es un as (A), asignar el valor de 11
        }
        const card = {
        id: `${num}${palo[0]}`, // Usamos el rango y la primera letra del palo como identificador único
        title: `${num} de ${palo}`,
        content: `Descripción para ${num} de ${palo}.`,
        valor: valor,
      };
      cardsData.push(card);
    }
  }

  return cardsData;
};

// const Cartas = () => {
//   const cardsData = generarCartas();

//   return (
//     <div className="tablero">
//       {cardsData.map((card) => (
//         <Carta key={card.id} title={card.title} content={card.content}  valor={card.valor}/>
//       ))}
//     </div>
//   );
// };

export { Carta, generarCartas }; // Exportar Carta y generarCartas para su uso en otras partes de la aplicación
