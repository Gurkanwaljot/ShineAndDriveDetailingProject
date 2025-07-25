import React, { useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import packages from '../../dataJson/packages.json';
import Imgbasic from '../../../public/assets/img/Package/Basic Image.png';
import Imgessential from '../../../public/assets/img/Package/Essential Package.png';
import Imgpremium from '../../../public/assets/img/Package/Premium Package.png';

const PricingTable = ({ type }) => {
  const [flippedCard, setFlippedCard] = useState(null);

  const handleCardFlip = (id) => {
    // Flip on tap/click
    if (flippedCard === id) {
      setFlippedCard(null); // flip back
    } else {
      setFlippedCard(id); // flip
    }
  };

  const handleMouseEnter = (id) => {
    if (window.innerWidth > 768) {
      setFlippedCard(id);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setFlippedCard(null);
    }
  };

  const cardData = {
    Cars: [
      { id: "cars-basic", title: "Basic", price: "$150", data: packages.basic, img: Imgbasic },
      { id: "cars-essential", title: "Essential", price: "$190", data: packages.essential, img: Imgessential },
      { id: "cars-premium", title: "Premium", price: "$230", data: packages.premium, img: Imgpremium }
    ],
    SUVs: [
      { id: "suvs-basic", title: "Basic", price: "$170", data: packages.basic, img: Imgbasic },
      { id: "suvs-essential", title: "Essential", price: "$210", data: packages.basic, img: Imgessential },
      { id: "suvs-premium", title: "Premium", price: "$260", data: packages.basic, img: Imgpremium }
    ],
    Trucks: [
      { id: "trucks-basic", title: "Basic", price: "$200", data: packages.basic, img: Imgbasic },
      { id: "trucks-essential", title: "Essential", price: "$240", data: packages.basic, img: Imgessential },
      { id: "trucks-premium", title: "Premium", price: "$280", data: packages.basic, img: Imgpremium }
    ]
  };

  const renderCards = (vehicleType) => (
    <div className="row justify-content-center">
      {cardData[vehicleType].map((card) => (
        <div className="col-lg-4 col-md-6 container-cards" key={card.id}>
          <div
            className="pricing-card-container"
            data-aos="fade-up"
            onMouseEnter={() => handleMouseEnter(card.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleCardFlip(card.id)}
            style={{ perspective: "1000px", cursor: "pointer" }}
          >
            <div
              className="pricing-card"
              style={{
                transform: flippedCard === card.id ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.6s",
                transformStyle: "preserve-3d",
                position: "relative"
              }}
            >
              {/* Front */}
              <div className="pricing-card-front" style={{ backfaceVisibility: "hidden" }}>
                <div className="pricing-heading text-center">
                  <p className="title">{card.title}</p>
                  <h2 className="discount-price">{card.price}</h2>
                </div>
                <div className="option-all">
                  {card.data.map((d, i) => (
                    <div className="option" key={i}>
                      <div className="icon mx-2">
                        <img src="/assets/img/icon/price-table-icon.svg" alt="..." />
                      </div>
                      <p className="title">{d}</p>
                    </div>
                  ))}
                </div>
                <a
                  href="https://form.jotform.com/251835755283263"
                  target="_blank"
                  className="btn btn-warning rounded-pill p-3 px-5 text-light mx-auto"
                >
                  Book now
                </a>
              </div>

              {/* Back */}
              <div
                className="pricing-card-back"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  transform: "rotateY(180deg)",
                  backfaceVisibility: "hidden"
                }}
              >
                <img src={card.img} alt="cover" className="cover" />
                <a
                  href="https://form.jotform.com/251835755283263"
                  target="_blank"
                  className="btn-package-normal btn-back"
                >
                  Book now
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {type ? (
        <div className="ak-height-75 ak-height-lg-75"></div>
      ) : (
        <div className="ak-height-160 ak-height-lg-80"></div>
      )}
      <div className="ak-bg pricing-section-bg-img">
        <div className="ak-height-100 ak-height-lg-50"></div>
        <div className="container">
          {!type && <div className="ak-height-50 ak-height-lg-50"></div>}

          <div className="container py-5">
            <SectionHeading title={"Popular Packages (For Full Detailing)"} />
          </div>

          {/* Tabs */}
          <ul className="nav nav-tabs justify-content-center border-0 nav-style" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button className="nav-link active" id="cars-tab" data-bs-toggle="tab" data-bs-target="#cars" type="button" role="tab" aria-selected="true">Cars</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="suvs-tab" data-bs-toggle="tab" data-bs-target="#suvs" type="button" role="tab" aria-selected="false">SUVs</button>
            </li>
            <li className="nav-item" role="presentation">
              <button className="nav-link" id="trucks-tab" data-bs-toggle="tab" data-bs-target="#trucks" type="button" role="tab" aria-selected="false">Trucks</button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content price-table-container" id="myTabContent">
            <div className="tab-pane fade show active py-5" id="cars" role="tabpanel">{renderCards("Cars")}</div>
            <div className="tab-pane fade py-5" id="suvs" role="tabpanel">{renderCards("SUVs")}</div>
            <div className="tab-pane fade py-5" id="trucks" role="tabpanel">{renderCards("Trucks")}</div>
          </div>
        </div>

        {/* ADD ONS Section */}
        <div className="container py-5">
          <SectionHeading title={"ADD ONS"} />
        </div>
        <div className="price-table-container my-5">
          <div className="container">
            <div className="row">
              {[
                ["Engine cleaning", "$50-80"],
                ["Headlight restoration", "$50"],
                ["Advanced paint correction", "$200-300"],
                ["Polishing", "$120-220"],
                ["Plastic trim layer of protection", "$20"],
                ["Interior deodorizer", "$50"],
                ["Headliner spot cleaning", "$30"],
                ["Air freshener", "$10"]
              ].map(([title, price], i) => (
                <div className="col-lg-6" key={i}>
                  <div className="card p-2 border border-warning text-light d-flex add-card my-2 py-4">
                    <span>{title}</span>
                    <span>{price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container-fluid bg-sec py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 p-3">
                <h1 className="text-light display-3 fw-bold">Got a project?</h1>
              </div>
              <div className="col-lg-4 p-4 d-flex align-items-center">
                <a className="common-btn" href="https://form.jotform.com/251835755283263" target="_main">Book an appointment</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingTable;