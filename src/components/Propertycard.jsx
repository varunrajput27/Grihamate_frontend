// import React, { useState } from "react";
// import { Bed, Bath, Car, Ruler, Phone, Mail } from "lucide-react";
// import QuickView from "../components/Quickview"; // Ensure correct filename

// const PropertyCard = ({ property, onContactClick }) => {
//   const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

//   if (!property) return null;

//   // 🔹 Fallback-safe values
//   const listingType = property.listingType || "For Rent";
//   const imageUrl =
//     property.images?.[0]?.url ||
//     property.image ||
//     "https://via.placeholder.com/400x250";
//   const title =
//     property.basicDetails?.title || property.title || "Property Title";
//   const price =
//     property.basicDetails?.price ||
//     property.basicDetails?.monthlyRent ||
//     property.price ||
//     0;

//   const beds = property.basicDetails?.bhkType || "NA";
//   const baths = property.basicDetails?.bathrooms || "NA";

//   const areaValue = property.basicDetails?.Area;
//   const areaUnit = property.basicDetails?.areaUnit || "sq ft";
//   const area = areaValue ? `${areaValue} ${areaUnit}` : "NA";

//   const garages = property.basicDetails?.garages || "NA";
//   const location =
//     property.location?.fullAddress ||
//     property.location?.city ||
//     "Location not available";
//   const description = property.description || "No description available.";

//   const formatPrice = (value) => {
//     if (value >= 10000000) return (value / 10000000).toFixed(2) + " Cr";
//     if (value >= 100000) return (value / 100000).toFixed(2) + " Lakhs";
//     return value.toLocaleString();
//   };

//   return (
//     <>
//       <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-transform duration-300 hover:-translate-y-2 border border-gray-200 overflow-hidden max-w-sm w-full">
//         {/* 🔹 Image Section */}
//         <div className="relative group h-56 overflow-hidden">
//           {/* Badge */}
//           <div
//             className={`absolute top-4 left-4 px-4 py-1 rounded-full text-xs font-semibold text-white z-10 bg-gradient-to-r ${
//               listingType === "For Rent"
//                 ? "from-green-500 to-green-600"
//                 : "from-blue-500 to-blue-600"
//             } shadow-lg`}
//           >
//             {listingType}
//           </div>

//           {/* Image */}
//           <img
//             src={imageUrl}
//             alt={title}
//             className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = "https://via.placeholder.com/400x250";
//             }}
//           />

//           {/* Hover Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
//         </div>

//         {/* 🔹 Content Section */}
//         <div className="p-5 flex flex-col gap-3">
//           <h3 className="text-xl font-bold text-gray-900 truncate hover:text-indigo-600 transition-colors">
//             {title}
//           </h3>
//           <p className="text-sm text-gray-600">{location}</p>
//           <p className="text-gray-600 text-sm line-clamp-3">{description}</p>

//           {/* 🔹 Price */}
//           <p className="text-2xl font-extrabold text-indigo-600 mt-2">
//             ₹{formatPrice(price)}
//             {listingType === "For Rent" && (
//               <span className="text-sm font-normal"> / month</span>
//             )}
//           </p>

//           {/* 🔹 Features */}
//           <div className="grid grid-cols-4 gap-3 text-center mt-3">
//             <FeatureIcon icon={<Bed size={20} />} label={beds} subLabel="Bedrooms" />
//             <FeatureIcon icon={<Bath size={20} />} label={baths} subLabel="Bathrooms" />
//             <FeatureIcon icon={<Ruler size={20} />} label={area} subLabel="Area" />
//             <FeatureIcon icon={<Car size={20} />} label={garages} subLabel="Garage" />
//           </div>

//           {/* 🔹 Buttons */}
//           <div className="flex gap-3 mt-4">
//             <button
//               onClick={() => {
//                 if (property.contactInfo?.phone) {
//                   window.open(`tel:${property.contactInfo.phone}`);
//                 } else {
//                   alert("Phone number not available");
//                 }
//                 if (onContactClick) onContactClick(property);
//               }}
//               className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition cursor-pointer"
//             >
//               <Phone size={16} /> Call
//             </button>

//             <button
//               onClick={() => window.open("Mail to:Grihamateoffical@gmail.com")}
//               className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition cursor-pointer"
//             >
//               <Mail size={16} /> Mail
//             </button>

//             <button
//               onClick={() => setIsQuickViewOpen(true)}
//               className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-yellow-400 text-white font-semibold rounded-lg hover:bg-yellow-500 transition cursor-pointer"
//             >
//               View
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* 🔹 QuickView Modal */}
//       {isQuickViewOpen && (
//         <QuickView
//           property={property}
//           isOpen={isQuickViewOpen}
//           onClose={() => setIsQuickViewOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// // 🔹 Feature icon component
// const FeatureIcon = ({ icon, label, subLabel }) => (
//   <div className="flex flex-col items-center justify-center gap-1">
//     <div className="p-2 bg-gray-100 rounded-full text-gray-700">{icon}</div>
//     <div className="font-semibold text-gray-800">{label}</div>
//     <div className="text-xs text-gray-500">{subLabel}</div>
//   </div>
// );

