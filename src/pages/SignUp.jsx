import React from 'react';
import { Eye, EyeOff, Mail, User, Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// ✅ UI ONLY — no formik, no axios, no logic
export default function SignupUI() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white px-4 py-8">
      <div className="w-full max-w-md">
        <form className="bg-zinc-900 bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-zinc-700">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-400 text-sm">Join us to enjoy unlimited music</p>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-300 font-medium">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                placeholder="Choose a username"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-300 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 text-sm text-gray-300 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
              <input
                type="password"
                className="w-full pl-10 pr-12 py-3 rounded-lg bg-zinc-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-green-500 transition-all"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
              >
                <Eye size={20} />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="button"
            className="w-full bg-gradient-to-r from-green-500 to-green-600 py-3 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold transition-all flex items-center justify-center gap-2"
          >
            Sign Up
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
