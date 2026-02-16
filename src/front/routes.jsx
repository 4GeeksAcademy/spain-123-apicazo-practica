// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout.jsx";
import { Home } from "./pages/Home.jsx";
import { Single } from "./pages/Single.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Characters } from "./pages/Characters.jsx";
import { Contacts } from "./pages/Contacts.jsx";
import { AddContact } from "./pages/AddContact.jsx";
import { Planets } from "./pages/Planets.jsx";
import { Starships } from "./pages/Starships.jsx";
import { CharactersDetails } from "./pages/CharactersDetails.jsx";
import { EditContact } from "./pages/EditContact.jsx";
import { PlanetsDetails } from "./pages/PlanetsDetails.jsx";
import { StarshipsDetails } from "./pages/StarshipsDetails.jsx";
import { Login } from "./pages/Login.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Private } from "./pages/Private.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

    // Root Route: All navigation will start from here.
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />  {/* Dynamic route for single items */}
      <Route path="/demo" element={<Demo />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/add-contact" element={<AddContact />} />
      <Route path="/planets" element={<Planets />} />
      <Route path="/charactersDetails" element={<CharactersDetails />} />
      <Route path="/starships" element={<Starships />} />
      <Route path="/contacts/:id" element={<EditContact />} />
      <Route path="/planetsDetails" element={<PlanetsDetails />} />
      <Route path="/starshipsDetails" element={<StarshipsDetails />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/private" element={<Private />} />









    </Route>
  )
);