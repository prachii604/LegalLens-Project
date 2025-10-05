// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { 
//   User, 
//   Mail, 
//   Lock, 
//   Eye, 
//   EyeOff, 
//   UserPlus, 
//   Loader2, 
//   AlertCircle, 
//   CheckCircle,
//   Shield,
//   Sparkles
// } from "lucide-react";

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
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState(0);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setError("");

//     // Calculate password strength
//     if (field === "password") {
//       let strength = 0;
//       if (value.length >= 8) strength += 25;
//       if (/[A-Z]/.test(value)) strength += 25;
//       if (/[0-9]/.test(value)) strength += 25;
//       if (/[^A-Za-z0-9]/.test(value)) strength += 25;
//       setPasswordStrength(strength);
//     }
//   };

//   const getPasswordStrengthColor = () => {
//     if (passwordStrength < 25) return "bg-red-500";
//     if (passwordStrength < 50) return "bg-orange-500";
//     if (passwordStrength < 75) return "bg-yellow-500";
//     return "bg-green-500";
//   };

//   const getPasswordStrengthText = () => {
//     if (passwordStrength < 25) return "Weak";
//     if (passwordStrength < 50) return "Fair";
//     if (passwordStrength < 75) return "Good";
//     return "Strong";
//   };

//   const handleRegister = (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // Validation
//     if (!formData.fullName || !formData.email || !formData.password) {
//       setError("Please fill in all fields");
//       setLoading(false);
//       return;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError("Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     if (passwordStrength < 50) {
//       setError("Please choose a stronger password");
//       setLoading(false);
//       return;
//     }

//     // Simulate API call
//     setTimeout(() => {
//       setSuccess(true);
//       setTimeout(() => {
//         // Store user data
//         const userData = {
//           name: formData.fullName,
//           email: formData.email
//         };
//         localStorage.setItem("cq_user", JSON.stringify(userData));
//         navigate("/dashboard");
//       }, 1500);
//       setLoading(false);
//     }, 2000);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-regal-sage/10 via-regal-offwhite to-regal-gold/10 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         <motion.div
//           className="absolute top-16 left-16 w-40 h-40 bg-regal-burgundy/10 rounded-full blur-2xl"
//           animate={{ 
//             scale: [1, 1.3, 1],
//             x: [0, 30, 0],
//             y: [0, -20, 0]
//           }}
//           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute top-1/3 right-20 w-28 h-28 bg-regal-gold/15 rounded-full blur-xl"
//           animate={{ 
//             rotate: [0, 360],
//             scale: [1, 0.8, 1.2, 1]
//           }}
//           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//         />
//         <motion.div
//           className="absolute bottom-32 left-1/3 w-24 h-24 bg-regal-sage/20 rounded-full blur-xl"
//           animate={{ 
//             y: [0, 50, 0],
//             x: [0, -40, 0],
//             rotate: [0, -180, -360]
//           }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
//       </div>

//       {/* Register Card */}
//       <motion.div
//         className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-regal-beige/50 relative z-10"
//         initial={{ opacity: 0, y: 60, scale: 0.9 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
//       >
//         {/* Header Section */}
//         <motion.div
//           className="text-center mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <motion.div
//             className="w-20 h-20 bg-gradient-to-br from-regal-sage to-regal-gold rounded-3xl mx-auto mb-4 flex items-center justify-center relative"
//             whileHover={{ rotate: 15, scale: 1.1 }}
//             animate={{ 
//               boxShadow: [
//                 "0 10px 25px rgba(156,175,136,0.3)",
//                 "0 20px 40px rgba(218,165,32,0.4)",
//                 "0 10px 25px rgba(156,175,136,0.3)"
//               ]
//             }}
//             transition={{ duration: 4, repeat: Infinity }}
//           >
//             <UserPlus className="w-10 h-10 text-white" />
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-3xl"
//               animate={{ rotate: [0, 360] }}
//               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//             />
//           </motion.div>
//           <h2 className="text-3xl font-bold text-regal-burgundy mb-2">
//             Join Legal Lens
//           </h2>
//           <p className="text-regal-black/60">Create your account to get started</p>
//         </motion.div>

//         {/* Error/Success Messages */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -10, scale: 0.95 }}
//               className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl mb-6"
//             >
//               <AlertCircle className="w-5 h-5 text-red-600" />
//               <span className="text-red-700 text-sm">{error}</span>
//             </motion.div>
//           )}
          
