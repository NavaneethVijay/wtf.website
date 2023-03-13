'use client'

import { useState } from "react";
import Typewriter from "typewriter-effect";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Faq from "../components/Faq/index";
import Head from "next/head";

/**
 * Homepage
 * @returns {JSX.Element}
 */
export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [message, setMessage] = useState("");

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const {
      url: { value = "" },
    } = event.target;

    if (value) {
      setIsLoading(true);
      setMessage("");
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: value,
        }),
      }).catch(() => {
        setHasError(true);
        setIsLoading(false);
        setMessage("");
      });

      const { data, url } = await response.json();
      setIsLoading(false);
      setMessage(data);
    }
  };

  return (
    <div>
      <Head>
        <title>What the Website ?</title>
        <meta name="title" content="What the website?" />
        <meta
          name="description"
          content="Get quick insight of the website you are looking for using open.ai"
        />
        <meta name="keywords" content="open ai, website summary" />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="What the website?" />
        <meta
          property="og:description"
          content="Get quick insight of the website you are looking for using open.ai"
        />
        <meta property="og:image" content="/og-image.png" />
      </Head>
      <Header />
      <div className="min-h-screen flex justify-center">
        <div className="p-4 md:p-10 mt-32 w-full">
          <h1 className="title mx-auto max-w-5xl text-center text-4xl font-bold sm:text-7xl mb-4 md:mb-10">
            What the Website ?
          </h1>
          <h2 className="font-light text-gray-50  text-center text-xl md:px-2 md:mx-auto md:text-3xl mb-10 md:mb-24">
            Summarize any website with
            <strong> AI</strong>. <br />
          </h2>
          <form
            onSubmit={onsubmitHandler}
            className="flex justify-center m-auto relative md:w-[700px]"
          >
            <div className="absolute left-[0.5rem] top-[4.3rem] md:top-[4.5rem] text-amber-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path
                  fillRule="evenodd"
                  d="M19.902 4.098a3.75 3.75 0 00-5.304 0l-4.5 4.5a3.75 3.75 0 001.035 6.037.75.75 0 01-.646 1.353 5.25 5.25 0 01-1.449-8.45l4.5-4.5a5.25 5.25 0 117.424 7.424l-1.757 1.757a.75.75 0 11-1.06-1.06l1.757-1.757a3.75 3.75 0 000-5.304zm-7.389 4.267a.75.75 0 011-.353 5.25 5.25 0 011.449 8.45l-4.5 4.5a5.25 5.25 0 11-7.424-7.424l1.757-1.757a.75.75 0 111.06 1.06l-1.757 1.757a3.75 3.75 0 105.304 5.304l4.5-4.5a3.75 3.75 0 00-1.035-6.037.75.75 0 01-.354-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="w-full">
              <label className="mb-6 block text-center text-lg text-gray-500 sm:text-2xl">
                Copy and paste any website link below
              </label>
              <input
                name="url"
                value={url}
                className="bg-black border text-white font-light rounded-lg p-2 pl-10 w-full pr-24 py-4"
                type="text"
                placeholder="www.google.com"
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              disabled={isLoading}
              className="bg-gradient-to-br from-green-500 to-blue-400 hover:bg-gradient-to-bl pl-3 pr-4 py-2 text-amber-50 rounded-lg absolute right-[0.7rem] md:right-[0.8rem] top-[3.8rem] md:top-16 flex gap-2 cursor-pointer"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M8.25 10.875a2.625 2.625 0 115.25 0 2.625 2.625 0 01-5.25 0z" />
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.125 4.5a4.125 4.125 0 102.338 7.524l2.007 2.006a.75.75 0 101.06-1.06l-2.006-2.007a4.125 4.125 0 00-3.399-6.463z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Explain Me</span>
            </button>
          </form>
          {renderErrorMessage(hasError)}
          <div className="container m-auto py-4 my-4 text-white min-h-[200px] md:h-[400px] overflow-hidden">
            {getLoader(isLoading)}
            {!isLoading && message ? (
              <div className="text-lg leading-7 col-span-3 mx-auto max-w-3xl px-4">
                <Typewriter
                  options={{
                    strings: message,
                    autoStart: true,
                    delay: 20,
                  }}
                />
              </div>
            ) : null}
          </div>
          <div className="text-white max-w-3xl mx-auto my-20">
            <Faq />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

/**
 *
 * @param {*} hasError
 * @returns
 */
function renderErrorMessage(hasError) {
  if (hasError) {
    return (
      <div>
        <p className="text-red-500 text-center mt-2">
          Oops! something wrong while thinking, please try again !
        </p>
      </div>
    );
  }
}

/**
 *
 * @param {*} isLoading
 * @returns
 */
function getLoader(isLoading) {
  if (isLoading) {
    return (
      <div className="flex justify-center">
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}
