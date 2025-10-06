// // src/pages/Dashboard.js
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Upload,
//   FileText,
//   Loader2,
//   User,
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Trash2,
//   Calendar,
//   Clock,
//   TrendingUp,
//   FileCheck,
//   AlertCircle,
//   Plus,
//   Grid3X3,
//   List
// } from "lucide-react";

// const API_URL = "https://tsq50u94z7.execute-api.ap-south-1.amazonaws.com/MyStage";

// export default function Dashboard() {
//   const [contracts, setContracts] = useState([  ]);

//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [viewMode, setViewMode] = useState("grid");
//   const [dragOver, setDragOver] = useState(false);
//   const navigate = useNavigate();

//   const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("cq_user") || "{}");
//     if (userData.name) setUser(userData);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("cq_user");
//     navigate("/");
//   };

//   const handleUpload = async (file) => {
//     if (!file) return;

//     setLoading(true);

//     try {
//       // Step 1: Ask API Gateway/Lambda for a presigned URL
//       const presignResp = await fetch(API_URL, {
//         method: "POST", // Lambda is expecting POST
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           filename: file.name,
//           content_type: file.type || "application/pdf"   // ✅ fallback matches Lambda
//         })
//       });

//       if (!presignResp.ok) {
//         const txt = await presignResp.text();
//         throw new Error(`Presign request failed: ${presignResp.status} ${txt}`);
//       }

//       // Lambda may return proxy envelope or direct JSON.
//       const presignData = await presignResp.json();
//       const parsed = typeof presignData.body === "string" ? JSON.parse(presignData.body) : presignData;

//       const uploadURL = parsed.uploadURL || parsed.uploadUrl || parsed.url || parsed.upload_url;
//       const objectKey = parsed.objectKey || parsed.object_key || parsed.key;

//       if (!uploadURL) throw new Error("No presigned upload URL in response");

//       // Step 2: Upload file directly to S3 using the presigned URL
      
//       const putResp = await fetch(uploadURL, {
//         method: "PUT",
//         headers: {
//           "Content-Type": file.type || "application/pdf" // ✅ keep consistent with presign
//         },
//         body: file
//       });

//       if (!putResp.ok) {
//         const txt = await putResp.text();
//         throw new Error(`S3 upload failed: ${putResp.status} ${txt}`);
//       }

//       // Step 3: Update UI with uploaded file details
//       const newContract = {
//         id: Date.now(),
//         name: file.name,
//         date: new Date().toISOString().split("T")[0],
//         status: "active",
//         type: file.name.toLowerCase().includes("nda") ? "nda" : "service",
//         size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
//         s3Key: objectKey || null
//       };

//       setContracts((prev) => [newContract, ...prev]);
//     } catch (err) {
//       console.error("Upload error:", err);
//       alert("Upload failed: " + err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileInput = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) handleUpload(file);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const file = e.dataTransfer.files[0];
//     handleUpload(file);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//   };

//   const handleProfile = () => navigate("/profile");

//   const handleDeleteContract = (id) => {
//     setContracts((prev) => prev.filter((contract) => contract.id !== id));
//   };

//   const filteredContracts = contracts.filter((contract) => {
//     const matchesSearch = contract.name.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter = filterStatus === "all" || contract.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "expired":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const stats = [
//     { label: "Total Contracts", value: contracts.length, icon: FileText, color: "text-blue-600" },
//     { label: "Active", value: contracts.filter((c) => c.status === "active").length, icon: FileCheck, color: "text-green-600" },
//     { label: "Pending", value: contracts.filter((c) => c.status === "pending").length, icon: Clock, color: "text-yellow-600" },
//     { label: "This Month", value: contracts.filter((c) => new Date(c.date).getMonth() === new Date().getMonth()).length, icon: TrendingUp, color: "text-purple-600" }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-regal-offwhite to-regal-beige/30 px-6 py-8">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute top-20 left-10 w-20 h-20 bg-regal-gold/10 rounded-full"
//           animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute top-40 right-20 w-16 h-16 bg-regal-burgundy/10 rounded-full"
//           animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
//           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//         />
//       </div>

//       {/* Header */}
//       <motion.div
//         className="flex justify-between items-center mb-8"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div>
//           <h1 className="text-4xl font-bold text-regal-burgundy mb-2">Legal Lens</h1>
//           <p className="text-regal-black/60">Welcome back, {user.name}</p>
//         </div>

//         <motion.div
//           className="flex items-center gap-4"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <motion.button
//             onClick={handleProfile}
//             className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl border border-regal-beige/50"
//             whileHover={{ scale: 1.05, rotate: 5 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <User className="w-6 h-6 text-regal-burgundy" />
//           </motion.button>

//           <motion.button
//             onClick={handleLogout}
//             className="px-6 py-3 bg-gradient-to-r from-regal-gold to-regal-gold/80 text-white rounded-xl  shadow-lg hover:shadow-xl border border-regal-gold/20"
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Logout
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* Stats Cards */}
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.3 }}
//       >
//         {stats.map((stat, index) => (
//           <motion.div
//             key={stat.label}
//             className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-regal-beige/50"
//             whileHover={{ scale: 1.02, y: -5 }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 * index }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-regal-black/60 mb-1">{stat.label}</p>
//                 <motion.p
//                   className="text-2xl font-bold text-regal-black"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.5 + 0.1 * index, type: "spring" }}
//                 >
//                   {stat.value}
//                 </motion.p>
//               </div>
//               <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
//                 <stat.icon className="w-6 h-6" />
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Upload Section */}
//       <motion.div
//         className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 mb-8 border border-regal-beige/50"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, delay: 0.4 }}
//         whileHover={{ scale: 1.005 }}
//       >
//         <div className="flex items-center gap-3 mb-6">
//           <div className="p-2 bg-regal-gold/20 rounded-xl">
//             <Plus className="w-6 h-6 text-regal-burgundy" />
//           </div>
//           <h2 className="text-xl font-semibold text-regal-black">Upload New Contract</h2>
//         </div>

