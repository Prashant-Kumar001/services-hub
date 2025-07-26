import React from "react";

interface Params {
  category: string;
}

const page = async ({ params }: { params: Params }) => {
  const { category } = await params;
  console.log(category);
  return <div>services</div>;
};

export default page;
