import React, { useState } from "react";
import GameCard from "./GameCard";

const GameList = ({ games, removeGame, modifyGame }) => {
  const [search, setSearch] = useState("");
  const [filterPublisher, setFilterPublisher] = useState("");
  const [filterCompleted, setFilterCompleted] = useState("");
  const [sortBy, setSortBy] = useState("");

  let filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filterPublisher) {
    filteredGames = filteredGames.filter((game) => game.publisher === filterPublisher);
  }

  if (filterCompleted !== "") {
    filteredGames = filteredGames.filter((game) => game.completed === JSON.parse(filterCompleted));
  }

  if (sortBy === "rating") {
    filteredGames.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "createdAt") {
    filteredGames.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return (
    <div>
      <div className="filters">
        <input type="text" placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select onChange={(e) => setFilterPublisher(e.target.value)}>
          <option value="">Filter by Publisher</option>
          {Array.from(new Set(games.map((game) => game.publisher))).map((pub) => (
            <option key={pub} value={pub}>{pub}</option>
          ))}
        </select>
        <select onChange={(e) => setFilterCompleted(e.target.value)}>
          <option value="">Filter by Completion</option>
          <option value="true">Completed</option>
          <option value="false">Not Completed</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="rating">Rating</option>
          <option value="createdAt">Creation Time</option>
        </select>
      </div>
      <div className="game-list">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} removeGame={removeGame} modifyGame={modifyGame} />
        ))}
      </div>
    </div>
  );
};

export default GameList;