//         <motion.label
//           className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
//             dragOver ? "border-regal-gold bg-regal-gold/10 scale-105" : "border-regal-beige/60 hover:border-regal-gold hover:bg-regal-sage/5"
//           }`}
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <AnimatePresence mode="wait">
//             {loading ? (
//               <motion.div key="loading" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex flex-col items-center">
//                 <Loader2 className="animate-spin w-8 h-8 text-regal-gold mb-3" />
//                 <span className="text-regal-black font-medium">Processing...</span>
//               </motion.div>
//             ) : (
//               <motion.div key="upload" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="flex flex-col items-center">
//                 <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
//                   <Upload className="w-8 h-8 text-regal-burgundy mb-3" />
//                 </motion.div>
//                 <span className="text-regal-black font-medium mb-1">Drop files here or click to browse</span>
//                 <span className="text-sm text-regal-black/50">Supports PDF, DOC, DOCX files</span>
//               </motion.div>
//             )}
//           </AnimatePresence>
//           <input type="file" className="hidden" onChange={handleFileInput} accept=".pdf,.doc,.docx" />
//         </motion.label>
//       </motion.div>

//       {/* Search and Filter Section */}
//       <motion.div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 mb-6 border border-regal-beige/50" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}>
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-regal-black/40" />
//             <input type="text" placeholder="Search contracts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-regal-offwhite/50 border border-regal-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-regal-gold/50 focus:border-regal-gold transition-all" />
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-regal-black/40" />
//               <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="pl-9 pr-8 py-3 bg-regal-offwhite/50 border border-regal-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-regal-gold/50 appearance-none cursor-pointer">
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="pending">Pending</option>
//                 <option value="expired">Expired</option>
//               </select>
//             </div>

//             <div className="flex bg-regal-offwhite/50 rounded-xl border border-regal-beige p-1">
//               <motion.button onClick={() => setViewMode("grid")} className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Grid3X3 className="w-4 h-4 text-regal-burgundy" />
//               </motion.button>
//               <motion.button onClick={() => setViewMode("list")} className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white shadow-sm" : ""}`} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <List className="w-4 h-4 text-regal-burgundy" />
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Contracts Section */}
//       <motion.div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-8 border border-regal-beige/50" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }}>
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-regal-burgundy/10 rounded-xl">
//               <FileText className="w-6 h-6 text-regal-burgundy" />
//             </div>
//             <h2 className="text-xl font-semibold text-regal-black">Your Contracts ({filteredContracts.length})</h2>
//           </div>
//         </div>

//         <AnimatePresence mode="wait">
//           {filteredContracts.length === 0 ? (
//             <motion.div key="empty" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="flex flex-col items-center justify-center py-16">
//               <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
//                 <AlertCircle className="w-16 h-16 text-regal-black/30 mb-4" />
//               </motion.div>
//               <p className="text-regal-black/60 text-lg">{searchTerm || filterStatus !== "all" ? "No contracts match your search." : "No contracts uploaded yet."}</p>
//               <p className="text-regal-black/40 text-sm mt-2">Upload your first contract to get started</p>
//             </motion.div>
//           ) : (
//             <motion.div key="contracts" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
//               <AnimatePresence>
//                 {filteredContracts.map((contract, idx) => (
//                   <motion.div key={contract.id} layout initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.9 }} transition={{ duration: 0.4, delay: idx * 0.1 }} className={`bg-gradient-to-br from-white to-regal-offwhite/50 rounded-2xl p-6 border border-regal-beige/50 shadow-lg hover:shadow-xl transition-all duration-300 ${viewMode === "list" ? "flex items-center justify-between" : ""}`} whileHover={{ scale: 1.02, y: -5 }}>
//                     <div className={`flex items-center gap-4 ${viewMode === "list" ? "flex-1" : "mb-4"}`}>
//                       <motion.div className="p-3 bg-regal-burgundy/10 rounded-xl" whileHover={{ rotate: 15 }}>
//                         <FileText className="w-6 h-6 text-regal-burgundy" />
//                       </motion.div>

