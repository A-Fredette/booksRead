import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    shelf: 'none',
    query: '',
    booklist: []
  }

  handleSubmit = (book, e) => {
    console.log("currentlyReading.js"+ book)
    let targetShelf = e.target.value
    let targetBook = book
    this.props.updateShelf(targetBook, targetShelf)
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()})
    BooksAPI.search(query).then((searchResults) => {
      this.setState({booklist: searchResults})
      console.log("query ", query)
    }).catch( error => {
      console.log("Caught ", error )
    })
  }

  render() {
    const queryX = this.state.query
    return (
      <div className="search-books">
        <div>
          <div className="search-books-bar">
            <Link
              className="close-search"
              to="/"
              >Close
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(e) => this.updateQuery(e.target.value)}/>
            </div>
          </div>
        <div className="search-books-results">
          {this.state.query !== 0 && (
          <ol className="books-grid">
                {this.state.booklist.map((book) => (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select value={this.state.shelf} onChange={(e) => this.handleSubmit(book, e)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-sub-title">{book.subtitle}</div>
                      <div className="book-authors">{book.authors}</div>
                      <div className="book-published-date">Published: {book.publishedDate}</div>
                    </div>
                  </li>
                ))}
          </ol>
          )}
          {this.state.query === '' && (
            <div>No Results</div>
          )}
        </div>
      </div>
    </div>
    )
  }
}

export default Search
