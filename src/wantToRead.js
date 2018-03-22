import React, { Component } from 'react'

class WantToRead extends Component {
  constructor() {
    super()
    this.state = {
      shelf: "wantToRead"
  }
}

  handleSubmit = (book, e) => {
    let targetShelf = e.target.value
    let targetBook = book
    this.props.updateShelf(targetBook, targetShelf)
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.booklist.filter(book => book.shelf === 'wantToRead').map((book) => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    {book.imageLinks ? (
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                    ) : (<div className="book-cover">No Image</div>
                    )}
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
        </div>
      </div>
    )
  }
}

export default WantToRead
