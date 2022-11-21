import { Link } from "react-router-dom";

const Home = () => {
    return (
      <div>
        this is home page
        <ul>
          <li>
            <Link to="/login" >Login page</Link>
          </li>
        </ul>
      </div>
    );
  }

export default Home;
