import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "../../reducers/bookstore.reducer";

const CommentForm = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const idToPost = parseInt(Date.now() * Math.random()).toString();

    const body = {
      id: idToPost,
      userId: "1",
      name: "Xia Yitong",
      avatar:
        "https://images.unsplash.com/photo-1613481950732-c1dcddcb410e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=598&q=80",
      content: message,
      postDate: new Date().toISOString(),
      children: [],
    };
    dispatch(postComment(body))
    setMessage("")
  }

  return (
    <>
      <form className="mb-6" onSubmit={handleSubmit}>
        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            rows={3}
            className="font-poppins text-[18px] leading-[32.4px] px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
            placeholder="Write a comment..."
            required
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Post comment
        </button>
      </form>
    
    </>
  );
};

export default CommentForm;
