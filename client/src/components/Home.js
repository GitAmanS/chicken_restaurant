import React from 'react';
import './fonts.css';

const Home = () => {
  return (
    <div className='flex flex-col justify-center items-center'>

      <p className='mt-2 md:-mb-8 text-white text-lg md:text-2xl poppins-extrabold'>
        JUST CHICKEN AND NOTHING ELSE. WITH OUR SIGNATURE SAUCE.
      </p>

      <div className='flex flex-col'>
        <h1 className='anton-regular  text-white text-stroke md:-mb-24 md:text-[10rem]'>
          CRISPY CHICKEN
        </h1>
        <h1 className='anton-regular  text-white text-stroke md:-mb-24 md:text-[10rem]'>
          CRISPY CHICKEN
        </h1>
        <h1 className='anton-regular  text-white text-stroke md:-mb-24 md:text-[10rem]'>
          CRISPY CHICKEN
        </h1>
      </div>

    </div>
  );
}

export default Home;
