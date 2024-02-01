// Inicio.js
import React, { useState } from 'react';

const Inicio = ({ onIniciarJuego }) => {
  const [nickname, setNickname] = useState('');
  const [avatarSeleccionado, setAvatarSeleccionado] = useState(null);

  const avatares = [
    '../../Avatar/avatar1.png',
    '../../Avatar/avatar2.png',
    '../../Avatar/avatar3.png',
    '../../Avatar/avatar4.png',
  ];

  const handleIniciarJuego = () => {
    if (nickname.trim() !== '' && avatarSeleccionado !== null) {
      onIniciarJuego(nickname, avatares[avatarSeleccionado]);
    } else {
      alert('Por favor, ingresa un nickname y selecciona un avatar válido.');
    }
  };

return (
    <div className="inicio">
        <p className="title"><h2>Blackjack<img src="../../logoBJ.png" alt="logo" width={100}/></h2></p>
      <input
        className="introducir"
        type="text"
        placeholder="Nombre de usuario"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <br />
      <p className='textavatar'>Selecciona un avatar:</p>
      <div className="avatares">
        {avatares.map((avatar, index) => (
          <img
            key={index}
            src={avatar}
            alt={`Avatar ${index + 1}`}
            width={200}
            height={230}
            className={avatarSeleccionado === index ? 'avatarSeleccionado' : ''}
            onClick={() => setAvatarSeleccionado(index)}
          />
        ))}
      </div>
      <br />
      <button onClick={handleIniciarJuego}>Iniciar Juego</button>
    </div>
  );
};

export default Inicio;