//                       <div className="flex-1">
//                         <h3 className="font-semibold text-regal-black mb-1 line-clamp-1">{contract.name}</h3>
//                         <div className="flex items-center gap-2 text-sm text-regal-black/60">
//                           <Calendar className="w-4 h-4" />
//                           <span>{contract.date}</span>
//                           <span>•</span>
//                           <span>{contract.size}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className={`mb-4 ${viewMode === "list" ? "mb-0 mx-4" : ""}`}>
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contract.status)}`}>{contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}</span>
//                     </div>

//                     <div className={`flex gap-2 ${viewMode === "list" ? "" : "justify-center"}`}>
//                       <motion.button className="flex items-center gap-2 px-4 py-2 bg-regal-sage/20 text-regal-burgundy rounded-xl hover:bg-regal-sage/30 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                         <Eye className="w-4 h-4" />
//                         {viewMode === "grid" && <span className="text-sm">View</span>}
//                       </motion.button>

//                       <motion.button className="flex items-center gap-2 px-4 py-2 bg-regal-gold/20 text-regal-burgundy rounded-xl hover:bg-regal-gold/30 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                         <Download className="w-4 h-4" />
//                         {viewMode === "grid" && <span className="text-sm">Download</span>}
//                       </motion.button>

//                       <motion.button onClick={() => handleDeleteContract(contract.id)} className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                         <Trash2 className="w-4 h-4" />
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       {/* Quick Actions Floating Button */}
//       <motion.div className="fixed bottom-8 right-8" initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, type: "spring" }}>
//         <motion.button className="p-4 bg-gradient-to-r from-regal-burgundy to-regal-burgundy/80 text-white rounded-full shadow-2xl" whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} animate={{ boxShadow: ["0 10px 25px rgba(0,0,0,0.1)", "0 20px 40px rgba(0,0,0,0.2)", "0 10px 25px rgba(0,0,0,0.1)"] }} transition={{ duration: 2, repeat: Infinity }}>
//           <Plus className="w-6 h-6" />
//         </motion.button>
//       </motion.div>

//       {/* Loading Overlay */}
//       <AnimatePresence>
//         {loading && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
//             <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="bg-white rounded-2xl p-8 shadow-2xl">
//               <div className="flex flex-col items-center">
//                 <Loader2 className="animate-spin w-8 h-8 text-regal-gold mb-4" />
//                 <p className="text-regal-black font-medium">Uploading contract...</p>
//                 <div className="w-48 bg-regal-beige/30 rounded-full h-2 mt-3">
//                   <motion.div className="bg-gradient-to-r from-regal-gold to-regal-burgundy h-2 rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2 }} />
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
























//this is the updated one- with authentication only : 

// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   Upload,
//   FileText,
//   Loader2,
//   User,
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Trash2,
//   Calendar,
//   Clock,
//   TrendingUp,
//   FileCheck,
//   AlertCircle,
//   CheckCircle, // ✅ success icon
//   Plus,
//   Grid3X3,
//   List,
//   X, // ✅ close icon
// } from "lucide-react";

// const API_URL = "https://tsq50u94z7.execute-api.ap-south-1.amazonaws.com/MyStage";

// // Client-side max allowed file size (50 MB)
// const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30 MB

// export default function Dashboard() {
//   const [contracts, setContracts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [viewMode, setViewMode] = useState("grid");
//   const [dragOver, setDragOver] = useState(false);
//   const navigate = useNavigate();

//   const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });

//   // Sweet alert state
//   const [alertOpen, setAlertOpen] = useState(false);
//   const [alertTitle, setAlertTitle] = useState("");
//   const [alertMessage, setAlertMessage] = useState("");
//   const [alertType, setAlertType] = useState("error"); // 'success' | 'error'
//   const alertTimer = useRef(null);

//   useEffect(() => {
//     const userData = JSON.parse(localStorage.getItem("cq_user") || "{}");
//     if (userData.name) setUser(userData);
//   }, []);

//   const openAlert = (title, message, type = "error", ms = 2500) => {
//     if (alertTimer.current) clearTimeout(alertTimer.current);
//     setAlertTitle(title);
//     setAlertMessage(message);
//     setAlertType(type);
//     setAlertOpen(true);
//     alertTimer.current = setTimeout(() => {
//       setAlertOpen(false);
//       alertTimer.current = null;
//     }, ms);
//   };
//   useEffect(() => {
//     return () => {
//       if (alertTimer.current) clearTimeout(alertTimer.current);
//     };
//   }, []);
//   const closeAlertNow = () => {
//     setAlertOpen(false);
//     if (alertTimer.current) {
//       clearTimeout(alertTimer.current);
//       alertTimer.current = null;
//     }
//   };

//   const isPdf = (file) =>
//     file && (file.type === "application/pdf" || /\.pdf$/i.test(file.name || ""));

//   // helper: human-readable file size
//   const humanSize = (bytes) => {
//     if (!bytes && bytes !== 0) return "";
//     if (bytes < 1024) return `${bytes} B`;
//     if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
//     return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
//   };

//   const handleLogout = () => {
//   localStorage.removeItem("cq_user");
//   sessionStorage.removeItem("idToken");
//   sessionStorage.removeItem("accessToken");
//   sessionStorage.removeItem("refreshToken");
//   // then navigate to login
//   navigate("/login");
// };

//   const handleUpload = async (file) => {
//     if (!file) return;

//     // PDF-only validation (click & drag/drop)
//     if (!isPdf(file)) {
//       openAlert("PDF required", "Please upload a PDF file (.pdf) only.", "error");
//       return;
//     }

//     // Size validation (client-side)
//     if (file.size > MAX_FILE_SIZE) {
//       openAlert(
//         "File too large",
//         `Maximum allowed size is ${humanSize(MAX_FILE_SIZE)}. Your file is ${humanSize(
//           file.size
//         )}.`,
//         "error"
//       );
//       return;
//     }

//     setLoading(true);

//     try {
//       // Step 1: Ask API for a presigned URL
//       const presignResp = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           filename: file.name,
//           content_type: "application/pdf", // keep strict & consistent
//         }),
//       });

//       if (!presignResp.ok) {
//         const txt = await presignResp.text();
//         if (/filename must end with \.pdf/i.test(txt)) {
//           openAlert("PDF required", "Please upload a PDF file (.pdf) only.", "error");
//         } else {
//           openAlert("Upload failed", "Could not get upload URL. Please try again.", "error");
//         }
//         throw new Error(`Presign request failed: ${presignResp.status} ${txt}`);
//       }

//       // Lambda may return a proxy envelope or direct JSON
//       const presignData = await presignResp.json();
//       const parsed =
//         typeof presignData.body === "string" ? JSON.parse(presignData.body) : presignData;

//       const uploadURL =
//         parsed.uploadURL || parsed.uploadUrl || parsed.url || parsed.upload_url;
//       const objectKey = parsed.objectKey || parsed.object_key || parsed.key;

//       if (!uploadURL) throw new Error("No presigned upload URL in response");

//       // Step 2: PUT directly to S3 using the presigned URL
//       const putResp = await fetch(uploadURL, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/pdf", // must match what was presigned
//         },
//         body: file,
//       });

//       if (!putResp.ok) {
//         const txt = await putResp.text();
//         openAlert("Upload failed", "Could not upload to storage. Please try again.", "error");
//         throw new Error(`S3 upload failed: ${putResp.status} ${txt}`);
//       }

//       // Step 3: Update UI
//       const newContract = {
//         id: Date.now(),
//         name: file.name,
//         date: new Date().toISOString().split("T")[0],
//         status: "active",
//         type: file.name.toLowerCase().includes("nda") ? "nda" : "service",
//         size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
//         s3Key: objectKey || null,
//       };

//       setContracts((prev) => [newContract, ...prev]);
//       openAlert("Upload successful", "Your PDF has been uploaded successfully.", "success");
//     } catch (err) {
//       console.error("Upload error:", err);
//       // already alerted in branches above; fall back just in case
//       openAlert("Upload failed", err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFileInput = (e) => {
//     const file = e.target.files && e.target.files[0];
//     if (file) handleUpload(file);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//     const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
//     if (file) handleUpload(file);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     setDragOver(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     setDragOver(false);
//   };

//   const handleProfile = () => navigate("/profile");

//   const handleDeleteContract = (id) => {
//     setContracts((prev) => prev.filter((contract) => contract.id !== id));
//   };

//   const filteredContracts = contracts.filter((contract) => {
//     const matchesSearch = contract.name
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase());
//     const matchesFilter = filterStatus === "all" || contract.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "expired":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const stats = [
//     { label: "Total Contracts", value: contracts.length, icon: FileText, color: "text-blue-600" },
//     {
//       label: "Active",
//       value: contracts.filter((c) => c.status === "active").length,
//       icon: FileCheck,
//       color: "text-green-600",
//     },
//     {
//       label: "Pending",
//       value: contracts.filter((c) => c.status === "pending").length,
//       icon: Clock,
//       color: "text-yellow-600",
//     },
//     {
//       label: "This Month",
//       value:
//         contracts.filter((c) => new Date(c.date).getMonth() === new Date().getMonth())
//           .length,
//       icon: TrendingUp,
//       color: "text-purple-600",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-regal-offwhite to-regal-beige/30 px-6 py-8">
//       {/* Animated Background Elements */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute top-20 left-10 w-20 h-20 bg-regal-gold/10 rounded-full"
//           animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute top-40 right-20 w-16 h-16 bg-regal-burgundy/10 rounded-full"
//           animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
//           transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//         />
//       </div>

//       {/* Header */}
//       <motion.div
//         className="flex justify-between items-center mb-8"
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div>
//           <h1 className="text-4xl font-bold text-regal-burgundy mb-2">Legal Lens</h1>
//           <p className="text-regal-black/60">Welcome back, {user.name}</p>
//         </div>

//         <motion.div
//           className="flex items-center gap-4"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <motion.button
//             onClick={handleProfile}
//             className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl border border-regal-beige/50"
//             whileHover={{ scale: 1.05, rotate: 5 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <User className="w-6 h-6 text-regal-burgundy" />
//           </motion.button>

//           <motion.button
//             onClick={handleLogout}
//             className="px-6 py-3 bg-gradient-to-r from-regal-gold to-regal-gold/80 text-white rounded-xl  shadow-lg hover:shadow-xl border border-regal-gold/20"
//             whileHover={{ scale: 1.02, y: -2 }}
//             whileTap={{ scale: 0.98 }}
//           >
//             Logout
//           </motion.button>
//         </motion.div>
//       </motion.div>

//       {/* Stats Cards */}
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.3 }}
//       >
//         {stats.map((stat, index) => (
//           <motion.div
//             key={stat.label}
//             className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-regal-beige/50"
//             whileHover={{ scale: 1.02, y: -5 }}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 * index }}
//           >
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-regal-black/60 mb-1">{stat.label}</p>
//                 <motion.p
//                   className="text-2xl font-bold text-regal-black"
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   transition={{ delay: 0.5 + 0.1 * index, type: "spring" }}
//                 >
//                   {stat.value}
//                 </motion.p>
//               </div>
//               <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
//                 <stat.icon className="w-6 h-6" />
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* Upload Section */}
//       <motion.div
//         className="bg-white/90 backdrop-blur-sm shadow-xl rounded-3xl p-8 mb-8 border border-regal-beige/50"
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.6, delay: 0.4 }}
//         whileHover={{ scale: 1.005 }}
//       >
//         <div className="flex items-center gap-3 mb-6">
//           <div className="p-2 bg-regal-gold/20 rounded-xl">
//             <Plus className="w-6 h-6 text-regal-burgundy" />
//           </div>
//           <h2 className="text-xl font-semibold text-regal-black">Upload New Contract</h2>
//         </div>

