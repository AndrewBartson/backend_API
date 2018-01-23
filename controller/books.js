let model = require('../model')

function getRoot(req, res, next) {
  res.status(200).send('<h1>BackEnd API - Books and Authors</h1>')
}

function getAllBooksController(req, res, next) {
  let books = model.books.getAllBooks();
  res.status(200).json(books)
}

function getBookController(req, res, next) {
  let id = req.params.id
  let book = model.books.getBook(id)
  if(!book) return next({status: 404, message: "No books were found"})

  res.status(200).json(book)
}

let createBookController = (req, res, next) => {
  let { name, borrowed } = req.body
  if(borrowed !== true || borrowed !== false) borrowed = false;
  if(!name) return next({status: 400, message: "Please provide a name"})
  if (name.length > 30) {
    err = {status: 400, message: "Name is over 30 characters"}
    return next(err);
  }
  let newBook = model.books.createBook(req.body)
  res.status(201).json(newBook)
}

function updateBookController(req, res, next) {
  let updatedBook = model.books.updateBook(req, res)
  if(!updatedBook) return next({status: 404, message: "No books were found"})
  res.status(200).json(updatedBook)
}

function deleteBookController(req, res, next) {
  let deletedBook = model.books.deleteBook(req.params.id, next);
  if(!deletedBook) return next({status: 404, message: "No books were found"})
  res.status(200).json([deletedBook])
}

module.exports = {
  getRoot,
  getAllBooksController,
  getBookController,
  createBookController,
  updateBookController,
  deleteBookController
}
