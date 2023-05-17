import { Request, Response } from "express";
import Deck from "../models/Deck";

export async function createDeckController(
  request: Request,
  response: Response
) {
  const newDeck = new Deck({
    title: request.body.title,
  });

  const createdDeck = await newDeck.save();

  response.status(201).json(createdDeck);
}
