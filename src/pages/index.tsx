import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {

  // need to create pages that provide the intro
  /*
      page 1 - create an ambition
      page 2 - create a record
      page 3 - view record
      page 4 - S.C.A.L.E. and updating an ambition
      page 5 - create a bond
  */

  const [page, setPage] = useState(0);

  const pageCollection = [
    <PageOne key={0} />,
    <PageTwo key={1} />,
    <PageThree key={2} />,
  ]


  return (
    <>
      <Head>
        <title>project scale mkII</title>
        <meta name="description" content="Create ambitions and grow. Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-slate-900 text-white">
        <div className="grid grid-cols-3 items-center">
        <button 
            className={`bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2`}
            onClick={() => {
                setPage((page === 0) ? 0 : page - 1)
            }}
            >Previous Page</button>
        <p className="text-center">Page {page + 1}</p>
        <button 
            className={`bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2`}
            onClick={() => {
                setPage(
                (page === pageCollection.length - 1) ? page : page + 1)
            }} 
            >Next Page</button>
      </div>
      <div className="border rounded-lg flex flex-row justify-evenly items-center">
        {pageCollection[page]}
      </div>
      </main>
    </>
  );
};

export default Home;

function PageOne() {

  // create an ambition
  return (
    <>
    <ol className="list-decimal">Starting out:
      <li>Click on the menu button and sign-in using your Discord account.</li>
      <li>Go to the user page in the menu.</li>
      <li>Create an ambition.</li>
      <li>Three ambitions to choose from: Lose Weight, Study Subject, Perform Activity.</li>
      <li>You can create up to 24 ambitions.</li>
    </ol>
    </>
  )
}

function PageTwo() {

  //
  return (
    <>
    <ol className="list-decimal">Daily Use:
      <li>At the user page, you can view your created ambitions.</li>
      <li> </li>
      <li></li>
      <li></li>
      <li></li>
    </ol>
    </>
  )
}

function PageThree() {

  return (
    <>
    Page 3
    </>
  )
}