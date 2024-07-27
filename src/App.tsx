import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Categories from "./Containers/categories/Categories";
import Home from "./Containers/Home/Home";

const App = () => {
  return (
    <>
      <Header />
      <div className="container w-75">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route
            path="*"
            element={<h1 className="text-center">Not Found!</h1>}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
