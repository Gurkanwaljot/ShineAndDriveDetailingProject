import React, { useState } from "react";

const VehiclePackageItem = ({ pkg, onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="package-item">
      <div className="package-item__header">
        <div className="package-item__info">
          <div className="package-item__level">{pkg.level}</div>
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
          {pkg.quoteOnly ? (
            <div className="package-item__quote-notice">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              Quote upon review
            </div>
          ) : (
            <span className="package-item__price">{pkg.price}</span>
          )}
          <button className="package-item__book-btn" onClick={() => onSelect(pkg)}>
            Select
          </button>
        </div>
      </div>

      <button className="package-item__toggle" onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide details" : "Show more"}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          style={{
            marginLeft: "6px",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
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

const VehiclePackageList = ({ vehicle, onSelect }) => {
  const hasServiceTypes = vehicle.serviceTypes && vehicle.serviceTypes.length > 0;

  if (!hasServiceTypes) {
    return null;
  }

  const showSubTabs = vehicle.serviceTypes.length > 1;
  const [activeServiceType, setActiveServiceType] = useState(vehicle.serviceTypes[0].id);

  const currentServiceType = vehicle.serviceTypes.find((st) => st.id === activeServiceType) || vehicle.serviceTypes[0];
  const hasQuoteOnly = currentServiceType.packages.some((p) => p.quoteOnly);

  return (
    <div className="package-list">
      {showSubTabs && (
        <div className="service-type-tabs">
          {vehicle.serviceTypes.map((st) => (
            <button
              key={st.id}
              className={`service-type-tab ${activeServiceType === st.id ? "service-type-tab--active" : ""}`}
              onClick={() => setActiveServiceType(st.id)}
            >
              {st.label}
            </button>
          ))}
        </div>
      )}

      {hasQuoteOnly && (
        <div className="package-list__quote-banner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          Pricing for work vans varies based on vehicle condition. A custom quote will be provided after reviewing your van.
        </div>
      )}

      <div className="package-list__items">
        {currentServiceType.packages.map((pkg) => (
          <VehiclePackageItem
            key={pkg.id}
            pkg={pkg}
            onSelect={(p) => onSelect(p, currentServiceType)}
          />
        ))}
      </div>
    </div>
  );
};

export default VehiclePackageList;
