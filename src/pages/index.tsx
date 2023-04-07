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
    <PageFour key={3} />
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
      <div className="border rounded-lg flex flex-wrap justify-center items-center">
        {pageCollection[page]}
      </div>
      </main>
    </>
  );
};

export default Home;

function PageOne() {

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

  return (
    <>
    <ul className="list-disc">Daily Use:
      <li>At the user page, you can view your created ambitions.</li>
      <li>When viewing an ambition you can create a record to track your progress.</li>
      <li>Records can only be created once per day.</li>
      <li>View records will display a line chart of your records.</li>
      <li>View growth will display data depending on the ambition you are on.</li>
    </ul>
    </>
  )
}

function PageThree() {

  return (
    <>
    <ul className="list-disc ml-8">Engaging with others:
      <li>To share your ambitions with others, you can form a bond with them by creating a bond.</li>
      <li>Go to create bond to find how to create a bond.</li>
      <li>You can create a bond with up to 7 other people for one ambition.</li>
      <li>Viewing bonds will display a line chart containing the records from your ambition and the ambitions of the others.</li>
      <li>Viewing bonds will display the ambition of each person you have bonded with, their targeted value and the most recent record they have made.</li>
    </ul>
    </>
  )
}

function PageFour() {

  return (
    <>
    <ul className="list-disc ml-8">Example using S.C.A.L.E. (Small Changes Accumulate Large Effects):
      <li>A person wants to lose 20kg, they start small by losing 5kg.</li>
      <li>They create an ambition (Lose Weight) to lose 5kg.</li>
      <li>They create another ambition (Study Subject) to study long-term diets and exercises.</li>
      <li>They then create an ambition (Perform Activity) to keep track of how long they exercise or track how long it takes to cook and eat food.</li>
      <li>After a period of time they lose 5kg, they can then update their lose weight ambition to change the target weight to 10kg less from where they started and make any updates to their daily plan.</li>
      <li>They then repeat changing the amount of weight to lose until they reach their overall goal of losing 20kg. The long-term goal was broken down into multiple short-term goals to manage the outcome more easily.</li>
      <li>This example was the most ideal outcome that it may not match your experience.</li>
    </ul>
    </>
  )
}