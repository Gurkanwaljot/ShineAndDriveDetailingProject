import React from "react";
import CommonPageHero from "../components/CommonPageHero/CommonPageHero";
import BookingForm from "../components/BookingForm/BookingForm";

const Booking = () => {
  return (
    <>
      <CommonPageHero title={"Book an Appointment"} />
      <BookingForm />
    </>
  );
};

export default Booking;