//         <motion.label
//           className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${
//             dragOver
//               ? "border-regal-gold bg-regal-gold/10 scale-105"
//               : "border-regal-beige/60 hover:border-regal-gold hover:bg-regal-sage/5"
//           }`}
//           onDrop={handleDrop}
//           onDragOver={handleDragOver}
//           onDragLeave={handleDragLeave}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <AnimatePresence mode="wait">
//             {loading ? (
//               <motion.div
//                 key="loading"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="flex flex-col items-center"
//               >
//                 <Loader2 className="animate-spin w-8 h-8 text-regal-gold mb-3" />
//                 <span className="text-regal-black font-medium">Processing...</span>
//               </motion.div>
//             ) : (
//               <motion.div
//                 key="upload"
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.8 }}
//                 className="flex flex-col items-center"
//               >
//                 <motion.div
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                 >
//                   <Upload className="w-8 h-8 text-regal-burgundy mb-3" />
//                 </motion.div>
//                 <span className="text-regal-black font-medium mb-1">
//                   Drop files here or click to browse
//                 </span>
//                 <span className="text-sm text-regal-black/50">
//                   Supports PDF files — up to {humanSize(MAX_FILE_SIZE)}
//                 </span>
//               </motion.div>
//             )}
//           </AnimatePresence>
//           {/* PDF only */}
//           <input type="file" className="hidden" onChange={handleFileInput} accept=".pdf" />
//         </motion.label>
//       </motion.div>

//       {/* Search and Filter Section */}
//       <motion.div
//         className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl p-6 mb-6 border border-regal-beige/50"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.5 }}
//       >
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//           <div className="relative flex-1 max-w-md">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-regal-black/40" />
//             <input
//               type="text"
//               placeholder="Search contracts..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 bg-regal-offwhite/50 border border-regal-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-regal-gold/50 focus:border-regal-gold transition-all"
//             />
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-regal-black/40" />
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="pl-9 pr-8 py-3 bg-regal-offwhite/50 border border-regal-beige rounded-xl focus:outline-none focus:ring-2 focus:ring-regal-gold/50 appearance-none cursor-pointer"
//               >
//                 <option value="all">All Status</option>
//                 <option value="active">Active</option>
//                 <option value="pending">Pending</option>
//                 <option value="expired">Expired</option>
//               </select>
//             </div>

