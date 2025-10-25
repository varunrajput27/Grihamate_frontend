import React, { useState, useEffect} from 'react';
import { State, City } from 'country-state-city';
import { useAuth } from "../context/AuthContext";
import { Toaster, toast } from "react-hot-toast";
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL; 

// --- CSS for Number Spinners (Self-contained styling) ---
const NumberSpinnerStyles = () => (
    <style>{`
        /* Hide the number input spinners for Chrome, Safari, Edge, Opera */
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { 
            -webkit-appearance: none;
            margin: 0;
        }

        /* Hide the number input spinners for Firefox */
        input[type=number] {
            -moz-appearance: textfield;
        }
    `}</style>
);

// Helper for regular text/number input fields
const TextInput = ({ id, name, value, onChange, label, type = "text", required = false, placeholder, currency = false, isTextArea = false, disabled }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <div className="relative rounded-md shadow-sm">
            {currency && type === "number" && (
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">{currency}</span>
                </div>
            )}
            {isTextArea ? (
                 <textarea
                    id={id}
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    required={required}
                    rows="3"
                    placeholder={placeholder}
                    disabled={disabled} 
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm resize-none ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    disabled={disabled} 
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm ${currency ? 'pl-8' : ''} ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                />
            )}
        </div>
    </div>
);

