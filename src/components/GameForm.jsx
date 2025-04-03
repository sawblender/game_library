import React, { useState } from "react";

const GameForm = ({ addGame }) => {
  const [game, setGame] = useState({
    title: "",
    genre: "",
    createdAt: "",
    rating: "",
    publisher: "",
    completed: false,
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!game.title || !game.genre || !game.publisher) return;
    
    addGame({ ...game, createdAt: formatDate(game.createdAt) });
    setGame({ title: "", genre: "", createdAt: "", rating: "", publisher: "", completed: false });
  };

  return (
    <form className="game-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={game.title} onChange={(e) => setGame({ ...game, title: e.target.value })} required />
      <input type="text" placeholder="Genre" value={game.genre} onChange={(e) => setGame({ ...game, genre: e.target.value })} required />
      <input type="date" value={game.createdAt} onChange={(e) => setGame({ ...game, createdAt: e.target.value })} />
      <input type="float" placeholder="Rating (1-10)" value={game.rating} onChange={(e) => setGame({ ...game, rating: e.target.value })} />
      <input type="text" placeholder="Publisher" value={game.publisher} onChange={(e) => setGame({ ...game, publisher: e.target.value })} required />
      <label>
        <input type="checkbox" checked={game.completed} onChange={(e) => setGame({ ...game, completed: e.target.checked })} />
        Completed
      </label>
      <button type="submit">Add Game</button>
    </form>
  );
};

export default GameForm;
