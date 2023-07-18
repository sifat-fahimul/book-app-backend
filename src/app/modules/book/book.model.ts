import { Schema, model } from "mongoose";
import { IBook } from "./book.interface";

const bookSchema = new Schema<IBook>({
  userEmail: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  reviews: [
    {
      type: String,
    },
  ],
});

const Book = model<IBook>("Book", bookSchema);

export default Book;
