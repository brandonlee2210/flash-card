import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";
import { getDecks } from "./api/getDecks";
import "./App.css";
import "./Deck.css";
import { TDeck } from "./api/getDecks";

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreateDeck(event: React.FormEvent<HTMLFormElement>) {
    event?.preventDefault();

    const deck = await createDeck(title);
    setDecks((decks) => [...decks, deck]);
    setTitle("");
  }

  async function handleDeleteDeck(deckId: string) {
    await deleteDeck(deckId);
    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    const fetchDecks = async () => {
      const decks = await getDecks();
      setDecks(decks);
    };

    fetchDecks();
  }, []);

  return (
    <div className="container">
      <div className="App">
        <h1>Your Decks</h1>

        <ul className="decks">
          {decks.map((deck) => (
            <li key={deck._id}>
              <button
                className="deck"
                onClick={() => handleDeleteDeck(deck._id)}
              >
                X
              </button>
              <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
            </li>
          ))}
        </ul>

        <form onSubmit={handleCreateDeck}>
          <label htmlFor="">Deck Title</label>
          <input
            type="text"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <button type="submit">Create Deck</button>
        </form>
      </div>
    </div>
  );
}

export default App;
