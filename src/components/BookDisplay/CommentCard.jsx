import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { postReply, deleteComment } from "../../reducers/bookstore.reducer";

const ReplySection = ({ userId, setIsReplying }) => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        const idToPost = parseInt(Date.now() * Math.random()).toString();

        const body = {
            userId: userId,
            children: {
                id: idToPost,
                userId: "1",
                name: "Xia Yitong",
                avatar:
                    "https://images.unsplash.com/photo-1613481950732-c1dcddcb410e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=598&q=80",
                content: message,
                postDate: new Date().toISOString()
            }
        };

        dispatch(postReply(body))
        setIsReplying(false)
    }

    return (
        <>
        <form className="mt-6 mb-2" onSubmit={handleSubmit}>
            <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <label htmlFor="comment" className="sr-only">
                Your reply
            </label>
            <textarea
                id="comment"
                rows={3}
                className="font-poppins text-[18px] leading-[32.4px] px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a reply..."
                required
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
            </div>
            <button
            type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
            Reply
            </button>
        </form>
        
        </>
    );
}

const CommentChild = ({assumedUserId, userId, name, avatar, content, postDate, children}) => {
    return (
        <article className="p-6 mt-3 ml-6 lg:ml-12 text-base bg-white shadow-md rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                <p className="font-poppins font-medium inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                    className="mr-2 w-10 h-10 rounded-full"
                    src={avatar}
                    alt="User Name"
                    />
                    {name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time>
                    {postDate}
                    </time>
                </p>
                </div>
                
            </footer>
            <p className="text-gray-500 dark:text-gray-400 font-poppins text-[18px] leading-[32.4px]">
                {content}
            </p>            
        </article>
    )

}


const CommentCard = ({id, userId, name, avatar, content, postDate, children}) => {
    const assumedUserId = "1"
    const [isReplying, setIsReplying] = useState(false)
    const dispatch = useDispatch()
    function handleDeletePost() {
        dispatch(deleteComment(id))
    }
    return (
        <article className="p-6 mb-6 text-base bg-white rounded-lg dark:bg-gray-700">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                <p className="font-poppins font-medium inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                    <img
                    className="mr-2 w-10 h-10 rounded-full"
                    src={avatar}
                    alt="User Name"
                    />
                    {name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    <time>
                    {postDate}
                    </time>
                </p>
                </div>
                
            </footer>
            <p className="text-gray-500 dark:text-gray-400 font-poppins text-[18px] leading-[32.4px]">
                {content}
            </p>
            <div className="flex flex-row items-center mt-4 space-x-4">
                <button
                type="button"
                className="font-poppins text-[18px] flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                onClick={() => setIsReplying(!isReplying)}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="currentColor" className="bi bi-chat-dots mr-2" viewBox="0 0 16 16">
                    <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                    <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z" />
                </svg>

                Reply
                </button>
                {assumedUserId == userId &&
                    <button
                        type="button"
                        className="font-poppins text-[18px] flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
                        onClick={handleDeletePost}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash mr-2" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>

                    Delete
                    </button>
                }
            </div>
            
            { children?  (children.map((each) => (<CommentChild {...each}/>)) ) : <></>
            }
            { isReplying && <ReplySection userId = {userId} setIsReplying = { setIsReplying }/>}
        </article>  
            
    )
}

export default CommentCard