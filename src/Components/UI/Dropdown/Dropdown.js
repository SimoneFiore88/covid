import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dropdown({ regions }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        className="absolute top-4 right-2 cursor-pointer "
        onClick={() => setOpen(!open)}
      >
        <span className=" ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-list"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </span>
      </div>
      <div className="w-48 absolute top-10 right-2  z-50 ">
        <div
          className={
            "  px-4 py-2 rounded-md shadow-xl backdrop-filter backdrop-blur-xl border border-gray-500 " +
            (!open ? "hidden" : "")
          }
        >
          <div className="h-48 overflow-scroll" onClick={() => setOpen(false)}>
            <ul>
              <Link to="/">Nazionale</Link>
              {regions &&
                regions.map((el) => {
                  return (
                    <li key={el}>
                      <Link to={`/region/${el}`}>{el}</Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
