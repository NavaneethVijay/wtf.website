export default function Faq() {
  return (
    <>
      <div className="px-4 py-2 text-left  font-bold">
        <span className="text-3xl">How does it work?</span>
        <p className="pb-2 mt-2 font-light text-white opacity-80">
          Uses the OpenAI GPT-3 Model
        </p>
      </div>
      <div className="px-4 py-2 text-left  font-bold">
        <span className="text-3xl">Is it free to use ?</span>
        <p className="pb-2 mt-2 font-light text-white opacity-80">
          As long as the OpenAI GPT-3 Models and its API is free to use, This website
          also remains completely free to use.
        </p>
      </div>
      <div className="px-4 py-2 text-left  font-bold">
        <span className="text-3xl">Is the generation always correct ?</span>
        <p className="pb-2 mt-2 font-light text-white opacity-80">
          Despite GPT-3 is currently the state-of-the-art Natural Language
          Processing tool available, its results could be inaccurate.
        </p>
      </div>
    </>
  );
}
