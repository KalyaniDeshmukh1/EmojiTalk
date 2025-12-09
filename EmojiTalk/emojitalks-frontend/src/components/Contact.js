// Contact.js
import React, { useState } from "react"

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); 
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.message.trim()) newErrors.message = "Message is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/contact/send/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    setSubmitted(true);
                    setFormData({ name: "", email: "", message: "" });
                } else {
                    const data = await response.json();
                    setErrors(data);
                }
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };


    const isFormValid =
  formData.name.trim() && formData.email.trim() && formData.message.trim();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-[-30px] ">
      {/* Title */}
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center ">Contact Us</h1>

      {/* Subtitle */}
      <p className="text-center font-bold text-gray-700 max-w-lg">
        If you have any questions or require any information about our website, feel free to contact us.
      </p>

      {/* Form */}
      <form className="bg-white rounded-2xl p-6 w-full  space-y-4"
       onSubmit={handleSubmit}>
        {/* Name */}
        
         <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.name ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Message</label>
            <textarea
              rows="4"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 ${
                errors.message ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-blue-400"
              }`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full font-semibold py-2 px-4 rounded-lg transition ${
              isFormValid
                ? "bg-blue-600 hover:bg-blue-600 text-white cursor-pointer"
                : "bg-blue-400 text-gray-800 cursor-not-allowed"
            }`}
          >
            Send
          </button>
        </form>

            {/* Thank You Message */}
      {submitted && (
        <div className="mt-6 bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg shadow-md animate-bounce">
          ✅ Thank you for contacting us! We’ll get back to you soon.
        </div>
      )}

      </div>
    </div>
  );
}

export default Contact;
