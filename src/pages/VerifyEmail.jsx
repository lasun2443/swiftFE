import React, { useState, useEffect } from "react";
import {
  Mail,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmailUI = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState("");
  
  const location = useLocation();
  const navigate = useNavigate();

  // Get email from navigation state
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post('https://musicappbe.onrender.com/api/auth/verify-email', {
        email: email,
        otp: otpValue
      });

      if (res.data.success) {
        setSuccess("Email verified successfully! Redirecting to login...");
        
        // Redirect to login after successful verification
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP code entered.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setResendLoading(true);
    setError("");
    
    try {
      const res = await axios.post('https://musicappbe.onrender.com/api/auth/resend-otp', {
        email: email
      });

      if (res.data.success) {
        setSuccess("New OTP sent to your email!");
        setOtp(["", "", "", "", "", ""]); // Clear OTP fields
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black via-zinc-900 to-zinc-800 text-white px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 bg-opacity-90 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-zinc-700">
          {/* Back Button */}
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign Up
          </Link>

          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/10 rounded-full mb-4">
              <Mail className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Verify Your Email
            </h2>
            <p className="text-gray-400 text-sm">
              We sent a 6-digit code to
              <br />
              <span className="text-white font-medium">
                {email || "your email"}
              </span>
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <p className="text-green-400 text-sm">{success}</p>
            </div>
          )}

          {/* OTP Input Form */}
          <form onSubmit={handleVerify}>
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onFocus={(e) => e.target.select()}
                  className="w-12 h-14 text-center text-2xl font-bold bg-zinc-800 text-white rounded-lg outline-none focus:ring-2 focus:ring-green-500 transition-all"
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 py-3 rounded-lg hover:from-green-600 hover:to-green-700 font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify Email'
              )}
            </button>
          </form>

          {/* Resend Code */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400 mb-2">
              Didn't receive the code?
            </p>
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="text-green-400 hover:text-green-300 font-medium text-sm transition-colors disabled:opacity-50"
            >
              {resendLoading ? 'Sending...' : 'Resend Code'}
            </button>
          </div>

          {/* Help Text */}
          <p className="text-xs text-gray-500 text-center mt-6">
            The code will expire in 10 minutes. Check your spam folder if you
            don't see it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailUI;