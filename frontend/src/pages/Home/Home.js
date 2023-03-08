import { RiProductHuntLine } from "react-icons/ri"
import { Link } from "react-router-dom";
import './Home.scss';
import heroImage from '../../assets/inv-img.png'
const Home = () => {
    return (
        <div className="home">
            <nav className="container --flex-between" >
                <div className="logo">
                    <RiProductHuntLine size={35} />
                </div>
                <ul className="home-links">
                    <li>
                        <Link to="/register">Resgister</Link>
                    </li>
                    <li>

                        <button className="--btn --btn-primary">
                            <Link to="/login">Login</Link>
                        </button>
                    </li>
                    <li>
                        <button className="--btn --btn-primary">
                            <Link to="/dashboard">DashBoard</Link>
                        </button>
                    </li>
                </ul>
            </nav>
            {/* Hero Section  */}
            <section className="container hero">

                <div className="hero-text">
                    <h2>
                        Inventory & Stock
                        Management Solution
                    </h2>

                    <p>Inventory system to control and manage product in the warehouse in real time and integrated to make it easier to develop your bussiness</p>
                    <div className="hero-buttons">
                        <button className="--btn --btn-secondary">
                            <Link to="/dashboard">Free Trial 1 Month</Link>
                        </button>
                    </div>
                    <div className="--flex-start">
                        <NumberText num="14K" text={"Brand Owners "} />
                        <NumberText num="23K" text={"Active Users"} />
                        <NumberText num="500+" text={"Partners"} />
                    </div>
                </div>

                <div className="hero-image">
                    <img src={heroImage} alt="Inventory"></img>
                </div>
            </section>

        </div>
    )
}

const NumberText = ({ num, text }) => {
    return <div className="--mr">
        <h3 className="--color-white">{num}</h3>
        <p className="--color-white">{text}</p>
    </div>
}

export default Home;