//           {success && (
//             <motion.div
//               initial={{ opacity: 0, y: -10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -10, scale: 0.95 }}
//               className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl mb-6"
//             >
//               <CheckCircle className="w-5 h-5 text-green-600" />
//               <span className="text-green-700 text-sm">Account created successfully! Redirecting...</span>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Register Form */}
//         <motion.form
//           onSubmit={handleRegister}
//           className="space-y-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           {/* Full Name Field */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               <User className="w-5 h-5 text-regal-black/40" />
//             </div>
//             <motion.input
//               type="text"
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={(e) => handleInputChange("fullName", e.target.value)}
//               className="w-full pl-11 pr-4 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-sage/50 focus:border-regal-sage outline-none transition-all bg-regal-offwhite/30"
//               whileFocus={{ scale: 1.02 }}
//               required
//             />
//           </motion.div>

//           {/* Email Field */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               <Mail className="w-5 h-5 text-regal-black/40" />
//             </div>
//             <motion.input
//               type="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={(e) => handleInputChange("email", e.target.value)}
//               className="w-full pl-11 pr-4 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-sage/50 focus:border-regal-sage outline-none transition-all bg-regal-offwhite/30"
//               whileFocus={{ scale: 1.02 }}
//               required
//             />
//           </motion.div>

//           {/* Password Field */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           >
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               <Lock className="w-5 h-5 text-regal-black/40" />
//             </div>
//             <motion.input
//               type={showPassword ? "text" : "password"}
//               placeholder="Create a password"
//               value={formData.password}
//               onChange={(e) => handleInputChange("password", e.target.value)}
//               className="w-full pl-11 pr-12 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-sage/50 focus:border-regal-sage outline-none transition-all bg-regal-offwhite/30"
//               whileFocus={{ scale: 1.02 }}
//               required
//             />
//             <motion.button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-regal-beige/30 rounded"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               {showPassword ? (
//                 <EyeOff className="w-5 h-5 text-regal-black/40" />
//               ) : (
//                 <Eye className="w-5 h-5 text-regal-black/40" />
//               )}
//             </motion.button>
//           </motion.div>

//           {/* Password Strength Indicator */}
//           {formData.password && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               className="space-y-2"
//             >
//               <div className="flex items-center gap-2">
//                 <Shield className="w-4 h-4 text-regal-black/60" />
//                 <span className="text-sm text-regal-black/60">Password Strength: </span>
//                 <span className={`text-sm font-medium ${
//                   passwordStrength < 25 ? "text-red-600" :
//                   passwordStrength < 50 ? "text-orange-600" :
//                   passwordStrength < 75 ? "text-yellow-600" : "text-green-600"
//                 }`}>
//                   {getPasswordStrengthText()}
//                 </span>
//               </div>
//               <div className="w-full bg-gray-200 rounded-full h-2">
//                 <motion.div
//                   className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
//                   initial={{ width: "0%" }}
//                   animate={{ width: `${passwordStrength}%` }}
//                   transition={{ duration: 0.3 }}
//                 />
//               </div>
//             </motion.div>
//           )}

//           {/* Confirm Password Field */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, x: -30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
//           >
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               <Lock className="w-5 h-5 text-regal-black/40" />
//             </div>
//             <motion.input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//               className="w-full pl-11 pr-12 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-sage/50 focus:border-regal-sage outline-none transition-all bg-regal-offwhite/30"
//               whileFocus={{ scale: 1.02 }}
//               required
//             />
//             <motion.button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-regal-beige/30 rounded"
//               whileHover={{ scale: 1.1 }}
//               whileTap={{ scale: 0.9 }}
//             >
//               {showConfirmPassword ? (
//                 <EyeOff className="w-5 h-5 text-regal-black/40" />
//               ) : (
//                 <Eye className="w-5 h-5 text-regal-black/40" />
//               )}
//             </motion.button>
//           </motion.div>

