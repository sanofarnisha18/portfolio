import { Link } from "react-router-dom";

function Hero() {
  return (
    <section>
      <h2>Little Lemon Restaurant</h2>
      <p>Reserve your table now</p>

      <Link to="/booking">
        <button>Reserve Table</button>
      </Link>
    </section>
  );
}

export default Hero;