//             <div className="flex bg-regal-offwhite/50 rounded-xl border border-regal-beige p-1">
//               <motion.button
//                 onClick={() => setViewMode("grid")}
//                 className={`p-2 rounded-lg transition-all ${
//                   viewMode === "grid" ? "bg-white shadow-sm" : ""
//                 }`}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Grid3X3 className="w-4 h-4 text-regal-burgundy" />
//               </motion.button>
//               <motion.button
//                 onClick={() => setViewMode("list")}
//                 className={`p-2 rounded-lg transition-all ${
//                   viewMode === "list" ? "bg-white shadow-sm" : ""
//                 }`}
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <List className="w-4 h-4 text-regal-burgundy" />
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.div>

//       {/* Contracts Section */}
//       <motion.div
//         className="bg-white/90 backdrop-blur-sm shadow-lg rounded-3xl p-8 border border-regal-beige/50"
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.6 }}
//       >
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-3">
//             <div className="p-2 bg-regal-burgundy/10 rounded-xl">
//               <FileText className="w-6 h-6 text-regal-burgundy" />
//             </div>
//             <h2 className="text-xl font-semibold text-regal-black">
//               Your Contracts ({filteredContracts.length})
//             </h2>
//           </div>
//         </div>

//         <AnimatePresence mode="wait">
//           {filteredContracts.length === 0 ? (
//             <motion.div
//               key="empty"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="flex flex-col items-center justify-center py-16"
//             >
//               <motion.div
//                 animate={{ rotate: [0, 10, -10, 0] }}
//                 transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//               >
//                 <AlertCircle className="w-16 h-16 text-regal-black/30 mb-4" />
//               </motion.div>
//               <p className="text-regal-black/60 text-lg">
//                 {searchTerm || filterStatus !== "all"
//                   ? "No contracts match your search."
//                   : "No contracts uploaded yet."}
//               </p>
//               <p className="text-regal-black/40 text-sm mt-2">
//                 Upload your first contract to get started
//               </p>
//             </motion.div>
//           ) : (
//             <motion.div
//               key="contracts"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className={
//                 viewMode === "grid"
//                   ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//                   : "space-y-4"
//               }
//             >
//               <AnimatePresence>
//                 {filteredContracts.map((contract, idx) => (
//                   <motion.div
//                     key={contract.id}
//                     layout
//                     initial={{ opacity: 0, y: 20, scale: 0.9 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: -20, scale: 0.9 }}
//                     transition={{ duration: 0.4, delay: idx * 0.1 }}
//                     className={`bg-gradient-to-br from-white to-regal-offwhite/50 rounded-2xl p-6 border border-regal-beige/50 shadow-lg hover:shadow-xl transition-all duration-300 ${
//                       viewMode === "list" ? "flex items-center justify-between" : ""
//                     }`}
//                     whileHover={{ scale: 1.02, y: -5 }}
//                   >
//                     <div
//                       className={`flex items-center gap-4 ${
//                         viewMode === "list" ? "flex-1" : "mb-4"
//                       }`}
//                     >
//                       <motion.div
//                         className="p-3 bg-regal-burgundy/10 rounded-xl"
//                         whileHover={{ rotate: 15 }}
//                       >
//                         <FileText className="w-6 h-6 text-regal-burgundy" />
//                       </motion.div>

//                       <div className="flex-1">
//                         <h3 className="font-semibold text-regal-black mb-1 line-clamp-1">
//                           {contract.name}
//                         </h3>
//                         <div className="flex items-center gap-2 text-sm text-regal-black/60">
//                           <Calendar className="w-4 h-4" />
//                           <span>{contract.date}</span>
//                           <span>•</span>
//                           <span>{contract.size}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className={`mb-4 ${viewMode === "list" ? "mb-0 mx-4" : ""}`}>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                           contract.status
//                         )}`}
//                       >
//                         {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
//                       </span>
//                     </div>

//                     <div className={`flex gap-2 ${viewMode === "list" ? "" : "justify-center"}`}>
//                       <motion.button
//                         className="flex items-center gap-2 px-4 py-2 bg-regal-sage/20 text-regal-burgundy rounded-xl hover:bg-regal-sage/30 transition-all"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Eye className="w-4 h-4" />
//                         {viewMode === "grid" && <span className="text-sm">View</span>}
//                       </motion.button>

//                       <motion.button
//                         className="flex items-center gap-2 px-4 py-2 bg-regal-gold/20 text-regal-burgundy rounded-xl hover:bg-regal-gold/30 transition-all"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Download className="w-4 h-4" />
//                         {viewMode === "grid" && <span className="text-sm">Download</span>}
//                       </motion.button>

//                       <motion.button
//                         onClick={() => handleDeleteContract(contract.id)}
//                         className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </motion.button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       {/* Quick Actions Floating Button */}
//       <motion.div
//         className="fixed bottom-8 right-8"
//         initial={{ opacity: 0, scale: 0 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ delay: 1, type: "spring" }}
//       >
//         <motion.button
//           className="p-4 bg-gradient-to-r from-regal-burgundy to-regal-burgundy/80 text-white rounded-full shadow-2xl"
//           whileHover={{ scale: 1.1, rotate: 90 }}
//           whileTap={{ scale: 0.9 }}
//           animate={{
//             boxShadow: [
//               "0 10px 25px rgba(0,0,0,0.1)",
//               "0 20px 40px rgba(0,0,0,0.2)",
//               "0 10px 25px rgba(0,0,0,0.1)",
//             ],
//           }}
//           transition={{ duration: 2, repeat: Infinity }}
//         >
//           <Plus className="w-6 h-6" />
//         </motion.button>
//       </motion.div>

