import {
  FC,
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  CSSProperties,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import Swal from "sweetalert2";
import axios from "axios";

import { Pokemon } from "../utils/user";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const Catch: FC = () => {
  const [modalSuccessCatch, setModalSuccessCatch] = useState<boolean>(false);
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [pokeName, setPokeName] = useState<string>("");
  const [nickName, setNikname] = useState<string>("");
  const [pokeId, setPokeId] = useState<string>("");
  const [color, setColor] = useState("#ffffff");

  const params = useParams<{ id: string; name: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    getPokemonData();
  }, []);

  const { id, name } = params;

  const getPokemonData = () => {
    axios
      .get(`/${id}`)
      .then((response) => {
        const { data } = response;
        setPokemonData([data]);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setNikname(event.target.value);
  };

  const handleName = () => {
    if (name !== undefined) {
      setPokeName(name);
    }
  };

  const handlePokeId = () => {
    if (id !== undefined) {
      setPokeId(id);
    }
  };

  const handleModalSuccessCatch = () => {
    const randomNum = Math.floor(Math.random() * 2);
    if (randomNum === 1) {
      handlePokeId();
      handleName();
      setModalSuccessCatch(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...Missed!",
        text: " Try to catch me again !!!??",
      }).then((result) => {
        if (result.isConfirmed) {
          setModalSuccessCatch(false);
        }
      });
    }
  };

  const handleSuccessCatch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = { pokeId, pokeName };

    console.log(nickName);

    if (nickName) {
      const existingData = localStorage.getItem(nickName);
      if (existingData) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: " Nickname is existed, type different name",
        });
      } else {
        localStorage.setItem(nickName, JSON.stringify(userData));
        setPokeId("");
        setNikname("");
        setPokeName("");
        Swal.fire({
          icon: "success",
          title: "Good Job !!!",
          text: " Success put pokemon to bucket",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: " Nickname cannot empty",
      });
    }
  };

  return (
    <div className="h-screen md:h-screen bg-[url('/background.jpg')]  bg-cover bg-center flex flex-col justify-between p-2">
      {loading ? (
        <div className="h-screen">
          <PacmanLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div>
          {pokemonData.map((pokemon) => (
            <div className="flex flex-col justify-between">
              <div className="flex flex-col md:flex-row justify-around pt-5 md:pt-10">
                <button
                  className="font-medium text-lg text-sky-50 bg-sky-700 border-b-8 border-r-8 border-rose-400 px-10 py-5 my-2 mx-5 md:mx-0 rounded-full hover:bg-sky-400 hover:text-xl md:w-[30%]"
                  onClick={() => navigate("/")}
                >
                  Back To Home
                </button>
                <button
                  className="font-medium text-lg text-sky-50 bg-sky-700 border-b-8 border-r-8 border-rose-400 px-10 py-5 my-2 mx-5 md:mx-0 rounded-full hover:bg-sky-400 hover:text-xl md:w-[30%]"
                  onClick={() => navigate("/list")}
                >
                  Catch List Pokemon
                </button>
              </div>

              <div
                key={pokemon.id}
                className="flex  justify-center content-center items-center pt-36 md:pt-48"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                  alt={pokemon.name}
                  className=" w-32 h-32 md:w-56 md:h-56 hover:scale-105 duration-500 animate-bounce"
                />
              </div>

              <div className="flex flex-row justify-around md:gap-10 pt-28 md:pt-44 mb:pb-10">
                <div className=" flex px-5 md:px-48 py-4 bg-amber-600 rounded-full  border-b-8 border-r-8 md:text-2xl font-bold text-sky-50 justify-center text-center hover:scale-105 duration-500 hover:text-lg md:hover:text-xl xl:hover:text-2xl">
                  {pokemon.name}
                </div>
                <div className="grid grid-cols-2 gap-2 mx-2 md:mx-10 md:gap-10">
                  <button
                    type="button"
                    className=" px-5 py-4 bg-sky-700 rounded-full  border-b-8 border-r-8 md:text-2xl font-bold text-sky-50 justify-center text-center hover:scale-105 duration-500 hover:text-lg md:hover:text-xl xl:hover:text-2xl"
                    onClick={() => navigate(`/${id}`)}
                  >
                    let it go
                  </button>

                  <button
                    type="button"
                    className="py-4 bg-sky-700 rounded-full  border-b-8 border-r-8 md:text-2xl font-bold text-sky-50 justify-center text-center hover:scale-105 duration-500 hover:text-lg md:hover:text-xl xl:hover:text-2xl"
                    data-hs-overlay="#hs-focus-management-modal"
                    onClick={() => {
                      handleModalSuccessCatch();
                    }}
                  >
                    Catch
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* modal */}
      <div>
        {modalSuccessCatch && (
          <div className="fixed inset-0 bg-sky-500 bg-opacity-75 transition-opacity">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-sky-100 rounded-yes px-4 py-3 md:flex  ">
                <div className="flex justify-center items-center mb-3 ">
                  <h2 className="text-6xl font-bold text-sky-900 mx-4 my-5 ">
                    Oh no, you catch me !!
                  </h2>
                </div>
                <form
                  onSubmit={(event) => handleSuccessCatch(event)}
                  className="bg-sky-400 rounded-yes"
                >
                  <div className="p-4 overflow-y-auto">
                    <label className="text-2xl font-semibold mb-2 text-sky-900 ">
                      Input Nickname
                    </label>

                    <input
                      type="text"
                      id="input-nickname"
                      className="py-3 px-4 block w-full border-sky-200 rounded-md focus:border-sky-500 focus:ring-sky-500 text-xl text-sky-950 my-5"
                      placeholder=""
                      onChange={handleNickname}
                    />
                  </div>
                  <div className="flex justify-center items-center gap-x-2 py-3 px-4 border-t ">
                    <button
                      className="mt-2 bg-violet-500 hover:bg-violet-400 text-white font-bold py-2 px-4 rounded-yes hover:scale-105 duration-500"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      To Home
                    </button>
                    <button
                      className="mt-2 bg-teal-700 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-yes  hover:scale-105 duration-500"
                      onClick={() => setModalSuccessCatch(false)}
                    >
                      To Catch
                    </button>
                    <button
                      className="mt-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-yes  hover:scale-105 duration-500"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catch;
