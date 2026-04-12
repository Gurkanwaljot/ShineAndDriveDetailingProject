import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import categoriesData from "../../dataJson/categoriesData.json";

const ADD_ONS = [
  { id: "engine-cleaning", label: "Engine Cleaning", price: "$50–80" },
  { id: "headlight-restoration", label: "Headlight Restoration", price: "$50" },
  { id: "car-seats", label: "Car Seats", price: "$30/seat" },
  { id: "polishing", label: "Polishing", price: "$120–220" },
  { id: "interior-deodorizer", label: "Interior Deodorizer", price: "$50" },
  { id: "air-freshener", label: "Air Freshener", price: "$10" },
];

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM",
];

const ALL_PACKAGES = categoriesData.flatMap((cat) =>
  cat.packages.map((pkg) => ({
    ...pkg,
    categoryName: cat.name,
    categoryId: cat.id,
    label: `${cat.name} — ${pkg.level}: ${pkg.name}`,
  }))
);

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const preselected = location.state?.package || null;
  const preselectedCategory = location.state?.category || null;

  const getInitialPackage = () => {
    if (preselected) {
      return `${preselected.id}`;
    }
    return "";
  };

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    vehicleType: "",
    serviceType: "",
    make: "",
    model: "",
    selectedPackage: getInitialPackage(),
    addOns: [],
    waterAccess: "",
    specialInstructions: "",
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleAddOnToggle = (id) => {
    setFormData((prev) => {
      const exists = prev.addOns.includes(id);
      return {
        ...prev,
        addOns: exists ? prev.addOns.filter((a) => a !== id) : [...prev.addOns, id],
      };
    });
  };

  const validate = () => {
    const e = {};
    if (!formData.date) e.date = "Please select a date";
    if (!formData.time) e.time = "Please select a time";
    if (!formData.vehicleType) e.vehicleType = "Please select vehicle type";
    if (!formData.serviceType) e.serviceType = "Please select service type";
    if (!formData.make.trim()) e.make = "Vehicle make is required";
    if (!formData.model.trim()) e.model = "Vehicle model is required";
    if (!formData.selectedPackage) e.selectedPackage = "Please select a package";
    if (!formData.waterAccess) e.waterAccess = "Please answer this question";
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Invalid email address";
    if (!formData.address.trim()) e.address = "Address is required";
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const selectedPkgObj = ALL_PACKAGES.find((p) => p.id === formData.selectedPackage);
    const selectedAddOnObjs = ADD_ONS.filter((a) => formData.addOns.includes(a.id));

    console.log("Booking submission:", {
      ...formData,
      packageDetails: selectedPkgObj,
      addOnDetails: selectedAddOnObjs,
    });

    setSubmitted(true);
  };

  const getToday = () => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  };

  if (submitted) {
    return (
      <div className="booking-success">
        <div className="booking-success__icon">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ffc107" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h2>Booking Request Sent!</h2>
        <p>Thank you, <strong>{formData.name}</strong>. We'll confirm your appointment shortly at <strong>{formData.email}</strong>.</p>
        <Link to="/pricing" className="common-btn mt-4 d-inline-block">Back to Packages</Link>
      </div>
    );
  }

  return (
    <div className="booking-form-wrap">
      <div className="container">
        <div className="ak-height-80 ak-height-lg-50"></div>

        {preselected && (
          <div className="booking-preselected-banner">
            <div className="booking-preselected-banner__info">
              <span className="booking-preselected-banner__category">{preselectedCategory?.name}</span>
              <span className="booking-preselected-banner__package">{preselected.level}: {preselected.name}</span>
            </div>
            <div className="booking-preselected-banner__price">{preselected.price}</div>
          </div>
        )}

        <div className="ak-height-40 ak-height-lg-30"></div>

        <form onSubmit={handleSubmit} noValidate>

          <div className="booking-section">
            <h3 className="booking-section__title">
              <span className="booking-section__num">1</span>
              Appointment
            </h3>
            <div className="booking-section__body">
              <div className="booking-fields-row">
                <div className="booking-field">
                  <label>Date <span className="req">*</span></label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    min={getToday()}
                    onChange={handleChange}
                    className={errors.date ? "has-error" : ""}
                  />
                  {errors.date && <span className="field-error">{errors.date}</span>}
                </div>
                <div className="booking-field">
                  <label>Time <span className="req">*</span></label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={errors.time ? "has-error" : ""}
                  >
                    <option value="">Select a time</option>
                    {TIME_SLOTS.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.time && <span className="field-error">{errors.time}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="booking-section">
            <h3 className="booking-section__title">
              <span className="booking-section__num">2</span>
              Vehicle Details
            </h3>
            <div className="booking-section__body">
              <div className="booking-fields-row">
                <div className="booking-field">
                  <label>Vehicle Type <span className="req">*</span></label>
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    className={errors.vehicleType ? "has-error" : ""}
                  >
                    <option value="">Select vehicle type</option>
                    <option value="Car">Car</option>
                    <option value="SUV">SUV</option>
                    <option value="Truck">Truck</option>
                    <option value="Van">Van</option>
                  </select>
                  {errors.vehicleType && <span className="field-error">{errors.vehicleType}</span>}
                </div>
                <div className="booking-field">
                  <label>Service Type <span className="req">*</span></label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className={errors.serviceType ? "has-error" : ""}
                  >
                    <option value="">Select service type</option>
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Full Service">Full Service</option>
                  </select>
                  {errors.serviceType && <span className="field-error">{errors.serviceType}</span>}
                </div>
              </div>
              <div className="booking-fields-row">
                <div className="booking-field">
                  <label>Make <span className="req">*</span></label>
                  <input
                    type="text"
                    name="make"
                    value={formData.make}
                    onChange={handleChange}
                    placeholder="e.g. Toyota"
                    className={errors.make ? "has-error" : ""}
                  />
                  {errors.make && <span className="field-error">{errors.make}</span>}
                </div>
                <div className="booking-field">
                  <label>Model <span className="req">*</span></label>
                  <input
                    type="text"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="e.g. Camry"
                    className={errors.model ? "has-error" : ""}
                  />
                  {errors.model && <span className="field-error">{errors.model}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="booking-section">
            <h3 className="booking-section__title">
              <span className="booking-section__num">3</span>
              Selected Package
            </h3>
            <div className="booking-section__body">
              <div className="booking-field booking-field--full">
                <label>Package <span className="req">*</span></label>
                <select
                  name="selectedPackage"
                  value={formData.selectedPackage}
                  onChange={handleChange}
                  className={errors.selectedPackage ? "has-error" : ""}
                >
                  <option value="">Choose a package</option>
                  {ALL_PACKAGES.map((pkg) => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.label}
                    </option>
                  ))}
                </select>
                {errors.selectedPackage && <span className="field-error">{errors.selectedPackage}</span>}
                {formData.selectedPackage && (() => {
                  const pkg = ALL_PACKAGES.find((p) => p.id === formData.selectedPackage);
                  return pkg ? (
                    <div className="booking-package-preview">
                      <span className="booking-package-preview__name">{pkg.name}</span>
                      <span className="booking-package-preview__price">{pkg.price}</span>
                      {pkg.duration && <span className="booking-package-preview__duration">{pkg.duration}</span>}
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          </div>

          <div className="booking-section">
            <h3 className="booking-section__title">
              <span className="booking-section__num">4</span>
              Add-Ons
            </h3>
            <div className="booking-section__body">
              <p className="booking-section__subtitle">Select any additional services</p>
              <div className="booking-addons-grid">
                {ADD_ONS.map((addon) => {
                  const checked = formData.addOns.includes(addon.id);
                  return (
                    <label
                      key={addon.id}
                      className={`booking-addon ${checked ? "booking-addon--checked" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleAddOnToggle(addon.id)}
                      />
                      <div className="booking-addon__check">
                        {checked && (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                      <div className="booking-addon__content">
                        <span className="booking-addon__label">{addon.label}</span>
                        <span className="booking-addon__price">{addon.price}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="booking-section">
            <h3 className="booking-section__title">
              <span className="booking-section__num">5</span>
              Additional Questions
            </h3>
            <div className="booking-section__body">
              <div className="booking-field booking-field--full">
                <label>Do you have water and power access at the service location? <span className="req">*</span></label>
                <div className="booking-radio-group">
                  <label className={`booking-radio ${formData.waterAccess === "Yes" ? "booking-radio--active" : ""}`}>
                    <input
                      type="radio"
                      name="waterAccess"
                      value="Yes"
                      checked={formData.waterAccess === "Yes"}
                      onChange={handleChange}
                    />
                    Yes
                  </label>
                  <label className={`booking-radio ${formData.waterAccess === "No" ? "booking-radio--active" : ""}`}>
                    <input
                      type="radio"
                      name="waterAccess"
                      value="No"
                      checked={formData.waterAccess === "No"}
                      onChange={handleChange}
                    />
                    No
                  </label>
                </div>
                {errors.waterAccess && <span className="field-error">{errors.waterAccess}</span>}
              </div>
              <div className="booking-field booking-field--full">
                <label>Special Instructions</label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Any special requests or notes..."
                />
              </div>
            </div>
          </div>

          <div className="booking-section">
            <h3 className="booking-section__title">
              <span className="booking-section__num">6</span>
              Your Information
            </h3>
            <div className="booking-section__body">
              <div className="booking-fields-row">
                <div className="booking-field">
                  <label>Full Name <span className="req">*</span></label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className={errors.name ? "has-error" : ""}
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>
                <div className="booking-field">
                  <label>Phone Number <span className="req">*</span></label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your phone number"
                    className={errors.phone ? "has-error" : ""}
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>
              </div>
              <div className="booking-fields-row">
                <div className="booking-field">
                  <label>Email Address <span className="req">*</span></label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    className={errors.email ? "has-error" : ""}
                  />
                  {errors.email && <span className="field-error">{errors.email}</span>}
                </div>
                <div className="booking-field">
                  <label>Address <span className="req">*</span></label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Service location address"
                    className={errors.address ? "has-error" : ""}
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>
              </div>
            </div>
          </div>

          <div className="booking-submit-row">
            <button type="submit" className="common-btn booking-submit-btn">
              Confirm Booking
            </button>
            <p className="booking-submit-note">We'll contact you within 24 hours to confirm your appointment.</p>
          </div>

        </form>
        <div className="ak-height-100 ak-height-lg-60"></div>
      </div>
    </div>
  );
};

export default BookingForm;
