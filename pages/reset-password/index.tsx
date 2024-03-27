// pages/reset-password/[token].tsx

import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { useState } from 'react';
import axios from 'axios';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = router.query;
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
console.log(token)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reset-password', { token, password });
      setMessage(response.data.message);
    } catch (error:any) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <Layout>
      <main>
        <div className="w-full h-screen grid place-items-center">
          <div className="md:w-1/2 p-8 bg-white shadow-xl">
            <h2 className="text-center text-primary font-bold mb-4">Reset Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <p className="mb-3">Enter your new password</p>
                <input
                  type="password"
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button type="submit" className="px-4 py-2 text-white bg-primary rounded-md">
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
