import { NextPage } from "next";

// components
import Layout from "components/App/Layout";
import Link from "next/link";

const Page: NextPage = (props) => {
  return (
    <Layout>
      <div className="flex flex-col items-center mt-48">
        <h1 className="text-4xl font-bold capitalize my-4">page not found</h1>
        <Link href="/" className="text-lg capitalize text-blue-500 underline">
          return back to home page
        </Link>
      </div>
    </Layout>
  );
};

export default Page;
