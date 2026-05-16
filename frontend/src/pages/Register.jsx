import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useStore from '../store/useStore';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const register = useStore((state) => state.register);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await register(name, email, password);
    if (result.success) navigate('/');
    else alert('Registration failed: ' + result.message);
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
            <h2 className="text-[28px] font-bold tracking-tight mb-2">Create an account</h2>
            <p className="text-[#222]/50 text-[15px]">Start organizing your thoughts instantly.</p>
          </div>
          
          <div className="space-y-5">
            <div>
              <label className="block text-[13px] font-medium text-[#222]/80 mb-2">Full Name</label>
              <input 
                className="w-full rounded-md border border-[#e5e5e5] p-3 text-[15px] outline-none focus:border-[#222] focus:ring-1 focus:ring-[#222] transition-all bg-white" 
                type="text" 
                placeholder="Jane Doe" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                required 
              />
            </div>
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
            Sign Up
          </button>
          
          <p className="mt-8 text-center text-[14px] text-[#222]/50">
            Already have an account? <Link to="/login" className="text-[#222] font-semibold hover:underline">Log in</Link>
          </p>
        </form>
      </div>

      {/* Right Illustration Side */}
      <div className="hidden lg:flex w-1/2 bg-[#f0f0f0] items-center justify-center p-12">
        <div className="w-full max-w-md aspect-square bg-white rounded-3xl shadow-sm border border-[#e5e5e5] flex flex-col items-center justify-center p-8 relative overflow-hidden">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 text-[#222] opacity-90">
             <path fill="currentColor" d="M38.1,-63.9C50.2,-58.5,61.4,-49.6,71.2,-38.3C81,-27,89.5,-13.5,88.7,-0.5C87.9,12.5,77.9,25.1,68.2,36.5C58.5,47.9,49.1,58.3,37.3,64.6C25.5,70.9,11.3,73.1,-2.9,78C-17.1,82.9,-34.2,90.4,-46.8,85.2C-59.4,80,-67.5,62.1,-74.6,45.5C-81.7,28.9,-87.8,13.6,-84.9,0.5C-82,-12.6,-70.1,-23.3,-60.1,-32.8C-50.1,-42.3,-42,-50.6,-32.3,-57.4C-22.6,-64.2,-11.3,-69.5,1.2,-71.5C13.7,-73.5,27.4,-72.2,38.1,-63.9Z" transform="translate(100 100) scale(0.9)" opacity="0.05" />
             <g stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round">
               <path d="M40 140 L160 140" strokeWidth="8"/>
               <path d="M50 140 V60 C50 50, 60 40, 70 40 H130 C140 40, 150 50, 150 60 V140" />
               <rect x="75" y="70" width="50" height="30" rx="4" />
               <circle cx="100" cy="85" r="4" fill="currentColor"/>
               <path d="M120 40 L130 20 M80 40 L70 20" opacity="0.5"/>
             </g>
           </svg>
           <h3 className="text-xl font-bold mt-8 text-[#222]">Write & Create</h3>
           <p className="text-center text-[#222]/50 text-sm mt-2 max-w-[250px]">The most powerful minimal editor. Block by block, build your world.</p>
        </div>
      </div>
    </div>
  );
}
