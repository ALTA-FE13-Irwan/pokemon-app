import { FC, useState, useEffect } from "react";
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

const DetailPokemon: FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nickName, setNikname] = useState<string>("");
  const [pokeId, setPokeId] = useState<number>();

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getPokemonData();
  }, []);

  const { id } = params;
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

  // function handleNickname(event) {
  //   setNikname(event.target.value);
  // }

  const handleCatch = () => {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Detail Page</h1>
      <div className="">
        {pokemonData.map((pokemon) => (
          <div key={pokemon.id}>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
              alt={pokemon.name}
            />
            <div>{pokemon.name}</div>
            <div>Height: {pokemon.height}</div>
            <div>Weight: {pokemon.weight}</div>
            <div>
              Types:
              {pokemon.types.map((type) => (
                <span key={type.type.name}>{type.type.name} </span>
              ))}
            </div>
            <div>
              Abilities:
              {pokemon.abilities.map((ability) => (
                <span key={ability.ability.name}>{ability.ability.name} </span>
              ))}
            </div>
            <div>
              Moves:
              {pokemon.moves.slice(0, 5).map((move) => (
                <span key={move.move.name}>{move.move.name} </span>
              ))}
            </div>
            <div>
              State:
              {pokemon.stats.map((stat) => (
                <span key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}{" "}
                </span>
              ))}
            </div>
            <div>
              <button
                type="button"
                className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                onClick={() => navigate("/")}
              >
                back to home
              </button>

              <button
                type="button"
                className=" ml-2 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-500 text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800"
                data-hs-overlay="#hs-vertically-centered-modal"
                onClick={() => navigate(`/${pokemon.id}/${pokemon.name}`)}
              >
                Catch the pokemon
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")}>go to home</button>
      <button onClick={() => navigate("/list")}>go to lsit pokemon</button>
    </div>
  );
};

export default DetailPokemon;
