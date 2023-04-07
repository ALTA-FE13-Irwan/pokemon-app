import { FC, useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

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
}

const Home: FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [pokemonImage, setPokemonImage] = useState<string>(``);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    getPokemonData();
  }, []);

  const getPokemonData = () => {
    axios
      .get("")
      .then((response) => {
        const { data } = response;
        const promises = data.results.map((result: any) =>
          axios.get(result.url)
        );
        Promise.all(promises).then((responses) => {
          const pokemonData = responses.map((response) => response.data);
          setPokemonData(pokemonData);
        });
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div className="grid gap-5 grid-cols-2 md:grid-cols-4 xl:grid-cols-6 ">
        {pokemonData.map((pokemon) => (
          <div className="bg-slate-400 text-center items-center flex flex-col ">
            <div key={pokemon.id} className="flex align-middle">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                alt={pokemon.name}
              />
            </div>
            <div>
              <div>{pokemon.name}</div>
              <div>
                <strong>Types:</strong>{" "}
                {pokemon.types.map((type) => type.type.name).join(", ")}
              </div>
            </div>
            <div>
              <button
                type="button"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                onClick={() => navigate(`/${pokemon.id}`)}
              >
                detail
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/list")}>go to lsit pokemon</button>
    </div>
  );
};

export default Home;
