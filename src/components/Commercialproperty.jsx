// import React, { useEffect, useState } from "react";
// import Slider from "react-slick";
// import axios from "axios";
// import { FaBed, FaBath, FaHome } from "react-icons/fa";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// // const placeholderImage = "/assets/placeholder.jpg";

// const PropertyCard = ({ title, price, beds, baths, area, image }) => (
//   <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden border border-gray-100 transform transition duration-300 hover:-translate-y-2 mx-2">
//     <div className="relative">
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-56 object-cover"
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = placeholderImage;
//         }}
//       />
//     </div>

//     <div className="p-4 sm:p-5">
//       <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{title}</h3>
//       <p className="text-2xl font-bold text-indigo-700 mb-2">{price}</p>
//       <div className="flex items-center border-t pt-2 mt-2 text-gray-600 text-sm sm:text-base justify-between">
//         <div className="flex items-center gap-1">
//           <FaBed className="text-indigo-600" />
//           <span>{beds}</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <FaBath className="text-indigo-600" />
//           <span>{baths}</span>
//         </div>
//         <div className="flex items-center gap-1">
//           <FaHome className="text-indigo-600" />
//           <span>{area}</span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// const CommercialProperty = () => {
//   const [properties, setProperties] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/sale/all`);
//         if (response.data?.properties?.length) {
//           const mapped = response.data.properties.map((prop) => ({
//             id: prop._id,
//             title: prop.basicDetails?.title || "No title",
//             price: prop.basicDetails?.price
//               ? `₹${prop.basicDetails.price.toLocaleString()}`
//               : "Price N/A",
//             beds: prop.basicDetails?.bhkType || "-",
//             baths: prop.basicDetails?.bathrooms || "-",
//             area: prop.basicDetails?.area || "-",
//             image: prop.images?.[0]?.url || placeholderImage,
//           }));
//           setProperties(mapped);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProperties();
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: properties.length > 3,
//     speed: 600,
//     slidesToShow: Math.min(properties.length, 3),
//     slidesToScroll: 1,
//     centerMode: properties.length > 1,
//     centerPadding: "40px",
//     autoplay: properties.length > 1,
//     autoplaySpeed: 3000,
//     arrows: true,
//     responsive: [
//       { breakpoint: 1280, settings: { slidesToShow: Math.min(properties.length, 2), centerPadding: "30px" } },
//       { breakpoint: 768, settings: { slidesToShow: 1, centerPadding: "20px" } },
//     ],
//   };

//   if (loading)
//     return (
//       <div className="text-center py-16 text-gray-600 text-lg">Loading properties...</div>
//     );

//   if (properties.length === 0)
//     return (
//       <div className="text-center py-16 text-gray-600 text-lg">No commercial properties found.</div>
//     );

//   return (
//     <section className="bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
//         <div className="text-center mb-14">
//           <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent mb-3">
//             Commercial Properties
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
//             Explore premium commercial spaces designed to elevate your business — modern, strategic, and investment-worthy.
//           </p>
//         </div>

//         <div className="relative px-2 sm:px-4 lg:px-6">
//           <Slider {...settings}>
//             {properties.map((property) => (
//               <div key={property.id}>
//                 <PropertyCard {...property} />
//               </div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CommercialProperty;

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { FaBed, FaBath, FaHome } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const placeholderImage = "/images/placeholder.jpg";

const PropertyCard = ({ title, price, beds, baths, area, image }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl overflow-hidden border border-gray-100 transform transition duration-300 hover:-translate-y-2 mx-3">
    <div className="relative w-full h-64 sm:h-56">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = placeholderImage;
        }}
      />
    </div>

    <div className="p-4 sm:p-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
        {title}
      </h3>
      <p className="text-2xl font-bold text-indigo-700 mb-2">{price}</p>
      <div className="flex items-center border-t pt-2 mt-2 text-gray-600 text-sm sm:text-base justify-between">
        <div className="flex items-center gap-1">
          <FaBed className="text-indigo-600" />
          <span>{beds}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaBath className="text-indigo-600" />
          <span>{baths}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaHome className="text-indigo-600" />
          <span>{area}</span>
        </div>
      </div>
    </div>
  </div>
);

const CommercialProperty = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/sale/all`
        );
        if (response.data?.properties?.length) {
          const mapped = response.data.properties.map((prop) => ({
            id: prop._id,
            title: prop.basicDetails?.title || "No title",
            price: prop.basicDetails?.price
              ? `₹${prop.basicDetails.price.toLocaleString()}`
              : "Price N/A",
            beds: prop.basicDetails?.bhkType || "-",
            baths: prop.basicDetails?.bathrooms || "-",
            area: prop.basicDetails?.area || "-",
            image: prop.images?.[0]?.url || placeholderImage,
          }));
          setProperties(mapped);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const settings = {
    dots: true,
    infinite: properties.length > 1,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: properties.length > 1,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024, // tablet
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 768, // mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
          centerMode: false,
          autoplay: true,
          autoplaySpeed: 2500,
        },
      },
    ],
  };

  if (loading)
    return (
      <div className="text-center py-16 text-gray-600 text-lg">
        Loading properties...
      </div>
    );

  if (properties.length === 0)
    return (
      <div className="text-center py-16 text-gray-600 text-lg">
        No commercial properties found.
      </div>
    );

  return (
    <section className="bg-gradient-to-b from-gray-50 via-white to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent mb-3">
            Commercial Properties
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
            Explore premium commercial spaces designed to elevate your business — modern, strategic, and investment-worthy.
          </p>
        </div>

        <div className="relative px-2 sm:px-4 lg:px-6">
          <Slider {...settings}>
            {properties.map((property) => (
              <div key={property.id}>
                <PropertyCard {...property} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default CommercialProperty;
