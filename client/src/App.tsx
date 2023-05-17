import { useEffect, useState } from "react";
import { createDeck } from "./api/createDeck";
import { getDecks } from "./api/getDecks";
import "./App.css";
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
          {decks.map((decks) => (
            <li key={decks._id}>
              <button className="deck">{decks.title}</button>
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
