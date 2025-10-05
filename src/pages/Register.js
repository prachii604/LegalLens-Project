// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2,
//   AlertCircle, CheckCircle
// } from "lucide-react";

// // Regex: basic RFC-like email, and strong password (8+ chars, 1 upper, 1 lower, 1 digit, 1 special)
// const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

// export default function Register() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [bannerError, setBannerError] = useState("");
//   const [success, setSuccess] = useState(false);

//   // field-level errors just for email + password validity
//   const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     setBannerError("");
//     // live validation for email & confirm password
//     if (field === "email") {
//       setErrors((e) => ({ ...e, email: value && !EMAIL_REGEX.test(value) ? "Invalid email format" : "" }));
//     }
//     if (field === "confirmPassword" || field === "password") {
//       const pwd = field === "password" ? value : formData.password;
//       const cpw = field === "confirmPassword" ? value : formData.confirmPassword;
//       setErrors((e) => ({ ...e, confirmPassword: cpw && pwd !== cpw ? "Passwords do not match" : "" }));
//     }
//   };

//   const validate = () => {
//     const e = { email: "", password: "", confirmPassword: "" };
//     let ok = true;

//     if (!EMAIL_REGEX.test(formData.email.trim())) {
//       e.email = "Please enter a valid email address";
//       ok = false;
//     }
//     if (!PASSWORD_REGEX.test(formData.password)) {
//       e.password =
//         "Password must be 8+ chars and include uppercase, lowercase, number, and special character";
//       ok = false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       e.confirmPassword = "Passwords do not match";
//       ok = false;
//     }
//     setErrors(e);
//     return ok;
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     setBannerError("");
//     setSuccess(false);

//     if (!formData.fullName.trim()) {
//       setBannerError("Please enter your full name");
//       return;
//     }
//     if (!validate()) return;

//     // If only client-side check is needed, simulate success
//     setLoading(true);
//     setTimeout(() => {
//       setSuccess(true);
//       setLoading(false);
//       localStorage.setItem(
//         "cq_user",
//         JSON.stringify({ name: formData.fullName.trim(), email: formData.email.trim().toLowerCase() })
//       );
//       setTimeout(() => navigate("/dashboard"), 1200);
//     }, 1000);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-regal-sage/10 via-regal-offwhite to-regal-gold/10 relative overflow-hidden">
//       <motion.div
//         className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-regal-beige/50 relative z-10"
//         initial={{ opacity: 0, y: 60, scale: 0.9 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
//       >
//         <motion.div
//           className="text-center mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <div className="w-20 h-20 bg-gradient-to-br from-regal-sage to-regal-gold rounded-3xl mx-auto mb-4 flex items-center justify-center">
//             <UserPlus className="w-10 h-10 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-regal-burgundy mb-2">Join Legal Lens</h2>
//           <p className="text-regal-black/60">Create your account to get started</p>
//         </motion.div>

