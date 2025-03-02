import React from 'react';
import { baseUrl } from '@/src/config/baseUrl';

async function fetchData() {
  'use server'
  const result = await fetch(`${baseUrl}/product`, {
    cache: 'no-store', // Ensures fresh data on every request
  });
  if (!result.ok) {
    console.log("Failed to fetch");
    return null;
  }
  const data = await result.json();
  return data.data;
}

const Page = async () => {
  const data = await fetchData();

  return (
    <div>
      <div>
        This is heading
      </div>
      <div>
        {/* {data ? JSON.stringify(data) : "No data available"} */}
      </div>
      <div>
        {data?.map( (item:any )=> (<div key={item._id} >{item.name}_{item._id} : {item.price} </div>) )}
      </div>
    </div>
  );
};

export default Page;