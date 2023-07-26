import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
const CommentsSection = () => {
  const comments = useSelector((state) => state.bookstore.commentList);
  const commentCount = useSelector((state) => state.bookstore.commentCount);
  return (
    <section className="bg-white dark:bg-gray-900 py-5 lg:py-14">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-poppins text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
            Discussion ({commentCount})
          </h2>
        </div>
        <CommentForm/>
        {comments.map((comment) => <CommentCard key ={comment.id} {...comment}/>)}
      </div>
    </section>
  );
};

export default CommentsSection;
