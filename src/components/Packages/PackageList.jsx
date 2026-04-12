import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PackageItem = ({ pkg, category, onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="package-item">
      <div className="package-item__header">
        <div className="package-item__info">
          <div className="package-item__level">{pkg.level}</div>
          <div className="package-item__name">{pkg.name}</div>
          {pkg.duration && (
            <div className="package-item__duration">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {pkg.duration}
            </div>
          )}
          <p className="package-item__short-desc">{pkg.shortDescription}</p>
        </div>
        <div className="package-item__right">
          <span className="package-item__price">{pkg.price}</span>
          <button
            className="package-item__book-btn"
            onClick={() => onSelect(pkg, category)}
          >
            Select
          </button>
        </div>
      </div>

      <button
        className="package-item__toggle"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide details" : "Show more"}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{ marginLeft: "6px", transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {expanded && (
        <div className="package-item__details">
          <ul className="package-item__features">
            {pkg.features.map((feature, i) => (
              <li key={i} className="package-item__feature">
                <span className="package-item__feature-icon">
                  <img src="/assets/img/icon/price-table-icon.svg" alt="" width="13" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const PackageList = ({ category }) => {
  const navigate = useNavigate();

  const handleSelect = (pkg, cat) => {
    navigate("/booking", {
      state: {
        package: pkg,
        category: cat,
      },
    });
  };

  return (
    <div className="package-list">
      <div className="package-list__back-header">
        <div className="package-list__category-label">{category.name}</div>
      </div>
      <div className="package-list__items">
        {category.packages.map((pkg) => (
          <PackageItem
            key={pkg.id}
            pkg={pkg}
            category={category}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default PackageList;
