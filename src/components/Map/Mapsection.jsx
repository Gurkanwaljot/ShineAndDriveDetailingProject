import React from 'react'
import Map from './Map'
import SectionHeading from '../SectionHeading/SectionHeading'

export default function Mapsection() {
  

  return (
    <div>
         <div className="ak-height-125 ak-height-lg-80"></div>
            <div className="my-5">
                <SectionHeading
                           title={"Our Location"}
                           />
          
            </div>
                <p className='text-start p-1' style={{fontSize:'13px'}}> *Travelling Charges may apply for the distance more than 20kms</p>           
      <Map/>
    </div>

)
}
