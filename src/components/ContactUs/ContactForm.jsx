import React, { useState, useRef } from "react";
import emailjs from "emailjs-com";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const formRef = useRef();
  const recaptchaRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    topic: "",
    msg: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name) {
      isValid = false;
      tempErrors["name"] = "Please enter your full name.";
    }

    if (!formData.email) {
      isValid = false;
      tempErrors["email"] = "Please enter your email address.";
    } else {
      let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!pattern.test(formData.email)) {
        isValid = false;
        tempErrors["email"] = "Please enter a valid email address.";
      }
    }

    if (!formData.topic) {
      isValid = false;
      tempErrors["topic"] = "Please enter your phone number.";
    }

    if (!formData.msg) {
      isValid = false;
      tempErrors["msg"] = "Please enter your message.";
    }

    if (!captchaToken) {
      isValid = false;
      tempErrors["captcha"] = "Please verify that you're not a robot.";
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      emailjs
        .sendForm(
          "", 
          "", 
          formRef.current,
          ""   
        )
        .then(
          (result) => {
            setAlertMessage("Your message has been sent successfully!");
            setFormData({
              name: "",
              email: "",
              topic: "",
              msg: "",
            });
            recaptchaRef.current.reset();
            setCaptchaToken(null);
            setErrors({});
          },
          (error) => {
            setAlertMessage("Something went wrong. Please try again later.");
          }
        );
    }
  };

  return (
    <div className="container" style={{marginTop:'250px',marginBottom:"250px"}}>
      <div className="contact-content">
        <div className="contact-title-section" data-aos="fade-up" data-aos-delay="700">
          <h2 className="contact-form-title ak-white-color text-uppercase">Contact Us</h2>
          <p>Home / Contact</p>
        </div>

        <div className="contact-form" data-aos="fade-up" data-aos-delay="750">
          <div id="ak-alert">{alertMessage && <p>{alertMessage}</p>}</div>

          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="from-inputs">
              <div className="type_1">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && <p className="error">{errors.name}</p>}
              </div>

              <div className="type_1">
                <label htmlFor="email">Email*</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
            </div>

            <div className="from-inputs">
              <div className="type_1">
                <label htmlFor="topic">Phone Number *</label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                />
                {errors.topic && <p className="error">{errors.topic}</p>}
              </div>
            </div>

            <div className="from-textarea">
              <div className="type_1">
                <label htmlFor="msg">Your Message*</label>
                <textarea
                  name="msg"
                  rows="5"
                  value={formData.msg}
                  onChange={handleChange}
                  required
                ></textarea>
                {errors.msg && <p className="error">{errors.msg}</p>}
              </div>
            </div>

            <div className="my-3">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey="" 
                onChange={(token) => setCaptchaToken(token)}
              />
              {errors.captcha && <p className="error">{errors.captcha}</p>}
            </div>

            <button type="submit" className="common-btn">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
