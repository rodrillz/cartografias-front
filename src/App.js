//Dependencies
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages
import Home from './pages/Home';
import Contacto from "./pages/Contacto";

//Layout
import Header from './components/Header';


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "Contacto",
        element: <Contacto />,
    }
]);

function App() {
    return (
        <>
            <Header />
            <RouterProvider router={router} />

        </>
    );
}

export default App;