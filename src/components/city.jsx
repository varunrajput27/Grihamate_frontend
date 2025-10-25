import React from 'react';
import newDelhiImg from '../assets/new delhi.jpg';
import mumbaiImg from '../assets/mumbai.avif';
import goaImg from '../assets/goa.jpg';
import haryanaImg from '../assets/haryana.avif';
const cities = [
  { name: 'New Delhi', properties: 28, image: newDelhiImg, url: '#' },
  { name: 'Mumbai', properties: 12, image: mumbaiImg, url: '#' },
  { name: 'Goa', properties: 32, image: goaImg, url: '#' },
  { name: 'Haryana', properties: 19, image: haryanaImg, url: '#' },
//   { name: 'Uttar Pradesh', properties: 32, image: upImg, url: '#' },
];

const CityCard = ({ name, properties, image, url, className }) => {
  return (
    <a
      href={url}
      // className now accepts the layout class from the parent for flexibility
      className={`relative rounded-xl overflow-hidden shadow-lg bg-cover bg-center 
                  transition duration-300 ease-in-out transform hover:scale-[1.02] ${className}`}
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent/10"></div>
      
      {/* Content at the bottom */}
      <div className="absolute bottom-0 left-0 p-4 text-white z-10">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm opacity-90">{properties} properties</p>
      </div>
    </a>
  );
};

const City = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      
      {/* Header Section */}
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#333]">
          What city will you live in?
        </h1>
       <p className="mt-3 text-base text-gray-600 max-w-xl mx-auto">
  Discover your perfect home in the city you love. Explore the best neighborhoods and find a place that truly feels like yours.
</p>

      </header>

      {/* Grid Layout Section */}
      <div className="max-w-6xl mx-auto">
        <div 
          // Mobile/Small screens: 2 columns, auto-flowing.
          // Large screens (lg): 4 columns for the staggered layout.
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-min"
        >
          {/* Card 1: New Delhi (lg: col-span-2, row-span-2) */}
          <CityCard 
            {...cities[0]} 
            className="col-span-2 lg:col-span-2 lg:row-span-2 min-h-[250px] lg:min-h-[450px]" 
          />

          {/* Card 2: Mumbai (lg: col-span-1, row-span-1) */}
          <CityCard 
            {...cities[1]} 
            className="col-span-1 lg:col-span-1 min-h-[150px] lg:min-h-[215px]" 
          />
          
          {/* Card 3: Goa (lg: col-span-1, row-span-2) */}
          <CityCard 
            {...cities[2]} 
            className="col-span-1 lg:col-span-1 lg:row-span-2 min-h-[150px] lg:min-h-[450px] row-start-1 lg:row-start-auto" 
          />
          
          {/* Card 4: Haryana (lg: col-span-1, row-span-1) */}
          <CityCard 
            {...cities[3]} 
            className="col-span-1 lg:col-span-1 min-h-[150px] lg:min-h-[215px]" 
          />
          
        </div>
      </div>
    </div>
  );
};

export default City;