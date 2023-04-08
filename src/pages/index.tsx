import { FC, useState, useEffect, CSSProperties } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import { useNavigate } from "react-router-dom";
import { Layout } from "../komponents/Layout";
import Swal from "sweetalert2";
import axios from "axios";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

import { Pokemon } from "../utils/user";

const Home: FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState("#ffffff");

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

  return (
    <Layout>
      <div>
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
          <div className="grid gap-5 md:gap-10 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {pokemonData.map((pokemon) => (
              <div className=" text-center items-center  bg-sky-600 hover:bg-sky-300 bg-opacity-20 rounded-t-full rounded-b-lg hover:scale-105">
                <div
                  key={pokemon.id}
                  className="flex flex-col align-middle w-full aspect-square"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                    alt={pokemon.name}
                    className="w-full aspect-square"
                  />
                  <div className="text-sky-50 font-semibold py-5 text-2xl md:text-3xl capitalize">
                    {pokemon.name}
                  </div>

                  <button
                    type="button"
                    className=" antialiased py-3 md:py-5 px-4 inline-flex justify-center items-center font-bold bg-sky-500 text-sky-950 hover:bg-sky-600 transition-all text-lg md:text-2xl capitalize"
                    onClick={() => navigate(`/${pokemon.id}`)}
                  >
                    detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
