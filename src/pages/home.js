import { Link } from "react-router-dom";
import Header from "../components/header";
import Sidebar from "../components/sidebar";

const Home = () => {
  return (
    <div className="wrapper">
      <Header></Header>
      <Sidebar></Sidebar>
    </div>
  );
}

export default Home;
