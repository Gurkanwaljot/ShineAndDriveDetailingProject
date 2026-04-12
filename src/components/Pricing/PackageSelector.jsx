import { useState } from "react";
import { useNavigate } from "react-router-dom";
import servicePackages from "../../dataJson/servicePackages.json";

export default function PackageSelector() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedPackages, setExpandedPackages] = useState({});

  const toggleCategory = (categoryId) => {
    setActiveCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const togglePackageDetails = (packageId, e) => {
    e.stopPropagation();
    setExpandedPackages((prev) => ({
      ...prev,
      [packageId]: !prev[packageId],
    }));
  };

  const handleBookNow = (pkg, category) => {
    navigate("/booking", {
      state: {
        selectedPackage: {
          id: pkg.id,
          name: pkg.name,
          price: pkg.price,
          priceDisplay: pkg.priceDisplay,
          duration: pkg.duration,
          category: category.name,
          categoryId: category.id,
        },
      },
    });
  };

  return (
    <section className="package-selector py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="text-center mb-5">
              <p className="section-label text-uppercase fw-semibold mb-2">
                Our Services
              </p>
              <h2 className="section-title fw-bold">
                Select a Service Category
              </h2>
              <p className="section-subtitle text-muted mt-2">
                Choose from our professional detailing packages — built for
                every need and budget.
              </p>
            </div>

            <div className="category-list">
              {servicePackages.categories.map((category) => {
                const isOpen = activeCategory === category.id;
                return (
                  <div
                    key={category.id}
                    className={`category-item mb-3 ${isOpen ? "is-open" : ""}`}
                  >
                    <button
                      className="category-header w-100 d-flex align-items-center justify-content-between"
                      onClick={() => toggleCategory(category.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="category-name fw-semibold">
                        {category.name}
                      </span>
                      <div className="d-flex align-items-center gap-3">
                        <span className="category-count text-muted small">
                          {category.packages.length} packages
                        </span>
                        <span
                          className={`category-chevron ${isOpen ? "rotated" : ""}`}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </span>
                      </div>
                    </button>

                    <div className={`package-list-wrapper ${isOpen ? "expanded" : ""}`}>
                      <div className="package-list">
                        {category.packages.map((pkg, index) => {
                          const isExpanded = expandedPackages[pkg.id];
                          const levelLabel = `Level ${index + 1}`;
                          return (
                            <div key={pkg.id} className="package-row">
                              <div className="package-row-main">
                                <div className="package-row-info">
                                  <div className="d-flex align-items-center gap-2 mb-1">
                                    <span className="package-level-badge">
                                      {levelLabel}
                                    </span>
                                  </div>
                                  <h5 className="package-name mb-1">
                                    {pkg.name}
                                  </h5>
                                  <p className="package-short-desc text-muted mb-2">
                                    {pkg.shortDescription}
                                  </p>
                                  <div className="d-flex align-items-center gap-3 flex-wrap">
                                    <span className="package-duration">
                                      <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="me-1"
                                      >
                                        <circle cx="12" cy="12" r="10" />
                                        <polyline points="12 6 12 12 16 14" />
                                      </svg>
                                      {pkg.duration}
                                    </span>
                                    <button
                                      className="btn-show-more"
                                      onClick={(e) =>
                                        togglePackageDetails(pkg.id, e)
                                      }
                                    >
                                      {isExpanded ? "Show less" : "Show more"}
                                      <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`ms-1 ${isExpanded ? "rotated" : ""}`}
                                      >
                                        <polyline points="6 9 12 15 18 9" />
                                      </svg>
                                    </button>
                                  </div>

                                  {isExpanded && (
                                    <div className="package-details mt-3">
                                      <ul className="details-list">
                                        {pkg.details.map((detail, i) => (
                                          <li key={i}>
                                            <svg
                                              width="14"
                                              height="14"
                                              viewBox="0 0 24 24"
                                              fill="none"
                                              stroke="#ffc107"
                                              strokeWidth="2.5"
                                              strokeLinecap="round"
                                              strokeLinejoin="round"
                                              className="me-2 flex-shrink-0"
                                            >
                                              <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            {detail}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>

                                <div className="package-row-action">
                                  <div className="package-price">
                                    {pkg.priceDisplay}
                                  </div>
                                  <button
                                    className="btn-book-now"
                                    onClick={() => handleBookNow(pkg, category)}
                                  >
                                    Book Now
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
