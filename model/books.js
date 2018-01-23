let books = require('../db/books')
const uuid = require('uuid/v4');
let randomId = require("random-id");

function getAllBooks() {
    return books;
}

function getBook(id) {
  let book = books.find((bookItem) => {
    return bookItem.id === id
  })
  if (!book) {
    return null
  }
  return book
}

function createBook(data) {
  let { name, borrowed, description, authors } = data;
  let newId = randomId(7);
  let newBook = {
    id: newId,
    name: name,
    borrowed: borrowed,
    description: description
   }
  books.push(newBook)
  return newBook;
}

function updateBook(req, res) {
  let book = getBook(req.params.id)
  if (!book) {
    return null;
  }
  let data = req.body;
  for (var key in data) {
    book[key] = data[key]
  }
  return book
}

function deleteBook(id) {
  let book = getBook(id);
  if (!book) {
    return null;
  }
  let delIndex = books.findIndex(function(book) {
    return book.id === id
  })
  books.splice(delIndex, 1);
  return book
}

module.exports = {
  getAllBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook
}
