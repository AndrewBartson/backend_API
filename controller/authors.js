let model = require('../model')

function getAllAuthorsController(req, res, next) {
  let book_id = req.params.id;
  let author_id = req.params.author_id;
  let authors = model.authors.getAllAuthors(book_id, author_id);
  if(!authors) return next({status: 404, message: "Author was not found"})
  res.status(200).json(authors)
}

function getAuthorController(req, res, next) {
  let book_id = req.params.id
  let author_id = req.params.author_id;
  let author = model.authors.getAuthor(book_id, author_id)
  res.status(200).json(author)
}

let createAuthorController = (req, res, next) => {
  let book_id = req.params.id
  let { first_name, last_name } = req.body
  if(!first_name) return next({status: 400, message: "Please provide first name"})
  if(!last_name) return next({status: 400, message: "Please provide last name"})
  let newAuthor = model.authors.createAuthor(book_id, req.body)
  res.status(201).json(newAuthor)
}

function updateAuthorController(req, res, next) {
  let book_id = req.params.id
  let author_id = req.params.author_id;
  let updatedAuthor = model.authors.updateAuthor(book_id, author_id, req.body);
  res.status(200).json(updatedAuthor)
}

function deleteAuthorController(req, res, next) {
  let book_id = req.params.id
  let author_id = req.params.author_id;
  let deletedAuthor = model.authors.deleteAuthor(book_id, author_id)

  res.status(200).json(deletedAuthor)
}

module.exports = {
  getAllAuthorsController,
  getAuthorController,
  createAuthorController,
  updateAuthorController,
  deleteAuthorController
}
