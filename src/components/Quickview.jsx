// // components/QuickViewModal.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom"; 
// import { Bed, Bath, Car, Ruler, Phone, Mail } from "lucide-react";

// const QuickView = ({ property, onClose }) => {
//   const navigate = useNavigate(); 
  
//   if (!property) return null;

//   // 💡 FIX: Assuming ID comes as '_id' from API, we rename it to 'id'
//   const {
//     _id: id, 
//     images,
//     listingType = "For Rent",
//     basicDetails = {},
//     location = {},
//     contactInfo = {},
//     description,
//   } = property;

//   // Yahaan hum sirf console.log kar rahe hain, navigation check handleViewFullDetails mein hai
//   if (!id) {
//     console.error("Property ID is missing or incorrect in the property object.");
//   }

//   const title = basicDetails.title || "No Title";
//   const price = basicDetails.price || basicDetails.monthlyRent || 0;
//   const imageUrl = images?.[0]?.url || "https://via.placeholder.com/400x250";
//   const fullAddress = location.fullAddress || location.city || "Unknown Location";

//   // Navigation Handler with Safety Check
//   const handleViewFullDetails = () => {
//     // Safety Check: Agar ID hi nahi hai toh navigate mat karo
//     if (!id) {
//         alert("Sorry, property details are unavailable. Missing ID.");
//         onClose(); 
//         return; 
//     }
    
//     // Quick View Modal ko band karein
//     onClose();

//     // Single general route par navigate karein: /property/:id
//     navigate(`/property/${id}`, { 
//         state: { 
//             listingType: listingType 
//         } 
//     }); 
//   };

//   // Price formatter (Cr / Lakh)
//   const formatPrice = (value) => {
//     if (!value) return "0";
//     if (value >= 10000000) {
//       return (value / 10000000).toFixed(2) + " Cr";
//     } else if (value >= 100000) {
//       return (value / 100000).toFixed(2) + " Lakhs";
//     } else {
//       return value.toLocaleString();
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-300">
//       <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-6 relative overflow-y-auto max-h-[90vh] animate-fadeIn">
        
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-5 text-3xl font-bold text-gray-600 hover:text-red-500 cursor-pointer transition"
//           aria-label="Close"
//         >
//           ×
//         </button>

//         <h2 className="text-2xl font-bold text-gray-800 mb-5 border-b pb-2">
//           Quick View
//         </h2>

//         {/* --- Main Content --- */}
//         <div className="flex flex-col md:flex-row gap-6">
//           {/* Image Section */}
//           <div className="md:w-1/2 w-full">
//             <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-lg group">
//               <img
//                 src={imageUrl}
//                 alt="Property"
//                 className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
//               />
//               <span
//                 className={`absolute top-3 left-3 px-4 py-1 rounded-full text-sm font-medium text-white shadow-lg ${
//                   listingType.toLowerCase().includes("rent")
//                     ? "bg-gradient-to-r from-green-500 to-green-600"
//                     : "bg-gradient-to-r from-blue-500 to-blue-600"
//                 }`}
//               >
//                 {listingType}
//               </span>
//             </div>
//           </div>

//           {/* Info Section */}
//           <div className="md:w-1/2 w-full space-y-4">
//             <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
//             <p className="text-sm text-gray-600">{fullAddress}</p>

//             <p className="text-3xl font-extrabold text-indigo-600 mt-2">
//               ₹{formatPrice(price)}
//               {listingType.toLowerCase().includes("rent") && (
//                 <span className="text-sm font-normal text-gray-500"> / month</span>
//               )}
//             </p>

//             <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
//               <Feature icon={<Bed size={20} />} label={basicDetails.bhkType || "NA"} subLabel="Bedrooms" />
//               <Feature icon={<Ruler size={20} />} label={basicDetails.area || "NA"} subLabel="Area (sq.ft)" />
//               <Feature icon={<Bath size={20} />} label={basicDetails.bathrooms || "NA"} subLabel="Bathrooms" />
//               <Feature icon={<Car size={20} />} label={basicDetails.garages || "NA"} subLabel="Garage" />
//             </div>

//             <div>
//               <strong className="text-gray-800">Description:</strong>
//               <p className="text-gray-600 mt-1 text-sm leading-relaxed">
//                 {description || "No description provided."}
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-4 mt-4">
//               <a
//                 href={`tel:${contactInfo.phone || ""}`}
//                 className="bg-yellow-400 text-black font-medium px-5 py-2 rounded-lg hover:bg-yellow-500 transition flex items-center gap-2 cursor-pointer"
//               >
//                 <Phone size={16} /> Call Now
//               </a>
//               <a
//                 href="mailto:Grihamateoffical@gmail.com"
//                 className="border border-gray-300 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition cursor-pointer"
//               >
//                 <Mail size={16} /> Mail
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* --- View Full Details Button --- */}
//         <div className="text-center mt-6">
//           <button
//             onClick={handleViewFullDetails}
//             className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition cursor-pointer shadow-md"
//           >
//             View Full Details
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Feature = ({ icon, label, subLabel }) => (
//   <div className="flex items-center gap-3">
//     <div className="p-2 bg-gray-100 rounded-full text-gray-700">{icon}</div>
//     <div>
//       <div className="font-semibold text-gray-800">{label}</div>
//       <div className="text-xs text-gray-500">{subLabel}</div>
//     </div>
//   </div>
// );

// export default QuickView;
/ components/QuickViewModal.jsx
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


