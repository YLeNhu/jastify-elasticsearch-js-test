import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getBook } from "../../reducers/bookstore.reducer";
import BookTable from "./BookTable";
import CommentsSection from "./CommentsSection";
const BookDisplay = () => {
  const dispatch = useDispatch()
  useEffect(() => {
        const promise = dispatch(getBook(1))
    
        return () => {
          promise.abort()
        }

    
  }, [dispatch])

  return (
    <div className="w-screen h-screen bg-gray-900">
        <h1 className={` font-poppins py-2 font-bold text-4xl sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent`}>
            Ebookstore.com
        </h1>
        <p className={` font-poppins py-1 font-light italic sm:px-6 lg:px-8 text-dimWhite`}>y.contact.here@gmail.com</p>
        <BookTable/>
        <CommentsSection/>
    </div>

  );
};

export default BookDisplay;
