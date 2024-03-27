import Layout from "@/components/Layout";
import { useState } from "react";
import axios from 'axios';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send a request to the backend API to initiate the password reset process
      const response = await axios.post('/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error sending password reset request:", error);
      setMessage("An error occurred while processing your request. Please try again later.");
    }
  };

  return (
    <Layout>
      <main>
        <div className="w-full h-screen grid place-items-center">
          <div className="md:w-1/2 p-8 bg-white shadow-xl">
            <h2 className="text-center text-primary font-bold mb-4">
              Forgot Password
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <p className="mb-3">Enter your email address</p>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-primary rounded-md"
                >
                  Reset Password
                </button>
              </div>
              {message && <p className="mt-4 text-center text-[red]">{message}</p>}
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}
