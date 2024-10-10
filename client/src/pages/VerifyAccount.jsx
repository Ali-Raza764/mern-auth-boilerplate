import React, { useState, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const { error, isLoading: loading, verifyEmail } = useAuthStore();

  const handleVerification = async (e) => {
    e.preventDefault();
    try {
      const codeString = code.join("");
      if (codeString.length !== 6) {
        return;
      }
      await verifyEmail(codeString);
      navigate("/sign-in");
      console.log("Verifying code");
    } catch (error) {
      console.error;
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Automatically move to the next input field if a number is entered
      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedCode = e.clipboardData.getData("text").slice(0, 6).split("");
    setCode(pastedCode);

    // Automatically focus the last input after pasting
    const lastFilledIndex = pastedCode.length - 1;
    inputsRef.current[lastFilledIndex]?.focus();
  };

  const handleKeyDown = (e, index) => {
    // Move back to the previous input field if backspace is pressed on an empty field
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-transparent border border-gray-700 rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl text-white font-semibold mb-6 text-center">
          Verify Your Account
        </h2>
        <form onSubmit={handleVerification} className="space-y-6">
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md text-center">
              {error}
            </div>
          )}
          <p className="text-gray-400 text-center mb-6">
            Enter the 6-digit code we sent to your email.
          </p>
          <div onPaste={handlePaste} className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center bg-transparent border border-gray-600 rounded-md text-white text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </div>
          <button
            onClick={handleVerification}
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              </div>
            ) : (
              "Verify Account"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyAccount;
