import React from "react";

export const App = () => {
  const [books, setBooks] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [releaseYear, setReleaseYear] = React.useState(0);

  React.useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/books/");
        const data = await response.json();
        setBooks(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  const addBook = async () => {
    const bookData = {
      title: title,
      release_year: releaseYear,
    };
    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify(bookData),
      });
      const data = await response.json();
      setBooks((prev) => [...prev, data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col justify-center items-center">
      <div className="text-gray-200 flex flex-col items-center m-20">
        <h1 className="text-5xl font-bold text-center">Book Website</h1>

        <div className="mt-5 flex justify-center">
          <input
            type="text"
            placeholder="Book title..."
            className="border-2 p-1 mx-2 rounded-lg hover:border-indigo-500 transition"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Release date"
            className="border-2 p-1 mx-2 rounded-lg hover:border-indigo-500 transition"
            onChange={(e) => setReleaseYear(e.target.value)}
          />
          <button
            onClick={addBook}
            className="bg-indigo-700 px-4 py-1.5 rounded-lg hover:scale-105 transition transition-300 active:bg-indigo-400"
          >
            Add book
          </button>
        </div>
        <div className=" mt-8 flex flex-col justify-center border border-1/2 border-amber-50/10 p-5 rounded-md">
          {books.map((item) => {
            return (
              <div>
                <p>
                  <span className="font-semibold">Title </span>: {item.title}
                </p>
                <p>
                  <span className="font-semibold">Year </span>:{" "}
                  {item.release_year}
                </p>
                <hr className="m-1 text-white/10 mb-4" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
