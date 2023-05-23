import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { createDeckController } from "./controllers/createDeckController";
import { createCardForDeckController } from "./controllers/createCardForDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { deleteCardOnDeckController } from "./controllers/deleteCardOnDeckController";
import { getDeckController } from "./controllers/getDeckController";
import { getDecksController } from "./controllers/getDecksController";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/decks", getDecksController);
app.post("/decks", createDeckController);
app.delete("/decks/:deckId", deleteDeckController);
app.get("/decks/:deckId", getDeckController);
app.post("/decks/:deckId/cards", createCardForDeckController);
app.delete("/decks/:deckId/cards/:index", deleteCardOnDeckController);

app.get("/set-cookies", (req, res) => {
  // res.setHeader("Set-Cookie", "newUser=true");
  res.cookie("newUser", false);
  // httpOnly: true -> can not be used by front end
  res.cookie("isEmployee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });

  res.send("You got the cookies!");
});

const db = mongoose.connect(process.env.MONGO_URL!);

db.then(() => {
  console.log(`Listening on port ${process.env.PORT}`);
  app.listen(process.env.PORT);
});
