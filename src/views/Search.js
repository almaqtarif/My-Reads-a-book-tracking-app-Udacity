import React, { Component } from 'react'
import Book from '../components/Book'
import {Link} from 'react-router-dom'
import {search} from '../apiProvider/BooksAPI'
import {getAll} from '../apiProvider/BooksAPI'
export default class Search extends Component {
  constructor(props) {
   super(props)
    this.state = {
      query: '',
      books: []
    }
  }
  async componentDidMount() {
    try {
      const books = await getAll()
      this.props.addBooks(books)
    } catch(error) {
      console.log(error)
    }
  }
  handleChange = async e => {
   try{
     const query = e.target.value
     this.setState({query})
     if(query.trim()) {
       const result = await search(query)
       if(result.error){
         this.setState({books:[]})
       } else {
         this.setState({books:result})
       }
     } else {
        this.setState({books:[]})
     }
   } catch(error) {
     console.log(error)
   }
  }
  render() {
    return (          <div className="search-books">
            <div className="search-books-bar">
              <Link to={"/"} className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                {
                }
                <input type="text" placeholder="Search by title or author" onChange={this.handleChange} value={this.state.query}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
				{ this.state.books.length > 0 && this.state.books.map( book => {
                 const foundShelf = this.props.books.find( foundBook =>  foundBook.id === book.id)
				 if(foundShelf) {
                   book.shelf = foundShelf.shelf
                 } else {
                   book.shelf = 'none'
                 }
				 return <Book key={book.id} {...book} updateBookShelf={this.props.updateBookShelf} />
                } 	
				)}
				{this.state.books.length === 0 && <h3 style={{color: 'gray', textAlign: 'center'}} >No results are found</h3>}
			  </ol>
            </div>
          </div>)
  }
}