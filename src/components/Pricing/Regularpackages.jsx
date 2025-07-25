import React from 'react'
import SectionHeading from '../SectionHeading/SectionHeading';
import packages from '../../dataJson/regularpackages.json'
export default function Regularpackages() {

  return (
    <div>
        <div className="container mt-5">
            
                <div className="my-5">
                    <SectionHeading
                title={"Regular Packages (Maintenance Level)"}
                />
                </div>
          
              <ul class="nav nav-tabs justify-content-center border-0 nav-style" id="myTab" role="tablist">
                <li class="nav-item " role="presentation">
                  <button class="nav-link active" id="homet-tab" data-bs-toggle="tab" data-bs-target="#homet-tab-pane" type="button" role="tab" aria-controls="homet-tab-pane" aria-selected="true">Cars</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="profilet-tab" data-bs-toggle="tab" data-bs-target="#profilet-tab-pane" type="button" role="tab" aria-controls="profilet-tab-pane" aria-selected="false">SUVs</button>
                </li>
                <li class="nav-item" role="presentation">
                  <button class="nav-link" id="contactT-tab" data-bs-toggle="tab" data-bs-target="#contactT-tab-pane" type="button" role="tab" aria-controls="contactT-tab-pane" aria-selected="false">Trucks</button>
                </li>
                
              </ul>
                  <div className="price-table-container">
              <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active py-5" id="homet-tab-pane" role="tabpanel" aria-labelledby="homet-tab" tabindex="0">
               
                  <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6">
         <div
      className={`pricing-card`}
      data-aos="fade-up"
      // data-aos-delay={aosDelay}
    >
      <div className="pricing-heading">
        <p className="title">Basic</p>
        <h2 className="discount-price">$150</h2>
      </div>
      <div className="option-all">
        {packages.basic.map((data) => (
          <div className="option" >
            <div className="icon">
              <img src="/assets/img/icon/price-table-icon.svg" alt="..." />
            </div>
            <p className="title">{data}</p>
          </div>
        ))}
      </div>
    
    </div>
      </div>
      <div className="col-lg-4 col-md-6">
         <div
      className={`pricing-card`}
      data-aos="fade-up"
      
    >
      <div className="pricing-heading">
        <p className="title">Essential</p>
        <h2 className="discount-price">$190</h2>
      </div>
      <div className="option-all">
        {packages.essential.map((data) => (
          <div className="option" >
            <div className="icon">
              <img src="/assets/img/icon/price-table-icon.svg" alt="..." />
            </div>
            <p className="title">{data}</p>
          </div>
        ))}
      </div>
    
    </div>
      </div>
      <div className="col-lg-4 col-md-6">
         <div
      className={`pricing-card active`}
      data-aos="fade-up"
      
    >
      <div className="pricing-heading">
        <p className="title">Premium</p>
        <h2 className="discount-price">$230</h2>
      </div>
      <div className="option-all">
        {packages.premium.map((data) => (
          <div className="option" >
            <div className="icon">
              <img src="/assets/img/icon/price-table-icon.svg" alt="..." />
            </div>
            <p className="title">{data}</p>
          </div>
        ))}
      </div>
    
    </div>
      </div>
    </div>
                 
              
                  </div>
                  <div class="tab-pane fade py-5" id="profilet-tab-pane" role="tabpanel" aria-labelledby="profilet-tab" tabindex="0">
                <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6">
         <div
      className={`pricing-card`}
      data-aos="fade-up"
      // data-aos-delay={aosDelay}
    >
      <div className="pricing-heading">
        <p className="title">Basic</p>
        <h2 className="discount-price">$170</h2>
      </div>
      <div className="option-all">
        {packages.basic.map((data) => (
          <div className="option" >
            <div className="icon">
              <img src="/assets/img/icon/price-table-icon.svg" alt="..." />
            </div>
            <p className="title">{data}</p>
          </div>
        ))}
      </div>
    
    </div>
      </div>
      <div className="col-lg-4 col-md-6">
         <div
      className={`pricing-card`}
      data-aos="fade-up"
      
    >
      <div className="pricing-heading">
        <p className="title">Essential</p>
        <h2 className="discount-price">$210</h2>
      </div>
      <div className="option-all">
        {packages.essential.map((data) => (
          <div className="option" >
            <div className="icon">
              <img src="/assets/img/icon/price-table-icon.svg" alt="..." />
            </div>
            <p className="title">{data}</p>
          </div>
        ))}
      </div>
    
    </div>
      </div>
      <div className="col-lg-4 col-md-6">
         <div
      className={`pricing-card active`}
      data-aos="fade-up"
      
    >
      <div className="pricing-heading">
        <p className="title">Premium</p>
        <h2 className="discount-price">$260</h2>
      </div>
      <div className="option-all">
        {packages.premium.map((data) => (
          <div className="option" >
            <div className="icon">
              <img src="/assets/img/icon/price-table-icon.svg" alt="..." />
            </div>
            <p className="title">{data}</p>
          </div>
        ))}
      </div>
    
    </div>
      </div>
    </div>
                </div>
                <div class="tab-pane fade py-5" id="contactT-tab-pane" role="tabpanel" aria-labelledby="contactT-tab" tabindex="0">
                 <div className="row justify-content-center">
      <div className="col-lg-4 col-md-6">
         <div
      className={`pricing-card`}
      data-aos="fade-up"
      // data-aos-delay={aosDelay}
    >
      <div className="pricing-heading">
        <p className="title">Basic</p>
        <h2 className="discount-price">$200</h2>
      </div>
      <div className="option-all">
        {packages.basic.map((data) => (
          <div className="option" >
            <div className="icon">
              <img src="/assets/img/icon/price-table-icon.svg" alt="..." />
            </div>
            <p className="title">{data}</p>
          </div>
        ))}
      </div>
    
    </div>
      </div>
      <div className="col-lg-4 col-md-6">
         <div
      className={`pricing-card`}
      data-aos="fade-up"
      
    >
      <div className="pricing-heading">
        <p className="title">Essential</p>
        <h2 className="discount-price">$240</h2>
      </div>
      <div className="option-all">
        {packages.essential.map((data) => (
          <div className="option" >
            <div className="icon">
              <img src="/assets/img/icon/price-table-icon.svg" alt="..." />
            </div>
            <p className="title">{data}</p>
          </div>
        ))}
      </div>
    
    </div>
      </div>
      <div className="col-lg-4 col-md-6">
         <div
      className={`pricing-card active`}
      data-aos="fade-up"
      
    >
      <div className="pricing-heading">
        <p className="title">Premium</p>
        <h2 className="discount-price">$280</h2>
      </div>
      <div className="option-all">
        {packages.premium.map((data) => (
          <div className="option" >
            <div className="icon">
              <img src="/assets/img/icon/price-table-icon.svg" alt="..." />
            </div>
            <p className="title">{data}</p>
          </div>
        ))}
      </div>
    
    </div>
      </div>
    </div>
                </div>
                </div>
              </div>
              </div>
    
        </div>
  )
}