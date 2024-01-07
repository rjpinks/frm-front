import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../utils/mutations";

export default function PostCreater(props) {
    console.log("props.currentPage", props.currentPage)

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    let [createPost, { error }] = useMutation(ADD_POST)

    async function crtPostHandler(e) {
        e.preventDefault();
        try {
            let data = await createPost({
                variables: {
                    poster: title,
                    content: content,
                    subFrm: props.currentPage
                }
            })
            setTitle("");
            setContent("");
            alert("New Post made");
            window.location.reload(true)
        } catch (err) {
            console.error(err);
        }
    }

    function titleSelect() {
        return (
            <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-green-800">
                {props.userPage ? "Update Post" : "Create Post"}
            </h2>
        )
    }

    function btnSelect() {
        return (
            <div>
                {!props.userPage ? 
                <div>
                    <button
                        onClick={crtPostHandler}
                        type="submit"
                        className="flex w-full justify-center rounded-md border-4 border-red-800 bg-yellow-400 px-3 py-1.5 text-sm font-semibold leading-6 text-red-800 shadow-sm hover:text-red-600 hover:bg-orange-600 hover:border-yellow-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit
                    </button>
                </div> : ""}
            </div>
        )
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-0 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    {titleSelect()}
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-green-800">
                                Title:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    name="title"
                                    type="title"
                                    autoComplete="title"
                                    required
                                    className="block w-full rounded-md border-4 border-green-800 text-green-600 py-1 px-2 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium leading-6 text-green-800 ">
                                Content:
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="content"
                                    name="content"
                                    type="text"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    autoComplete="current-content"
                                    required
                                    className="h-96 w-full border-4 border-green-800 break-normal whitespace-pre-wrap text-green-600 bg-gray-800 break-normal rounded-md py-2 px-2 <pt-5></pt-5> shadow-sm ring-1 ring-inset ring-gray-300 leading-10 break-normal"
                                />
                            </div>
                        </div>
                        {btnSelect()}
                    </form>
                </div>
            </div>
        </>
    )
}
