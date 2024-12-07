import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import RootLayOut from "./RootLayOut";
import LogIn from "./Page/LogIn";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import Gallery from "./Page/Gallery";
import Carrier from "./Page/Carrier";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayOut />}>
      <Route
        index
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />
      <Route
        path="/carrier"
        element={
          <ProtectedRoute>
            <Carrier />
          </ProtectedRoute>
        }
      >
        Settings
      </Route>
      <Route path="/login" element={<LogIn />}>
        Log IN
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <div>
     
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
