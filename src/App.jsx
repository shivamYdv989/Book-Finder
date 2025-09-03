
import React, { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchBooks = async () => {
    setLoading(true);
    const res = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(search)}`
    );

    const data = await res.json();
    setBooks(data.docs.slice(0, 24));
    setLoading(false);  //  Show on screen in Limited to 24 results
  };
  return (
    <div className="body">
      <h1 className="designer">
        Designed by <strong>Shivam Yadav</strong>
      </h1>

      <h1>📚Find Your Book of Choice.</h1>
      <div className="search_Bar">
        <input
          type="text"
          placeholder="Enter book title..."
          value={search}
          onChange={(a) => setSearch(a.target.value)}
        />
        <button onClick={searchBooks} disabled={loading}>{loading ? 'Loading...' : 'Search'}</button>
      </div>
      {loading && <p>🔄 Fetching books, please wait...</p>}
      <div className="book_grid1">
        {books.map((book, index) => {
          const coverId = book.cover_i;
          const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : "https://via.placeholder.com/200x300?text=No+Cover";
          return (
            <div key={index} className="book_card">
              <img src={coverUrl} alt="Book Cover" />
              <h3>{book.title}</h3>
              <p>
                <strong>Author:</strong>{""}
                {book.author_name?.join(",") || "Unknown"}
              </p>
              <p>
                <strong>Year:</strong> {book.first_publish_year || "N/A"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

