import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { FC } from "react";
import axios from "axios";

import DetailPokemon from "../pages/DetailPokemon";
import Home from "../pages";
import ListPokemon from "../pages/ListPokemon";

axios.defaults.baseURL = "https://pokeapi.co/api/v2/pokemon";

const Router: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/:id",
      element: <DetailPokemon />,
    },
    {
      path: "/list",
      element: <ListPokemon />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
