import React, { useState } from "react";
import { MoreBtn } from "../Button/Button";
import SectionHeading from "../SectionHeading/SectionHeading";
import { Link } from "react-router-dom";

import servicesData from "../../dataJson/servicesData.json";

const ServicesSection = ({ styleTypeTwo }) => {
  const data = styleTypeTwo ? servicesData.slice(0, 3) : servicesData;
const [expandedCardId, setExpandedCardId] = useState(null);

  const expandCard = (id) => {
  setExpandedCardId(id);
};

  return (
    <>
      <div className="ak-height-125 ak-height-lg-80"></div>
      <div className="d-flex justify-content-center">
        <div className="sticky-content container">
          <div className="content style_2">
            <div className="service">
              <div className="row justify-content-center">
               
             {data.map((item) => (
  <div className="col-lg-6 py-2" key={item.id}>
    <div className="card card-service bg-black text-light rounded-0 postion-relative">
     <div className="row g-0 ">
      <div className="col-md-4">
         <img src={`${item.img}`} className=" service-card-img rounded-0" alt="..." />
      
      </div>
      <div className="col-md-8">
        <div
        className="card-info p-3"
        style={{ height: expandedCardId === item.id ? 'auto' : '300px', overflow: 'hidden' }} // adjust 300px as default height
      >
        <h1 className="card-title fs-2 py-3">{item.title}</h1>
        <p className="card-desp" style={{ fontSize: '15px' }}>{item.desp}</p>
        <h5 className="fs-6 py-3">BENEFITS:</h5>
        <ul>
          {
            item.benefits.map((item)=>(
              <li style={{ fontSize: '15px' }}>{item}</li>
            ))
          }
        </ul>
        {/* <p className="card-desp" style={{ fontSize: '15px' }}>{item.benefits}</p> */}
        
        {expandedCardId !== item.id && (
          <button
            onClick={() => expandCard(item.id)}
            className="btn-service"
          >
            Read More
          </button>
                )}
     </div>
      </div>
      </div>
    </div>
  </div>
))}

              

              </div>
            </div>
          </div>
        
            <div className="container mx-auto ">
              <SectionHeading
                title={"Services"}
                />
               
              <div className="ak-height-50 ak-height-lg-10"></div>
              <div className="d-flex justify-content-center">
                <MoreBtn to="/service" >VIEW All SERVICES</MoreBtn>
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ServicesSection;