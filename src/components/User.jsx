import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ME } from "../utils/queries";
import { DELETE_POST, UPDATE_POST } from "../utils/mutations";

export default function User(props) {
    let currentPage = props.currentPage;
    const [updatePoster, setUpdatePoster] = useState("");
    const [updateContent, setUpdateContent] = useState("")

    if (currentPage === "Buy") {
        currentPage = "Sub0";
    } else if (currentPage === "Advertise") {
        currentPage = "Sub1";
    } else if (currentPage === "Discuss") {
        currentPage = "Sub2";
    }

    let { loading, error, data } = useQuery(ME);
    let [deletePost, { loading: deleteLoading }] = useMutation(DELETE_POST)
    let [updatePost, { loading: updateLoading }] = useMutation(UPDATE_POST)
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    async function deleteHandler(e) {
        e.preventDefault();
        try {
            const postId = e.target.id;

            await deletePost({
                variables: { postId },
                update: (cache, { data }) => {
                    // Manually update the cache to remove the deleted post
                    const existingPosts = cache.readQuery({ query: ME });
                    const newPosts = existingPosts.me.posts.filter(post => post._id !== postId);

                    cache.writeQuery({
                        query: ME,
                        data: {
                            me: {
                                ...existingPosts.me,
                                posts: newPosts,
                            },
                        },
                    });
                },
            });
        } catch (err) {
            console.error(err);
        }
    }

    async function updateHandler(e) {
        e.preventDefault();
        console.log("target _id", e.target.id)
        try {
          await updatePost({
            variables: {
              postId: e.target.id,
              content: updateContent,
              poster: updatePoster,
            },
            update: (cache, { data }) => {
              // Manually update the cache to reflect the changes
              const existingPosts = cache.readQuery({ query: ME });
      
              // Find the index of the post to be updated in the existingPosts array
              const updatedPostIndex = existingPosts.me.posts.findIndex(post => post._id === e.target.value);
      
              if (updatedPostIndex !== -1) {
                // If the post is found, update the content and poster fields
                existingPosts.me.posts[updatedPostIndex].content = updateContent;
                existingPosts.me.posts[updatedPostIndex].poster = updatePoster;
      
                // Write the updated data back to the cache
                cache.writeQuery({
                  query: ME,
                  data: {
                    me: {
                      ...existingPosts.me,
                      posts: [...existingPosts.me.posts], // Ensure a new array to trigger reactivity
                    },
                  },
                });
              }
            }
          })
        window.location.reload(true)} catch (err) {
          console.error(err);
        }
      }

    const userPage = true;

    return (
        <>
            <div className="flex flex-row">
                <div>
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 pl-2 text-gray-900">{data.me.username}</h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 pl-2 text-gray-900">{data.me.email}</p>
                    </div>
                    <form>
                        <input
                            id="update-poster"
                            onChange={(e) => setUpdatePoster(e.target.value)}
                            value={updatePoster}
                            placeholder="New Title Here"
                            className="block w-full rounded-md border-4 border-green-800 text-green-600 my-2 mx-1 py-1 px-2 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                        />
                        <textarea
                            id="update-content"
                            onChange={(e) => setUpdateContent(e.target.value)}
                            value={updateContent}
                            placeholder="New Content Here"
                            className="block w-full rounded-md border-4 border-green-800 text-green-600 my-2 mx-1 py-1 px-2 bg-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 sm:text-sm sm:leading-6"
                        />
                    </form>
                    <div className="mt-6 border-t border-black">
                        {data.me.posts.map((item) => {
                            return (
                                <dl key={item._id} className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="xl:text-2xl lg:text-xl font-bold leading-6 text-yellow-500">{item.poster}</dt>

                                        <dd className="mt-1 text-xl font-bold italic leading-6 text-red-600 sm:col-span-2 sm:mt-0">{item.content}</dd>
                                        <div>
                                            <div>
                                                <button id={item._id} onClick={deleteHandler} className="bg-red-700 hover:bg-yellow-400 text-yellow-400 hover:text-red-700 py-2 px-4 border border-yellow-400 hover:border-red-700 rounded ml-1">
                                                    delete
                                                </button>
                                            </div>
                                            <div>
                                                <button id={item._id} onClick={updateHandler} className="bg-green-800 hover:bg-black text-black font-semibold hover:text-green-600 py-2 px-4 border border-black hover:border-green-800 rounded mb-2 ml-1">
                                                    update
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </dl>
                            )
                        })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}