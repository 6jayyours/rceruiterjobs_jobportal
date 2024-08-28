import axios from "axios";
import React, { useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const Pricing = () => {
  const sub = useSelector((state) => state.auth.subscription);
  const userId = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const email = useSelector((state) => state.auth.email);


  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8765/api/v1/payment/create-order",
        null,
        {
          params: { amount: "59900", userId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const orderId = response.data;

      const options = {
        key: "rzp_test_8b6GHpvbMnFOEM",
        amount: 59900, // Amount in paise (599 INR)
        currency: "INR",
        name: "Job Portal",
        description: "Subscription for more jobs and resume assistance",
        order_id: orderId,
        handler: async (response) => {
          const paymentData = {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            userId: userId,
          };
          await axios.post(
            "http://localhost:8765/api/v1/payment/update-order",
            paymentData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        },
        prefill: {
          email: email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {});
      rzp.open();
    } catch (error) {
      console.error("Error in subscription process:", error);
    }
  };

  if (sub) {
    return null;
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-3xl font-semibold text-center mb-8">PLANS</h3>
        <div className="grid md:grid-cols-2 gap-8 ">
          <div className="bg-white rounded-lg shadow-lg py-8 px-6 border border-indigo-700">
            <h6 className="text-lg font-bold mb-5 text-indigo-500">FREE</h6>
            <div className="flex items-center mb-5">
              <span className="text-xl font-semibold">₹</span>
              <span className="text-4xl font-semibold mb-0">0</span>
              <span className="text-xl font-semibold self-end mb-1">
                /month
              </span>
            </div>
            <ul className="border-t border-gray-300 pt-5 ">
              <li className="flex items-center text-gray-400 mb-3">
                <FaRegCheckCircle className="text-green-600 text-xl mr-2" />
                Limited Jobs
              </li>
              <li className="flex items-center text-gray-400 mb-3">
                <FaRegCheckCircle className="text-green-600 text-xl mr-2" />
                Basic Profile Creation
              </li>
              <li className="flex items-center text-gray-400 mb-3">
                <FaRegCheckCircle className="text-green-600 text-xl mr-2" />
                Message Recruiter
              </li>
              <li className="flex items-center text-gray-400 mb-3">
                <FaRegCheckCircle className="text-green-600 text-xl mr-2" />
                Security
              </li>
            </ul>
            <button className="bg-indigo-700 text-white hover:bg-indigo-900 duration-300 rounded-md py-2 px-6 text-base sm:text-lg mt-6">
              Get Started
            </button>
          </div>
          <div className="bg-white rounded-lg shadow-lg py-8 px-6 border border-indigo-700">
            <h6 className="text-lg font-bold mb-5 text-indigo-500">STANDARD</h6>
            <div className="flex items-center mb-5">
              <span className="text-xl font-semibold">₹</span>
              <span className="text-4xl font-semibold mb-0">599</span>
              <span className="text-xl font-semibold self-end mb-1">
                /month
              </span>
            </div>
            <ul className="border-t border-gray-300 pt-5 ">
              <li className="flex items-center text-gray-400 mb-3">
                <FaRegCheckCircle className="text-green-600 text-xl mr-2" />
                More Jobs
              </li>
              <li className="flex items-center text-gray-400 mb-3">
                <FaRegCheckCircle className="text-green-600 text-xl mr-2" />
                Basic Profile Creation
              </li>
              <li className="flex items-center text-gray-400 mb-3">
                <FaRegCheckCircle className="text-green-600 text-xl mr-2" />
                Message Recruiter
              </li>
              <li className="flex items-center text-gray-400 mb-3">
                <FaRegCheckCircle className="text-green-600 text-xl mr-2" />
                Security
              </li>
            </ul>
            <button
              onClick={handleSubscribe}
              className="bg-indigo-700 text-white hover:bg-indigo-900 duration-300 rounded-md py-2 px-6 text-base sm:text-lg mt-6"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
