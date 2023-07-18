"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReadingSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    readingStatus: {
        type: Boolean,
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
const Read = (0, mongoose_1.model)("Read", ReadingSchema);
exports.default = Read;
