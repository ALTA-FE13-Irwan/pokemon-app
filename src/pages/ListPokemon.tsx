import { FC, useState, useEffect, CSSProperties } from "react";
import PacmanLoader from "react-spinners/PacmanLoader";
import Swal from "sweetalert2";

import { Layout } from "../komponents/Layout";
import { dataType } from "../utils/user";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const ListPokemon: FC = () => {
  const [items, setItems] = useState<dataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    const values = handleFetchData();
    setItems(values);
    setLoading(false);
  }, [items]);

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
    return values;
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
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <Layout>
      <div className="h-full md:h-screen">
        {loading ? (
          <div className="">
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
          <div className=" grid gap-5 md:gap-10 grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {items.map((item) => (
              <div className="text-center items-center bg-sky-600 hover:bg-sky-300 bg-opacity-20 rounded-t-full rounded-b-lg hover:scale-105">
                <div
                  key={item.key}
                  className="flex flex-col align-middle w-full aspect-square"
                >
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.pokeId}.svg`}
                    alt={`${item.pokeId}' image`}
                    className="w-full aspect-square"
                  />
                  <div className="text-amber-500 font-semibold text-2xl md:text-3xl capitalize">
                    {item.key}
                  </div>
                  <div className="text-sky-50 font-semibold mb-4 text-2xl md:text-3xl capitalize">
                    <p>({item.pokeName})</p>
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
        )}
      </div>
    </Layout>
  );
};

export default ListPokemon;
