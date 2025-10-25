import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
// import connectImage from '../assets/connect.avif';
// import girlImage from '../assets/girlonphone.jpg';
// import newsletter from '../assets/newsletter.avif';

const Contactus = () => {
  return (
    <div className="font-sans bg-white text-gray-800">
      {/* 1. Hero Section with Background Image */}
      <section
        className="relative h-96 bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: "url('/images/connect.avif')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Let's Connect</h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-xl mx-auto">
            Your dream home is just a conversation away
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 2. Contact Form and Side Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Right: Girl on Phone Image */}
          <div className="hidden lg:block">
            <img
              src="/images/girlonphone.jpg"
              alt="Person talking on phone"
              className="rounded-xl shadow-xl w-full h-[550px] object-cover"
            />
          </div>
          {/* Left: Contact Form */}
          <div className="bg-white p-8 lg:p-10 rounded-xl shadow-2xl h-full flex flex-col justify-center border border-gray-200">
            <h2 className="text-3xl font-extrabold text-blue-700 mb-2">Get in touch with us</h2>
            <p className="text-gray-500 mb-6">We'd love to hear from you!</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              {['Name', 'Email', 'Phone'].map((label) => (
                <div key={label}>
                  <label
                    htmlFor={label.toLowerCase()}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {label}:
                  </label>
                  <input
                    type={label === 'Email' ? 'email' : label === 'Phone' ? 'tel' : 'text'}
                    id={label.toLowerCase()}
                    placeholder={`Enter Your ${label}`}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 transition duration-150"
                    required
                  />
                </div>
              ))}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message:
                </label>
                <textarea
                  id="message"
                  rows="5"
                  placeholder="Write Message"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600 resize-none transition duration-150"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition duration-200 shadow-lg"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* 3. Contact Info Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <InfoCard
            icon={<FaPhoneAlt className="text-blue-600" size={24} />}
            title="Contact Phone Number"
            content="+91 789XXXXXXXX"
          />
          <InfoCard
            icon={<FaEnvelope className="text-blue-600" size={24} />}
            title="Our Email Address"
            content="Grihamate@gmail.com"
          />
          <InfoCard
            icon={<FaMapMarkerAlt className="text-blue-600" size={24} />}
            title="Our Location"
            content="Noida, Uttar Pradesh"
          />
        </section>

        {/* 4. Embedded Google Map */}
        <section className="w-full h-[500px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <iframe
            title="Noida Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112109.33649427063!2d77.32607585740052!3d28.567685275556994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce54141f6c6e3%3A0x52af7c86c843b3cf!2sNoida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1696411222222!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </section>
  
           {/* --- NEW SECTION: Subscribe Our Newsletter --- */}
<section className="relative py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* Left Side: Newsletter Form */}
      <div className="bg-blue-700 text-white p-10 md:p-14 rounded-xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
        <p className="text-lg mb-6">
          Get the latest property listings, trends & tips delivered to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-grow w-full sm:w-auto p-3 rounded-lg border border-gray-300 text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
            Subscribe
          </button>
        </div>
      </div>

      {/* Right Side: Image */}
      <div className="w-full h-80 lg:h-full rounded-xl overflow-hidden shadow-xl">
        <img
          src="/images/newsletter.avif"
          alt="Newsletter background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
</section>

      </main>
    </div>
  );
};

// 🔹 Info Card Component
const InfoCard = ({ icon, title, content }) => {
  return (
    <article className="flex items-start gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow hover:shadow-md transition duration-200">
      <div className="p-3 rounded-full bg-blue-100">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold text-blue-700 mb-1">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </article>
  );
};

export default Contactus;
