import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Categories from "./Containers/categories/Categories";

const App = () => {

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="*" element={<h1 className="text-center">Not Found!</h1>} />
      </Routes>
    </div>
  );
}

export default App
