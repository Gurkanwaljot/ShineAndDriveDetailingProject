import React, { useState } from "react";
import { Link } from "react-router-dom";
import TextAnimation from "../../components/TextAnimation/TextAnimation";

import footerLogo from "/assets/img/icon/logo.png";

const footerDataArray = [
  {
    className: "footer-info",
    dataAosDelay: "0",
    phone: "(406) 555-0120",
    desp: "Shine and Drive brings your vehicle back to life with expert care and attention. From wash to wax, we set the standard. Shine with pride.",
  },
  {
    className: "footer-menu-one",
    dataAosDelay: "50",
    links: [
      { title: "About", link: "/about" },
      { title: "Service", link: "/service" },
      { title: "Packages", link: "/pricing" },
      { title: "Contact Us", link: "/contact" },
    ],
  },
  
  {
    className: "footer-address",
    dataAosDelay: "150",
    address: "901 N Pitt Str., Suite 170 Alexandria, NY, USA",
    email: "shineanddrive23@gmail.com",
    phone: "+1 (778) 710-1789",
  },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setMessage("Thank you for subscribing!");
      setEmail("");
    } else {
      setMessage("Please enter a valid email address.");
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <>
      <footer className="footer style-1 footer-bg">
        <div className="container">
          <div className="ak-height-40 ak-height-lg-60"></div>
          
          <div className="ak-height-70 ak-height-lg-30"></div>
          <div className="primary-color-border"></div>
          <div className="ak-height-35 ak-height-lg-30"></div>
          <div className="footer-logo">
            <img src={footerLogo} alt="footer-logo" style={{width:'200px'}} />
            <div className="ak-height-15 ak-height-lg-10"></div>
          </div>
          <div className="footer-content">
            {footerDataArray.map((item, index) => (
              <div
                key={index}
                className={item.className}
                data-aos="fade-up"
                data-aos-delay={item.dataAosDelay}
                data-aos-duration="500"
              >
                {item.phone && (
                  <>
                    <p className="desp">{item.desp}</p>
                  </>
                )}
                   
                {item.links && (
                  <div className="footer-menu">
                    <p className="menu-title">QUICK LINK</p>
                    {item.links.map((item, idx) => (
                      <TextAnimation
                        key={idx}
                        link={item.link}
                        title={item.title}
                        classNamePass="menu-item white"
                      />
                    ))}
                  </div>
                )}
                {item.address && (
                  <div className="footer-address">
                    <p className="adress-title">CONTACT</p>
                    
                    <Link to={`mailto:${item.email}`} className="email">
                      <span className="me-1">
                        <img src="/assets/img/icon/email.svg" alt="Email" width={17}/>
                      </span>
                      <span style={{fontSize:'15px'}}>{item.email}</span>
                    </Link>
                    <a href={`tel:${item.phone}`}  className="email">
                      <span className="me-1">
                        <i class="fa-solid fa-phone"></i >
                      </span>
                      <span style={{fontSize:'15px'}}>{item.phone}</span>
                    </a>
                     <div className="social-icon">
              <a href=" https://www.tiktok.com/search?q=shine_and_drive23&t=1750306119943
" target="_main">
                <i class="fa-brands fa-tiktok"></i>
              </a>
              <a href="https://www.instagram.com/shine_and_drive23/" target="_main">
                <i class="fa-brands fa-instagram"></i>
              </a>
              
            </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="ak-height-70 ak-height-lg-30"></div>
          <div className="primary-color-border"></div>
          <div className="copy-right text-center">
            <p className="title  text-hover-animaiton">
              Copyright 2025, All Right reserved
            </p>
           
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
