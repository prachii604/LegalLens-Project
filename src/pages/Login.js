// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { Mail, Lock, Eye, EyeOff, LogIn, Loader2, AlertCircle, CheckCircle } from "lucide-react";

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       if (email && password) {
//         setSuccess(true);
//         setTimeout(() => {
//           // Store user data with name and email
//           const userData = {
//             name:
//               email
//                 .split("@")[0]
//                 .replace(/[^a-zA-Z]/g, "")
//                 .charAt(0)
//                 .toUpperCase() +
//               email.split("@")[0].replace(/[^a-zA-Z]/g, "").slice(1),
//             email: email,
//           };
//           localStorage.setItem("cq_user", JSON.stringify(userData));
//           navigate("/dashboard");
//         }, 1000);
//       } else {
//         setError("Please enter valid credentials");
//       }
//       setLoading(false);
//     }, 1500);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-regal-offwhite via-regal-beige/20 to-regal-sage/10 relative overflow-hidden">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* your motion div backgrounds unchanged */}
//       </div>

//       {/* Login Card */}
//       <motion.div
//         className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-regal-beige/50 relative z-10"
//         initial={{ opacity: 0, y: 50, scale: 0.9 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
//       >
//         {/* Logo/Title Section */}
//         <motion.div
//           className="text-center mb-8"
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <motion.div
//             className="w-16 h-16 bg-gradient-to-br from-regal-burgundy to-regal-gold rounded-2xl mx-auto mb-4 flex items-center justify-center"
//             whileHover={{ rotate: 10, scale: 1.1 }}
//             animate={{
//               boxShadow: [
//                 "0 10px 25px rgba(0,0,0,0.1)",
//                 "0 20px 40px rgba(0,0,0,0.15)",
//                 "0 10px 25px rgba(0,0,0,0.1)",
//               ],
//             }}
//             transition={{ duration: 3, repeat: Infinity }}
//           >
//             <LogIn className="w-8 h-8 text-white" />
//           </motion.div>
//           <h2 className="text-3xl font-bold text-regal-burgundy mb-2">
//             Welcome Back
//           </h2>
//           <p className="text-regal-black/60">Sign in to Legal Lens</p>
//         </motion.div>

//         {/* Error/Success Messages */}
//         <AnimatePresence>
//           {error && (
//             <motion.div
//               initial={{ opacity: 0, y: -10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -10, scale: 0.95 }}
//               className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4"
//             >
//               <AlertCircle className="w-4 h-4 text-red-600" />
//               <span className="text-red-700 text-sm">{error}</span>
//             </motion.div>
//           )}

//           {success && (
//             <motion.div
//               initial={{ opacity: 0, y: -10, scale: 0.95 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -10, scale: 0.95 }}
//               className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl mb-4"
//             >
//               <CheckCircle className="w-4 h-4 text-green-600" />
//               <span className="text-green-700 text-sm">
//                 Login successful! Redirecting...
//               </span>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Login Form */}
//         <motion.form
//           onSubmit={handleLogin}
//           className="space-y-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           {/* Email Field */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               <Mail className="w-5 h-5 text-regal-black/40" />
//             </div>
//             <motion.input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full pl-11 pr-4 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-gold/50 focus:border-regal-gold outline-none transition-all bg-regal-offwhite/30"
//               whileFocus={{ scale: 1.02 }}
//               required
//             />
//           </motion.div>

//           {/* Password Field */}
//           <motion.div
//             className="relative"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.6 }}
//           >
//             <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
//               <Lock className="w-5 h-5 text-regal-black/40" />
//             </div>
//             <motion.input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full pl-11 pr-12 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-gold/50 focus:border-regal-gold outline-none transition-all bg-regal-offwhite/30"
//               whileFocus={{ scale: 1.02 }}
//               required
//             />
//             {/* updated eye button */}
//             <motion.button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-0 h-full flex items-center justify-center px-2 hover:bg-regal-beige/30 rounded"
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

//           {/* Forgot Password Link */}
//           <motion.div
//             className="text-right"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.7 }}
//           >
//             <Link
//               to="/forgot-password"
//               className="text-sm text-regal-burgundy hover:text-regal-gold transition-colors"
//             >
//               Forgot password?
//             </Link>
//           </motion.div>

//           {/* Login Button */}
//           <motion.button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-gradient-to-r from-regal-gold via-regal-gold to-regal-burgundy text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.8 }}
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
//                   <span>Signing in...</span>
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
//                   <span>Success!</span>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   key="login"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="flex items-center justify-center gap-2"
//                 >
//                   <LogIn className="w-5 h-5" />
//                   <span>Sign In</span>
//                 </motion.div>
//               )}
//             </AnimatePresence>

//             {/* Button Shine Effect */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//               initial={{ x: "-100%" }}
//               animate={{ x: "100%" }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//             />
//           </motion.button>
//         </motion.form>

//         {/* Divider */}
//         {/* ...rest of the code unchanged */}
//       </motion.div>
//     </div>
//   );
// }

// src/Login.js
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2, AlertCircle, CheckCircle } from "lucide-react";

