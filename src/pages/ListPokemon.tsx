import { FC, useState, useEffect } from "react";
import Swal from "sweetalert2";

import { Layout } from "../komponents/Layout";
import { dataType } from "../utils/user";

const ListPokemon: FC = () => {
  const [items, setItems] = useState<dataType[]>([]);

  useEffect(() => {
    const values = handleFetchData();
    setItems(values);
  }, []);

  const handleFetchData = () => {
    const keys = Object.keys(localStorage);
    const values = keys.map((key) => {
      const data = localStorage.getItem(key);
      if (data) {
        const parsedData = JSON.parse(data);
        if (parsedData) {
          return { ...parsedData, key };
        }
      }
      return null;
    });
    return values.filter((value) => value !== null);
  };

  const handleRemoveData = (key: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(key);
        Swal.fire("Deleted!", "Your file has been deleted.", "success").then(
          (result) => {
            if (result.isConfirmed) {
              const updatedItems = items.filter((item) => item.key !== key);
              setItems(updatedItems);
            }
          }
        );
      }
    });
  };

  return (
    <Layout>
      <div className="h-screen">
        <div className="grid gap-5 md:gap-10 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {items.map((item) => (
            <div className="text-center items-center  bg-sky-600 hover:bg-sky-300 bg-opacity-20 rounded-t-full rounded-b-lg hover:scale-105">
              <div
                key={item.key}
                className="flex flex-col align-middle w-full aspect-square"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.pokeId}.svg`}
                  alt={`${item.pokeId}' image`}
                  className="w-full aspect-square"
                />
                <div className="text-sky-50 font-semibold py-5 text-2xl md:text-3xl capitalize">
                  {item.pokeName}
                </div>
                <button
                  type="button"
                  className=" antialiased py-3 md:py-5 px-4 inline-flex justify-center items-center  font-bold bg-red-500 text-sky-950 hover:bg-red-700 transition-all text-lg md:text-xl capitalize "
                  onClick={() => handleRemoveData(item.key)}
                >
                  remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ListPokemon;
