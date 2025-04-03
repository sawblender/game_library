import React, { useState } from "react";
import "./styles.css";

class GameLibrary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      games: [],
      title: "",
      genre: "",
      rating: "",
      publisher: "",
      completed: "",
      backgroundImage: "", // Stores the custom background
    };
  }

  addGame = () => {
    const { title, genre, rating, publisher, completed, games } = this.state;

    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    const newGame = {
      title,
      genre: genre || "Unknown Genre",
      rating: rating || "Unrated",
      publisher: publisher || "Unknown Publisher",
      completed: completed || "Not Completed",
      id: Date.now(),
    };

    this.setState({
      games: [...games, newGame],
      title: "",
      genre: "",
      rating: "",
      publisher: "",
      completed: "",
    });
  };

  removeGame = (id) => {
    this.setState({
      games: this.state.games.filter((game) => game.id !== id),
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBackgroundChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState({ backgroundImage: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  render() {
    return (
      <div
        className="container"
        style={{
          backgroundImage: this.state.backgroundImage
            ? `url(${this.state.backgroundImage})`
            : "none",
        }}
      >
        <h1>🎮 My Game Library</h1>

        {/* Background Image Selector */}
        <div className="background-upload">
          <label>📸 Upload Background:</label>
          <input type="file" accept="image/*" onChange={this.handleBackgroundChange} />
        </div>

        {/* Game Input Form */}
        <div className="game-form">
          <input
            type="text"
            name="title"
            placeholder="Game Title (Required)"
            value={this.state.title}
            onChange={this.handleChange}
            required
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre (Optional)"
            value={this.state.genre}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating (Optional)"
            value={this.state.rating}
            onChange={this.handleChange}
          />
          <input
            type="text"
            name="publisher"
            placeholder="Publisher (Optional)"
            value={this.state.publisher}
            onChange={this.handleChange}
          />
          <select name="completed" onChange={this.handleChange} value={this.state.completed}>
            <option value="">Completion Status (Optional)</option>
            <option value="Completed">Completed</option>
            <option value="Not Completed">Not Completed</option>
          </select>
          <button onClick={this.addGame}>➕ Add Game</button>
        </div>

        {/* Game List */}
        <div className="game-list">
          {this.state.games.map((game) => (
            <div key={game.id} className="game-card">
              <h3>{game.title}</h3>
              <p>🎭 Genre: {game.genre}</p>
              <p>⭐ Rating: {game.rating}</p>
              <p>🏢 Publisher: {game.publisher}</p>
              <p>✅ Status: {game.completed}</p>
              <button onClick={() => this.removeGame(game.id)}>❌ Remove</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default GameLibrary;
