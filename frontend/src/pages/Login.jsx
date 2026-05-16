import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../store/useStore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const login = useStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) navigate('/');
    else alert('Login failed: ' + result.message);
  };

  return (
    <div className="flex h-screen w-screen bg-[#fafafa] font-['Inter'] overflow-hidden text-[#222]">
      
      {/* Left Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <form onSubmit={handleSubmit} className="w-full max-w-[360px]">
          <div className="mb-10">
            <div className="w-10 h-10 bg-[#222] rounded-lg text-white flex items-center justify-center text-xl mb-6 shadow-sm font-bold">
              N
            </div>
            <h2 className="text-[28px] font-bold tracking-tight mb-2">Welcome back</h2>
            <p className="text-[#222]/50 text-[15px]">Log in to your minimal workspace.</p>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-[#222]/80 mb-2">Email address</label>
              <input 
                className="w-full rounded-md border border-[#e5e5e5] p-3 text-[15px] outline-none focus:border-[#222] focus:ring-1 focus:ring-[#222] transition-all bg-white" 
                type="email" 
                placeholder="name@example.com" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div>
               <label className="block text-[13px] font-medium text-[#222]/80 mb-2">Password</label>
              <input 
                className="w-full rounded-md border border-[#e5e5e5] p-3 text-[15px] outline-none focus:border-[#222] focus:ring-1 focus:ring-[#222] transition-all bg-white" 
                type="password" 
                placeholder="••••••••" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
              />
            </div>
          </div>
          
          <button type="submit" className="mt-8 w-full rounded-md bg-[#222] hover:bg-black py-3 text-white text-[15px] font-medium transition-colors active:scale-[0.99]">
            Continue
          </button>
          
          <p className="mt-8 text-center text-[14px] text-[#222]/50">
            Don't have an account? <Link to="/register" className="text-[#222] font-semibold hover:underline">Sign up</Link>
          </p>
        </form>
      </div>

      {/* Right Illustration Side */}
      <div className="hidden lg:flex w-1/2 bg-[#f0f0f0] items-center justify-center p-12">
        <div className="w-full max-w-md aspect-square bg-white rounded-3xl shadow-sm border border-[#e5e5e5] flex flex-col items-center justify-center p-8 relative overflow-hidden">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 text-[#222] opacity-90">
             <path fill="currentColor" d="M45.7,-76.4C58.9,-69.3,69.2,-56.3,77.2,-42.2C85.2,-28.1,90.9,-12.9,88.7,1.6C86.6,16.2,76.6,30.1,65.8,41.9C55,53.8,43.3,63.6,29.9,71.2C16.5,78.8,1.4,84.2,-13.6,83.8C-28.7,83.4,-43.7,77.3,-56.3,68.2C-69,59.1,-79.3,47.1,-84.9,32.7C-90.5,18.4,-91.4,1.8,-86.6,-13C-81.8,-27.8,-71.4,-40.8,-59.1,-50.2C-46.8,-59.6,-32.6,-65.4,-18.8,-69.4C-5,-73.4,8.5,-75.6,22.2,-76C35.9,-76.4,49.8,-75.1,45.7,-76.4Z" transform="translate(100 100) scale(0.9)" opacity="0.05" />
             <g stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
               <rect x="50" y="80" width="100" height="70" rx="8" />
               <path d="M70 80 V50 C70 30, 130 30, 130 50 V80" />
               <circle cx="100" cy="115" r="8" fill="currentColor" />
               <path d="M100 123 V135" />
               <path d="M150 150 L170 120 M50 150 L30 120" strokeDasharray="4 4" opacity="0.5"/>
             </g>
           </svg>
           <h3 className="text-xl font-bold mt-8 text-[#222]">Secure & Minimal</h3>
           <p className="text-center text-[#222]/50 text-sm mt-2 max-w-[250px]">Your data is encrypted and stored safely. No distractions, just focus.</p>
        </div>
      </div>
    </div>
  );
}
