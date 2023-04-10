import { FC, useState, useEffect, CSSProperties } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";
import { Layout } from "../komponents/Layout";
import Swal from "sweetalert2";
import axios from "axios";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

import { Pokemon } from "../utils/user";

const DetailPokemon: FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState("#ffffff");

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

  return (
    <Layout>
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
            <div className="h-full ">
              <div key={pokemon.id} className=" grid grid-cols-1">
                <div className="grid grid-cols-2 bg-sky-700 bg-opacity-50 rounded-yes ">
                  <div className=" flex flex-col justify-center text-center p-5 ">
                    <div className="flex justify-center">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                        alt={pokemon.name}
                        className="w-96"
                      />
                    </div>
                    <div>
                      <div className="text-sky-100 font-extrabold text-2xl md:text-5xl mt-4 md:mt-10">
                        {pokemon.name}
                      </div>
                      <div className="grid md:grid-cols-2 ">
                        <div className=" py-5 md:py-10 px-2">
                          <div className="py-1 px-10  border-b-4 border-sky-50 rounded-full mb-3 md:mb-5 drop-shadow-lg shadow-sky-50 text-sky-50 md:text-2xl font-bold">
                            Volume
                          </div>
                          <div className="grid grid-flow-col auto-cols gap-2">
                            <div className="py-4 bg-sky-500 rounded-full  border-b-8 border-r-8 md:text-2xl font-bold text-sky-50 ">
                              H: {pokemon.height}
                            </div>
                            <div className="py-4 bg-sky-500 rounded-full  border-b-8 border-r-8 md:text-2xl font-bold text-sky-50">
                              W: {pokemon.weight}
                            </div>
                          </div>
                        </div>
                        <div className="py-5 md:py-10 px-2">
                          <div className="py-1 px-10  border-b-4 border-sky-50 rounded-full mb-3 md:mb-5 drop-shadow-lg shadow-sky-50 text-sky-50 md:text-2xl font-bold">
                            Type
                          </div>
                          <div className="grid md:grid-flow-col auto-cols gap-2">
                            {pokemon.types.map((type) => (
                              <div className="py-4 bg-sky-500 rounded-full  border-b-8 border-r-8 md:text-2xl font-bold text-sky-50 ">
                                <span key={type.type.name}>
                                  {type.type.name}{" "}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="bg-sky-500 rounded-yes m-3 md:m-5 px-2 pt-5 md:px-10 md:py-8">
                    <div className="py-1 px-10 text-center  border-b-4 border-sky-50 rounded-full mb-3 md:mb-5 drop-shadow-lg shadow-sky-50 text-sky-50 md:text-2xl font-bold">
                      State
                    </div>

                    {pokemon.stats.map((stat) => (
                      <div
                        key={stat.stat.name}
                        className="rounded-full flex flex-col"
                      >
                        <div className=" md:text-xl font-semibold text-sky-50 mt-2 mb-1">
                          {stat.stat.name}
                        </div>
                        <div className="z-10 h-8 md:h-12 rounded-full">
                          <div
                            className="z-20 h-full rounded-full bg-sky-200 flex items-center lg:justify-end lg:pr-2 pl-2 "
                            style={{ width: `${stat.base_stat}%` }}
                          >
                            <p className="bg-sky-700 text-sky-50 md:font-bold px-1 font-semibold md:text-lg md:px-3 md:py-1 rounded-full">
                              {stat.base_stat}%
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 bg-sky-700 bg-opacity-50 rounded-yes my-14">
                  <div className="p-7 text-center">
                    <div className="py-1 px-10  border-b-4 border-sky-50 rounded-full mb-3 md:mb-5 drop-shadow-lg shadow-sky-50 text-sky-50 md:text-2xl font-bold">
                      Abilities
                    </div>
                    <div className="grid md:grid-cols-2 gap-2">
                      {pokemon.abilities.map((ability) => (
                        <div key={ability.ability.name}>
                          <div className="py-4 bg-sky-500 rounded-full  border-b-8 border-r-8 md:text-2xl font-bold text-sky-50 ">
                            {ability.ability.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-7 text-center">
                    <div className="py-1 px-10  border-b-4 border-sky-50 rounded-full mb-3 md:mb-5 drop-shadow-lg shadow-sky-50 text-sky-50 md:text-2xl font-bold">
                      Moves
                    </div>
                    <div className="grid md:grid-cols-2  gap-2">
                      {pokemon.moves.slice(0, 5).map((move) => (
                        <div key={move.move.name}>
                          <div className="py-4 bg-sky-500 rounded-full  border-b-8 border-r-8 md:text-2xl font-bold text-sky-50 ">
                            {move.move.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid justify-items-center">
                  <button
                    className=" py-0 md:py-4 bg-sky-700  rounded-full justify-center flex-col  border-b-8 border-r-8 border-orange-400 md:text-2xl font-bold text-sky-50  uppercase"
                    onClick={() => navigate(`/${pokemon.id}/${pokemon.name}`)}
                  >
                    <img src="/catch.png" alt="" className="w-28 md:w-32" />
                    <p> catch pokemon</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default DetailPokemon;
