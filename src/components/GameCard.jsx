import React, { Component } from "react";

class GameCard extends Component {
  render() {
    const { game, removeGame } = this.props;
    
    return (
      <div className="game-card">
        <h3>{game.title}</h3>
        <p><strong>Genre:</strong> {game.genre}</p>
        <p><strong>Publisher:</strong> {game.publisher}</p>
        <p><strong>Created:</strong> {game.createdAt}</p>
        <p><strong>Rating:</strong> {game.rating}/10</p>
        <p><strong>Status:</strong> {game.completed ? "Completed ✅" : "Not Completed ❌"}</p>
        <button onClick={() => removeGame(game.id)}>Remove</button>
      </div>
    );
  }
}

export default GameCard;
