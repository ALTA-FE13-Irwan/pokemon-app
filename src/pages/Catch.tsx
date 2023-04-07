import { FC, useState, useEffect, FormEvent, ChangeEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import { MdCatchingPokemon } from "react-icons/md";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
  moves: {
    move: {
      name: string;
    };
  }[];
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

const Catch: FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nickName, setNikname] = useState<string>("");
  const [pokeId, setPokeId] = useState<string>("");
  const [pokeName, setPokeName] = useState<string>("");
  const [modalSuccessCatch, setModalSuccessCatch] = useState<boolean>(false);

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
    console.log(event.target.value);
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
    console.log(randomNum);
    if (randomNum === 1) {
      handlePokeId();
      handleName();
      setModalSuccessCatch(true);
    } else {
      alert("missed!!, tyry again");
      setModalSuccessCatch(false);
    }
  };

  const handleSuccessCatch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = { pokeId, pokeName };

    const existingData = localStorage.getItem(nickName);

    if (existingData) {
      alert("Nickname is existed, type different name");
    } else {
      localStorage.setItem(nickName, JSON.stringify(userData));
      setPokeId("");
      setNikname("");
      setPokeName("");
      alert("succes add pokemon to bucket");
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setModalSuccessCatch(false);
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div className="">
        {pokemonData.map((pokemon) => (
          <div key={pokemon.id}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
            />
            <div>{pokemon.name}</div>
          </div>
        ))}
        <div>
          <button
            type="button"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            onClick={() => navigate(`/${id}`)}
          >
            let it go
          </button>

          <button
            type="button"
            className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
            data-hs-overlay="#hs-focus-management-modal"
            onClick={() => {
              handleModalSuccessCatch();
            }}
          >
            Catch
          </button>
        </div>
        {/* modal start */}
        <div></div>
        {/* modal end*/}
        <div>
          {modalSuccessCatch && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-lg px-4 py-3">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-bold">Modal Title</h2>
                    <button
                      className="text-gray-600"
                      onClick={handleCloseModal}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="x w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.348 13.364l-1.414 1.414L10 11.414l-2.93 2.93-1.414-1.414L8.586 10l-2.93-2.93 1.414-1.414L10 8.586l2.93-2.93 1.414 1.414L11.414 10l2.934 2.364z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <form onSubmit={(event) => handleSuccessCatch(event)}>
                    <div className="p-4 overflow-y-auto">
                      <label className="block text-sm font-medium mb-2 text-slat-800">
                        Input Nickname
                      </label>

                      <input
                        type="text"
                        id="input-nickname"
                        className="py-3 px-4 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
                        placeholder=""
                        onChange={handleNickname}
                      />
                    </div>
                    <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                      <button
                        className="mt-2 bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                        onClick={handleCloseModal}
                      >
                        Close Modal
                      </button>
                      <button
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
        {/* modal end*/}
        <div></div>
      </div>
      <button onClick={() => navigate("/list")}>go to lsit pokemon</button>
    </div>
  );
};

export default Catch;
