import React, { createContext, useState } from 'react';

const MovieContext = createContext();

const MovieProvider = ({ children }) => {
  const [movieData, setMovieData] = useState(null);

  return (
    <MovieContext.Provider value={{ movieData, setMovieData }}>
      {children}
    </MovieContext.Provider>
  );
};

export { MovieContext, MovieProvider };
