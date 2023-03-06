import { useState } from "react";
import Typewriter from "typewriter-effect";
import Header from '../components/Header'
/**
 * Homepage
 * @returns {JSX.Element}
 */
export default function Home() {
  const [url, setUrl] = useState("");
  const [message, setMessage] = useState("");

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    const {
      url: { value = "" },
    } = event.target;
    if (value) {
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
      setMessage(data);
    }
  };

  return (
    <div>
         <Header/>
        <div className="min-h-screen flex justify-center">
          <div className="p-4 md:p-10 mt-32 ">
            <h1 className="title font-bold text-center text-4xl md:text-6xl mb-8">
              What the Website ?
            </h1>
            <h2 className="font-light text-gray-50  text-center text-xl md:px-2 md:max-w-[50%] md:mx-auto md:text-3xl mb-10 md:mb-24">
             Get quick insight of the website you are looking for using ai.
             No more complicated landing pages to go through to figure out what they do.
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
                className="bg-transparent border text-white font-light rounded-lg p-2 pl-10 w-full pr-24 py-4"
                type="text"
                placeholder="https://www.google.com"
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
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
            <div className="md:w-[500px] m-auto py-4 my-4 text-white ">
              {message ? (
                <Typewriter
                options={{
                    strings: message,
                    autoStart: true,
                    delay: 90
                  }}
                />
              ) : null}
            </div>
          </div>
        </div>
    </div>
  );
}