//       {/* Loading Overlay */}
//       <AnimatePresence>
//         {loading && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
//           >
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               className="bg-white rounded-2xl p-8 shadow-2xl"
//             >
//               <div className="flex flex-col items-center">
//                 <Loader2 className="animate-spin w-8 h-8 text-regal-gold mb-4" />
//                 <p className="text-regal-black font-medium">Uploading contract...</p>
//                 <div className="w-48 bg-regal-beige/30 rounded-full h-2 mt-3">
//                   <motion.div
//                     className="bg-gradient-to-r from-regal-gold to-regal-burgundy h-2 rounded-full"
//                     initial={{ width: "0%" }}
//                     animate={{ width: "100%" }}
//                     transition={{ duration: 2 }}
//                   />
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Sweet Alert Modal */}
//       <AnimatePresence>
//         {alertOpen && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-2xl shadow-2xl border border-regal-beige/50 w-full max-w-sm p-6"
//               initial={{ scale: 0.9, y: 20, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.9, y: 20, opacity: 0 }}
//               transition={{ type: "spring", stiffness: 160, damping: 18 }}
//             >
//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`p-2 rounded-xl border ${
//                       alertType === "success"
//                         ? "bg-green-50 border-green-100"
//                         : "bg-red-50 border-red-100"
//                     }`}
//                   >
//                     {alertType === "success" ? (
//                       <CheckCircle className="w-5 h-5 text-green-600" />
//                     ) : (
//                       <AlertCircle className="w-5 h-5 text-red-600" />
//                     )}
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-regal-black">{alertTitle}</h3>
//                     <p className="text-sm text-regal-black/70 mt-1">{alertMessage}</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={closeAlertNow}
//                   className="p-1 rounded-lg hover:bg-regal-offwhite"
//                   aria-label="Close"
//                 >
//                   <X className="w-5 h-5 text-regal-black/50" />
//                 </button>
//               </div>

//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={closeAlertNow}
//                   className={`px-4 py-2 rounded-xl text-white shadow hover:shadow-md ${
//                     alertType === "success"
//                       ? "bg-gradient-to-r from-green-500 to-green-600"
//                       : "bg-gradient-to-r from-regal-gold to-regal-burgundy"
//                   }`}
//                 >
//                   Got it
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


















// src/pages/Dashboard.js
// src/pages/Dashboard.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Loader2,
  User,
  Search,
  Filter,
  Eye,
  Trash2,
  Calendar,
  Clock,
  TrendingUp,
  FileCheck,
  AlertCircle,
  CheckCircle,
  Plus,
  Grid3X3,
  List,
  X,
} from "lucide-react";

const API_URL = "https://tsq50u94z7.execute-api.ap-south-1.amazonaws.com/prod"; // base URL

// Client-side max allowed file size (30 MB)
const MAX_FILE_SIZE = 30 * 1024 * 1024;