//         <AnimatePresence>
//           {bannerError && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl mb-6"
//             >
//               <AlertCircle className="w-5 h-5 text-red-600" />
//               <span className="text-red-700 text-sm">{bannerError}</span>
//             </motion.div>
//           )}
//           {success && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl mb-6"
//             >
//               <CheckCircle className="w-5 h-5 text-green-600" />
//               <span className="text-green-700 text-sm">Account created! Redirecting…</span>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         <form onSubmit={handleRegister} className="space-y-6">
//           {/* Full name */}
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//               <User className="w-5 h-5 text-regal-black/40" />
//             </div>
//             <input
//               type="text"
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={(e) => handleInputChange("fullName", e.target.value)}
//               className="w-full pl-11 pr-4 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-sage/50 focus:border-regal-sage outline-none bg-regal-offwhite/30"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//               <Mail className="w-5 h-5 text-regal-black/40" />
//             </div>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={(e) => handleInputChange("email", e.target.value)}
//               className={`w-full pl-11 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-regal-sage/50 outline-none bg-regal-offwhite/30 ${
//                 errors.email ? "border-red-300" : "border-regal-beige"
//               }`}
//               required
//             />
//             {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//               <Lock className="w-5 h-5 text-regal-black/40" />
//             </div>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Create a password"
//               value={formData.password}
//               onChange={(e) => handleInputChange("password", e.target.value)}
//               className={`w-full pl-11 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-regal-sage/50 outline-none bg-regal-offwhite/30 ${
//                 errors.password ? "border-red-300" : "border-regal-beige"
//               }`}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword((s) => !s)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-regal-beige/30 rounded"
//             >
//               {showPassword ? <EyeOff className="w-5 h-5 text-regal-black/40" /> : <Eye className="w-5 h-5 text-regal-black/40" />}
//             </button>
//             {errors.password && (
//               <p className="mt-1 text-xs text-red-600">
//                 {errors.password}
//               </p>
//             )}
//             {!errors.password && formData.password && (
//               <p className="mt-1 text-xs text-regal-black/60">
//                 Must be 8+ characters with uppercase, lowercase, number, and special character.
//               </p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <div className="absolute left-3 top-1/2 -translate-y-1/2">
//               <Lock className="w-5 h-5 text-regal-black/40" />
//             </div>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//               className={`w-full pl-11 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-regal-sage/50 outline-none bg-regal-offwhite/30 ${
//                 errors.confirmPassword ? "border-red-300" : "border-regal-beige"
//               }`}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword((s) => !s)}
//               className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-regal-beige/30 rounded"
//             >
//               {showConfirmPassword ? <EyeOff className="w-5 h-5 text-regal-black/40" /> : <Eye className="w-5 h-5 text-regal-black/40" />}
//             </button>
//             {errors.confirmPassword && (
//               <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
//             )}
//           </div>

//           {/* Submit */}
//           <motion.button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-regal-sage via-regal-gold to-regal-burgundy text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50 relative overflow-hidden"
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <AnimatePresence mode="wait">
//               {loading ? (
//                 <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   <span>Creating Account...</span>
//                 </motion.div>
//               ) : success ? (
//                 <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center justify-center gap-2">
//                   <CheckCircle className="w-5 h-5" />
//                   <span>Account Created!</span>
//                 </motion.div>
//               ) : (
//                 <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
//                   <UserPlus className="w-5 h-5" />
//                   <span>Create Account</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.button>
//         </form>

//         {/* Footer link */}
//         <p className="text-sm text-regal-black text-center mt-6">
//           Already have an account?{" "}
//           <Link to="/login" className="text-regal-burgundy font-medium hover:text-regal-gold">Sign in here</Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// }

// src/Register.js
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2,
  AlertCircle, CheckCircle
} from "lucide-react";

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails 
} from "amazon-cognito-identity-js";
import { poolData } from "./aws-config";

const userPool = new CognitoUserPool(poolData);

