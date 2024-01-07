import { useQuery } from "@apollo/client";
import { ME } from "../utils/queries";
import React from "react";


export default function PostTable(props) {

  const { loading, error, data } = useQuery(ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) console.log("me data", data);

  console.log("tester", data);
    return (
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">{data.me.username}</h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">{data.me.email}</p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          {data.me.posts.map((item) => {
            return (
              <dl key={item._id} className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">{item.poster}</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{item.content}</dd>
                </div>
              </dl>
            )
          })
          }
        </div>
      </div>
    )
  
}