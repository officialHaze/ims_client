import React from "react";
import { IoMdCloseCircle } from "react-icons/io";

interface Props {
  error: string[];
  heading: string;
}

export default function ErrorModal({ error, heading }: Props) {
  //   console.log(error);

  return (
    <div id="modal-wrapper" className="rounded-xl overflow-hidden w-1/2 shadow-xl">
      <header
        id="modal-header"
        className="header bg-red-500 text-left py-3 px-4 text-xl font-bold text-white flex items-center justify-between"
      >
        {heading}
        <span>
          <IoMdCloseCircle id="close" className="text-2xl cursor-pointer" />
        </span>
      </header>
      <section id="modal-body" className="bg-white py-4 px-6">
        <h3 className="text-left text-lg font-bold">
          These errors were found while performing the task:{" "}
        </h3>
        <div className="flex items-center justify-start gap-2 flex-wrap">
          {error.map((err, i) => (
            <p key={i} className="p-2 text-lg font-semibold">
              {err}
            </p>
          ))}
        </div>
      </section>
      <footer id="modal-footer" className="p-4 bg-white flex items-center justify-center gap-4">
        <h3 className="text-lg font-bold">Kindly rectify these errors and try again.</h3>
        <button id="close-btn" className="p-4 rounded-lg bg-yellow-400 font-bold hover:opacity-80">
          I, Understand
        </button>
      </footer>
    </div>
  );
}
