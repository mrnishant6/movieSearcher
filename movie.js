import  React from  'react'

class MovieRow extends React.Component{
  
  viewMovie(){
    const url = "https://www.themoviedb.org/movie/" + this.props.movie.imdbID;
    this.props.saveSearches(this.props.movie);
    window.location.href = url;
  }
  
  
  
    render() {
        return( <div key = {this.props.imdbID} className="movie">
        <table >
        <tbody>
          <tr>
            <td><img width = "120" alt = "poster" src = {this.props.movie.Poster}/></td>
            <td><h3>{this.props.movie.Title}</h3>
            <p>{this.props.movie.Type}</p>
            <p>{this.props.movie.Year}</p>
            <input type = "button" onClick={this.viewMovie.bind(this)} value ="View"/>
            <input type = "button" onClick={this.playTrailer} value="Play"/>
            </td>
          </tr>
          
        </tbody>
      </table>
      </div>
      );
    }
  }

export default MovieRow;
