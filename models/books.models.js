const mongoose = require("mongoose")

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publishedYear: {
        type: Number,
        required: true,
    },
    genre: [{
        type: String,
    }],
    language: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    summary: {
        type: String,
        required: true,
    },
    coverImageUrl: {
        type: String,
        required: true,
    },
},
{timestamps: true}
)

const bookList = mongoose.model("bookList", BookSchema)
module.exports = bookList