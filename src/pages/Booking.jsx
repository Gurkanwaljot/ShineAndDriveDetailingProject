import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import CommonPageHero from "../components/CommonPageHero/CommonPageHero";
import ServiceProgres from "../components/ServiceProgres/ServiceProgres";
import SectionHeading from "../components/SectionHeading/SectionHeading";

const Booking = () => {
  const { openBooking } = useBooking();
  const location = useLocation();

  useEffect(() => {
    openBooking(location.state || null);
  }, []);

  return (
    <>
      <CommonPageHero title={"Book an Appointment"} />
      <div className="ak-height-125 ak-height-lg-80"></div>
      <SectionHeading
        type={true}
        bgText={"PROCESS"}
        title={"PROCESS / FEATURE"}
        desp={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stan."}
      />
      <ServiceProgres />
    </>
  );
};

export default Booking;