import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";
import { poolData } from "./aws-config";

const userPool = new CognitoUserPool(poolData);

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const authDetails = new AuthenticationDetails({
      Username: email.trim().toLowerCase(),
      Password: password
    });

    const user = new CognitoUser({ Username: email.trim().toLowerCase(), Pool: userPool });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        setLoading(false);
        setSuccess(true);

        // ✅ 1️⃣ Store Cognito tokens
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken()?.getToken?.();

        sessionStorage.setItem("idToken", idToken);
        sessionStorage.setItem("accessToken", accessToken);
        if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken);

        // ✅ 2️⃣ Extract user info from ID token (decoded JWT)
        const decoded = JSON.parse(atob(idToken.split(".")[1] || "{}"));
        const userName = decoded.name || decoded.email?.split?.("@")?.[0] || "User";
        const userEmail = decoded.email || email;

        // ✅ 3️⃣ Store compatible object for your Dashboard.js
        const userData = { name: userName, email: userEmail };
        localStorage.setItem("cq_user", JSON.stringify(userData));

        // ✅ 4️⃣ Redirect after a short delay
        setTimeout(() => navigate("/dashboard"), 700);
      },
      onFailure: (err) => {
        console.error("Auth error", err);
        setLoading(false);
        setError(err.message || JSON.stringify(err));
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-regal-offwhite via-regal-beige/20 to-regal-sage/10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" />

      <motion.div
        className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-regal-beige/50 relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 bg-gradient-to-br from-regal-burgundy to-regal-gold rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-regal-burgundy mb-2">Welcome Back</h2>
          <p className="text-regal-black/60">Sign in to Legal Lens</p>
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4"
            >
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-red-700 text-sm">{error}</span>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl mb-4"
            >
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm">Login successful! Redirecting...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2"><Mail className="w-5 h-5 text-regal-black/40" /></div>
            <motion.input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-gold/50 focus:border-regal-gold outline-none bg-regal-offwhite/30"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2"><Lock className="w-5 h-5 text-regal-black/40" /></div>
            <motion.input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-12 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-gold/50 focus:border-regal-gold outline-none bg-regal-offwhite/30"
              required
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-0 h-full flex items-center justify-center px-2 hover:bg-regal-beige/30 rounded"
            >
              {showPassword ? <EyeOff className="w-5 h-5 text-regal-black/40" /> : <Eye className="w-5 h-5 text-regal-black/40" />}
            </motion.button>
          </div>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-regal-burgundy hover:text-regal-gold">Forgot password?</Link>
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-regal-gold via-regal-gold to-regal-burgundy text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {loading ? <motion.div key="loading" className="flex items-center justify-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /><span>Signing in...</span></motion.div> : success ? <motion.div key="success" className="flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /><span>Success!</span></motion.div> : <motion.div key="login" className="flex items-center justify-center gap-2"><LogIn className="w-5 h-5" /><span>Sign In</span></motion.div>}
            </AnimatePresence>
          </motion.button>
        </motion.form>

        <p className="text-sm text-regal-black text-center mt-6">Don't have an account? <Link to="/register" className="text-regal-burgundy font-medium hover:text-regal-gold">Sign up</Link></p>
      </motion.div>
    </div>
  );
}
