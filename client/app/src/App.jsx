import React from "react";

export const App = () => {
  const [books, setBooks] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [releaseYear, setReleaseYear] = React.useState(0);
  const [editReleaseYear, setEditReleaseYear] = React.useState(0);

  const [newTitle, setNewTitle] = React.useState("");
  const [editingId, setEditingId] = React.useState(null);

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

    if (!title.trim()) {
      alert("Please enter a title");
      return;
    }

    console.log("Sending book data:", bookData);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/books/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);
      setBooks((prev) => [...prev, data]);
      setTitle("");
      setEditReleaseYear(0);
    } catch (err) {
      console.log(err);
    }
  };

  const updateBook = async (id) => {
    try {
      const currentBook = books.find((b) => b.id === id);

      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newTitle,
          release_year: editReleaseYear,
        }),
      });
      const data = await response.json();
      setBooks((prev) => prev.map((b) => (b.id === id ? data : b)));
      setEditingId(null);
      setNewTitle("");
      setReleaseYear(0);
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
            className="border-2 p-1 mx-2 rounded-lg hover:border-indigo-500 transition max-w-xs"
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
        <div className="mt-8 flex flex-col justify-center border border-amber-50/10 p-5 rounded-md">
          {books.map((item) => {
            const isEditing = editingId === item.id;
            return (
              <div key={item.id} className="mb-4">
                <div className="flex items-start gap-4">
                  <div>
                    <p>
                      <span className="font-semibold">Title </span>:
                      {isEditing ? (
                        <>
                          <input
                            className="ml-2 border rounded px-2 py-1"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                          />
                          <input
                            type="text"
                            className="ml-2 border rounded px-2 py-1"
                            value={editReleaseYear}
                            onChange={(e) => setEditReleaseYear(e.target.value)}
                            placeholder="Release year"
                          />
                        </>
                      ) : (
                        <span className="ml-2 ">{item.title}</span>
                      )}
                    </p>
                    <p>
                      <span className="font-semibold">Year </span>:{" "}
                      {item.release_year}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (isEditing) {
                        updateBook(item.id);
                      } else {
                        setEditingId(item.id);
                        setNewTitle(item.title);
                        setEditReleaseYear(item.release_year);
                      }
                    }}
                    className="ml-auto px-2 py-1 text-sm border rounded cursor-pointer hover:bg-gray-950 transition active:bg-indigo-400"
                  >
                    {isEditing ? "Save" : "Edit"}
                  </button>
                </div>

                <hr className="m-1 text-white/10 mt-2" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
