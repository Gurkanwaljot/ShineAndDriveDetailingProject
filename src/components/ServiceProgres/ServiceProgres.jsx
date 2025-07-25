import React from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../SectionHeading/SectionHeading";

const serviceProgresData = [
  {
    id: 1,
    number: 1,
    icon: "/assets/img/icon/speedome.svg",
    title: "Premium Products, Flawless Finish",
    desp: `We use only top-tier products like iron removers, clay bars, and premium waxes.
Every detail is handled with expert technique and precision.
Our results speak for themselves in clarity and shine.
Your vehicle gets the treatment it truly deserves.`,
  },
  {
    id: 2,
    number: 2,
    icon: "/assets/img/icon/car-repair.svg",
    title: "Unmatched Quality, Every Time",
    desp: `It’s not just about looking good—it’s about lasting impact.
We focus on quality that makes every drive feel special.
From crevices to chrome, every part is perfected.
Expect nothing less than showroom-level results.`,
  },
  {
    id: 3,
    number: 3,
    icon: "/assets/img/icon/car.svg",
    title: "Drive Clean, Drive Confident",
    desp: `What sets us apart is our personal touch and passion.
At Shine & Drive, it’s more than detailing—it’s pride.
You’ll feel the difference every time you hit the road.
Because confidence begins with a flawless ride.`,
  },
];

const ServiceProgres = () => {
  return (
    <section className="container">
      
               
     <div className="mt-5">
            <SectionHeading
                title={"Why Choose Us?"}
                />
     </div>
              
      <div className="ak-height-125 ak-height-lg-80"></div>
      <div className="row  row-cols-1 row-cols-xl-3 g-4">
        {serviceProgresData?.map((item) => (
          <div
            className="service-progress-card"
            key={item.id}
            data-aos="fade-up"
            data-aos-delay={
              item.number == 1 ? "" : item.number == 2 ? "100" : "200"
            }
          >
            <div className="progress-item">
              <h4 className="ak-stroke-number color-white">{item.number}</h4>
              <div className="ak-border-width"></div>
            </div>
            <div className="service-item">
              <div className="heartbeat-icon">
                <Link to="#">
                  <span className="ak-heartbeat-btn">
                    <img src={item.icon} alt="..." />
                  </span>
                </Link>
              </div>
              <div className="service-info">
                <h4 className="title">{item.title}</h4>
                <p className="desp">{item.desp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceProgres;
