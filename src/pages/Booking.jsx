import BookingForm from "../components/Booking/BookingForm";

export default function Booking() {
  return (
    <>
      <div className="page-hero">
        <div className="container">
          <h1 className="page-hero-title">Book Your Appointment</h1>
          <p className="page-hero-subtitle">
            Fill in your details below and we will confirm your booking shortly.
          </p>
        </div>
      </div>
      <BookingForm />
    </>
  );
}
