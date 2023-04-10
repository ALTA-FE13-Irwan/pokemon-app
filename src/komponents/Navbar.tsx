import { useNavigate } from "react-router-dom";
import { FC } from "react";

export const Navbar: FC = () => {
  const navigate = useNavigate();

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-sky-600 text-sm py-7 md:py-8 shadow-lg shadow-slate-900 mb-5">
      <nav
        className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <button
            className="flex-none text-2xl font-bold text-sky-200  shadow-sky-50 antialiased p-3 md:p-5 rounded-full hover:bg-sky-500 invisible md:visible"
            onClick={() => navigate("/")}
          >
            Pokemon App
          </button>
          <div className="sm:hidden">
            <button
              type="button"
              className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border border-white/[.25] font-medium bg-sky-500 text-white shadow-sm align-middle hover:bg-white/[.15] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white transition-all text-sm"
              data-hs-collapse="#navbar-primary"
              aria-controls="navbar-primary"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                />
              </svg>
              <svg
                className="hs-collapse-open:block hidden w-4 h-4"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-primary"
          className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
        >
          <div className="flex flex-col gap-5 mt-5 md:flex-row md:items-center md:justify-center md:mt-0 md:pl-5">
            <button
              className="font-medium text-lg mx-3 text-sky-50 bg-sky-700 px-10 py-3 rounded-full hover:bg-sky-400 hover:text-xl"
              onClick={() => navigate("/")}
            >
              Back To Home
            </button>
            <button
              className="font-medium text-sky-50 text-lg mx-3 hover:text-white bg-sky-700 px-10 py-3 rounded-full hover:bg-sky-400 hover:text-xl"
              onClick={() => navigate("/list")}
            >
              Catch List Pokemon
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
