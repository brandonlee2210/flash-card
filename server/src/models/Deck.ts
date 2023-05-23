import mongoose from "mongoose";

const Schema = mongoose.Schema;
// const ObjectId = Schema.Types.ObjectId;

const DeckSchema = new Schema({
  title: String,
  cards: [],
});

const Deck = mongoose.model("Deck", DeckSchema);

export default Deck;
