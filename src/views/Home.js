import React, { Component } from 'react'
import Shelf from '../components/Shelf'
import Look from '../components/Look'
import {getAll} from '../apiProvider/BooksAPI'


export default class Home extends Component {
  async componentDidMount() {
    try {
      const books = await getAll()
      this.props.addBooks(books)
    } catch(error) {
      console.log(error)
    }
  }
  render() {
    return (
     <div className="list-books">
            <div className="list-books-title">
              <h2 style={{color: 'white'}}>MyReads : A Tracking Books App Udacity Project</h2>
            </div>
            <div className="list-books-content">
          		<Shelf title="Currently Reading" books={this.props.currentlyReading} updateBookShelf={this.props.updateBookShelf} />
      			<Shelf title="Want To Read" books={this.props.wantToRead} updateBookShelf={this.props.updateBookShelf} />
      			<Shelf title="Read" books={this.props.read} updateBookShelf={this.props.updateBookShelf} />
            </div>
           <Look/>
    </div>
    )
  }
}