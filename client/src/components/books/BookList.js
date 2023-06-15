import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../redux/bookSlice";
import { Link } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";

const BookList = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books);
  console.log(books);
  const loading = useSelector((state) => state.books.loading);
  const error = useSelector((state) => state.books.error);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold m-4 text-center">Books List</h2>
        <div className="flex justify-center m-4">
          <Link
            to="/new"
            className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Add New Book
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 justify-center md:grid-cols-2 gap-8 lg:grid-cols-4">
        {books &&
          books.map((book) => (
            <div key={book._id} className="">
              <div className="h-full w-full border-opacity-60 rounded-lg overflow-hidden border-2 border-primary">
                <img
                  className="lg:h-64 md:h-36 w-full object-fill object-center"
                  src={book.coverImage}
                  alt="book"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1 uppercase">
                    {book.category}
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {book.title}
                  </h1>
                  <p className="leading-relaxed mb-3">{book.description}</p>
                  <div className="flex items-center flex-wrap">
                    <Link
                      to={`/${book._id}`}
                      className="text-secondary bg-primary p-2 rounded-sm inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      {book.viewCount}
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <MdOutlineRateReview className="w-4 h-4 mr-1" />
                      {book.reviews.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default BookList;
