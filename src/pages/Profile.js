import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Mail, 
  FileText, 
  ArrowLeft, 
  Settings, 
  Edit3, 
  Save, 
  X,
  Sparkles,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Added

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "Jane Doe",
    email: "jane@example.com",
    contractsUploaded: 2
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(userData);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const navigate = useNavigate(); // ✅ Added

  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-gray-50 to-yellow-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-red-900/10 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-16 w-24 h-24 bg-yellow-600/15 rounded-full blur-xl"
          animate={{ 
            rotate: [0, -360],
            scale: [1, 0.9, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-20 right-1/3 w-36 h-36 bg-green-600/15 rounded-full blur-2xl"
          animate={{ 
            y: [0, -30, 0],
            x: [0, 25, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="bg-white/95 backdrop-blur-lg shadow-lg p-4 flex justify-between items-center border-b border-gray-200/50 relative z-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-2xl font-bold bg-gradient-to-r from-red-900 to-yellow-600 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Legal Lens
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={() => navigate("/dashboard")} // ✅ Navigate to Dashboard.js
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-600 to-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Dashboard</span>
          </button>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <main className="p-8 max-w-4xl mx-auto relative z-10">
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Profile Card */}
          <motion.div
            className="md:col-span-2 bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200/50 p-8 relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between mb-8">
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-green-600 to-yellow-600 rounded-2xl flex items-center justify-center relative"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  animate={{ 
                    boxShadow: [
                      "0 8px 20px rgba(34,197,94,0.3)",
                      "0 16px 35px rgba(234,179,8,0.4)",
                      "0 8px 20px rgba(34,197,94,0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <User className="w-8 h-8 text-white" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
                <div>
                  <h2 className="text-2xl font-bold text-red-900">My Profile</h2>
                  <p className="text-gray-600">Manage your account information</p>
                </div>
              </motion.div>
              
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-900 to-green-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {isEditing ? <X className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
                {isEditing ? "Cancel" : "Edit"}
              </motion.button>
            </div>

            {/* Success Message */}
            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-xl mb-6"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Sparkles className="w-5 h-5 text-green-600" />
                  </motion.div>
                  <span className="text-green-700 text-sm">Profile updated successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile Information */}
            <div className="space-y-6">
              {/* Name Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <label className="block text-sm font-medium text-red-900 mb-2">Full Name</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  {isEditing ? (
                    <motion.input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-600 outline-none transition-all bg-gray-50/30"
                      whileFocus={{ scale: 1.02 }}
                    />
                  ) : (
                    <div className="w-full pl-11 pr-4 py-3 border border-gray-200/50 rounded-xl bg-gray-50/50 text-gray-900">
                      {userData.name}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <label className="block text-sm font-medium text-red-900 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  {isEditing ? (
                    <motion.input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-600 outline-none transition-all bg-gray-50/30"
                      whileFocus={{ scale: 1.02 }}
                    />
                  ) : (
                    <div className="w-full pl-11 pr-4 py-3 border border-gray-200/50 rounded-xl bg-gray-50/50 text-gray-900">
                      {userData.email}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Save Button (only shown when editing) */}
              <AnimatePresence>
                {isEditing && (
                  <motion.button
                    onClick={handleSave}
                    className="w-full bg-gradient-to-r from-green-600 via-yellow-600 to-red-900 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 20, scale: 0.9 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Save className="w-5 h-5" />
                      <span>Save Changes</span>
                    </div>
                    {/* Button Shine Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Stats & Account Info Card */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {/* Stats Cards */}
            <div className="space-y-4">
              {/* Contracts Uploaded */}
              <motion.div
                className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 p-4 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-green-600 to-yellow-600 rounded-xl flex items-center justify-center"
                    whileHover={{ rotate: 15 }}
                  >
                    <FileText className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-2xl font-bold text-red-900">{userData.contractsUploaded}</p>
                    <p className="text-xs text-gray-600">Contracts Uploaded</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Security Features */}
            <motion.div
              className="bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl border border-gray-200/50 p-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-4 h-4 text-red-900" />
                <span className="text-sm font-medium text-red-900">Account Security</span>
              </div>
              <div className="space-y-1 text-xs text-gray-700">
                <p>• Two-factor authentication enabled</p>
                <p>• End-to-end encryption</p>
                <p>• Regular security audits</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Additional Actions */}
        <motion.div
          className="mt-8 flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.button
            className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-red-900"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Settings className="w-4 h-4" />
            <span>Account Settings</span>
          </motion.button>
        </motion.div>
      </main>
    </div>
  );
}
