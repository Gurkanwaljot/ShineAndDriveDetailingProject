import React, { useState } from "react";
import CommonPageHero from "../components/CommonPageHero/CommonPageHero";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import VehiclePackageList from "../components/Packages/VehiclePackageList";
import vehiclePackages from "../dataJson/vehiclePackages.json";
import { useBooking } from "../context/BookingContext";

const SPECIALTY_IDS = ["paint-correction", "engine-cleaning"];

const mainVehicles = vehiclePackages.filter((v) => !SPECIALTY_IDS.includes(v.id));
const specialtyServices = vehiclePackages.filter((v) => SPECIALTY_IDS.includes(v.id));

export default function Pricing() {
  const [activeVehicle, setActiveVehicle] = useState(mainVehicles[0].id);
  const { openBooking } = useBooking();

  const currentVehicle = mainVehicles.find((v) => v.id === activeVehicle);

  return (
    <>
      <CommonPageHero title={"Packages"} />
      <div className="ak-height-75 ak-height-lg-50"></div>

      <div className="container">
        <SectionHeading title={"Our Packages"} />
        <div className="ak-height-40 ak-height-lg-30"></div>

        <div className="vehicle-tabs">
          {mainVehicles.map((v) => (
            <button
              key={v.id}
              className={`vehicle-tab ${activeVehicle === v.id ? "vehicle-tab--active" : ""}`}
              onClick={() => setActiveVehicle(v.id)}
            >
              {v.name}
            </button>
          ))}
        </div>

        <div className="ak-height-30 ak-height-lg-20"></div>

        {currentVehicle && (
          <VehiclePackageList
            vehicle={currentVehicle}
            onSelect={(pkg, serviceType) => openBooking({ package: pkg, vehicle: currentVehicle, serviceType })}
          />
        )}
      </div>

      <div className="ak-height-100 ak-height-lg-60"></div>

      <div className="container">
        <div className="pricing-specialty-divider">
          <span>Additional Services</span>
        </div>
        <div className="ak-height-50 ak-height-lg-30"></div>

        <div className="pricing-specialty-grid">
          {specialtyServices.map((service) => (
            <div key={service.id} className="pricing-specialty-section">
              <h3 className="pricing-specialty-title">{service.name}</h3>
              <VehiclePackageList
                vehicle={service}
                onSelect={(pkg, serviceType) => openBooking({ package: pkg, vehicle: service, serviceType })}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="ak-height-100 ak-height-lg-60"></div>

      <div className="container-fluid bg-sec py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 p-3">
              <h1 className="text-light display-3 fw-bold">Ready to book?</h1>
            </div>
            <div className="col-lg-4 p-4 d-flex align-items-center">
              <button className="common-btn" onClick={() => openBooking(null)}>
                Book an appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="ak-height-50 ak-height-lg-30"></div>
    </>
  );
}
