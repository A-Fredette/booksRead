import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends Component {

  state = {
    shelf: 'None',
    query: '',
    booklist: [],
    bookCheck: []
  }


  handleSubmit = (book, e) => {
    let targetShelf = e.target.value
    let targetBook = book
    this.props.updateShelf(targetBook, targetShelf)
  }

  checkShelves = (result, currentShelves) => {
    for (let each in result) {
      let currentID = result[each].id

      for (let book in currentShelves) {
        let idCheck = currentShelves[book].id

        if (currentID === idCheck) {
          console.log('match with', currentID, 'and', idCheck)
          result[each].shelf = currentShelves[book].shelf
          console.log(result[each].shelf, currentShelves[book].shelf)
        }
      }
    }
  }

  updateQuery = (query) => {
    this.setState({query: query})
      BooksAPI.search(query).then((searchResults) => {

        if (searchResults.error) {
          this.setState({booklist: []})
        } else {
          for (let each in searchResults) {
            searchResults[each].shelf = "none"
          }
          this.checkShelves(searchResults, this.props.booklist)
          this.setState({booklist: searchResults})
        }

      }).catch(error => {
        console.log("Search Error", error )
      })
}

  render() {
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
          {this.state.query !== "" && (
          <ol className="books-grid">
            {this.state.booklist.map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks ? (
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    ) : (<div className="book-cover">No Image</div>
                    )}
                    <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(e) => this.handleSubmit(book, e)}>
                          <option value="undefined" disabled>Move to...</option>
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
        </div>
      </div>
    </div>
    )
  }
}

export default Search
