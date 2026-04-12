import React, { useState, useEffect, useRef } from "react";
import { useBooking } from "../../context/BookingContext";
import vehiclePackages from "../../dataJson/vehiclePackages.json";

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

const ALL_PACKAGES = vehiclePackages.flatMap((v) =>
  (v.serviceTypes || []).flatMap((st) =>
    st.packages.map((pkg) => ({
      ...pkg,
      vehicleName: v.name,
      vehicleId: v.id,
      serviceTypeLabel: st.label,
      label: `${v.name} — ${st.label} — ${pkg.level}`,
    }))
  )
);

const getToday = () => new Date().toISOString().split("T")[0];

const BookingModal = () => {
  const { isOpen, bookingData, closeBooking } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const scrollRef = useRef(null);

  const preselectedPkg = bookingData?.package || null;
  const preselectedVehicle = bookingData?.vehicle || null;
  const preselectedServiceType = bookingData?.serviceType || null;

  const getInitialPackageId = () => {
    if (preselectedPkg) return preselectedPkg.id;
    return "";
  };

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    vehicleType: preselectedVehicle?.name || "",
    serviceType: "",
    make: "",
    model: "",
    selectedPackage: getInitialPackageId(),
    addOns: [],
    waterAccess: "",
    specialInstructions: "",
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setErrors({});
      setFormData({
        date: "",
        time: "",
        vehicleType: preselectedVehicle?.name || "",
        serviceType: "",
        make: "",
        model: "",
        selectedPackage: getInitialPackageId(),
        addOns: [],
        waterAccess: "",
        specialInstructions: "",
        name: "",
        phone: "",
        email: "",
        address: "",
      });
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }
  }, [isOpen, bookingData]);

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
      const firstKey = Object.keys(validationErrors)[0];
      const el = scrollRef.current?.querySelector(`[name="${firstKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const selectedPkgObj = ALL_PACKAGES.find((p) => p.id === formData.selectedPackage);
    const selectedAddOnObjs = ADD_ONS.filter((a) => formData.addOns.includes(a.id));
    console.log("Booking submission:", { ...formData, packageDetails: selectedPkgObj, addOnDetails: selectedAddOnObjs });
    setSubmitted(true);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeBooking();
  };

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") closeBooking(); };
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, closeBooking]);

  if (!isOpen) return null;

  return (
    <div className={`bmodal-overlay ${isOpen ? "bmodal-overlay--open" : ""}`} onClick={handleOverlayClick}>
      <div className="bmodal">
        <div className="bmodal__header">
          <div className="bmodal__title-wrap">
            <h2 className="bmodal__title">Book an Appointment</h2>
            {preselectedPkg && (
              <span className="bmodal__subtitle">
                {preselectedVehicle?.name}{preselectedServiceType ? ` — ${preselectedServiceType.label}` : ""} — {preselectedPkg.level}{preselectedPkg.price ? ` · ${preselectedPkg.price}` : ""}
              </span>
            )}
          </div>
          <button className="bmodal__close" onClick={closeBooking} aria-label="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="bmodal__body" ref={scrollRef}>
          {submitted ? (
            <div className="bmodal__success">
              <div className="bmodal__success-icon">
                <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#ffc107" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3>Booking Request Sent!</h3>
              <p>Thank you, <strong>{formData.name}</strong>. We'll reach out to confirm at <strong>{formData.email}</strong>.</p>
              <button className="common-btn" onClick={closeBooking}>Close</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>

              {preselectedPkg && (
                <div className="bmodal__preselect">
                  <div className="bmodal__preselect-info">
                    <span className="bmodal__preselect-vehicle">{preselectedVehicle?.name}{preselectedServiceType ? ` — ${preselectedServiceType.label}` : ""}</span>
                    <span className="bmodal__preselect-pkg">{preselectedPkg.level}</span>
                  </div>
                  {preselectedPkg.quoteOnly ? (
                    <span className="bmodal__preselect-price" style={{ fontSize: "0.8rem" }}>Quote upon review</span>
                  ) : (
                    <span className="bmodal__preselect-price">{preselectedPkg.price}</span>
                  )}
                </div>
              )}

              <div className="bmodal__section">
                <h4 className="bmodal__section-title">
                  <span className="bmodal__step">1</span> Appointment
                </h4>
                <div className="bmodal__fields-row">
                  <div className="bfield">
                    <label>Date <span className="req">*</span></label>
                    <input type="date" name="date" value={formData.date} min={getToday()} onChange={handleChange} className={errors.date ? "has-error" : ""} />
                    {errors.date && <span className="field-error">{errors.date}</span>}
                  </div>
                  <div className="bfield">
                    <label>Time <span className="req">*</span></label>
                    <select name="time" value={formData.time} onChange={handleChange} className={errors.time ? "has-error" : ""}>
                      <option value="">Select a time</option>
                      {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.time && <span className="field-error">{errors.time}</span>}
                  </div>
                </div>
              </div>

              <div className="bmodal__section">
                <h4 className="bmodal__section-title">
                  <span className="bmodal__step">2</span> Vehicle Details
                </h4>
                <div className="bmodal__fields-row">
                  <div className="bfield">
                    <label>Vehicle Type <span className="req">*</span></label>
                    <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className={errors.vehicleType ? "has-error" : ""}>
                      <option value="">Select type</option>
                      <option value="Car">Car</option>
                      <option value="SUV">SUV</option>
                      <option value="Truck">Truck</option>
                      <option value="Work Van">Work Van</option>
                      <option value="Boat">Boat</option>
                    </select>
                    {errors.vehicleType && <span className="field-error">{errors.vehicleType}</span>}
                  </div>
                  <div className="bfield">
                    <label>Service Type <span className="req">*</span></label>
                    <select name="serviceType" value={formData.serviceType} onChange={handleChange} className={errors.serviceType ? "has-error" : ""}>
                      <option value="">Select type</option>
                      <option value="Interior">Interior</option>
                      <option value="Exterior">Exterior</option>
                      <option value="Full Service">Full Service</option>
                    </select>
                    {errors.serviceType && <span className="field-error">{errors.serviceType}</span>}
                  </div>
                </div>
                <div className="bmodal__fields-row">
                  <div className="bfield">
                    <label>Make <span className="req">*</span></label>
                    <input type="text" name="make" value={formData.make} onChange={handleChange} placeholder="e.g. Toyota" className={errors.make ? "has-error" : ""} />
                    {errors.make && <span className="field-error">{errors.make}</span>}
                  </div>
                  <div className="bfield">
                    <label>Model <span className="req">*</span></label>
                    <input type="text" name="model" value={formData.model} onChange={handleChange} placeholder="e.g. Camry" className={errors.model ? "has-error" : ""} />
                    {errors.model && <span className="field-error">{errors.model}</span>}
                  </div>
                </div>
              </div>

              <div className="bmodal__section">
                <h4 className="bmodal__section-title">
                  <span className="bmodal__step">3</span> Selected Package
                </h4>
                <div className="bfield bfield--full">
                  <label>Package <span className="req">*</span></label>
                  <select name="selectedPackage" value={formData.selectedPackage} onChange={handleChange} className={errors.selectedPackage ? "has-error" : ""}>
                    <option value="">Choose a package</option>
                    {ALL_PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>{pkg.label}</option>
                    ))}
                  </select>
                  {errors.selectedPackage && <span className="field-error">{errors.selectedPackage}</span>}
                  {formData.selectedPackage && (() => {
                    const pkg = ALL_PACKAGES.find((p) => p.id === formData.selectedPackage);
                    return pkg ? (
                      <div className="bmodal__pkg-preview">
                        <span>{pkg.vehicleName} — {pkg.serviceTypeLabel} — {pkg.level}</span>
                        {pkg.quoteOnly ? (
                          <span className="bmodal__pkg-preview-price" style={{ fontSize: "0.8rem" }}>Quote upon review</span>
                        ) : (
                          <span className="bmodal__pkg-preview-price">{pkg.price}</span>
                        )}
                        {pkg.duration && <span className="bmodal__pkg-preview-dur">{pkg.duration}</span>}
                      </div>
                    ) : null;
                  })()}
                </div>
              </div>

              <div className="bmodal__section">
                <h4 className="bmodal__section-title">
                  <span className="bmodal__step">4</span> Add-Ons
                </h4>
                <p className="bmodal__section-sub">Select any additional services</p>
                <div className="bmodal__addons">
                  {ADD_ONS.map((addon) => {
                    const checked = formData.addOns.includes(addon.id);
                    return (
                      <label key={addon.id} className={`baddon ${checked ? "baddon--checked" : ""}`}>
                        <input type="checkbox" checked={checked} onChange={() => handleAddOnToggle(addon.id)} />
                        <div className="baddon__check">
                          {checked && (
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <div className="baddon__info">
                          <span className="baddon__label">{addon.label}</span>
                          <span className="baddon__price">{addon.price}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="bmodal__section">
                <h4 className="bmodal__section-title">
                  <span className="bmodal__step">5</span> Additional Questions
                </h4>
                <div className="bfield bfield--full">
                  <label>Water & power access at service location? <span className="req">*</span></label>
                  <div className="bmodal__radio-group">
                    {["Yes", "No"].map((val) => (
                      <label key={val} className={`bradio ${formData.waterAccess === val ? "bradio--active" : ""}`}>
                        <input type="radio" name="waterAccess" value={val} checked={formData.waterAccess === val} onChange={handleChange} />
                        {val}
                      </label>
                    ))}
                  </div>
                  {errors.waterAccess && <span className="field-error">{errors.waterAccess}</span>}
                </div>
                <div className="bfield bfield--full">
                  <label>Special Instructions</label>
                  <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows="3" placeholder="Any special requests or notes..." />
                </div>
              </div>

              <div className="bmodal__section">
                <h4 className="bmodal__section-title">
                  <span className="bmodal__step">6</span> Your Information
                </h4>
                <div className="bmodal__fields-row">
                  <div className="bfield">
                    <label>Full Name <span className="req">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" className={errors.name ? "has-error" : ""} />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                  <div className="bfield">
                    <label>Phone <span className="req">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" className={errors.phone ? "has-error" : ""} />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                  </div>
                </div>
                <div className="bmodal__fields-row">
                  <div className="bfield">
                    <label>Email <span className="req">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email" className={errors.email ? "has-error" : ""} />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                  <div className="bfield">
                    <label>Address <span className="req">*</span></label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Service location address" className={errors.address ? "has-error" : ""} />
                    {errors.address && <span className="field-error">{errors.address}</span>}
                  </div>
                </div>
              </div>

              <div className="bmodal__footer">
                <button type="submit" className="common-btn bmodal__submit-btn">
                  Confirm Booking
                </button>
                <p className="bmodal__footer-note">We'll contact you within 24 hours to confirm.</p>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
