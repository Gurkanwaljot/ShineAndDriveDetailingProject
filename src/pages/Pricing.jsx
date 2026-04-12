import React, { useState } from "react";
import CommonPageHero from "../components/CommonPageHero/CommonPageHero";
import SectionHeading from "../components/SectionHeading/SectionHeading";
import CategoryList from "../components/Packages/CategoryList";
import PackageList from "../components/Packages/PackageList";
import categoriesData from "../dataJson/categoriesData.json";

export default function Pricing() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    if (category) {
      setTimeout(() => {
        const el = document.getElementById("packages-panel");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  };

  return (
    <>
      <CommonPageHero title={"Packages"} />
      <div className="ak-height-75 ak-height-lg-50"></div>

      <div className="container">
        <SectionHeading title={"Our Services & Packages"} />
        <div className="ak-height-40 ak-height-lg-30"></div>

        <div className="packages-layout">
          <div className="packages-layout__categories">
            <p className="packages-layout__label">Select a service category</p>
            <CategoryList
              categories={categoriesData}
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />
          </div>

          {selectedCategory && (
            <div className="packages-layout__panel" id="packages-panel">
              <PackageList category={selectedCategory} />
            </div>
          )}
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
              <a className="common-btn" href="/booking">Book an appointment</a>
            </div>
          </div>
        </div>
      </div>

      <div className="ak-height-50 ak-height-lg-30"></div>
    </>
  );
}
