import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createCardForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;

  try {
    const deck = await Deck.findById(deckId);
    if (!deck) return res.status(400).send("no deck of this id exists");
    const { text } = req.body;
    deck.cards.push(text);
    await deck.save();
    res.json(deck);
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
}