//           {/* Terms and Conditions */}
//           <motion.div
//             className="flex items-center gap-3"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.9 }}
//           >
//             <input
//               type="checkbox"
//               id="terms"
//               className="w-4 h-4 text-regal-gold border-regal-beige rounded focus:ring-regal-sage"
//               required
//             />
//             <label htmlFor="terms" className="text-sm text-regal-black/70">
//               I agree to the{" "}
//               <Link to="/terms" className="text-regal-burgundy hover:text-regal-gold transition-colors underline">
//                 Terms of Service
//               </Link>{" "}
//               and{" "}
//               <Link to="/privacy" className="text-regal-burgundy hover:text-regal-gold transition-colors underline">
//                 Privacy Policy
//               </Link>
//             </label>
//           </motion.div>

//           {/* Register Button */}
//           <motion.button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-regal-sage via-regal-gold to-regal-burgundy text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 1.0 }}
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             <AnimatePresence mode="wait">
//               {loading ? (
//                 <motion.div
//                   key="loading"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                   <span>Creating Account...</span>
//                 </motion.div>
//               ) : success ? (
//                 <motion.div
//                   key="success"
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   exit={{ opacity: 0, scale: 0.8 }}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <CheckCircle className="w-5 h-5" />
//                   <span>Account Created!</span>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="register"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <UserPlus className="w-5 h-5" />
//                   <span>Create Account</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Button Shine Effect */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//               initial={{ x: "-100%" }}
//               animate={{ x: "100%" }}
//               transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//             />
//           </motion.button>
//         </motion.form>

//         {/* Divider */}
//         <motion.div
//           className="my-8 flex items-center"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5, delay: 1.1 }}
//         >
//           <div className="flex-1 h-px bg-gradient-to-r from-transparent via-regal-beige to-transparent"></div>
//           <span className="px-4 text-sm text-regal-black/40">or</span>
//           <div className="flex-1 h-px bg-gradient-to-r from-transparent via-regal-beige to-transparent"></div>
//         </motion.div>

//         {/* Login Link */}
//         <motion.p
//           className="text-sm text-regal-black text-center"
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 1.2 }}
//         >
//           Already have an account?{" "}
//           <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
//             <Link
//               to="/login"
//               className="text-regal-burgundy font-medium hover:text-regal-gold transition-colors relative"
//             >
//               Sign in here
//               <motion.div
//                 className="absolute bottom-0 left-0 h-0.5 bg-regal-gold"
//                 initial={{ width: "0%" }}
//                 whileHover={{ width: "100%" }}
//                 transition={{ duration: 0.3 }}
//               />
//             </Link>
//           </motion.span>
//         </motion.p>

//         {/* Benefits Section */}
//         <motion.div
//           className="mt-8 p-4 bg-gradient-to-r from-regal-sage/10 to-regal-gold/10 rounded-xl border border-regal-beige/50"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 1.3 }}
//         >
//           <div className="flex items-center gap-2 mb-2">
//             <Sparkles className="w-4 h-4 text-regal-gold" />
//             <span className="text-sm font-medium text-regal-burgundy">Why join Legal Lens?</span>
//           </div>
//           <ul className="text-xs text-regal-black/70 space-y-1">
//             <li>• Secure contract management</li>
//             <li>• AI-powered document analysis</li>
//             <li>• Cloud storage & easy access</li>
//           </ul>
//         </motion.div>
//       </motion.div>

//       {/* Floating Particles */}
//       {[...Array(8)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute w-2 h-2 bg-regal-sage/40 rounded-full"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//           }}
//           animate={{
//             y: [0, -120, 0],
//             opacity: [0, 1, 0],
//             scale: [0, 1, 0]
//           }}
//           transition={{
//             duration: 6 + Math.random() * 3,
//             repeat: Infinity,
//             delay: Math.random() * 3,
//             ease: "easeInOut"
//           }}
//         />
//       ))}

//       {/* Success Celebration Effect */}
//       <AnimatePresence>
//         {success && (
//           <>
//             {[...Array(25)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-3 h-3 rounded-full"
//                 style={{
//                   backgroundColor: ["#9CAF88", "#DAA520", "#8B4513"][i % 3],
//                   left: "50%",
//                   top: "50%",
//                 }}
//                 initial={{ scale: 0, x: 0, y: 0 }}
//                 animate={{
//                   scale: [0, 1, 0],
//                   x: (Math.random() - 0.5) * 500,
//                   y: (Math.random() - 0.5) * 500,
//                   rotate: Math.random() * 720,
//                 }}
//                 exit={{ opacity: 0 }}
//                 transition={{
//                   duration: 2,
//                   ease: "easeOut",
//                 }}
//               />
//             ))}
//           </>
//         )}
//       </AnimatePresence>

