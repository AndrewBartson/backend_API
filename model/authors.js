let authors = require('../db/authors')
let books = require('./books')
let randomId = require("random-id");

function getAllAuthors(book_id, author_id) {
  let book = books.getBook(book_id);
  let authorsIds = book.authors;
  let resultSet = [];
  for (let i = 0; i < authorsIds.length; i++) {
    let nextAuthor = getAuthor(book_id, authorsIds[i]);
    resultSet.push(nextAuthor);
  }
  if (resultSet.length === 0) {return null}
  return resultSet;
}

function getAuthor(book_id, author_id) {
  let book = books.getBook(book_id);
  let authorIndex = authors.findIndex((authorItem) => {
    return authorItem.id === author_id
  })
  let author = authors[authorIndex]
  if (!author) {return null;}
  return author
}

function createAuthor(book_id, data) {
  let { first_name, last_name } = data
  let newId = randomId(7);
  let newAuthor = {
    id: newId,
    first_name: first_name,
    last_name: last_name
   }
  authors.push(newAuthor)
  return newAuthor;
}

function updateAuthor(book_id, author_id, data) {
  let author = getAuthor(book_id, author_id)
  for (var key in data) {
    author[key] = data[key]
  }
  return author
}

function deleteAuthor(book_id, author_id) {
  let author = getAuthor(book_id, author_id)
  let delIndex = authors.findIndex(function(author) {
    return author.id === author_id
  })
  authors.splice(delIndex, 1);
  return author
}

module.exports = {
  getAllAuthors,
  getAuthor,
  createAuthor,
  updateAuthor,
  deleteAuthor
}
