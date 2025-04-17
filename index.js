const mongoose = require("mongoose")
const {initializeDatabase} = require("./db/db.connect")
const bookList = require("./models/books.models")
const express = require("express")
const app = express()
app.use(express.json())
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


initializeDatabase()

async function createBooks(newBook){
    try{
        const Books = new BookList(newBook)
        const saveBooks = await Books.save()
        return saveBooks
    }catch(error){
        throw(error)
    }
}

app.post("/books", async (req, res) => {
    try{
        const savedBooks = await createBooks(req.body)
        if(savedBooks){
            res.status(201).json({message: "Books successfully saved", data: savedBooks})
        }  else {
            res.status(404).json({error: "Books not found"})
        }
    }catch (error) {
        console.error("Error saving book:", error); // Log the entire error object
        res.status(500).json({ error: "Error occurred while saving book.", details: error.message }); // Include the error message
      }
})

app.get("/books", async(req, res) => {
    try {
        const allBooks = await bookList.find()
    if(allBooks && allBooks.length > 0){
        res.json(allBooks)
    }else {
        res.status(404).json({error: "No Books found"})
    }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching book."})
    }
})

async function getBookByTitle(bookTitle){
    try{
        const selectBook = await bookList.find({title: bookTitle})
        return selectBook
    }catch(error){
        throw(error)
    }
}

app.get("/books/:title", async (req, res) => {
    try{
        const selectedBook = await getBookByTitle(req.params.title)
        if(selectedBook && selectedBook.length > 0){
            res.status(201).json({message: "Book found successfully", book: selectedBook})
        }else {
            res.status(404).json({error: "No Books found"})
        }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching book."})
    }
})

async function getBookByAuthor(authorName){
    try{
        const selectBook = await bookList.find({author: authorName})
        return selectBook
    }catch(error){
        throw(error)
    }
}

app.get("/books/author/:authorName", async (req, res) => {
    try{
        const selectedBook = await getBookByAuthor(req.params.authorName)
        if(selectedBook && selectedBook.length > 0){
            res.status(201).json({message: "Book found successfully", book: selectedBook})  
        }else {
            res.status(404).json({error: "No Books found"})
        }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching book."})
    }
})

async function getBookByGenre(bookGenre){
    try{
        const selectBook = await bookList.find({genre: bookGenre})
        console.log(selectBook)
        return selectBook
    }catch(error){
        throw(error)
    }
}

app.get("/books/genre/:genreName", async(req, res) => {
    try{
        const selectedBooks = await getBookByGenre(req.params.genreName)
        if(selectedBooks && selectedBooks.length > 0){
            res.status(201).json({message: "Book found successfully", book: selectedBooks})  
        }else {
            res.status(404).json({error: "No Books found"})
        }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching book."})
    }  
})

async function filterBooksByYear(year){
    try{
        const selectBook = await bookList.find({publishedYear: year})
        console.log(selectBook)
        return selectBook
    }catch(error){
        throw(error)
    }
}

app.get("/books/release/:releaseYear", async(req, res) => {
    try{
        const selectedBooks = await filterBooksByYear(req.params.releaseYear)
        if(selectedBooks && selectedBooks.length > 0){
            res.status(201).json({message: "Book found successfully", book: selectedBooks})  
        }else {
            res.status(404).json({error: "No Books found"})
        }
    }catch(error){
        res.status(500).json({error: "Error occured while fetching book."})
    }  
})

async function updateBookRating(bookId, dataToUpdate){
    try{
        const booktoUpdate = await bookList.findByIdAndUpdate(bookId, dataToUpdate, {new: true})
        return booktoUpdate
    }catch(error){
        throw(error)
    }
}

app.post("/books/:bookId", async(req, res) => {
    try{
        const updatedBook = await updateBookRating(req.params.bookId, req.body)
        if(updatedBook){
            res.status(201).json({message: "Book updated successfully", book: updatedBook}) 
        }else {
            res.status(404).json({error: "Book does not exist"})
        }
    }catch(error){
        res.status(404).json({error: "An error occured while fetching book."})
    }
})

async function updateBookByTitle(title, dataToUpdate){
    try{
        const bookToUpdate = await bookList.findOneAndUpdate({title: title}, dataToUpdate, {new: true})
        return bookToUpdate
    }catch(error){
        throw(error)
    }
}

app.post("/books/title/:bookTitle", async(req, res) => {
    try{
        const updatedBook = await updateBookByTitle(req.params.bookTitle, req.body)
        if(updatedBook){
            res.status(201).json({message: "Book updated successfully", book: updatedBook}) 
        }else {
            res.status(404).json({error: "Book does not exist"})
        }
    }catch(error){
        res.status(404).json({error: "An error occured while fetching book."})
    }
})

async function deleteBook(bookId){
    try{
        const deleteBook = await bookList.findByIdAndDelete(bookId)
        return deleteBook
    }catch(error){
        throw(error)
    }
}

app.delete("/books/:bookId", async(req, res) => {
    try{
        const deletedBook = await deleteBook(req.params.bookId)
        if(deletedBook){
            res.status(201).json({message: "Book deleted successfully", deletedbook: deletedBook})
        }else {
            res.status(404).json({error: "Book not found"})
        }
    }catch(error){
        res.status(404).json({error: "An error occured while fetching book."})
    }
})

const PORT = 3500
app.listen(PORT, () => {
    console.log(`Connected to port ${PORT} successfully.`)
})