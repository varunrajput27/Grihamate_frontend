import React from 'react';
import aboutImage from '../assets/about.jpg';
import nobita from '../assets/nobita.jpg';
import sizuka from '../assets/sizuka.jpg';
import girl2 from '../assets/girl2.jfif';
import girl3 from '../assets/girl3.jfif';


// Team members data
const teamMembers = [
    { name: 'Aditya Mishra', role: 'Founder', img: nobita },
    { name: 'Pooja Prajapati', role: 'UX/UI Designer', img: sizuka},
    { name: 'Pranjal Takkar', role: 'Frontend Developer', img: girl2 },
    { name: 'Shilpi Kumari', role: 'Backend Developer', img: girl3 },
];

// Core Values data
const coreValues = [
    { 
        title: 'Trust', 
        description: 'Building lasting relationships through strong ethics and integrity.',
        icon: 'M13 10V3L4 14h7v7l9-11h-7z' 
    },
    { 
        title: 'Transparency', 
        description: 'Clear communication and honest dealings in every transaction.',
        icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' 
    },
    { 
        title: 'Growth', 
        description: 'Committed to your success through continuous improvement.',
        icon: 'M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7z' 
    },
    { 
        title: 'Innovation', 
        description: 'Leveraging technology to redefine property management.',
        icon: 'M10 20l4-16h4l-4 16h-4zm-6 0l4-16h4l-4 16H4z' 
    },
];
const whyChooseData = [
    {
        title: 'Property Management',
        description: 'Comprehensive property management solutions including maintenance, tenant screening, and rent collection.',
        icon: 'M8 10V7m0 7v-4m0 4h.01m-4.004 0h.01m-4.004 0h.01M16 4v16a2 2 0 01-2 2h-4a2 2 0 01-2-2V4a2 2 0 012-2h4a2 2 0 012 2zm-8 0h4m-2 16h0' // Placeholder for a simple house/building icon
    },
    {
        title: 'Tenant Support',
        description: '24/7 tenant support services ensuring smooth communication and quick resolution of concerns.',
        icon: 'M17 20h-4a2 2 0 01-2-2v-4a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2zM9 16V8a2 2 0 012-2h4a2 2 0 012 2v2M7 16V6a2 2 0 012-2h4M5 16V4a2 2 0 012-2h4' // Placeholder for people/support icon
    },
    {
        title: 'Hassle-Free Renting',
        description: 'Streamlined rental processes with digital documentation and management agreement procedures.',
        icon: 'M11.087 18.064l1.69 1.69a1.06 1.06 0 001.5 0l1.69-1.69m-4.88 0l1.69-1.69a1.06 1.06 0 001.5 0l1.69 1.69' // Placeholder for a star/like icon
    },
    {
        title: 'Verified Listings',
        description: 'All properties undergo rigorous verification ensuring authenticity and legal compliance.',
        icon: 'M8 10V7m0 7v-4m0 4h.01m-4.004 0h.01m-4.004 0h.01M16 4v16a2 2 0 01-2 2h-4a2 2 0 01-2-2V4a2 2 0 012-2h4a2 2 0 012 2zm-8 0h4m-2 16h0' // Placeholder for a house/building icon (same as the first, as per image)
    },
];


const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* Header Section with Background Image */}
            <div 
                className="relative h-96 bg-cover bg-center flex items-center justify-center text-white"
                style={{ backgroundImage: `url(${aboutImage})` }}
            >
                <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-center items-center text-white px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">About Grihamate</h1>
                    <p className="text-md md:text-lg italic">Your Property, Our Priority...</p>
                </div>
            </div>

            {/* About Grihamate Section */}
            <section className="container mx-auto px-4 py-16 max-w-4xl">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">About Grihamate</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                    Founded with a vision to revolutionize the real estate industry, Grihamate has grown from a small startup to a trusted name in property solutions. We understand that finding the perfect property is more than just a transaction – it's about finding a home, building wealth, and securing your future.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                    Our journey began with a simple belief: that everyone deserves access to quality properties and exceptional service. Today, we continue to uphold this commitment through innovative technology, personalized service, and an unwavering dedication to our clients' success.
                </p>
                <p className="text-lg font-semibold text-indigo-600 text-center">
                    Our mission is to bridge the gap between property seekers and their dream homes while providing property owners with comprehensive management solutions that maximize value and minimize hassle.
                </p>
            </section>

            {/* Core Values Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className="bg-blue-50 p-6 rounded-lg shadow-sm hover:shadow-md transition duration-300 text-center flex flex-col items-center"
                            >
                                <div className="text-indigo-600 mb-3">
                                    <svg
                                        className="w-10 h-10 mx-auto"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d={value.icon}
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-sm text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Meet Our Team Section */}
            <section className="container mx-auto px-4 py-16 max-w-6xl">
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-4">Meet Our Team</h2>
                <p className="text-gray-600 text-center mb-12">
                    Our experienced professionals are dedicated to providing exceptional service and expertise in every aspect of real estate.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 text-center transition duration-300 hover:shadow-2xl"
                        >
                            {/* Profile Image Placeholder */}
                            <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center overflow-hidden">
                                {member.img ? (
                                    <img
                                        src={member.img}
                                        alt={member.name}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <svg
                                        className="w-12 h-12 text-gray-500"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M24 20.993V24H0v-2.997A14.99 14.99 0 0112 18.268a14.99 14.99 0 0112 2.725zM12 15a6 6 0 100-12 6 6 0 000 12z" />
                                    </svg>
                                )}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                            <p className="text-indigo-600 font-medium">{member.role}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- NEW SECTION: Why Choose Grihamate? --- */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Why Choose Grihamate?</h2>
                        <p className="text-gray-600 max-w-xl mx-auto">
                            Experience the difference with our comprehensive real estate solutions designed to exceed your expectations at every step.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {whyChooseData.map((item, index) => (
                            <div 
                                key={index} 
                                className="bg-blue-50 p-6 rounded-lg shadow-lg text-center flex flex-col items-center"
                            >
                                <div className="text-indigo-600 mb-4">
                                    {/* Using SVG Icon Placeholder as per other sections. You can replace the d value with custom icons. */}
                                    <svg className="w-12 h-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-sm text-gray-600 mb-5">{item.description}</p>
                                <button className="mt-auto px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300">
                                    Find in web
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;