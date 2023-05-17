import { API_URL } from "./config";

export type TDeck = {
  title: string;
  cards: TCard[];
  _id: string;
};

export type TCard = {
  title: string;
  text: string;
};

export async function getDecks(): Promise<TDeck[]> {
  const response = await fetch(`${API_URL}/decks`);
  return response.json();
}
