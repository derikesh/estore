import React from 'react';

async function fetchData() {
  'use server'
  const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/product`, {
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
        {data?.map( (item:any )=> (<div>{item.name}_{item._id} : {item.price} </div>) )}
      </div>
    </div>
  );
};

export default Page;