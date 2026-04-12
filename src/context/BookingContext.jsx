import React, { createContext, useContext, useState, useCallback } from "react";

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const openBooking = useCallback((data) => {
    setBookingData(data || null);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeBooking = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => setBookingData(null), 300);
  }, []);

  return (
    <BookingContext.Provider value={{ isOpen, bookingData, openBooking, closeBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
};
