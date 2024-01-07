import React from "react";
import { useQuery } from "@apollo/client";
import { SUB_INFO } from "../utils/queries";
import PostCreater from "./PostCreater";

export default function Sub0(props) {
    let currentPage = props.currentPage;
    if (currentPage === "Buy") {
        currentPage = "Sub0";
    } else if (currentPage === "Advertise") {
        currentPage = "Sub1";
    } else if (currentPage === "Discuss") {
        currentPage = "Sub2";
    }

    const { loading, error, data } = useQuery(SUB_INFO);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const usersPosted = data.allUsers.filter((item) => item.posts.length !== 0);
    const onlySub1 = [];
    for (let i = 0; i < usersPosted.length; i++) {
        for (let j = 0; j < usersPosted[i].posts.length; j++) {
            if (usersPosted[i].posts[j].subFrm === "Sub1") {
                onlySub1.push(usersPosted[i].posts[j]);
            }
        }
    }
    console.log("onlySub1", onlySub1)

    return (
        <>
            <div className="flex-zone">
                <div>
                    <div>
                        <div className="my-3 border-2 p-2 border-green-800 ml-5">
                            {onlySub1.map((item) => {
                                console.log(item);
                                return (
                                    <dl key={item._id} className="divide-y divide-black border-2 border-green-800 p-green-800">
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-2xl font-bold leading-6 text-yellow-500">{item.poster}</dt>
                                            <dd className="mt-1 text-base italic leading-6 text-red-600 sm:col-span-2 sm:mt-0">{item.content}</dd>
                                        </div>
                                    </dl>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
                <div className="creater-container">
                    <PostCreater className="mb-5" currentPage={currentPage} />
                    <div className="flex justify-center">
                        <div>
                            <div className="mb-4"></div>
                            <h3>Advertisement Forum</h3>
                            <p className="subsection-info">This subsection is all about posting advertising your services!</p>
                        </div>
                        <div>
                            <h3>Rules:</h3>
                            <ul>
                                <li>No personal information aside from exchanging emails</li>
                                <li>No direct transactions should take place here</li>
                                <li>No vulgarity</li>
                                <li>No sexual related items</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}