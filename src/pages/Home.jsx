import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="home-hero">
      <div className="container">
        <div className="home-hero-content">
          <p className="hero-label text-uppercase fw-semibold mb-3">
            Professional Auto Detailing
          </p>
          <h1 className="hero-title mb-4">
            Your Car Deserves <br />
            <span className="text-highlight">The Best.</span>
          </h1>
          <p className="hero-subtitle mb-5">
            Premium ceramic coating, paint correction, and full detailing services —
            done right, every time.
          </p>
          <div className="d-flex gap-3 flex-wrap">
            <button
              className="btn-book-now btn-hero"
              onClick={() => navigate("/pricing")}
            >
              View Packages
            </button>
            <button
              className="btn-secondary-hero"
              onClick={() => navigate("/booking")}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
