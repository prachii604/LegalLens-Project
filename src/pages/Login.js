import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2, AlertCircle, CheckCircle } from "lucide-react";

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

    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setSuccess(true);
        setTimeout(() => {
          // Store user data with name and email
          const userData = {
            name: email.split('@')[0].replace(/[^a-zA-Z]/g, '').charAt(0).toUpperCase() + email.split('@')[0].replace(/[^a-zA-Z]/g, '').slice(1),
            email: email
          };
          localStorage.setItem("cq_user", JSON.stringify(userData));
          navigate("/dashboard");
        }, 1000);
      } else {
        setError("Please enter valid credentials");
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-regal-offwhite via-regal-beige/20 to-regal-sage/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-regal-gold/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -30, 0], 
            x: [0, 20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-regal-burgundy/20 rounded-full blur-xl"
          animate={{ 
            y: [0, 40, 0], 
            x: [0, -30, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-20 h-20 bg-regal-sage/30 rounded-full blur-lg"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-40 right-1/3 w-16 h-16 bg-regal-gold/15 rounded-full blur-lg"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Login Card */}
      <motion.div
        className="bg-white/95 backdrop-blur-lg p-10 rounded-3xl shadow-2xl w-full max-w-md border border-regal-beige/50 relative z-10"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        {/* Logo/Title Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="w-16 h-16 bg-gradient-to-br from-regal-burgundy to-regal-gold rounded-2xl mx-auto mb-4 flex items-center justify-center"
            whileHover={{ rotate: 10, scale: 1.1 }}
            animate={{ 
              boxShadow: [
                "0 10px 25px rgba(0,0,0,0.1)",
                "0 20px 40px rgba(0,0,0,0.15)",
                "0 10px 25px rgba(0,0,0,0.1)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <LogIn className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold text-regal-burgundy mb-2">
            Welcome Back
          </h2>
          <p className="text-regal-black/60">Sign in to Legal Lens</p>
        </motion.div>

        {/* Error/Success Messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl mb-4"
            >
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-red-700 text-sm">{error}</span>
            </motion.div>
          )}
          
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-xl mb-4"
            >
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-700 text-sm">Login successful! Redirecting...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login Form */}
        <motion.form
          onSubmit={handleLogin}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Email Field */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Mail className="w-5 h-5 text-regal-black/40" />
            </div>
            <motion.input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-gold/50 focus:border-regal-gold outline-none transition-all bg-regal-offwhite/30"
              whileFocus={{ scale: 1.02 }}
              required
            />
          </motion.div>

          {/* Password Field */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Lock className="w-5 h-5 text-regal-black/40" />
            </div>
            <motion.input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-12 py-4 border border-regal-beige rounded-xl focus:ring-2 focus:ring-regal-gold/50 focus:border-regal-gold outline-none transition-all bg-regal-offwhite/30"
              whileFocus={{ scale: 1.02 }}
              required
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-regal-beige/30 rounded"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-regal-black/40" />
              ) : (
                <Eye className="w-5 h-5 text-regal-black/40" />
              )}
            </motion.button>
          </motion.div>

          {/* Forgot Password Link */}
          <motion.div
            className="text-right"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <Link
              to="/forgot-password"
              className="text-sm text-regal-burgundy hover:text-regal-gold transition-colors"
            >
              Forgot password?
            </Link>
          </motion.div>

          {/* Login Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-regal-gold via-regal-gold to-regal-burgundy text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </motion.div>
              ) : success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>Success!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2"
                >
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Button Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.button>
        </motion.form>

        {/* Divider */}
        <motion.div
          className="my-6 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-regal-beige to-transparent"></div>
          <span className="px-4 text-sm text-regal-black/40">or</span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-regal-beige to-transparent"></div>
        </motion.div>

        {/* Register Link */}
        <motion.p
          className="text-sm text-regal-black text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          Don't have an account?{" "}
          <motion.span whileHover={{ scale: 1.05 }} className="inline-block">
            <Link
              to="/register"
              className="text-regal-burgundy font-medium hover:text-regal-gold transition-colors relative"
            >
              Register here
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-regal-gold"
                initial={{ width: "0%" }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          </motion.span>
        </motion.p>

        {/* Additional Features */}
        <motion.div
          className="mt-8 flex justify-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          {/* Social Login Buttons (Optional) */}
          <motion.button
            className="p-3 bg-regal-offwhite/50 border border-regal-beige rounded-xl hover:bg-regal-sage/10 transition-all"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-regal-burgundy" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          </motion.button>

          <motion.button
            className="p-3 bg-regal-offwhite/50 border border-regal-beige rounded-xl hover:bg-regal-sage/10 transition-all"
            whileHover={{ scale: 1.05, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5 text-regal-burgundy" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-regal-gold/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Success Confetti Effect */}
      <AnimatePresence>
        {success && (
          <>
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  backgroundColor: ["#8B4513", "#DAA520", "#9CAF88"][i % 3],
                  left: "50%",
                  top: "50%",
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: (Math.random() - 0.5) * 400,
                  rotate: Math.random() * 360,
                }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,69,19,0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
}