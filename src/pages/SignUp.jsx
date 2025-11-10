import React, { useState } from 'react';
import { Eye, EyeOff, Mail, User, Lock, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function SignupUI() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),

    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");
      setSuccess("");
      
      try {
        const res = await axios.post('https://musicappbe.onrender.com/api/auth/signup', values);
        
        if (res.data.success) {
          setSuccess(res.data.message || "Registration successful! Please check your email for verification.");
          setIsLoading(false);
          
          navigate('/verify', { 
            state: { 
              email: values.email,
              message: res.data.message 
            } 
          });
        }else{
          navigate('/verify', { 
            state: { 
              email: values.email,
              message: 'Enter OTP! '
            } 
          });
        }
      } catch (error) {
        console.error("Signup error:", error);
        setError(error.response?.data?.message || "An error occurred during registration.");
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white px-4 py-8">
      <div className="w-full max-w-md">
        <form 
          onSubmit={formik.handleSubmit}
          className="bg-zinc-900 bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-zinc-700"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm">Join us to enjoy unlimited music</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-lg text-red-300 text-sm flex items-center gap-2">
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-500 bg-opacity-20 border border-green-500 rounded-lg text-green-300 text-sm flex items-center gap-2">
              <CheckCircle size={16} />
              {success}
            </div>
          )}

          {/* name */}
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-300 font-medium">name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-3 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 transition-all ${
                  formik.touched.name && formik.errors.name 
                    ? 'focus:ring-red-500 border border-red-500' 
                    : 'focus:ring-green-500'
                }`}
                placeholder="Choose a name"
              />
            </div>
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-400">{formik.errors.name}</p>
            )}
          </div>


          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-300 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-3 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 transition-all ${
                  formik.touched.email && formik.errors.email 
                    ? 'focus:ring-red-500 border border-red-500' 
                    : 'focus:ring-green-500'
                }`}
                placeholder="you@example.com"
              />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-400">{formik.errors.email}</p>
            )}
          </div>


          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-300 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full pl-10 pr-12 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 transition-all ${
                  formik.touched.password && formik.errors.password 
                    ? 'focus:ring-red-500 border border-red-500' 
                    : 'focus:ring-green-500'
                }`}
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-400">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 py-3 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                Log in
              </Link>
            </p>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By signing up, you agree to our{' '}
            <span className="text-gray-400 hover:text-white cursor-pointer">Terms of Service</span>{' '}
            and{' '}
            <span className="text-gray-400 hover:text-white cursor-pointer">Privacy Policy</span>
          </p>
        </form>
      </div>
    </div>
  );
}