// export default PropertyCard;
// components/QuickViewModal.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; 
import { Bed, Bath, Car, Ruler, Phone, Mail } from "lucide-react";

const QuickView = ({ property, onClose }) => {
  const navigate = useNavigate(); 
  if (!property) return null;

  const {
    _id: id, 
    images,
    listingType = "For Rent",
    basicDetails = {},
    location = {},
    contactInfo = {},
    description,
  } = property;

  const title = basicDetails.title || "No Title";
  const price = basicDetails.price || basicDetails.monthlyRent || 0;
  const imageUrl = images?.[0]?.url || "https://via.placeholder.com/400x250";
  const fullAddress = location.fullAddress || location.city || "Unknown Location";

  // ✅ Area fix: take capitalized or lowercase field
  const area = basicDetails.Area
    ? `${basicDetails.Area} ${basicDetails.areaUnit || "sq.ft"}`
    : basicDetails.area
    ? `${basicDetails.area} ${basicDetails.areaUnit || "sq.ft"}`
    : "NA";

  const handleViewFullDetails = () => {
    if (!id) {
      alert("Property details are unavailable. Missing ID.");
      onClose(); 
      return; 
    }
    onClose();
    navigate(`/property/${id}`, { state: { listingType } }); 
  };

  const formatPrice = (value) => {
    if (!value) return "0";
    if (value >= 10000000) return (value / 10000000).toFixed(2) + " Cr";
    if (value >= 100000) return (value / 100000).toFixed(2) + " Lakhs";
    return value.toLocaleString();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 md:p-8">
      <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-4 md:p-6 relative overflow-y-auto max-h-[90vh] animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-3xl font-bold text-gray-600 hover:text-red-500 cursor-pointer transition"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-5 border-b pb-2">
          Quick View
        </h2>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Image Section */}
          <div className="md:w-1/2 w-full">
            <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg group">
              <img
                src={imageUrl}
                alt="Property"
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
              />
              <span
                className={`absolute top-3 left-3 px-4 py-1 rounded-full text-sm font-medium text-white shadow-lg ${
                  listingType.toLowerCase().includes("rent")
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : "bg-gradient-to-r from-blue-500 to-blue-600"
                }`}
              >
                {listingType}
              </span>
            </div>
          </div>

          {/* Info Section */}
          <div className="md:w-1/2 w-full space-y-4 flex flex-col">
            <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">{fullAddress}</p>

            <p className="text-3xl font-extrabold text-indigo-600 mt-2">
              ₹{formatPrice(price)}
              {listingType.toLowerCase().includes("rent") && (
                <span className="text-sm font-normal text-gray-500"> / month</span>
              )}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
              <Feature icon={<Bed size={20} />} label={basicDetails.bhkType || "NA"} subLabel="Bedrooms" />
              <Feature icon={<Ruler size={20} />} label={area} subLabel="Area" />
              <Feature icon={<Bath size={20} />} label={basicDetails.bathrooms || "NA"} subLabel="Bathrooms" />
              <Feature icon={<Car size={20} />} label={basicDetails.garages || "NA"} subLabel="Garage" />
            </div>

            <div>
              <strong className="text-gray-800">Description:</strong>
              <p className="text-gray-600 mt-1 text-sm leading-relaxed">
                {description || "No description provided."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              <a
                href={`tel:${contactInfo.phone || ""}`}
                className="flex-1 flex items-center justify-center gap-2 bg-yellow-400 text-black font-medium px-5 py-2 rounded-lg hover:bg-yellow-500 transition cursor-pointer"
              >
                <Phone size={16} /> Call Now
              </a>
              <a
                href={`mailto:${contactInfo.email || "Grihamateoffical@gmail.com"}`}
                className="flex-1 flex items-center justify-center gap-2 border border-gray-300 px-5 py-2 rounded-lg font-medium hover:bg-gray-100 transition cursor-pointer"
              >
                <Mail size={16} /> Mail
              </a>
            </div>

            <div className="text-center mt-4 md:mt-6">
              <button
                onClick={handleViewFullDetails}
                className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition cursor-pointer shadow-md"
              >
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Feature = ({ icon, label, subLabel }) => (
  <div className="flex items-center gap-3">
    <div className="p-2 bg-gray-100 rounded-full text-gray-700">{icon}</div>
    <div>
      <div className="font-semibold text-gray-800">{label}</div>
      <div className="text-xs text-gray-500">{subLabel}</div>
    </div>
  </div>
);

export default QuickView;