// Reusable Select Input Component (Reworked to handle dynamic children/options)
const SelectInput = ({ id, name, value, onChange, label, children, required = false, placeholder = "Select an option", options = [], disabled = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
        <select
            id={id}
            name={name}
            value={value || ''}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white shadow-sm cursor-pointer ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
        >
            <option value="" disabled hidden>{placeholder}</option>
            {/* If options array is provided (for State/City), map it. Otherwise use children. */}
            {options.length > 0 ? (
                options.map(option => (
                    // Using name as key and value for state/city data
                    <option key={option.isoCode || option.name} value={option.name}>
                        {option.name}
                    </option>
                ))
            ) : (
                children
            )}
        </select>
    </div>
);

// --- Component for Amenities Checkboxes (Used for Rent & Sale) ---
const AmenitiesCheckboxes = ({ formData, handleChange }) => {
    
    const commonAmenities = [
        'Parking', 'Gym', 'Swimming Pool', 'Clubhouse', 
        'Lift', 'Power Backup', 'Security', 'Intercom',
        'Visitor Parking', 'Maintenance Staff', 'Rain Water Harvesting','Children’s Play Area'
    ];
    
    const handleAmenityChange = (e) => {
        const { value, checked } = e.target;
        const currentAmenities = Array.isArray(formData.amenitiesFeatures) ? formData.amenitiesFeatures : [];
        
        if (checked) {
            handleChange({ target: { name: 'amenitiesFeatures', value: [...currentAmenities, value] } });
        } else {
            handleChange({ target: { name: 'amenitiesFeatures', value: currentAmenities.filter(a => a !== value) } });
        }
    };

    const selectedAmenities = Array.isArray(formData.amenitiesFeatures) ? formData.amenitiesFeatures : [];

    return (
        <div className="col-span-full mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Amenities & Features</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2 p-3 border border-gray-300 rounded-md bg-gray-50 max-h-48 overflow-y-auto">
                {commonAmenities.map((amenity) => (
                    <div key={amenity} className="flex items-center">
                        <input
                            id={amenity.replace(/\s/g, '_')}
                            name="amenitiesFeatures"
                            type="checkbox"
                            value={amenity}
                            checked={selectedAmenities.includes(amenity)}
                            onChange={handleAmenityChange}
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 cursor-pointer"
                        />
                        <label htmlFor={amenity.replace(/\s/g, '_')} className="ml-2 block text-sm text-gray-700 select-none cursor-pointer">
                            {amenity}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- RentDetailsFields (Includes Garage and Amenities) ---
const RentDetailsFields = ({ formData, handleChange }) => {
    
    const bhkOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK'];
    const propertyAgeOptions = ['0-1 year', '1-5 years', '5-10 years', '10-20 years', '20+ years'];
    const floorOptions = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor'];
    const bathroomOptions = ['1', '2', '3', '4', '5'];
    
    return (
        <>
            {/* BHK, Floor, Bathrooms, Garage */}
            <div className="grid grid-cols-4 gap-6 mb-6 ">
                <SelectInput 
                    id="bhkType" 
                    name="bhkType" 
                    value={formData.bhkType} 
                    onChange={handleChange} 
                    label="BHK/Type"
                    placeholder="Select BHK"
                    required
                >
                    {bhkOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </SelectInput>

                <SelectInput 
                    id="floor" 
                    name="floor" 
                    value={formData.floor} 
                    onChange={handleChange} 
                    label="Floor"
                    placeholder="Select Floor"
                >
                    {floorOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </SelectInput>

                <SelectInput 
                    id="bathrooms" 
                    name="bathrooms" 
                    value={formData.bathrooms} 
                    onChange={handleChange} 
                    label="Bathrooms"
                    placeholder="Select Bathrooms"
                >
                    {bathroomOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </SelectInput>
                
                {/* Garage for Rent */}
                <SelectInput
                    id="garages"
                    name="garages"
                    value={formData.garages}
                    onChange={handleChange}
                    label="Garage/Parking"
                    placeholder="Select Option"
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </SelectInput>
            </div>

            {/* Monthly Rent, Security Deposit, Area (Sq Ft), Maintenance */}
            <div className="grid grid-cols-4 gap-6 mb-6">
                <TextInput
                    id="monthlyRent"
                    name="monthlyRent"
                    value={formData.monthlyRent}
                    onChange={handleChange}
                    label="Monthly Rent"
                    type="number"
                    required
                    placeholder="Enter rent amount"
                    currency="₹"
                />
                
                <TextInput
                    id="securityDeposit"
                    name="securityDeposit"
                    value={formData.securityDeposit}
                    onChange={handleChange}
                    label="Security Deposit"
                    type="number"
                    placeholder="Enter deposit amount"
                    currency="₹"
                />
                
                 <TextInput
                    id="Area"
                    name="Area"
                    value={formData.Area}
                    onChange={handleChange}
                    label="Area (sq ft)"
                    type="number"
                    required
                    placeholder="Enter area in sq ft"
                />
                
                <TextInput
                    id="maintenanceCharges"
                    name="maintenanceCharges"
                    value={formData.maintenanceCharges}
                    onChange={handleChange}
                    label="Maintenance Charge"
                    type="number"
                    placeholder="Enter maintenance charge"
                    currency="₹"
                />
            </div>

            {/* Property Facing, Property Age */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                 <SelectInput 
                    id="propertyFacing" 
                    name="propertyFacing" 
                    value={formData.propertyFacing} 
                    onChange={handleChange} 
                    label="Property Facing"
                    placeholder="Select Direction"
                >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                </SelectInput>
                
                <SelectInput 
                    id="propertyAge" 
                    name="propertyAge" 
                    value={formData.propertyAge} 
                    onChange={handleChange} 
                    label="Property Age"
                    placeholder="Select Age"
                >
                    {propertyAgeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </SelectInput>
            </div>
            
            {/* Amenities/Features - Checkboxes for Rent */}
            <AmenitiesCheckboxes formData={formData} handleChange={handleChange} />
        </>
    );
};



const SaleDetailsFields = ({ formData, handleChange }) => {
    
    // Options for Sale fields
    const floorOptions = ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor'];
    const bhkOptions = ['1BHK', '2BHK', '3BHK', '4BHK', '5BHK'];
    
    // Options that were missing for Sale:
    const bathroomOptions = ['1', '2', '3', '4', '5'];
    const propertyAgeOptions = ['0-1 year', '1-5 years', '5-10 years', '10-20 years', '20+ years'];

    return (
        <>
            {/* Price Fields, Area, and BHK/Type */}
            <div className="grid grid-cols-4 gap-6 mb-6"> 
                {/* BHK/Type - Shifted to new row for better grouping/spacing, but kept here for now based on your structure */}
                <SelectInput 
                    id="bhkType" 
                    name="bhkType" 
                    value={formData.bhkType} 
                    onChange={handleChange} 
                    label="BHK/Type"
                    placeholder="Select BHK"
                    required
                >
                    {bhkOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </SelectInput>

                {/* Selling Price */}
                <TextInput
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    label="Selling Price"
                    type="number"
                    required
                    placeholder="Enter price"
                />
                {/* Price Unit */}
                <SelectInput
                    id="priceUnit"
                    name="priceUnit"
                    value={formData.priceUnit}
                    onChange={handleChange}
                    label="Price Unit"
                    placeholder="Select Unit"
                >
                    <option value="Lakhs">Lakhs</option>
                    <option value="Crores">Crores</option>
                </SelectInput>
                {/* Carpet Area */}
                <TextInput
                    id="Area"
                    name="Area"
                    value={formData.Area}
                    onChange={handleChange}
                    label="Area (Sq Ft)"
                    type="number"
                    placeholder="Enter area"
                />
            </div>
            
            {/* Status, Floor, Garage, Bathrooms */}
            <div className="grid grid-cols-4 gap-6 mb-6"> 
                
                {/* Property Status */}
                <SelectInput
                    id="propertyStatus"
                    name="propertyStatus"
                    value={formData.propertyStatus}
                    onChange={handleChange}
                    label="Property Status"
                    placeholder="Select Status"
                >
                    <option value="Ready to Move">Ready to Move</option>
                    <option value="Under Construction">Under Construction</option>
                </SelectInput>
                {/* Floor */}
                <SelectInput 
                    id="floor" 
                    name="floor" 
                    value={formData.floor} 
                    onChange={handleChange} 
                    label="Floor"
                    placeholder="Select Floor"
                >
                    {floorOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </SelectInput>
                
                {/* 🔥 ADDED: Bathrooms for Sale 🔥 */}
                <SelectInput 
                    id="bathrooms" 
                    name="bathrooms" 
                    value={formData.bathrooms} 
                    onChange={handleChange} 
                    label="Bathrooms"
                    placeholder="Select Bathrooms"
                >
                    {bathroomOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </SelectInput>

                {/* Garage for Sale */}
                <SelectInput
                    id="garages"
                    name="garages"
                    value={formData.garages}
                    onChange={handleChange}
                    label="Garage/Parking"
                    placeholder="Select Option"
                >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </SelectInput>
            </div>

            {/* Property Facing and Property Age */}
            <div className="grid grid-cols-2 gap-6 mb-6">
                
                {/* 🔥 ADDED: Property Facing for Sale 🔥 */}
                <SelectInput 
                    id="propertyFacing" 
                    name="propertyFacing" 
                    value={formData.propertyFacing} 
                    onChange={handleChange} 
                    label="Property Facing"
                    placeholder="Select Direction"
                >
                    <option value="North">North</option>
                    <option value="South">South</option>
                    <option value="East">East</option>
                    <option value="West">West</option>
                </SelectInput>
                
                {/* 🔥 ADDED: Property Age for Sale 🔥 */}
                <SelectInput 
                    id="propertyAge" 
                    name="propertyAge" 
                    value={formData.propertyAge} 
                    onChange={handleChange} 
                    label="Property Age"
                    placeholder="Select Age"
                >
                    {propertyAgeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </SelectInput>
            </div>
            
            {/* Amenities/Features - Checkboxes for Sale */}
            <AmenitiesCheckboxes formData={formData} handleChange={handleChange} />
        </>
    );
};

// --- LocationFields (Restored original style) ---
const LocationFields = ({ formData, handleChange }) => {
    const countryCode = "IN"; 
    const [statesOfIndia, setStatesOfIndia] = useState([]);
    const [citiesOfSelectedState, setCitiesOfSelectedState] = useState([]);

    useEffect(() => {
        const allStates = State.getStatesOfCountry(countryCode);
        setStatesOfIndia(allStates);
    }, []);

    useEffect(() => {
        if (formData.state) {
            const selectedState = statesOfIndia.find(s => s.name === formData.state);
            
            if (selectedState) {
                const cities = City.getCitiesOfState(countryCode, selectedState.isoCode);
                cities.sort((a, b) => a.name.localeCompare(b.name));
                setCitiesOfSelectedState(cities);
            } else {
                setCitiesOfSelectedState([]);
            }
        } else {
            setCitiesOfSelectedState([]);
        }
    }, [formData.state, statesOfIndia]); 

    const handleStateChange = (e) => {
        const newState = e.target.value;
        
        if (formData.city && formData.state !== newState) {
            handleChange({ target: { name: 'city', value: '' } }); 
        }
        
        handleChange(e); 
    };

    const cityOptions = citiesOfSelectedState;

    return (
        // Style restored to simple padding
        <div className="p-6"> 
            <h3 className="text-gray-400 mb-6 text-sm font-medium">Location</h3>
            
            <div className="grid grid-cols-3 gap-6 mb-6">
                
                {/* STATE Dropdown */}
                <SelectInput
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange} 
                    label="State"
                    options={statesOfIndia}
                    required
                    placeholder="Select State"
                    disabled={!statesOfIndia.length}
                />
                
                {/* CITY Dropdown */}
                <SelectInput
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    label="City"
                    options={cityOptions}
                    required
                    placeholder={formData.state ? (cityOptions.length ? "Select City" : "No cities found") : "First select State"}
                    disabled={!formData.state || !cityOptions.length} 
                />
                
                {/* Pincode Input */}
                <TextInput
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    label="Pincode"
                    type="number"
                    required
                    placeholder="Enter Pincode"
                />
            </div>
            
            {/* Full Address */}
            <TextInput
                id="fullAddress"
                name="fullAddress"
                value={formData.fullAddress}
                onChange={handleChange}
                label="Full address"
                placeholder="Enter Complete address"
                isTextArea
            />
        </div>
    );
};


// --- DescriptionAndImagesFields (Restored original style) ---
const DescriptionAndImagesFields = ({ formData, handleChange, handleFileChange, handleVideoFileChange }) => (
    // Style restored to simple padding
    <div className="p-6"> 
        <h3 className="text-gray-400 mb-6 text-sm font-medium">Description & Images</h3>

        {/* Description */}
        <div className="mb-6">
            <TextInput
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                label="Description"
                placeholder="Description your property, amenities, nearby facilities,etc..."
                isTextArea
            />
        </div>
        
        {/* Property Images */}
        <div className="mb-6">
            <label htmlFor="propertyImages" className="block text-sm text-gray-700 mb-2">Property Images</label>
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                <p className="mt-2 text-sm text-gray-600">Upload property images (max 10 images)</p>
                
                <div className="mt-4 cursor-pointer">
                    <input
                        type="file"
                        id="propertyImages"
                        name="propertyImages"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="block text-sm text-gray-500 mx-auto
                                 file:py-2 file:px-4 file:rounded-full file:border-0 
                                 file:text-sm file:font-semibold file:bg-indigo-50 
                                 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" 
                    />
                </div>
            </div>
        </div>

        {/* Video Input (Available for both Rent and Sale) */}
        <div className="mb-6 cursor-pointer">
            <label htmlFor="propertyVideo" className="block text-sm text-gray-700 mb-2">Property Video (Optional)</label>
            <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18H3a2 2 0 01-2-2V8a2 2 0 012-2h3.93l.896-.807A2 2 0 018.667 5H15a2 2 0 012 2v10a2 2 0 01-2 2H5z"></path></svg>
                <p className="mt-2 text-sm text-gray-600">Upload one property video (Max size 50MB)</p>
                <div className="mt-4">
                    <input
                        type="file"
                        id="propertyVideo"
                        name="propertyVideo"
                        accept="video/*"
                        onChange={handleVideoFileChange} 
                        className="block text-sm text-gray-500 mx-auto
                                 file:py-2 file:px-4 file:rounded-full file:border-0 
                                 file:text-sm file:font-semibold file:bg-indigo-50 
                                 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" 
                    />
                </div>
            </div>
        </div>
    </div>
);


// --- ContactFields (Auto-fill logic, Restored original style) ---
const ContactFields = ({ formData, handleChange, setFormData }) => {

      const { user } = useAuth(); 
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                ownerName: user.fullname || prev.ownerName || '',
                phoneNumber: user.phone || prev.phoneNumber || '',       // Use 'phone'
                emailAddress: user.email || prev.emailAddress || '',
            }));
        }
    }, [user, setFormData]);

    return (
        // Style restored to simple padding
        <div className="p-6"> 
            <h3 className="text-gray-400 mb-6 text-sm font-medium">Contact Information</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
                <TextInput
                    id="ownerName"
                    name="ownerName"
                    value={formData.ownerName}
                    onChange={handleChange}
                    label="Owner Name"
                    type="text"
                    required
                    placeholder="Enter owner name"
                    disabled={!!user} // Disabled if user is logged in
                />
                <TextInput
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    label="Phone Number"
                    type="tel"
                    required
                    placeholder="Enter phone number"
                    disabled={!!user} // Disabled if user is logged in
                />
            </div>
            
            <TextInput
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleChange}
                label="Email Address"
                type="email"
                placeholder="Enter email address"
                disabled={!!user} // Disabled if user is logged in
            />
            {user && (
                <p className="mt-2 text-xs text-green-600">
                    * Details auto-filled from your logged-in user profile (Owner).
                </p>
            )}
        </div>
    );
};

// Move this OUTSIDE NearbyFields component
const NearbyInputPair = ({ facilityType, formData, handleChange }) => {
    
    let detailKey;
    let distanceKey;

    // 🔥 FIX: Check for the special case "healthMedicine" and assign correct keys
    if (facilityType === 'healthMedicine') {
        detailKey = 'healthMedicineDetails';
        distanceKey = 'healthMedicineDistance';
    } else {
        // Baaki sabhi fields (education, food, travel) ke liye, jinki key 
        // already all-lowercase ya simple camelCase mein set hai
        const normalizedType = facilityType.toLowerCase();
        detailKey = `${normalizedType}Details`;
        distanceKey = `${normalizedType}Distance`;
    }

    // getLabel function abhi bhi normalizedType use kar sakta hai label ke liye,
    // ya aap use bhi theek kar sakte hain:
    const getLabel = (key) => {
        // Yahan 'healthMedicine' ke liye 'healthmedicine' hi aayega agar 'normalizedType' use kiya.
        // Label ko theek karne ke liye:
        const labelKey = facilityType.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase());
        return labelKey; 
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <TextInput
                id={detailKey}
                name={detailKey} // 🔥 Ab yahan 'healthMedicineDetails' use hoga 🔥
                value={formData[detailKey] ?? ''}
                onChange={handleChange}
                // Label function ko bhi theek kiya taki "healthMedicine" ka label "Health Medicine" aaye
                label={getLabel(facilityType)} 
                type="text"
                placeholder={`Enter near ${getLabel(facilityType)} details`}
            />
            <TextInput
                id={distanceKey}
                name={distanceKey} // 🔥 Ab yahan 'healthMedicineDistance' use hoga 🔥
                value={formData[distanceKey] ?? ''}
                onChange={handleChange}
                label="Distance"
                type="text"
                placeholder="e.g., 500m / 2km"
            />
        </div>
    );
};
const NearbyFields = ({ formData, handleChange }) => {
    return (
        <div className="p-6"> 
            <h3 className="text-gray-400 mb-6 text-sm font-medium">What's Nearby</h3>
            <div className="space-y-6">
                <NearbyInputPair facilityType="education" formData={formData} handleChange={handleChange} />
                <NearbyInputPair facilityType="healthMedicine" formData={formData} handleChange={handleChange} />
                <NearbyInputPair facilityType="food" formData={formData} handleChange={handleChange} />
                <NearbyInputPair facilityType="travel" formData={formData} handleChange={handleChange} />
            </div>
        </div>
    );
};


const RadioInput = ({ id, name, value, checkedValue, onChange, label }) => (
    <div className="flex items-center">
        <input
            type="radio"
            id={id}
            name={name}
            value={value}
            checked={checkedValue === value}
            onChange={onChange}
            className="form-radio h-5 w-5 text-indigo-600 border-gray-300 focus:ring-indigo-500 cursor-pointer"
        />
        <label htmlFor={id} className="ml-2 text-base text-gray-800 font-medium cursor-pointer select-none">
            {label}
        </label>
    </div>
);

// --- Main List Property Component ---
const ListProperty = ({ onClose }) => {    
    const { user, token } = useAuth();
    const [formData, setFormData] = useState({
        propertyType: 'Apartment',
        listingType: 'For Rent',
        title: '',
        furnishingStatus: '',
        // Rent/Sale Fields
        bhkType: '', 
        floor: '', 
        bathrooms: '', 
        monthlyRent: '', 
        securityDeposit: '',
        Area: '', 
        maintenanceCharges: '',
        propertyFacing: '', 
        propertyAge: '',
        amenitiesFeatures: [], 
        // Sale Fields
        price: '', 
        priceUnit: 'Lakhs', 
        carpetArea: '', 
        propertyStatus: 'Ready to Move', 
        garages: 'No', 
        // Media Fields
        propertyVideo: null, 
        propertyImages: null,
        // Location Fields
        city: '',
        state: '', 
        pincode: '', 
        fullAddress: '',
        description: '',
        // Nearby Fields
        educationDetails: '',
        educationDistance: '',
        healthMedicineDetails: '',
        healthMedicineDistance: '',
        foodDetails: '',
        foodDistance: '',
        travelDetails: '',
        travelDistance: '',
        // Contact Fields
        ownerName: '',
        phoneNumber: '',
        emailAddress: '',
    });

    const listingTypes = ['For Rent', 'For Sale'];

    // Universal change handler
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value,
  }));
};

    // Handler for image file input
    const handleFileChange = (e) => {
        setFormData(prev => ({ ...prev, propertyImages: e.target.files }));
    };

    // Handler for video file input
    const handleVideoFileChange = (e) => {
        setFormData(prev => ({ ...prev, propertyVideo: e.target.files ? e.target.files[0] : null }));
    };

    const handleListingTypeChange = (e) => {
        const newListingType = e.target.value;
        setFormData(prev => ({ 
            ...prev, 
            listingType: newListingType,
            // Clear incompatible fields when switching types (simple clearing)
            bhkType: newListingType === 'For Rent' ? prev.bhkType : '', 
            monthlyRent: newListingType === 'For Rent' ? prev.monthlyRent : '',
            securityDeposit: newListingType === 'For Rent' ? prev.securityDeposit : '',
            maintenanceCharges: newListingType === 'For Rent' ? prev.maintenanceCharges : '',
            
            price: newListingType === 'For Sale' ? prev.price : '',
            priceUnit: newListingType === 'For Sale' ? prev.priceUnit : 'Lakhs',
            carpetArea: newListingType === 'For Sale' ? prev.carpetArea : '',
            propertyStatus: newListingType === 'For Sale' ? prev.propertyStatus : 'Ready to Move',
        }));
    };



const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true); // 🔥 Start spinner & disable button

    const token = localStorage.getItem('token'); 
    if (!token) {
        setIsSubmitting(false); // reset button
        return;
    }

    const endpoint = formData.listingType === 'For Rent' 
        ? `${BASE_URL}/api/rent/add` 
        : `${BASE_URL}/api/sale/add`;

    const apiFormData = new FormData();
    
    const basicDetails = {
        title: formData.title,
        Area: Number(formData.Area) || 0,
        bhkType: formData.bhkType,
        furnishingStatus: formData.furnishingStatus,
        propertyFacing: formData.propertyFacing,
        propertyAge: formData.propertyAge,
        floor: formData.floor,
        garages: formData.garages,
        amenities: formData.amenitiesFeatures,
        ...(formData.listingType === 'For Rent' ? {
            monthlyRent: formData.monthlyRent,
            securityDeposit: formData.securityDeposit,
            maintenanceCharges: formData.maintenanceCharges,
            bathrooms: formData.bathrooms,
        } : {
            price: formData.price,
            priceUnit: formData.priceUnit,
            propertyStatus: formData.propertyStatus,
            bathrooms: formData.bathrooms,
        }),
    };

    const location = {
        state: formData.state,
        city: formData.city,
        fullAddress: formData.fullAddress,
        pincode: formData.pincode,
    };

    const whatsNearby = {
        education: [{ name: formData.educationDetails, distance: formData.educationDistance }].filter(item => item.name?.trim() !== ''),
        health: [{ name: formData.healthMedicineDetails, distance: formData.healthMedicineDistance }].filter(item => item.name?.trim() !== ''),
        food: [{ name: formData.foodDetails, distance: formData.foodDistance }].filter(item => item.name?.trim() !== ''),
        travel: [{ name: formData.travelDetails, distance: formData.travelDistance }].filter(item => item.name?.trim() !== ''),
    };

    const contactInfo = {
        owner: formData.ownerName,
        phone: formData.phoneNumber,
        email: formData.emailAddress,
    };

    apiFormData.append('propertyType', formData.propertyType);
    apiFormData.append('listingType', formData.listingType);
    apiFormData.append('basicDetails', JSON.stringify(basicDetails));
    apiFormData.append('location', JSON.stringify(location));
    apiFormData.append('whatsNearby', JSON.stringify(whatsNearby));
    apiFormData.append('contactInfo', JSON.stringify(contactInfo));
    apiFormData.append('description', formData.description);

   if (formData.propertyImages?.length > 0) {
    const imagesArray = Array.from(formData.propertyImages); // convert FileList to array
    imagesArray.forEach(file => apiFormData.append('propertyImages', file));
}



if (formData.propertyVideo) {
    apiFormData.append('propertyVideo', formData.propertyVideo);
}


    try {
        const response = await axios.post(endpoint, apiFormData, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
       
        toast.success(response.data.message, { duration: 3000, position: "top-right" });
        setTimeout(() => {
        onClose();
    },2500 );

    } catch (error) {
        const serverErrorDetails = error.response?.data?.details || error.response?.data?.message;
        toast.error(`Failed to list property. Error: ${serverErrorDetails || error.message}`, { duration: 3000, position: "top-right" });
    } finally {
        setIsSubmitting(false); // 🔥 Stop spinner & enable button
    }
};
 
return (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center p-4 z-50">

             {/* React Hot Toast Container */}
                  <Toaster position="top-right" reverseOrder={false} />

            {/* Inject the styles to hide the number input spinners */}
            <NumberSpinnerStyles />

            
            
            {/* Modal Content Box */}
            <form onSubmit={handleSubmit} 
                className="bg-white rounded-xl shadow-2xl w-full max-w-4xl relative max-h-[90vh] overflow-hidden" 
            >
                
                <button 
                    type="button" 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-semibold p-1 z-10 cursor-pointer" 
                >
                    &times;
                </button>

                {/* Header */}
                {/* <div className="sticky top-0 bg-white border-b p-6 z-10">
                    <h2 className="text-2xl font-bold text-gray-800">List Your Property</h2>
                    <p className="text-sm text-gray-500 mt-1">Fill in the details to list your property for rent or sale.</p>
                </div> */}
                <div className="sticky top-0 bg-white border-b p-6 z-10 flex items-center justify-between">
  <div>
    <h2 className="text-2xl font-bold text-gray-800">List Your Property</h2>
    <p className="text-sm text-gray-500 mt-1">
      Fill in the details to list your property for rent or sale.
    </p>
  </div>

  {/* Close Button (X) */}
  <button
    type="button"
    onClick={onClose}
    className="text-gray-500 hover:text-gray-700 text-xl font-bold p-2 rounded-full hover:bg-gray-100 transition cursor-pointer"
    aria-label="Close"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
</div>


                {/* Scrollable Form Body - Styles restored to match previous structure */}
                <div className="p-6 space-y-8 overflow-y-auto max-h-[calc(90vh-140px)]"> 
                    
                    {/* Property Type & Listing Type */}
                    <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 rounded-lg">
                        {/* Property Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type <span className="text-red-500">*</span></label>
                            <div className="flex space-x-4">
                                {['Apartment', 'Villa', 'Commercial'].map(type => (
                                    <RadioInput
                                        key={type}
                                        id={`type-${type.replace('/', '-')}`}
                                        name="propertyType"
                                        value={type}
                                        checkedValue={formData.propertyType}
                                        onChange={handleChange}
                                        label={type}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Listing Type */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Listing For <span className="text-red-500">*</span></label>
                            <div className="flex space-x-4">
                                {listingTypes.map(type => (
                                    <RadioInput
                                        key={type}
                                        id={`listing-${type.replace(/\s/g, '-')}`}
                                        name="listingType"
                                        value={type}
                                        checkedValue={formData.listingType}
                                        onChange={handleListingTypeChange}
                                        label={type}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    {/* Property Title & Furnishing */}
                    <div className="grid grid-cols-2 gap-6 p-6 border border-gray-100 rounded-lg">
                        <TextInput
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            label="Property Title"
                            required
                            placeholder="e.g., Luxury 3BHK in Sector 18"
                        />
                        <SelectInput 
                            id="furnishingStatus" 
                            name="furnishingStatus" 
                            value={formData.furnishingStatus} 
                            onChange={handleChange} 
                            label="Furnishing Status"
                            placeholder="Select Status"
                        >
                            <option value="Fully Furnished">Fully Furnished</option>
                            <option value="Semi Furnished">Semi Furnished</option>
                            <option value="Unfurnished">Unfurnished</option>
                        </SelectInput>
                    </div>

                    {/* Dynamic Details Block */}
                    <div className="p-6 border border-gray-100 rounded-lg">
                        <h3 className="text-gray-400 mb-6 text-sm font-medium">
                            {formData.listingType === 'For Rent' ? 'Rental Details' : 'Sale Details'}
                        </h3>
                        {formData.listingType === 'For Rent' ? (
                            <RentDetailsFields formData={formData} handleChange={handleChange} />
                        ) : (
                            <SaleDetailsFields formData={formData} handleChange={handleChange} />
                        )}
                    </div>

                    {/* Location Details */}
                    <div className="p-0 border border-gray-100 rounded-lg"> 
                        <LocationFields formData={formData} handleChange={handleChange} />
                    </div>
                    
                    {/* Description & Images */}
                    <div className="p-0 border border-gray-100 rounded-lg"> 
                        <DescriptionAndImagesFields 
                            formData={formData} 
                            handleChange={handleChange} 
                            handleFileChange={handleFileChange} 
                            handleVideoFileChange={handleVideoFileChange}
                        />
                    </div>

                    {/* Nearby Facilities */}
                    <div className="p-0 border border-gray-100 rounded-lg"> 
                        <NearbyFields formData={formData} handleChange={handleChange} />
                    </div>

                    {/* Contact Details (Auto-filled) */}
                    <div className="p-0 border border-gray-100 rounded-lg"> 
                        <ContactFields formData={formData} handleChange={handleChange} setFormData={setFormData} />
                    </div>

                </div>

                {/* Footer / Submit Button and Cancel Button */}
                <div className="sticky bottom-0 bg-gray-50 border-t p-4 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out cursor-pointer"
                    >
                        Cancel
                    </button>
                    {/* <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out cursor-pointer"
                    >
                        Publish Property
                    </button> */}
                    <button
      type="submit"
      disabled={isSubmitting}
      onClick={handleSubmit}
      className={`px-6 py-2 flex items-center justify-center bg-indigo-600 text-white font-semibold rounded-lg transition-all duration-200
          ${isSubmitting 
              ? "opacity-70 cursor-not-allowed" 
              : "hover:bg-indigo-700 active:scale-95 cursor-pointer"
          }`}
  >
      {isSubmitting && (
          <svg
              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
          >
              <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
              ></circle>
              <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
          </svg>
      )}
      {isSubmitting ? "Publishing..." : "Publish Property"}
  </button>






    
                </div>
            </form>
        </div>
    );
};

export default ListProperty;