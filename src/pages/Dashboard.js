import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  FileText, 
  Loader2, 
  User, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  Calendar,
  Clock,
  TrendingUp,
  FileCheck,
  AlertCircle,
  Plus,
  Grid3X3,
  List
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [contracts, setContracts] = useState([
    // Sample data for demonstration
    { 
      id: 1,
      name: "Service Agreement 2024.pdf", 
      date: "2024-08-15",
      status: "active",
      type: "service",
      size: "2.4 MB"
    },
    { 
      id: 2,
      name: "NDA - TechCorp.pdf", 
      date: "2024-08-10",
      status: "pending",
      type: "nda",
      size: "1.1 MB"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  // Get user info from localStorage
  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("cq_user") || "{}");
    if (userData.name) setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cq_user");
    navigate("/");
  };

  const handleUpload = (file) => {
    if (!file) return;

    setLoading(true);

    setTimeout(() => {
      const newContract = {
        id: Date.now(),
        name: file.name,
        date: new Date().toISOString().split("T")[0],
        status: "active",
        type: file.name.toLowerCase().includes("nda") ? "nda" : "service",
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`
      };
      
      setContracts([newContract, ...contracts]);
      setLoading(false);
    }, 2000);
  };

  const handleFileInput = (e) => {
    handleUpload(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleDeleteContract = (id) => {
    setContracts(contracts.filter(contract => contract.id !== id));
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || contract.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const stats = [
    { label: "Total Contracts", value: contracts.length, icon: FileText, color: "text-blue-600" },
    { label: "Active", value: contracts.filter(c => c.status === "active").length, icon: FileCheck, color: "text-green-600" },
    { label: "Pending", value: contracts.filter(c => c.status === "pending").length, icon: Clock, color: "text-yellow-600" },
    { label: "This Month", value: contracts.filter(c => new Date(c.date).getMonth() === new Date().getMonth()).length, icon: TrendingUp, color: "text-purple-600" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-regal-offwhite to-regal-beige/30 px-6 py-8">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-regal-gold/10 rounded-full"
          animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-regal-burgundy/10 rounded-full"
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <motion.div 
        className="flex justify-between items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-4xl font-bold text-regal-burgundy mb-2">Legal Lens</h1>
          <p className="text-regal-black/60">Welcome back, {user.name}</p>
        </div>

        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Profile Icon */}
          <motion.button
            onClick={handleProfile}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl border border-regal-beige/50"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-6 h-6 text-regal-burgundy" />
          </motion.button>

          {/* Logout Button */}
          <motion.button
            onClick={handleLogout}
            className="px-6 py-3 bg-gradient-to-r from-regal-gold to-regal-gold/80 text-white rounded-xl  shadow-lg hover:shadow-xl border border-regal-gold/20"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Logout
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-regal-beige/50"
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-regal-black/60 mb-1">{stat.label}</p>
                <motion.p 
                  className="text-2xl font-bold text-regal-black"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + 0.1 * index, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
              </div>
              <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Upload Section */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 mb-8 border border-regal-beige/50"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{ scale: 1.005 }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-regal-gold/20 rounded-xl">
            <Plus className="w-6 h-6 text-regal-burgundy" />
          </div>
          <h2 className="text-xl font-semibold text-regal-black">
            Upload New Contract
          </h2>
        </div>
        
        <motion.label 
          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
            dragOver 
              ? "border-regal-gold bg-regal-gold/10 scale-105" 
              : "border-regal-beige/60 hover:border-regal-gold hover:bg-regal-sage/5"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <Loader2 className="animate-spin w-8 h-8 text-regal-gold mb-3" />
                <span className="text-regal-black font-medium">Processing...</span>
              </motion.div>
            ) : (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Upload className="w-8 h-8 text-regal-burgundy mb-3" />
                </motion.div>
                <span className="text-regal-black font-medium mb-1">
                  Drop files here or click to browse
                </span>
                <span className="text-sm text-regal-black/50">
                  Supports PDF, DOC, DOCX files
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <input type="file" className="hidden" onChange={handleFileInput} accept=".pdf,.doc,.docx" />
        </motion.label>
      </motion.div>

      {/* Search and Filter Section */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 mb-6 border border-regal-beige/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-regal-black/40" />
            <input
              type="text"
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-regal-offwhite/50 border border-regal-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-regal-gold/50 focus:border-regal-gold transition-all"
            />
          </div>

          {/* Filter and View Controls */}
          <div className="flex items-center gap-3">
            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-regal-black/40" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-9 pr-8 py-3 bg-regal-offwhite/50 border border-regal-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-regal-gold/50 appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="expired">Expired</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-regal-offwhite/50 rounded-xl border border-regal-beige p-1">
              <motion.button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Grid3X3 className="w-4 h-4 text-regal-burgundy" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm" : ""}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <List className="w-4 h-4 text-regal-burgundy" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Contracts Section */}
      <motion.div
        className="bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-8 border border-regal-beige/50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-regal-burgundy/10 rounded-xl">
              <FileText className="w-6 h-6 text-regal-burgundy" />
            </div>
            <h2 className="text-xl font-semibold text-regal-black">
              Your Contracts ({filteredContracts.length})
            </h2>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {filteredContracts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-16"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <AlertCircle className="w-16 h-16 text-regal-black/30 mb-4" />
              </motion.div>
              <p className="text-regal-black/60 text-lg">
                {searchTerm || filterStatus !== "all" ? "No contracts match your search." : "No contracts uploaded yet."}
              </p>
              <p className="text-regal-black/40 text-sm mt-2">
                Upload your first contract to get started
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="contracts"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewMode === "grid" 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                : "space-y-4"
              }
            >
              <AnimatePresence>
                {filteredContracts.map((contract, idx) => (
                  <motion.div
                    key={contract.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`bg-gradient-to-br from-white to-regal-offwhite/50 rounded-2xl p-6 border border-regal-beige/50 shadow-lg hover:shadow-xl transition-all duration-300 ${
                      viewMode === "list" ? "flex items-center justify-between" : ""
                    }`}
                    whileHover={{ scale: 1.02, y: -5 }}
                  >
                    <div className={`flex items-center gap-4 ${viewMode === "list" ? "flex-1" : "mb-4"}`}>
                      <motion.div
                        className="p-3 bg-regal-burgundy/10 rounded-xl"
                        whileHover={{ rotate: 15 }}
                      >
                        <FileText className="w-6 h-6 text-regal-burgundy" />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold text-regal-black mb-1 line-clamp-1">
                          {contract.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-regal-black/60">
                          <Calendar className="w-4 h-4" />
                          <span>{contract.date}</span>
                          <span>•</span>
                          <span>{contract.size}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`mb-4 ${viewMode === "list" ? "mb-0 mx-4" : ""}`}>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>
                        {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className={`flex gap-2 ${viewMode === "list" ? "" : "justify-center"}`}>
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2 bg-regal-sage/20 text-regal-burgundy rounded-xl hover:bg-regal-sage/30 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye className="w-4 h-4" />
                        {viewMode === "grid" && <span className="text-sm">View</span>}
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center gap-2 px-4 py-2 bg-regal-gold/20 text-regal-burgundy rounded-xl hover:bg-regal-gold/30 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4" />
                        {viewMode === "grid" && <span className="text-sm">Download</span>}
                      </motion.button>
                      
                      <motion.button
                        onClick={() => handleDeleteContract(contract.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Quick Actions Floating Button */}
      <motion.div
        className="fixed bottom-8 right-8"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <motion.button
          className="p-4 bg-gradient-to-r from-regal-burgundy to-regal-burgundy/80 text-white rounded-full shadow-2xl"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            boxShadow: [
              "0 10px 25px rgba(0,0,0,0.1)",
              "0 20px 40px rgba(0,0,0,0.2)",
              "0 10px 25px rgba(0,0,0,0.1)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 shadow-2xl"
            >
              <div className="flex flex-col items-center">
                <Loader2 className="animate-spin w-8 h-8 text-regal-gold mb-4" />
                <p className="text-regal-black font-medium">Uploading contract...</p>
                <div className="w-48 bg-regal-beige/30 rounded-full h-2 mt-3">
                  <motion.div
                    className="bg-gradient-to-r from-regal-gold to-regal-burgundy h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}