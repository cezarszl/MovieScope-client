import React from "react";

import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "The Matrix Reloaded",
      image:
        "https://resizing.flixster.com/iAVu-9508aPQUAZDOq_Tymo0vWw=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p31912_p_v8_bb.jpg",
      director: "Lilly Wachowski"
    },
    {
      id: 2,
      title: "Django Unchained",
      image:
        "https://resizing.flixster.com/EYUgjFKEFJZ58_5O3FniOs3d3gY=/206x305/v2/https://resizing.flixster.com/-XZAfHZM39UwaGJIFWKAE8fS0ak=/v3/t/assets/p9287010_p_v8_aa.jpg",
      director: "Quentin Tarantino"
    },
    {
      id: 3,
      title: "Ready Player One",
      image:
        "https://resizing.flixster.com/_9PDK6o0bmP_TkIFvV8I8_hRTUg=/206x305/v2/https://resizing.flixster.com/CZWlGfTfgPK4K6noRQ35fiQ3V0M=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzLzg2MDgxODQyLWZlZjgtNGE5OC05NjUwLTU0MWVmOGFkYTA0YS53ZWJw",
      director: "Steven Spielberg"
    }
  ]);
  
  const [selectedBook, setSelectedBook] = useState(null);

  if (selectedBook) {
    return <MovieView book={selectedBook} onBackClick={() => setSelectedBook(null)} />;
  }
  
  if (books.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {books.map((book) => {
        return <MovieCard 
        key={book.id} 
        book={book}
        onBookClick={(newSelectedBook) => {
            setSelectedBook(newSelectedBook);
          }} />
      })}
    </div>
  );
};