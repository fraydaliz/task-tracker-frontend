import { Employee } from "./pages/Employee";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { EditEmployee } from "./pages/EditEmployee";
import { Roles } from "./pages/Roles";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
             <Route path="/employee" element={<Employee />}></Route>
                <Route path="/editEmployee/:employee_id" element={<EditEmployee />}></Route>
                 <Route path="/tasks/:employee_id" element={<Roles />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
