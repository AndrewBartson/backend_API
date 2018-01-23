let express = require('express')
let app = express()
const port = process.env.PORT || 3000
let bodyParser = require('body-parser')
let morgan = require('morgan')
let uuid = require('uuid/v4')

let controller = require('./controller')

if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', controller.books.getRoot)

app.get('/books', controller.books.getAllBooksController)
app.get('/books/:id', controller.books.getBookController)
app.post('/books', controller.books.createBookController)
app.patch('/books/:id', controller.books.updateBookController)
app.delete('/books/:id', controller.books.deleteBookController)

app.get('/books/:id/authors', controller.authors.getAllAuthorsController)
app.get('/books/:id/authors/:author_id', controller.authors.getAuthorController)
app.post('/books/:id/authors', controller.authors.createAuthorController)
app.patch('/books/:id/authors/:author_id', controller.authors.updateAuthorController)
app.delete('/books/:id/authors/:author_id', controller.authors.deleteAuthorController)

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }});
})

app.use((err, req, res, next) => {
  let status = err.status || 500;
  res.status(status).json({ error: err });
})

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`)
  })
}

module.exports = app
