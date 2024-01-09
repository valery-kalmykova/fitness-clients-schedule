import { useEffect } from "react";
import { useAppContext } from "../utils/context/context";
import router from "./Routes";
import { RouterProvider } from "react-router-dom";
// import { useGetAllEventsQuery, useGetEventQuery } from "../store/apiSlice";

function App() {
  const { setWindowSize } = useAppContext();

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // const { data, error, isLoading } = useGetAllEventsQuery("");
  // console.log(data)

  return <RouterProvider router={router} />;
}

export default App;