export default function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "John Doe", email: "john@example.com" });

  // Sweet alert state
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("error"); // 'success' | 'error'
  const alertTimer = useRef(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("cq_user") || "{}");
    if (userData.name) setUser(userData);
    // fetch contracts on mount
    fetchContracts().catch((e) => {
      console.warn("fetchContracts error on mount:", e);
    });
    // cleanup
    return () => {
      if (alertTimer.current) clearTimeout(alertTimer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openAlert = (title, message, type = "error", ms = 2500) => {
    if (alertTimer.current) clearTimeout(alertTimer.current);
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setAlertOpen(true);
    alertTimer.current = setTimeout(() => {
      setAlertOpen(false);
      alertTimer.current = null;
    }, ms);
  };

  const closeAlertNow = () => {
    setAlertOpen(false);
    if (alertTimer.current) {
      clearTimeout(alertTimer.current);
      alertTimer.current = null;
    }
  };

  const isPdf = (file) =>
    file && (file.type === "application/pdf" || /\.pdf$/i.test(file.name || ""));

  const humanSize = (bytes) => {
    if (!bytes && bytes !== 0) return "";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleLogout = () => {
    localStorage.removeItem("cq_user");
    sessionStorage.removeItem("idToken");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    navigate("/login");
  };

  // Utility: decode JWT payload without verifying (used only to extract sub/email client-side)
  const decodeJwtPayload = (token) => {
    try {
      if (!token) return null;
      const parts = token.split(".");
      if (parts.length < 2) return null;
      let payload = parts[1];
      // pad base64
      const pad = payload.length % 4;
      if (pad) payload += "=".repeat(4 - pad);
      const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
      return JSON.parse(decoded);
    } catch (e) {
      console.warn("decodeJwtPayload failed", e);
      return null;
    }
  };

  // Determine userId to send to API (prefer token.sub, fallback to cq_user.email)
  const getUserId = () => {
    const idToken = sessionStorage.getItem("idToken");
    if (idToken) {
      const payload = decodeJwtPayload(idToken);
      if (payload && payload.sub) return payload.sub;
      if (payload && payload.email) return payload.email;
    }
    // fallback: use stored cq_user.email as identifier (not ideal but works)
    const stored = JSON.parse(localStorage.getItem("cq_user") || "{}");
    if (stored && stored.email) return stored.email;
    return null;
  };

  // Fetch contracts from API (expects GET ${API_URL}/contracts?userId=...)
  const fetchContracts = async () => {
    const userId = getUserId();
    if (!userId) {
      console.warn("No userId available to fetch contracts");
      return;
    }

    try {
      setLoading(true);
      const idToken = sessionStorage.getItem("idToken");
      console.log("fetchContracts: idToken length:", idToken ? idToken.length : null, "start:", idToken ? idToken.slice(0, 10) : null);

      const params = new URLSearchParams({ userId });
      const resp = await fetch(`${API_URL}/contracts?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // IMPORTANT: send as Bearer token (standard format for Cognito authorizer)
          ...(idToken ? { Authorization: idToken } : {}),
        },
      });

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Failed to fetch contracts:", resp.status, txt);
        openAlert("Could not load contracts", "Please try again later", "error");
        return;
      }

      const data = await resp.json();
      const mapped = (Array.isArray(data) ? data : []).map((it) => ({
        id: it.contractId || `${it.uploadDate}_${it.name}`,
        name: it.name,
        date: it.uploadDate ? `${it.uploadDate.slice(0,4)}-${it.uploadDate.slice(4,6)}-${it.uploadDate.slice(6,8)}` : (it.uploadDate || "").slice(0, 10),
        status: it.status || "active",
        size: it.size ? `${(it.size / (1024 * 1024)).toFixed(1)} MB` : it.size || "n/a",
        s3Key: it.s3Key || it.objectKey || null,
      }));

      setContracts(mapped.reverse());
    } catch (err) {
      console.error("fetchContracts error:", err);
      openAlert("Could not load contracts", err.message || "Unknown error", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (file) => {
    if (!file) return;

    if (!isPdf(file)) {
      openAlert("PDF required", "Please upload a PDF file (.pdf) only.", "error");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      openAlert(
        "File too large",
        `Maximum allowed size is ${humanSize(MAX_FILE_SIZE)}. Your file is ${humanSize(
          file.size
        )}.`,
        "error"
      );
      return;
    }

    const userId = getUserId();
    if (!userId) {
      openAlert("Not signed in", "Cannot determine user identity. Please log in again.", "error");
      return;
    }

    setLoading(true);

    try {
      const idToken = sessionStorage.getItem("idToken");
      console.log("handleUpload: sending presign request. idToken length:", idToken ? idToken.length : null);

      const presignResp = await fetch(`${API_URL}/contracts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // IMPORTANT: send as Bearer token (standard format)
          ...(idToken ? { Authorization: idToken} : {}),
        },
        body: JSON.stringify({
          filename: file.name,
          content_type: "application/pdf",
          size: file.size,
          userId: userId,
        }),
      });

      if (!presignResp.ok) {
        const txt = await presignResp.text();
        console.error("Presign failed:", presignResp.status, txt);
        if (/filename must end with \.pdf/i.test(txt)) {
          openAlert("PDF required", "Please upload a PDF file (.pdf) only.", "error");
        } else {
          openAlert("Upload failed", "Could not get upload URL. Please try again.", "error");
        }
        throw new Error(`Presign request failed: ${presignResp.status} ${txt}`);
      }

      const presignData = await presignResp.json();
      const parsed =
        typeof presignData.body === "string" ? JSON.parse(presignData.body) : presignData;

      const uploadURL =
        parsed.uploadUrl || parsed.uploadURL || parsed.upload_url || parsed.url;
      const objectKey = parsed.objectKey || parsed.object_key || parsed.key || parsed.s3Key;

      if (!uploadURL) throw new Error("No presigned upload URL in response");

      // upload to S3
      const putResp = await fetch(uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/pdf",
        },
        body: file,
      });

      if (!putResp.ok) {
        const txt = await putResp.text();
        console.error("S3 PUT failed:", putResp.status, txt);
        openAlert("Upload failed", "Could not upload to storage. Please try again.", "error");
        throw new Error(`S3 upload failed: ${putResp.status} ${txt}`);
      }

      // refresh listing
      await fetchContracts();

      openAlert("Upload successful", "Your PDF has been uploaded successfully.", "success");
    } catch (err) {
      console.error("Upload error:", err);
      if (!alertOpen) openAlert("Upload failed", err.message || "Unknown error", "error");
    } finally {
      setLoading(false);
      setDragOver(false);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleProfile = () => navigate("/profile");

  // const handleDeleteContract = (id) => {
  //   setContracts((prev) => prev.filter((contract) => contract.id !== id));
  // };
  const handleDeleteContract = async (id) => {
    const item = contracts.find(c => c.id === id);
    if (!item) return;

    if (!window.confirm(`Delete "${item.name}"? This can't be undone.`)) return;

    const idToken = sessionStorage.getItem("idToken");
    const userId = getUserId();

    try {
      setLoading(true);
      const resp = await fetch(`${API_URL}/contracts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(idToken ? { Authorization: idToken } : {}),
        },
        body: JSON.stringify({
          action: "delete",
          contractId: id,        // this is it.contractId from DynamoDB (you map to .id)
          objectKey: item.s3Key, // pass S3 key so backend can delete the file
          userId: userId,
        }),
      });

      const text = await resp.text();
      if (!resp.ok) throw new Error(text || "Delete failed");

      // Success → remove from UI
      setContracts(prev => prev.filter(c => c.id !== id));
      openAlert("Deleted", "The contract was removed.", "success");
    } catch (e) {
      console.error(e);
      openAlert("Delete failed", e.message || "Unknown error", "error");
    } finally {
      setLoading(false);
    }
  };


  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch = contract.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || contract.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "expired":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = [
    { label: "Total Contracts", value: contracts.length, icon: FileText, color: "text-blue-600" },
    {
      label: "Active",
      value: contracts.filter((c) => c.status === "active").length,
      icon: FileCheck,
      color: "text-green-600",
    },
    {
      label: "Pending",
      value: contracts.filter((c) => c.status === "pending").length,
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      label: "This Month",
      value:
        contracts.filter((c) => new Date(c.date).getMonth() === new Date().getMonth())
          .length,
      icon: TrendingUp,
      color: "text-purple-600",
    },
  ];

  // returns a short-lived signed GET URL for the given S3 key
  const getSignedGetUrl = async (objectKey) => {
    if (!objectKey) throw new Error("Missing objectKey");
    const idToken = sessionStorage.getItem("idToken");
    const userId = getUserId();

    const resp = await fetch(`${API_URL}/contracts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(idToken ? { Authorization: idToken } : {}), // raw JWT for REST Cognito authorizer
      },
      body: JSON.stringify({
        action: "get",                  // <-- tell backend: give me a GET url
        objectKey: objectKey,           // S3 key from the item
        userId: userId,                 // (the Lambda also checks token)
      }),
    });

    const text = await resp.text();
    if (!resp.ok) throw new Error(`Failed to get file URL: ${resp.status} ${text}`);

    // support both proxy/non-proxy shapes
    const data = (() => {
      try { return JSON.parse(text); } catch { return {}; }
    })();
    const body = typeof data.body === "string" ? JSON.parse(data.body) : data;

    const url =
      body.getUrl || body.url || body.signedUrl || body.downloadUrl || body.viewUrl;
    if (!url) throw new Error("No signed URL in response");
    return url;
  };

  // Open PDF in a new tab
  const handleView = async (contract) => {
    try {
      setLoading(true);
      const url = await getSignedGetUrl(contract.s3Key);
      window.open(url, "_blank", "noopener,noreferrer");
    } catch (e) {
      console.error(e);
      openAlert("Cannot open file", e.message || "Unknown error", "error");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-regal-offwhite to-regal-beige/30 px-6 py-8">
      {/* ... rest of your UI unchanged (I intentionally left this part unchanged) */}
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
          <motion.button
            onClick={handleProfile}
            className="p-3 rounded-full bg-white shadow-lg hover:shadow-xl border border-regal-beige/50"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <User className="w-6 h-6 text-regal-burgundy" />
          </motion.button>

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
      {/* Stats, Upload section, Search & Contracts - same as earlier code */}
      {/* I didn't duplicate the rest in this snippet to keep it short — the earlier UI code you provided remains intact */}
      {/* You already have that code below in your file; these changes only add fetchContracts + send userId on presign. */}

      {/* Keep the rest of your file unchanged below */}
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
           <h2 className="text-xl font-semibold text-regal-black">Upload New Contract</h2>
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
                   Supports PDF files — up to {humanSize(MAX_FILE_SIZE)}
                 </span>
               </motion.div>
             )}
           </AnimatePresence>
           {/* PDF only */}
           <input type="file" className="hidden" onChange={handleFileInput} accept=".pdf" />
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

           <div className="flex items-center gap-3">
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

             <div className="flex bg-regal-offwhite/50 rounded-xl border border-regal-beige p-1">
               <motion.button
                 onClick={() => setViewMode("grid")}
                 className={`p-2 rounded-lg transition-all ${
                   viewMode === "grid" ? "bg-white shadow-sm" : ""
                 }`}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.95 }}
               >
                 <Grid3X3 className="w-4 h-4 text-regal-burgundy" />
               </motion.button>
               <motion.button
                 onClick={() => setViewMode("list")}
                 className={`p-2 rounded-lg transition-all ${
                   viewMode === "list" ? "bg-white shadow-sm" : ""
                 }`}
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
                 {searchTerm || filterStatus !== "all"
                   ? "No contracts match your search."
                   : "No contracts uploaded yet."}
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
               className={
                 viewMode === "grid"
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
                     <div
                       className={`flex items-center gap-4 ${
                         viewMode === "list" ? "flex-1" : "mb-4"
                       }`}
                     >
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

                     <div className={`mb-4 ${viewMode === "list" ? "mb-0 mx-4" : ""}`}>
                       <span
                         className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                           contract.status
                         )}`}
                       >
                         {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                       </span>
                     </div>

                     <div className={`flex gap-2 ${viewMode === "list" ? "" : "justify-center"}`}>
                        <motion.button
                          onClick={() => handleView(contract)}
                          disabled={!contract.s3Key}
                          className="flex items-center gap-2 px-4 py-2 bg-regal-sage/20 text-regal-burgundy rounded-xl hover:bg-regal-sage/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                         <Eye className="w-4 h-4" />
                         {viewMode === "grid" && <span className="text-sm">View</span>}
                       </motion.button>

                        {/* <motion.button
                          onClick={() => handleDownload(contract)}
                          disabled={!contract.s3Key}
                          className="flex items-center gap-2 px-4 py-2 bg-regal-gold/20 text-regal-burgundy rounded-xl hover:bg-regal-gold/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                         <Download className="w-4 h-4" />
                         {viewMode === "grid" && <span className="text-sm">Download</span>}
                       </motion.button> */}

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

       {/* Quick Actions Floating Button
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
               "0 10px 25px rgba(0,0,0,0.1)",
             ],
           }}
           transition={{ duration: 2, repeat: Infinity }}
         >
           <Plus className="w-6 h-6" />
         </motion.button>
       </motion.div> */}

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

       {/* Sweet Alert Modal */}
       <AnimatePresence>
         {alertOpen && (
           <motion.div
             className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
             <motion.div
               className="bg-white rounded-2xl shadow-2xl border border-regal-beige/50 w-full max-w-sm p-6"
               initial={{ scale: 0.9, y: 20, opacity: 0 }}
               animate={{ scale: 1, y: 0, opacity: 1 }}
               exit={{ scale: 0.9, y: 20, opacity: 0 }}
               transition={{ type: "spring", stiffness: 160, damping: 18 }}
             >
               <div className="flex items-start justify-between">
                 <div className="flex items-center gap-3">
                   <div
                     className={`p-2 rounded-xl border ${
                       alertType === "success"
                         ? "bg-green-50 border-green-100"
                         : "bg-red-50 border-red-100"
                     }`}
                   >
                     {alertType === "success" ? (
                       <CheckCircle className="w-5 h-5 text-green-600" />
                     ) : (
                       <AlertCircle className="w-5 h-5 text-red-600" />
                     )}
                   </div>
                   <div>
                     <h3 className="text-lg font-semibold text-regal-black">{alertTitle}</h3>
                     <p className="text-sm text-regal-black/70 mt-1">{alertMessage}</p>
                   </div>
                 </div>
                 <button
                   onClick={closeAlertNow}
                   className="p-1 rounded-lg hover:bg-regal-offwhite"
                   aria-label="Close"
                 >
                   <X className="w-5 h-5 text-regal-black/50" />
                 </button>
               </div>

               <div className="mt-6 flex justify-end">
                 <button
                   onClick={closeAlertNow}
                   className={`px-4 py-2 rounded-xl text-white shadow hover:shadow-md ${
                     alertType === "success"
                       ? "bg-gradient-to-r from-green-500 to-green-600"
                       : "bg-gradient-to-r from-regal-gold to-regal-burgundy"
                   }`}
                 >
                   Got it
                 </button>
               </div>
             </motion.div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   );
 }


