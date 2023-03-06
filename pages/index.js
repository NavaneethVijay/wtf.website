import { useState } from "react";
import Typewriter from "typewriter-effect";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Head from "next/head";

/**
 * Homepage
 * @returns {JSX.Element}
 */
export default function Home() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseUrl, setResponseUrl] = useState("");
  const [message, setMessage] = useState("");

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const {
      url: { value = "" },
    } = event.target;
    if (value) {
      setIsLoading(true);
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: value,
        }),
      });
      const { data, url } = await response.json();
      const previewResponse = await fetch(`/api/preview?url=${url}`);
      const { image, title, description, name } = await previewResponse.json();
      const responseMeta = {
        image,
        title,
        description,
        name,
        url,
      };
      setIsLoading(false);
      setMessage(data);
      setResponseUrl(responseMeta);
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
        <meta property="og:description" content="Get quick insight of the website you are looking for using open.ai" />
        <meta property="og:image" content="/og-image.png" />
      </Head>
      <Header />
      <div className="min-h-screen flex justify-center">
        <div className="p-4 md:p-10 mt-32 ">
          <h1 className="title font-bold text-center text-4xl md:text-6xl mb-8">
            What the Website ?
          </h1>
          <h2 className="font-light text-gray-50  text-center text-xl md:px-2 md:mx-auto md:text-3xl mb-10 md:mb-24">
            Get quick insight of the website you are looking for using
            <strong>ai</strong>. <br /> No more confusing landing pages !
          </h2>
          <form
            onSubmit={onsubmitHandler}
            className="flex justify-center m-auto relative md:w-[500px]"
          >
            <div className="absolute top-4 left-2 text-amber-800">
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
            <input
              name="url"
              value={url}
              className="bg-black border text-white font-light rounded-lg p-2 pl-10 w-full pr-24 py-4"
              type="text"
              placeholder="www.google.com"
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              disabled={isLoading}
              className="bg-gradient-to-br from-green-500 to-blue-400 hover:bg-gradient-to-bl pl-3 pr-4 py-2 text-amber-50 rounded-lg absolute right-2 top-2 flex gap-2 cursor-pointer"
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
          <div className="container m-auto py-4 my-4 text-white ">
            {getLoader(isLoading)}
            {message ? (
              <div className="flex flex-col md:grid md:grid-cols-6 gap-4">
                <div className="border p-2 rounded-lg col-span-2">
                  <img src={responseUrl.image} className="mb-4 w-full" />
                  <h3 className="text-xl font-bold tracking-tight mb-2">
                    {responseUrl.title}
                  </h3>
                  <p className="font-light mb-4">{responseUrl.description}</p>
                  <a
                    className="flex items-end text-orange-200 gap-1 mb-2"
                    href={responseUrl.url}
                    target="_blank"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15.75 2.25H21a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0V4.81L8.03 17.03a.75.75 0 01-1.06-1.06L19.19 3.75h-3.44a.75.75 0 010-1.5zm-10.5 4.5a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V10.5a.75.75 0 011.5 0v8.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V8.25a3 3 0 013-3h8.25a.75.75 0 010 1.5H5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Visit them</span>
                  </a>
                </div>
                <div className="text-lg col-span-3">
                  <Typewriter
                    options={{
                      strings: message,
                      autoStart: true,
                      delay: 90,
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

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