const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bannerError, setBannerError] = useState("");
  const [success, setSuccess] = useState(false);

  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });

  // NEW: confirmation step state
  const [step, setStep] = useState("signup"); // "signup" | "confirm" | "done"
  const [code, setCode] = useState("");
  const [usernameForConfirm, setUsernameForConfirm] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setBannerError("");
    if (field === "email") {
      setErrors((e) => ({ ...e, email: value && !EMAIL_REGEX.test(value) ? "Invalid email format" : "" }));
    }
    if (field === "confirmPassword" || field === "password") {
      const pwd = field === "password" ? value : formData.password;
      const cpw = field === "confirmPassword" ? value : formData.confirmPassword;
      setErrors((e) => ({ ...e, confirmPassword: cpw && pwd !== cpw ? "Passwords do not match" : "" }));
    }
  };

  const validate = () => {
    const e = { email: "", password: "", confirmPassword: "" };
    let ok = true;

    if (!EMAIL_REGEX.test(formData.email.trim())) {
      e.email = "Please enter a valid email address";
      ok = false;
    }
    if (!PASSWORD_REGEX.test(formData.password)) {
      e.password = "Password must be 8+ chars and include uppercase, lowercase, number, and special character";
      ok = false;
    }
    if (formData.password !== formData.confirmPassword) {
      e.confirmPassword = "Passwords do not match";
      ok = false;
    }
    setErrors(e);
    return ok;
  };

  // NEW: actual Cognito sign up
  const handleRegister = async (ev) => {
    ev.preventDefault();
    setBannerError("");
    setSuccess(false);

    if (!formData.fullName.trim()) {
      setBannerError("Please enter your full name");
      return;
    }
    if (!validate()) return;

    setLoading(true);

    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: formData.email.trim().toLowerCase() }),
      new CognitoUserAttribute({ Name: "name", Value: formData.fullName.trim() })
    ];

    userPool.signUp(formData.email.trim().toLowerCase(), formData.password, attributes, null, (err, result) => {
      setLoading(false);
      if (err) {
        console.error("Sign up error:", err);
        setBannerError(err.message || JSON.stringify(err));
        return;
      }
      // Sign-up succeeded — next: show confirmation code input
      setUsernameForConfirm(result?.user?.getUsername?.() || formData.email.trim().toLowerCase());
      setStep("confirm");
    });
  };

  // NEW: confirm code handler

  const handleConfirm = (ev) => {
    ev.preventDefault();
    setBannerError("");
    if (!code) {
      setBannerError("Enter the confirmation code sent to your email.");
      return;
    }
    setLoading(true);

    const cognitoUser = new CognitoUser({ Username: usernameForConfirm, Pool: userPool });

    cognitoUser.confirmRegistration(code.trim(), true, (err, res) => {
      setLoading(false);
      if (err) {
        console.error("Confirm error:", err);
        setBannerError(err.message || JSON.stringify(err));
        return;
      }

      // ✅ 1️⃣ After successful confirmation, automatically sign the user in
      const authDetails = new AuthenticationDetails({
        Username: usernameForConfirm,
        Password: formData.password,
      });

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          // ✅ 2️⃣ Store tokens for session
          const idToken = session.getIdToken().getJwtToken();
          const accessToken = session.getAccessToken().getJwtToken();
          const refreshToken = session.getRefreshToken()?.getToken?.();

          sessionStorage.setItem("idToken", idToken);
          sessionStorage.setItem("accessToken", accessToken);
          if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken);

          // ✅ 3️⃣ Decode ID token to extract info
          const decoded = JSON.parse(atob(idToken.split(".")[1] || "{}"));
          const userName = decoded.name || decoded.email?.split?.("@")?.[0] || formData.fullName;
          const userEmail = decoded.email || usernameForConfirm;

          // ✅ 4️⃣ Maintain compatibility with your Dashboard
          const userData = { name: userName, email: userEmail };
          localStorage.setItem("cq_user", JSON.stringify(userData));

          setSuccess(true);
          setStep("done");
          setTimeout(() => navigate("/dashboard"), 1200);
        },
        onFailure: (err) => {
          console.error("Login after confirm failed:", err);
          setBannerError(err.message || JSON.stringify(err));
        },
      });
    });
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-regal-sage/10 via-regal-offwhite to-regal-gold/10 relative overflow-hidden">
      <motion.div
        className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-regal-beige/50 relative z-10"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 bg-gradient-to-br from-regal-sage to-regal-gold rounded-3xl mx-auto mb-4 flex items-center justify-center">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-regal-burgundy mb-2">Join Legal Lens</h2>
          <p className="text-regal-black/60">Create your account to get started</p>
        </motion.div>

        <AnimatePresence>
          {bannerError && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl mb-6"><AlertCircle className="w-5 h-5 text-red-600" /><span className="text-red-700 text-sm">{bannerError}</span></motion.div>}
          {success && <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl mb-6"><CheckCircle className="w-5 h-5 text-green-600" /><span className="text-green-700 text-sm">Success — action complete</span></motion.div>}
        </AnimatePresence>

        {step === "signup" && (
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Full name */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2"><User className="w-5 h-5 text-regal-black/40" /></div>
              <input type="text" placeholder="Enter your full name" value={formData.fullName} onChange={(e) => handleInputChange("fullName", e.target.value)} className="w-full pl-11 pr-4 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-sage/50 focus:border-regal-sage outline-none bg-regal-offwhite/30" required />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2"><Mail className="w-5 h-5 text-regal-black/40" /></div>
              <input type="email" placeholder="Enter your email" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className={`w-full pl-11 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-regal-sage/50 outline-none bg-regal-offwhite/30 ${errors.email ? "border-red-300" : "border-regal-beige"}`} required />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2"><Lock className="w-5 h-5 text-regal-black/40" /></div>
              <input type={showPassword ? "text" : "password"} placeholder="Create a password" value={formData.password} onChange={(e) => handleInputChange("password", e.target.value)} className={`w-full pl-11 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-regal-sage/50 outline-none bg-regal-offwhite/30 ${errors.password ? "border-red-300" : "border-regal-beige"}`} required />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-regal-beige/30 rounded">{showPassword ? <EyeOff className="w-5 h-5 text-regal-black/40" /> : <Eye className="w-5 h-5 text-regal-black/40" />}</button>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
              {!errors.password && formData.password && <p className="mt-1 text-xs text-regal-black/60">Must be 8+ characters with uppercase, lowercase, number, and special character.</p>}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2"><Lock className="w-5 h-5 text-regal-black/40" /></div>
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirm your password" value={formData.confirmPassword} onChange={(e) => handleInputChange("confirmPassword", e.target.value)} className={`w-full pl-11 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-regal-sage/50 outline-none bg-regal-offwhite/30 ${errors.confirmPassword ? "border-red-300" : "border-regal-beige"}`} required />
              <button type="button" onClick={() => setShowConfirmPassword((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-regal-beige/30 rounded">{showConfirmPassword ? <EyeOff className="w-5 h-5 text-regal-black/40" /> : <Eye className="w-5 h-5 text-regal-black/40" />}</button>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>}
            </div>

            <motion.button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-regal-sage via-regal-gold to-regal-burgundy text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50 relative overflow-hidden">
              <AnimatePresence mode="wait">
                {loading ? (<motion.div key="loading" className="flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /><span>Creating Account...</span></motion.div>) : success ? (<motion.div key="success" className="flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /><span>Account Created!</span></motion.div>) : (<motion.div key="register" className="flex items-center justify-center gap-2"><UserPlus className="w-5 h-5" /><span>Create Account</span></motion.div>)}
              </AnimatePresence>
            </motion.button>
          </form>
        )}

        {step === "confirm" && (
          <form onSubmit={handleConfirm} className="space-y-6">
            <div className="text-sm text-regal-black/60 mb-2">We sent a verification code to <strong>{usernameForConfirm}</strong>. Enter it below to confirm your account.</div>

            <div className="relative">
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Confirmation code" className="w-full pl-4 pr-4 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-sage/50 outline-none bg-regal-offwhite/30" required />
            </div>

            <motion.button type="submit" disabled={loading} className="w-full bg-gradient-to-r from-regal-sage via-regal-gold to-regal-burgundy text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50 relative overflow-hidden">
              {loading ? <span>Verifying...</span> : <span>Confirm Account</span>}
            </motion.button>

            <p className="text-sm text-regal-black text-center mt-2">
              Didn’t get the code? <button type="button" className="text-regal-burgundy underline" onClick={() => {
                // resend confirmation
                setLoading(true);
                const user = new CognitoUser({ Username: usernameForConfirm, Pool: userPool });
                user.resendConfirmationCode((err) => {
                  setLoading(false);
                  if (err) setBannerError(err.message || JSON.stringify(err));
                  else setBannerError("Confirmation code resent — check your email.");
                });
              }}>Resend code</button>
            </p>
          </form>
        )}

        {step === "done" && (
          <div className="text-center py-8">
            <p className="text-regal-black/70">Your account is confirmed. Redirecting to login…</p>
          </div>
        )}

        <p className="text-sm text-regal-black text-center mt-6">Already have an account? <Link to="/login" className="text-regal-burgundy font-medium hover:text-regal-gold">Sign in here</Link></p>
      </motion.div>
    </div>
  );
}

