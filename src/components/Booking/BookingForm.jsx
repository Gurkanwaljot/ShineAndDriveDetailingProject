import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import servicePackages from "../../dataJson/servicePackages.json";

const TIME_SLOTS = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM",
  "4:00 PM", "5:00 PM",
];

const VEHICLE_TYPES = ["Car", "SUV", "Truck", "Van"];
const SERVICE_TYPES = ["Interior", "Exterior", "Full Service"];

const initialForm = {
  date: "",
  time: "",
  vehicleType: "",
  serviceType: "",
  vehicleMake: "",
  vehicleModel: "",
  selectedPackage: "",
  selectedCategory: "",
  addOns: [],
  waterAccess: "",
  powerAccess: "",
  specialInstructions: "",
  name: "",
  phone: "",
  email: "",
  address: "",
};

export default function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (location.state?.selectedPackage) {
      const pkg = location.state.selectedPackage;
      setForm((prev) => ({
        ...prev,
        selectedPackage: pkg.name,
        selectedCategory: pkg.category,
      }));
    }
  }, [location.state]);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleAddOnToggle = (addOnId) => {
    setForm((prev) => {
      const exists = prev.addOns.includes(addOnId);
      return {
        ...prev,
        addOns: exists
          ? prev.addOns.filter((id) => id !== addOnId)
          : [...prev.addOns, addOnId],
      };
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = "Please select a date.";
    if (!form.time) newErrors.time = "Please select a time.";
    if (!form.vehicleType) newErrors.vehicleType = "Please select a vehicle type.";
    if (!form.serviceType) newErrors.serviceType = "Please select a service type.";
    if (!form.vehicleMake.trim()) newErrors.vehicleMake = "Please enter your vehicle make.";
    if (!form.vehicleModel.trim()) newErrors.vehicleModel = "Please enter your vehicle model.";
    if (!form.selectedPackage) newErrors.selectedPackage = "Please select a package.";
    if (!form.waterAccess) newErrors.waterAccess = "Please answer this question.";
    if (!form.powerAccess) newErrors.powerAccess = "Please answer this question.";
    if (!form.name.trim()) newErrors.name = "Please enter your name.";
    if (!form.phone.trim()) newErrors.phone = "Please enter your phone number.";
    if (!form.email.trim()) newErrors.email = "Please enter your email.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Please enter a valid email.";
    if (!form.address.trim()) newErrors.address = "Please enter your address.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const selectedAddOns = servicePackages.addOns
        .filter((a) => form.addOns.includes(a.id))
        .map((a) => a.name);

      const { error } = await supabase.from("bookings").insert([
        {
          appointment_date: form.date,
          appointment_time: form.time,
          vehicle_type: form.vehicleType,
          service_type: form.serviceType,
          vehicle_make: form.vehicleMake,
          vehicle_model: form.vehicleModel,
          package_name: form.selectedPackage,
          package_category: form.selectedCategory,
          add_ons: selectedAddOns,
          water_access: form.waterAccess === "yes",
          power_access: form.powerAccess === "yes",
          special_instructions: form.specialInstructions,
          customer_name: form.name,
          customer_phone: form.phone,
          customer_email: form.email,
          customer_address: form.address,
        },
      ]);

      if (error) throw error;
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Booking submission error:", err);
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="booking-success">
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="success-icon mb-4">
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffc107"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="fw-bold mb-3">Booking Confirmed!</h2>
              <p className="text-muted mb-2">
                Thank you, <strong>{form.name}</strong>. Your appointment request has been received.
              </p>
              <p className="text-muted mb-4">
                We will reach out to <strong>{form.email}</strong> to confirm your booking details.
              </p>
              <div className="booking-summary-card p-4 mb-4">
                <div className="summary-row">
                  <span>Package</span>
                  <span>{form.selectedPackage}</span>
                </div>
                <div className="summary-row">
                  <span>Date</span>
                  <span>{form.date}</span>
                </div>
                <div className="summary-row">
                  <span>Time</span>
                  <span>{form.time}</span>
                </div>
                <div className="summary-row">
                  <span>Vehicle</span>
                  <span>{form.vehicleType} — {form.vehicleMake} {form.vehicleModel}</span>
                </div>
              </div>
              <button
                className="btn-book-now w-100"
                onClick={() => navigate("/pricing")}
              >
                Back to Packages
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const allPackages = servicePackages.categories.flatMap((cat) =>
    cat.packages.map((pkg) => ({ ...pkg, categoryName: cat.name }))
  );

  return (
    <div className="booking-form-wrapper">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            {location.state?.selectedPackage && (
              <div className="selected-package-banner mb-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="banner-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffc107" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="mb-0 small text-muted">Selected Package</p>
                    <p className="mb-0 fw-semibold">{location.state.selectedPackage.name}</p>
                  </div>
                  <div className="ms-auto">
                    <span className="package-price-badge">
                      {location.state.selectedPackage.priceDisplay}
                    </span>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>

              <div className="form-section mb-4">
                <div className="form-section-header">
                  <span className="section-number">A</span>
                  <h5 className="mb-0">Appointment</h5>
                </div>
                <div className="form-section-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        name="date"
                        className={`form-control booking-input ${errors.date ? "is-invalid" : ""}`}
                        value={form.date}
                        min={getTodayDate()}
                        onChange={handleChange}
                      />
                      {errors.date && <div className="invalid-feedback">{errors.date}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Time <span className="text-danger">*</span>
                      </label>
                      <select
                        name="time"
                        className={`form-select booking-input ${errors.time ? "is-invalid" : ""}`}
                        value={form.time}
                        onChange={handleChange}
                      >
                        <option value="">Select a time</option>
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                      {errors.time && <div className="invalid-feedback">{errors.time}</div>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section mb-4">
                <div className="form-section-header">
                  <span className="section-number">B</span>
                  <h5 className="mb-0">Vehicle Details</h5>
                </div>
                <div className="form-section-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Vehicle Type <span className="text-danger">*</span>
                      </label>
                      <div className="toggle-group">
                        {VEHICLE_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            className={`toggle-btn ${form.vehicleType === type ? "active" : ""}`}
                            onClick={() => {
                              setForm((prev) => ({ ...prev, vehicleType: type }));
                              if (errors.vehicleType) setErrors((prev) => ({ ...prev, vehicleType: "" }));
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      {errors.vehicleType && <div className="field-error">{errors.vehicleType}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Service Type <span className="text-danger">*</span>
                      </label>
                      <div className="toggle-group">
                        {SERVICE_TYPES.map((type) => (
                          <button
                            key={type}
                            type="button"
                            className={`toggle-btn ${form.serviceType === type ? "active" : ""}`}
                            onClick={() => {
                              setForm((prev) => ({ ...prev, serviceType: type }));
                              if (errors.serviceType) setErrors((prev) => ({ ...prev, serviceType: "" }));
                            }}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      {errors.serviceType && <div className="field-error">{errors.serviceType}</div>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section mb-4">
                <div className="form-section-header">
                  <span className="section-number">C</span>
                  <h5 className="mb-0">Vehicle Info</h5>
                </div>
                <div className="form-section-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Make <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="vehicleMake"
                        className={`form-control booking-input ${errors.vehicleMake ? "is-invalid" : ""}`}
                        placeholder="e.g. Toyota"
                        value={form.vehicleMake}
                        onChange={handleChange}
                      />
                      {errors.vehicleMake && <div className="invalid-feedback">{errors.vehicleMake}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Model <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="vehicleModel"
                        className={`form-control booking-input ${errors.vehicleModel ? "is-invalid" : ""}`}
                        placeholder="e.g. Camry"
                        value={form.vehicleModel}
                        onChange={handleChange}
                      />
                      {errors.vehicleModel && <div className="invalid-feedback">{errors.vehicleModel}</div>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section mb-4">
                <div className="form-section-header">
                  <span className="section-number">D</span>
                  <h5 className="mb-0">Selected Package</h5>
                </div>
                <div className="form-section-body">
                  <label className="form-label">
                    Package <span className="text-danger">*</span>
                  </label>
                  <select
                    name="selectedPackage"
                    className={`form-select booking-input ${errors.selectedPackage ? "is-invalid" : ""}`}
                    value={form.selectedPackage}
                    onChange={(e) => {
                      const selected = allPackages.find((p) => p.name === e.target.value);
                      setForm((prev) => ({
                        ...prev,
                        selectedPackage: e.target.value,
                        selectedCategory: selected ? selected.categoryName : "",
                      }));
                      if (errors.selectedPackage) setErrors((prev) => ({ ...prev, selectedPackage: "" }));
                    }}
                  >
                    <option value="">Select a package</option>
                    {servicePackages.categories.map((cat) => (
                      <optgroup key={cat.id} label={cat.name}>
                        {cat.packages.map((pkg) => (
                          <option key={pkg.id} value={pkg.name}>
                            {pkg.name} — {pkg.priceDisplay}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.selectedPackage && <div className="invalid-feedback">{errors.selectedPackage}</div>}
                  {form.selectedPackage && (
                    <p className="mt-2 mb-0 small text-muted">
                      Category: <strong>{form.selectedCategory}</strong>
                    </p>
                  )}
                </div>
              </div>

              <div className="form-section mb-4">
                <div className="form-section-header">
                  <span className="section-number">E</span>
                  <h5 className="mb-0">Add-Ons</h5>
                </div>
                <div className="form-section-body">
                  <p className="small text-muted mb-3">
                    Enhance your service with any of the following add-ons:
                  </p>
                  <div className="addon-grid">
                    {servicePackages.addOns.map((addon) => {
                      const isChecked = form.addOns.includes(addon.id);
                      return (
                        <label
                          key={addon.id}
                          className={`addon-item ${isChecked ? "checked" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleAddOnToggle(addon.id)}
                            className="d-none"
                          />
                          <div className="addon-check">
                            {isChecked && (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </div>
                          <div className="addon-info">
                            <span className="addon-name">{addon.name}</span>
                            <span className="addon-price">{addon.priceDisplay}</span>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="form-section mb-4">
                <div className="form-section-header">
                  <span className="section-number">F</span>
                  <h5 className="mb-0">Additional Questions</h5>
                </div>
                <div className="form-section-body">
                  <div className="row g-4">
                    <div className="col-md-6">
                      <label className="form-label">
                        Do you have water access? <span className="text-danger">*</span>
                      </label>
                      <div className="toggle-group">
                        {["yes", "no"].map((val) => (
                          <button
                            key={val}
                            type="button"
                            className={`toggle-btn ${form.waterAccess === val ? "active" : ""}`}
                            onClick={() => {
                              setForm((prev) => ({ ...prev, waterAccess: val }));
                              if (errors.waterAccess) setErrors((prev) => ({ ...prev, waterAccess: "" }));
                            }}
                          >
                            {val === "yes" ? "Yes" : "No"}
                          </button>
                        ))}
                      </div>
                      {errors.waterAccess && <div className="field-error">{errors.waterAccess}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Do you have power access? <span className="text-danger">*</span>
                      </label>
                      <div className="toggle-group">
                        {["yes", "no"].map((val) => (
                          <button
                            key={val}
                            type="button"
                            className={`toggle-btn ${form.powerAccess === val ? "active" : ""}`}
                            onClick={() => {
                              setForm((prev) => ({ ...prev, powerAccess: val }));
                              if (errors.powerAccess) setErrors((prev) => ({ ...prev, powerAccess: "" }));
                            }}
                          >
                            {val === "yes" ? "Yes" : "No"}
                          </button>
                        ))}
                      </div>
                      {errors.powerAccess && <div className="field-error">{errors.powerAccess}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label">Special Instructions</label>
                      <textarea
                        name="specialInstructions"
                        className="form-control booking-input"
                        rows={3}
                        placeholder="Any special requests, access notes, or details about your vehicle..."
                        value={form.specialInstructions}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section mb-4">
                <div className="form-section-header">
                  <span className="section-number">G</span>
                  <h5 className="mb-0">Customer Information</h5>
                </div>
                <div className="form-section-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">
                        Full Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        className={`form-control booking-input ${errors.name ? "is-invalid" : ""}`}
                        placeholder="John Smith"
                        value={form.name}
                        onChange={handleChange}
                      />
                      {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Phone Number <span className="text-danger">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className={`form-control booking-input ${errors.phone ? "is-invalid" : ""}`}
                        placeholder="(555) 123-4567"
                        value={form.phone}
                        onChange={handleChange}
                      />
                      {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Email Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        className={`form-control booking-input ${errors.email ? "is-invalid" : ""}`}
                        placeholder="john@email.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                      {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">
                        Address <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        className={`form-control booking-input ${errors.address ? "is-invalid" : ""}`}
                        placeholder="123 Main St, City, State"
                        value={form.address}
                        onChange={handleChange}
                      />
                      {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                    </div>
                  </div>
                </div>
              </div>

              {errors.submit && (
                <div className="alert alert-danger mb-4" role="alert">
                  {errors.submit}
                </div>
              )}

              <button
                type="submit"
                className="btn-submit-booking w-100"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Submitting...
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
