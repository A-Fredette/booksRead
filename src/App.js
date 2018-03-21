import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Search from './search'
import './App.css'
import CurrentlyReading from './currentlyReading'
import WantToRead from './wantToRead'
import Read from './read'


class BooksApp extends React.Component {

  state = {
    booklist : []
  }

  constructor() {
    super()
    this.updateShelf = this.updateShelf.bind(this)
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ booklist: books })
    })
  }

  updateShelf = (book, newShelf) => {
    let updatedObject = this.state.booklist.filter(newState => newState.id === book)
    .map(book => ({ id: book.id, shelf: newShelf, title: book.title, author: book.author, url: book.url }))

    let findIndex = this.state.booklist.findIndex(thisBook => thisBook.id === book)

    let keepDigging = this.state.booklist.slice()

    let change = (dArray, update) => {
      dArray[findIndex] = update[0]
      }

    change(keepDigging, updatedObject)

    BooksAPI.update(book, newShelf).then((updatedList) => {
      console.log(updatedList)
      this.setState(state => ({
        booklist: state.booklist.concat([updatedList])
      }))

      BooksAPI.getAll().then((books) => {
        this.setState({ booklist: books })
      })
    })
  }

  render() {
    return (
      <div className="app">
       <Route path="/search" render={() => (
        <Search updateShelf={this.updateShelf} booklist={this.state.booklist}/>
      )
    }/>
     <Route exact path="/" render={() => (
       <div className="list-books">
         <div className="list-books-title">
           <h1>MyReads</h1>
         </div>
         <div className="list-books-content">
           <div>
             <CurrentlyReading updateShelf={this.updateShelf} booklist={this.state.booklist} />
             <WantToRead updateShelf={this.updateShelf} booklist={this.state.booklist} />
             <Read updateShelf={this.updateShelf} booklist={this.state.booklist} />
           </div>
         </div>
         <div className="open-search">
           <Link
             to="/search"
             >Add a book
           </Link>
         </div>
       </div>
     )}
   />
      </div>
    )
  }
}

export default BooksApp
