import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import SectionHeading from "../SectionHeading/SectionHeading";

import testimaonialBgImg from "/assets/img/bg/testimaonial-img-bg.png";


const sliderData = [
  {
    id: 1,
    name: "Roberts Bush",
    from: "From Canada",
    desp: "“There are many variations of passages of Lorem Ipsum available,butthe majority have suffered alteration in some form injected humour, or randomised”",
    img: "/assets/img/testmaonail/testimaonial.png",
  },
  {
    id: 2,
    name: "Butthe Bush",
    from: "From Canada",
    desp: "“There are many variations of passages of Lorem Ipsum available,butthe majority have suffered alteration in some form injected humour, or randomised”",
    img: "/assets/img/testmaonail/testmaonail_1.png",
  },
];

const Testimonial = () => {

  
  const swiperRef = useRef(null);
  return (
    <div>
      <div className="ak-height-125 ak-height-lg-80"></div>
     
        <div className="testimonal-heading" data-aos="fade-up">
          <SectionHeading
            title={"TESTIMONIALS"}
          />
      
        
      </div>
      <div className="ak-height-50 ak-height-lg-50"></div>
      <div className="container ">
        <div id="carouselExampleIndicators" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item p-2 active">
      <div className="bg-sec m-1 rounded-3 p-3  d-flex justify-content-center flex-column align-items-center">
        <div className="icon my-5" >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="109"
                          height="81"
                          viewBox="0 0 109 81"
                          fill="none"
                        >
                          <g opacity="0.7" clipPath="url(#clip0_219_726)">
                            <path
                              d="M24.8606 80.2504C27.2135 76.6896 47.9194 44.6582 51.3233 31.1053C53.5194 22.3053 51.8096 15.5445 45.739 9.14449C36.0449 -1.09865 19.8567 -1.11431 11.0096 6.43079C1.59785 14.4622 -1.14726 29.8504 5.45666 39.2622C10.539 46.4935 15.2292 48.219 25.1586 51.4503C25.4253 56.5797 24.9861 77.0975 24.8606 80.2504Z"
                              fill="#FFFF"
                            />
                            <path
                              d="M81.2214 80.2504C83.5743 76.6896 104.28 44.6582 107.668 31.1053C109.88 22.3053 108.155 15.5445 102.084 9.14449C92.4057 -1.09865 76.2175 -1.11431 67.3704 6.43079C57.9586 14.4622 55.1978 29.8504 61.8174 39.2622C66.8841 46.4935 71.5743 48.219 81.5194 51.4503C81.7861 56.5797 81.3312 77.0975 81.2214 80.2504Z"
                              fill="#FFFF"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_219_7264">
                              <rect
                                width="108.235"
                                height="80"
                                fill="white"
                                transform="translate(0.671997 0.966797)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
        <div className="card card-review col-10 ">
          <h5 className="text-dark">Gurkanwaljot Singh Brar </h5>
          <p className="text-secondary fst-italic py-3">Great Team! My car looks like new.
You can tell that their services are exquisite have competitive prices on their packages. Overall it was a great experience and I was very happy. I will definitely coming back for some more work on my car.</p>
        </div>
        <div className="icon my-5" style={{transform:'rotate(180deg)'}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="109"
                          height="81"
                          viewBox="0 0 109 81"
                          fill="none"
                        >
                          <g opacity="0.7" clipPath="url(#clip0_219_726)">
                            <path
                              d="M24.8606 80.2504C27.2135 76.6896 47.9194 44.6582 51.3233 31.1053C53.5194 22.3053 51.8096 15.5445 45.739 9.14449C36.0449 -1.09865 19.8567 -1.11431 11.0096 6.43079C1.59785 14.4622 -1.14726 29.8504 5.45666 39.2622C10.539 46.4935 15.2292 48.219 25.1586 51.4503C25.4253 56.5797 24.9861 77.0975 24.8606 80.2504Z"
                              fill="#FFFF"
                            />
                            <path
                              d="M81.2214 80.2504C83.5743 76.6896 104.28 44.6582 107.668 31.1053C109.88 22.3053 108.155 15.5445 102.084 9.14449C92.4057 -1.09865 76.2175 -1.11431 67.3704 6.43079C57.9586 14.4622 55.1978 29.8504 61.8174 39.2622C66.8841 46.4935 71.5743 48.219 81.5194 51.4503C81.7861 56.5797 81.3312 77.0975 81.2214 80.2504Z"
                              fill="#FFFF"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_219_7264">
                              <rect
                                width="108.235"
                                height="80"
                                fill="white"
                                transform="translate(0.671997 0.966797)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
      </div>
    </div>
    <div class="carousel-item p-2">
      <div className="bg-sec m-1 rounded-3 p-3  d-flex justify-content-center flex-column align-items-center">
        <div className="icon my-5" >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="109"
                          height="81"
                          viewBox="0 0 109 81"
                          fill="none"
                        >
                          <g opacity="0.7" clipPath="url(#clip0_219_726)">
                            <path
                              d="M24.8606 80.2504C27.2135 76.6896 47.9194 44.6582 51.3233 31.1053C53.5194 22.3053 51.8096 15.5445 45.739 9.14449C36.0449 -1.09865 19.8567 -1.11431 11.0096 6.43079C1.59785 14.4622 -1.14726 29.8504 5.45666 39.2622C10.539 46.4935 15.2292 48.219 25.1586 51.4503C25.4253 56.5797 24.9861 77.0975 24.8606 80.2504Z"
                              fill="#FFFF"
                            />
                            <path
                              d="M81.2214 80.2504C83.5743 76.6896 104.28 44.6582 107.668 31.1053C109.88 22.3053 108.155 15.5445 102.084 9.14449C92.4057 -1.09865 76.2175 -1.11431 67.3704 6.43079C57.9586 14.4622 55.1978 29.8504 61.8174 39.2622C66.8841 46.4935 71.5743 48.219 81.5194 51.4503C81.7861 56.5797 81.3312 77.0975 81.2214 80.2504Z"
                              fill="#FFFF"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_219_7264">
                              <rect
                                width="108.235"
                                height="80"
                                fill="white"
                                transform="translate(0.671997 0.966797)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
        <div className="card card-review col-10 ">
          <h5 className="text-dark">Gurkanwaljot Singh Brar </h5>
          <p className="text-secondary fst-italic py-3">Great Team! My car looks like new.
You can tell that their services are exquisite have competitive prices on their packages. Overall it was a great experience and I was very happy. I will definitely coming back for some more work on my car.</p>
        </div>
        <div className="icon my-5" style={{transform:'rotate(180deg)'}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="109"
                          height="81"
                          viewBox="0 0 109 81"
                          fill="none"
                        >
                          <g opacity="0.7" clipPath="url(#clip0_219_726)">
                            <path
                              d="M24.8606 80.2504C27.2135 76.6896 47.9194 44.6582 51.3233 31.1053C53.5194 22.3053 51.8096 15.5445 45.739 9.14449C36.0449 -1.09865 19.8567 -1.11431 11.0096 6.43079C1.59785 14.4622 -1.14726 29.8504 5.45666 39.2622C10.539 46.4935 15.2292 48.219 25.1586 51.4503C25.4253 56.5797 24.9861 77.0975 24.8606 80.2504Z"
                              fill="#FFFF"
                            />
                            <path
                              d="M81.2214 80.2504C83.5743 76.6896 104.28 44.6582 107.668 31.1053C109.88 22.3053 108.155 15.5445 102.084 9.14449C92.4057 -1.09865 76.2175 -1.11431 67.3704 6.43079C57.9586 14.4622 55.1978 29.8504 61.8174 39.2622C66.8841 46.4935 71.5743 48.219 81.5194 51.4503C81.7861 56.5797 81.3312 77.0975 81.2214 80.2504Z"
                              fill="#FFFF"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_219_7264">
                              <rect
                                width="108.235"
                                height="80"
                                fill="white"
                                transform="translate(0.671997 0.966797)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
      </div>
    </div>
    <div class="carousel-item p-2">
      <div className="bg-sec m-1 rounded-3 p-3  d-flex justify-content-center flex-column align-items-center">
        <div className="icon my-5" >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="109"
                          height="81"
                          viewBox="0 0 109 81"
                          fill="none"
                        >
                          <g opacity="0.7" clipPath="url(#clip0_219_726)">
                            <path
                              d="M24.8606 80.2504C27.2135 76.6896 47.9194 44.6582 51.3233 31.1053C53.5194 22.3053 51.8096 15.5445 45.739 9.14449C36.0449 -1.09865 19.8567 -1.11431 11.0096 6.43079C1.59785 14.4622 -1.14726 29.8504 5.45666 39.2622C10.539 46.4935 15.2292 48.219 25.1586 51.4503C25.4253 56.5797 24.9861 77.0975 24.8606 80.2504Z"
                              fill="#FFFF"
                            />
                            <path
                              d="M81.2214 80.2504C83.5743 76.6896 104.28 44.6582 107.668 31.1053C109.88 22.3053 108.155 15.5445 102.084 9.14449C92.4057 -1.09865 76.2175 -1.11431 67.3704 6.43079C57.9586 14.4622 55.1978 29.8504 61.8174 39.2622C66.8841 46.4935 71.5743 48.219 81.5194 51.4503C81.7861 56.5797 81.3312 77.0975 81.2214 80.2504Z"
                              fill="#FFFF"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_219_7264">
                              <rect
                                width="108.235"
                                height="80"
                                fill="white"
                                transform="translate(0.671997 0.966797)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
        <div className="card card-review col-10 ">
          <h5 className="text-dark">Gurkanwaljot Singh Brar </h5>
          <p className="text-secondary fst-italic py-3">Great Team! My car looks like new.
You can tell that their services are exquisite have competitive prices on their packages. Overall it was a great experience and I was very happy. I will definitely coming back for some more work on my car.</p>
        </div>
        <div className="icon my-5" style={{transform:'rotate(180deg)'}}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="109"
                          height="81"
                          viewBox="0 0 109 81"
                          fill="none"
                        >
                          <g opacity="0.7" clipPath="url(#clip0_219_726)">
                            <path
                              d="M24.8606 80.2504C27.2135 76.6896 47.9194 44.6582 51.3233 31.1053C53.5194 22.3053 51.8096 15.5445 45.739 9.14449C36.0449 -1.09865 19.8567 -1.11431 11.0096 6.43079C1.59785 14.4622 -1.14726 29.8504 5.45666 39.2622C10.539 46.4935 15.2292 48.219 25.1586 51.4503C25.4253 56.5797 24.9861 77.0975 24.8606 80.2504Z"
                              fill="#FFFF"
                            />
                            <path
                              d="M81.2214 80.2504C83.5743 76.6896 104.28 44.6582 107.668 31.1053C109.88 22.3053 108.155 15.5445 102.084 9.14449C92.4057 -1.09865 76.2175 -1.11431 67.3704 6.43079C57.9586 14.4622 55.1978 29.8504 61.8174 39.2622C66.8841 46.4935 71.5743 48.219 81.5194 51.4503C81.7861 56.5797 81.3312 77.0975 81.2214 80.2504Z"
                              fill="#FFFF"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_219_7264">
                              <rect
                                width="108.235"
                                height="80"
                                fill="white"
                                transform="translate(0.671997 0.966797)"
                              />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
      </div>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
      </div>
      <div className="ak-height-50 ak-height-lg"></div>
    </div>
  );
};

export default Testimonial;
