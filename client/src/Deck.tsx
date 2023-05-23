import { useEffect, useState } from "react";
import { TDeck, TCard } from "./api/getDecks";
import { getDeck } from "./api/getDeck";
import { deleteCard } from "./api/deleteCard";
import { createCard } from "./api/createCard";

import "./Deck.css";
import "./index.css";
import { useParams } from "react-router-dom";

export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<TCard[] | []>([]);
  const [text, setText] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const handleToggle = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget as HTMLElement;
    card.classList.toggle("flip");
  };

  const { deckId } = useParams();

  console.log(cards);

  useEffect(() => {
    const fetchDeck = async () => {
      if (!deckId) return;

      const deck = await getDeck(deckId);
      setDeck(deck);

      setCards(deck.cards);
    };

    fetchDeck();
  }, [deckId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!deckId) return;

    await createCard(deckId, text, title);
    setCards((cards) => [...cards, { text, title }]);

    setText("");
  };

  const handleDeleteCard = async (index: number) => {
    if (!deckId) return;

    await deleteCard(deckId, index);
    setCards((cards) => cards.filter((_, i) => i !== index));
  };

  return (
    <div className="Deck">
      <h1>{deck?.title}</h1>
      <ul className="cards">
        {cards.map((card, index) => (
          <div className="card" key={card.title} onClick={handleToggle}>
            <li className="back">
              <button
                className="delete"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleDeleteCard(index);
                }}
              >
                X
              </button>
              {card.text}
            </li>
            <li className="front">
              <button
                className="delete"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleDeleteCard(index);
                }}
              >
                X
              </button>
              {card.title}
            </li>
          </div>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label htmlFor="card-text">Card text</label>
        <input
          type="text"
          id="card-text"
          placeholder="Cart title..."
          value={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <input
          type="text"
          id="card-text"
          placeholder="Cart text..."
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
        />

        <button>Create Card</button>
      </form>
    </div>
  );
}