//       {/* Background Pattern */}
//       <div className="absolute inset-0 opacity-5">
//         <div className="absolute inset-0" style={{
//           backgroundImage: `radial-gradient(circle at 2px 2px, rgba(156,175,136,0.4) 1px, transparent 0)`,
//           backgroundSize: '60px 60px'
//         }} />
//       </div>
//     </div>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Lock, Eye, EyeOff, UserPlus, Loader2,
  AlertCircle, CheckCircle
} from "lucide-react";

// Regex: basic RFC-like email, and strong password (8+ chars, 1 upper, 1 lower, 1 digit, 1 special)
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

  // field-level errors just for email + password validity
  const [errors, setErrors] = useState({ email: "", password: "", confirmPassword: "" });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setBannerError("");
    // live validation for email & confirm password
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
      e.password =
        "Password must be 8+ chars and include uppercase, lowercase, number, and special character";
      ok = false;
    }
    if (formData.password !== formData.confirmPassword) {
      e.confirmPassword = "Passwords do not match";
      ok = false;
    }
    setErrors(e);
    return ok;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setBannerError("");
    setSuccess(false);

    if (!formData.fullName.trim()) {
      setBannerError("Please enter your full name");
      return;
    }
    if (!validate()) return;

    // If only client-side check is needed, simulate success
    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
      localStorage.setItem(
        "cq_user",
        JSON.stringify({ name: formData.fullName.trim(), email: formData.email.trim().toLowerCase() })
      );
      setTimeout(() => navigate("/dashboard"), 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-regal-sage/10 via-regal-offwhite to-regal-gold/10 relative overflow-hidden">
      <motion.div
        className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-regal-beige/50 relative z-10"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-regal-sage to-regal-gold rounded-3xl mx-auto mb-4 flex items-center justify-center">
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-regal-burgundy mb-2">Join Legal Lens</h2>
          <p className="text-regal-black/60">Create your account to get started</p>
        </motion.div>

        <AnimatePresence>
          {bannerError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl mb-6"
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-red-700 text-sm">{bannerError}</span>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl mb-6"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-700 text-sm">Account created! Redirecting…</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Full name */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <User className="w-5 h-5 text-regal-black/40" />
            </div>
            <input
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="w-full pl-11 pr-4 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-sage/50 focus:border-regal-sage outline-none bg-regal-offwhite/30"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Mail className="w-5 h-5 text-regal-black/40" />
            </div>
            <input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full pl-11 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-regal-sage/50 outline-none bg-regal-offwhite/30 ${
                errors.email ? "border-red-300" : "border-regal-beige"
              }`}
              required
            />
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Lock className="w-5 h-5 text-regal-black/40" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`w-full pl-11 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-regal-sage/50 outline-none bg-regal-offwhite/30 ${
                errors.password ? "border-red-300" : "border-regal-beige"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-regal-beige/30 rounded"
            >
              {showPassword ? <EyeOff className="w-5 h-5 text-regal-black/40" /> : <Eye className="w-5 h-5 text-regal-black/40" />}
            </button>
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">
                {errors.password}
              </p>
            )}
            {!errors.password && formData.password && (
              <p className="mt-1 text-xs text-regal-black/60">
                Must be 8+ characters with uppercase, lowercase, number, and special character.
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <Lock className="w-5 h-5 text-regal-black/40" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className={`w-full pl-11 pr-12 py-4 border rounded-xl focus:ring-2 focus:ring-regal-sage/50 outline-none bg-regal-offwhite/30 ${
                errors.confirmPassword ? "border-red-300" : "border-regal-beige"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-regal-beige/30 rounded"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5 text-regal-black/40" /> : <Eye className="w-5 h-5 text-regal-black/40" />}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-regal-sage via-regal-gold to-regal-burgundy text-white font-semibold py-4 rounded-xl shadow-lg disabled:opacity-50 relative overflow-hidden"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating Account...</span>
                </motion.div>
              ) : success ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Account Created!</span>
                </motion.div>
              ) : (
                <motion.div key="register" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  <span>Create Account</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </form>

        {/* Footer link */}
        <p className="text-sm text-regal-black text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-regal-burgundy font-medium hover:text-regal-gold">Sign in here</Link>
        </p>
      </motion.div>
    </div>
  );
}
