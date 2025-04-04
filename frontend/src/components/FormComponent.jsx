import React, { useState } from 'react';
import axios from 'axios';


const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log('Payload:', formData);
      const response = await axios.post(
        '/api/contacts',
        formData,
        {
          headers: { 'Content-Type': 'application/json' }
        }
      );
      if (response.status === 200) {
        setSubmitted(true);
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="bg-[#0067B1] min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center">
        {/* Left Side - Contact Info */}
        <div className="text-white p-8 md:w-1/2 lg:w-2/5">
          <h1 className="text-4xl font-bold mb-8">Get in touch</h1>
          <div className="border-t border-blue-400 w-12 mb-8" aria-hidden="true"></div>
          
          <p className="text-xl mb-6">For general enquiries</p>
          
          <div className="mb-6">
            <h2 className="font-semibold">Address:</h2>
            <address>
              110, 16th Road, Chembur, Mumbai - 400071
            </address>
          </div>
          
          <div className="mb-6">
            <h2 className="font-semibold">Phone:</h2>
            <p>
              <a href="tel:+912225208822" className="hover:underline focus:underline" style={{color: 'white'}}>
                +91 22 25208822
              </a>
            </p>
          </div>
          
          <div className="mb-6">
            <h2 className="font-semibold">Email:</h2>
            <p>
              <a href="mailto:info@supremegroup.co.in" className="hover:underline focus:underline" style={{color: 'white'}}>
                info@supremegroup.co.in
              </a>
            </p>
          </div>
        </div>
        
        {/* Right Side - Form */}
        <div className="md:w-1/2 lg:w-3/5 p-8">
          <form 
            onSubmit={handleSubmit} 
            className="max-w-md mx-auto"
            aria-labelledby="contact-form-heading"
          >
            <h2 id="contact-form-heading" className="sr-only">Contact form</h2>
            
            {submitted && (
              <div 
                role="alert"
                className="mb-6 p-4 bg-blue-500 text-white rounded-lg"
                aria-live="polite"
              >
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="fullName" className="sr-only">Full name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full bg-transparent border-b border-white text-white p-2 focus:outline-none focus:border-blue-300 placeholder-white"
                required
                aria-required="true"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="sr-only">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                className="w-full bg-transparent border-b border-white text-white p-2 focus:outline-none focus:border-blue-300 placeholder-white"
                required
                aria-required="true"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="subject" className="sr-only">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full bg-transparent border-b border-white text-white p-2 focus:outline-none focus:border-blue-300 placeholder-white"
                required
                aria-required="true"
              />
            </div>
            
            <div className="mb-8">
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                className="w-full bg-transparent border-b border-white text-white p-2 focus:outline-none focus:border-blue-300 placeholder-white resize-none"
                required
                aria-required="true"
                rows="1"
              />
            </div>
            
            <div>
              <button
                type="submit"
                className="bg-white text-blue-600 px-8 py-3 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 transition duration-300"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;