import { Employee } from "./pages/Employee";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { EditEmployee } from "./pages/EditEmployee";
import { Roles } from "./pages/Roles";
import { useEffect, useState } from "react";
import { Menu } from "./component/Menu";
import { Home } from "./pages/Home";
import { RegisterEmployee } from "./component/RegisterEmployee";
import { Navigate } from "react-router-dom";

function App() {
  const [isLogIn, setLogIn] = useState(false);

  const validateToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setLogIn(true);
    }
  };

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <>
      <BrowserRouter>
       {isLogIn && <Menu auth={setLogIn} />}

        <Routes>
          <Route
            path="/register"
            element={isLogIn ? <Navigate to="/" /> : <RegisterEmployee />}
          />
          <Route path="/" element={<Home auth={setLogIn} />} />
          {isLogIn && <Route path="/employee" element={<Employee />} />}
          {isLogIn && (
            <Route
              path="/editEmployee/:employee_id"
              element={<EditEmployee />}
            />
          )}

          {isLogIn && <Route path="/tasks/:employee_id" element={<Roles />} />}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
