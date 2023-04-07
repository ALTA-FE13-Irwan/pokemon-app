import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface dataType {
  id: number;
  key: string;
  pokeName: string;
  pokeId: string;
}

const ListPokemon: FC = () => {
  const [items, setItems] = useState<dataType[]>([]);

  const navigate = useNavigate();

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
    localStorage.removeItem(key);
    const updatedItems = items.filter((item) => item.key !== key);
    setItems(updatedItems);
  };

  return (
    <div>
      <div className="grid gap-5 grid-cols-2 md:grid-cols-4 xl:grid-cols-6 item-center">
        {items.map((item) => (
          <div
            key={item.key}
            className="text-center items-center flex flex-col justify-center"
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.pokeId}.svg`}
              alt={`${item.pokeId}' image`}
            />
            <p>{item.pokeName}</p>
            <p>({item.key})</p>

            <button onClick={() => handleRemoveData(item.key)}>remove</button>
          </div>
        ))}
      </div>
      <button onClick={() => navigate("/")}>go to home</button>
    </div>
  );
};

export default ListPokemon;
