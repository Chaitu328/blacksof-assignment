import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8082";

const LoginPage = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:8082/api/auth/login', 
        { adminKey: password }, 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );

      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin/contacts');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="scroll-container flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4 animate-fadeIn">
      <div className=" w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl shadow-xl overflow-hidden border border-white/20 animate-fadeInUp delay-100">
        <div className=" p-8">
          <div className=" flex justify-center mb-8">
            <svg 
              className=" logo h-16 w-16 text-cyan-400 hover:filter hover:drop-shadow-[0_0_2em_#06b6d4aa] transition-all duration-300" 
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
            </svg>
          </div>

          <h2 className="text-3xl font-bold text-center text-white mb-2">Admin Login</h2>
          <p className="text-center text-gray-300 mb-8">Enter your admin key to continue</p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/20 text-red-100 rounded-lg border border-red-500/30 animate-fadeIn">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Admin Key
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all"
                placeholder="Enter admin key"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center justify-center ${isLoading ? 'opacity-75' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating...
                </>
              ) : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;