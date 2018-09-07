import React, { Component } from 'react';
import './App.css';
import MovieRow from './movie.js';
import Savedsearch from './savedSearch.js'
import $ from 'jquery'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      savedSearch:[]
    }
    this.saveSearches = this.saveSearches.bind(this);
  
  this.performSearch("Avengers")
  }

  saveSearches(movieData){
    
    let savedSearch = [];
    savedSearch = window.localStorage.getItem('savedSearch');
    if(savedSearch)
    {
      savedSearch = JSON.parse(savedSearch);
      savedSearch.push(movieData);
      
    }
    else{
      savedSearch = [];
      savedSearch.push(movieData);
      
    }
    console.log(savedSearch);
    window.localStorage.setItem('savedSearch',JSON.stringify(savedSearch))
    
  }
  performSearch(searchTerm){
    console.log("Search using Imdb Api")
     const urlString = " http://www.omdbapi.com/?&apikey=681a8cc2&s=" + searchTerm
   // const urlString = " http://www.omdbapi.com/?s=avengers&apikey=681a8cc2"

    $.ajax({
      url: urlString,
      success:(searchResults) =>{
        console.log("Fetched Data Successfully")
        console.log(searchResults)
      const results = searchResults.Search

      // console.log(results[0])

      var movieRows =[]

      if(results)
      {
        results.forEach((movie) => {

          console.log(movie.Title)
          const movieRow1 = <MovieRow key ={movie.imdbId} movie={movie} viewMovie={this.viewMovie} saveSearches={this.saveSearches}/>
          movieRows.push(movieRow1)
        })
      }
      else{
        console.log(searchTerm);
        console.log(searchResults);

      }
       
        

        this.setState({rows: movieRows})
      
       // console.log(results[0])

      },
      error: (xhr, status, err) => {
        console.log("Error In Fetching Your Data")
      }
    }) 

  }

  searchChangeHandler(event){
    console.log(event.target.value)
    const boundObject = this
    const searchTerm1 = event.target.value
    boundObject.performSearch(searchTerm1)
  }
    
  
  render() {
    return (
      <div>
        <table className="titleBar">
          <tbody>
            <tr>
              <td><img width="70" src="download1.jpeg" alt="Logo"/></td>
              <td width="8"/>
              <td><h1>Movies Db_Search</h1></td>
            </tr>
          </tbody>
        </table>
        <input  autoComplete={'on'} className="searchBar" onChange={this.searchChangeHandler.bind(this)} type= "text" placeholder= "Enter Search Term"/>
        <Savedsearch savedSearch={this.state.savedSearch}/>
        {this.state.rows}
        
      </div>
    );
  }
}

export default App;
