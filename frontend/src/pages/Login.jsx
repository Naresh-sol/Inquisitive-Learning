import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { login } from "../services/operations/authAPI";
import loginImg from "../assets/Images/login.png";
import { MdOutlineComputer, MdKeyboardArrowDown } from "react-icons/md";
import { fetchCourseCategories } from "../services/operations/courseDetailsAPI";
import Footer from "../components/common/Footer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSublinks = async () => {
      try {
        setLoading(true);
        const res = await fetchCourseCategories();
        setSubLinks(res || []);
      } catch (error) {
        console.log("Could not fetch the category list = ", error);
      }
      setLoading(false);
    };
    getSublinks();
  }, []);
  
  const { email, password } = formData;
  
  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  return (
    <div className="flex-1 flex flex-col font-inter text-richblack-900">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center py-12 px-6">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-16">
          
          {/* Left Side: Form */}
          <div className="w-full max-w-[420px]">
            <h1 className="text-[2.75rem] leading-tight font-bold text-[#003E9C] mb-3 tracking-tight">Welcome Back</h1>
            <p className="text-gray-600 mb-1 text-[1.05rem]">Build skills for today, tomorrow, and beyond.</p>
            <p className="text-[#0056D2] italic mb-8 text-[1.05rem]">Education to future-proof your career.</p>

            <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-gray-800">
                  Email Address <span className="text-red-500">*</span>
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="w-full rounded-lg border border-gray-300 bg-white p-3 text-gray-900 outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] shadow-sm transition"
                />
              </label>

              <label className="flex flex-col gap-1.5 relative">
                <span className="text-sm font-semibold text-gray-800">
                  Password <span className="text-red-500">*</span>
                </span>
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={password}
                    onChange={handleOnChange}
                    placeholder="Enter Password"
                    className="w-full rounded-lg border border-gray-300 bg-white p-3 pr-12 text-gray-900 outline-none focus:border-[#0056D2] focus:ring-1 focus:ring-[#0056D2] shadow-sm transition"
                  />
                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
                  </span>
                </div>
                <Link to="/forgot-password" className="ml-auto mt-2 text-[0.8rem] font-bold text-[#0056D2] hover:underline focus:outline-none focus:ring-1 focus:ring-[#0056D2]">
                  Forgot Password
                </Link>
              </label>

              <button
                type="submit"
                className="mt-2 w-full rounded-lg bg-[#0056D2] py-3 text-white font-semibold text-[1.05rem] hover:bg-[#004aad] transition shadow-md border-2 border-transparent focus:outline-none focus:border-[#003E9C] focus:ring-2 focus:ring-blue-300 active:border-[#003E9C]"
              >
                Sign In
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-gray-300"></div>
              <span className="text-sm text-gray-500 font-medium">Or continue with</span>
              <div className="h-[1px] flex-1 bg-gray-300"></div>
            </div>

            <div className="flex gap-4">
              <button className="flex flex-1 items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-2.5 text-gray-800 font-bold hover:bg-gray-50 transition shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400">
                <FcGoogle size={22} /> Google
              </button>
              <button className="flex flex-1 items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white py-2.5 text-gray-800 font-bold hover:bg-gray-50 transition shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-gray-400">
                <FaGithub size={22} /> GitHub
              </button>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="hidden lg:flex w-full max-w-[550px]">
            <div className="w-full bg-white rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
               <img src={loginImg} alt="Login" className="w-full h-auto object-cover rounded-3xl" />
               <div className="absolute top-8 right-8 bg-white p-2 rounded-xl shadow-sm text-[#0056D2]">
                  <MdOutlineComputer size={24} />
               </div>
               <div className="absolute bottom-8 left-8 bg-white p-3 rounded-2xl shadow-sm text-[#0056D2]">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path></svg>
               </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Login;