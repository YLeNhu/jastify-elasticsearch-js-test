import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Skeleton } from "../../components";
const BookTable = () => {
    const myBook = useSelector((state) => state.bookstore.myBook);
    const loading = useSelector((state) => state.bookstore.loading)
    return (
        <>
            {loading 
            
            ? 
                <Skeleton/> 
            : 

            <section className="rounded-md p-6 text-center shadow-lg md:p-5 md:text-left" style={{backgroundImage: 'url(https://tecdn.b-cdn.net/img/Photos/Others/background2.jpg)'}}>
                <div className="flex justify-center">
                    <div className="max-w-5xl">
                    <div className="m-4 block rounded-lg bg-white p-6 shadow-lg dark:bg-neutral-800 dark:shadow-black/20">
                        <div className="md:flex md:flex-row">
                        <div className="mx-auto mb-6 flex w-36 items-center justify-center md:mx-0 md:w-96 lg:mb-0">
                            <img src="https://cdn.penguin.com.au/covers/original/9781784752637.jpg" className="rounded-sm shadow-md dark:shadow-black/30" alt="woman avatar" />
                        </div>
                        <div className="md:ml-6">
                            <p className="mb-2 text-xl font-bold font-poppins text-[30px] text-neutral-800 dark:text-neutral-200">
                            {myBook.title}
                            </p>
                            <p className="mb-3 font-poppins  font-medium text-[20px] text-neutral-500 dark:text-neutral-300">
                            {myBook.author}
                            </p>
                            <p className="mb-5  font-poppins font-light text-neutral-500 dark:text-neutral-400">
                            Publish Date: {myBook.publishedDate}
                            </p>
                            <p className="font-poppins italic font-normal text-[18px] leading-[32.4px] text-white my-10">
                            " {myBook.description} "
                            </p>
                            <p className="p-3 text-gray-900 w-20 text-center font-poppins font-medium bg-green-500 rounded-lg">
                                ${myBook.price}
                            </p>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
            }
        </>

    )
}

export default BookTable