// // src/pages/Analysis.js
// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// const API_URL = "https://tsq50u94z7.execute-api.ap-south-1.amazonaws.com/prod";

// // --- helpers (same as Dashboard) ---
// const decodeJwtPayload = (token) => {
//   try {
//     if (!token) return null;
//     const parts = token.split(".");
//     if (parts.length < 2) return null;
//     let payload = parts[1];
//     const pad = payload.length % 4;
//     if (pad) payload += "=".repeat(4 - pad);
//     const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
//     return JSON.parse(decoded);
//   } catch {
//     return null;
//   }
// };

// const getUserId = () => {
//   const idToken = sessionStorage.getItem("idToken");
//   if (idToken) {
//     const p = decodeJwtPayload(idToken);
//     if (p?.sub) return p.sub;
//     if (p?.email) return p.email;
//   }
//   const stored = JSON.parse(localStorage.getItem("cq_user") || "{}");
//   return stored?.email || null;
// };

// export default function Analysis() {
//   const { contractId } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState(null);
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnalysis = async () => {
//       const userId = getUserId();
//       const idToken = sessionStorage.getItem("idToken");
//       if (!userId || !idToken) {
//         setErr("Not signed in");
//         setLoading(false);
//         return;
//       }
      
//       if (!contractId) {
//         setErr("Invalid contract ID");
//         setLoading(false);
//         return;
//       }

//       try {
//         console.log("Fetching analysis for contractId:", contractId, "userId:", userId);
//         const resp = await fetch(`${API_URL}/analysis`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             ...(idToken ? { Authorization: idToken } : {}),
//         },
//           body: JSON.stringify({
//             action: "analysis_get",
//             userId,
//             contractId,
//           }),
//         });

//         if (resp.status === 401) {
//           setErr("The incoming token has expired");
//           setLoading(false);
//           return;
//         }

//         const text = await resp.text();
//         if (!resp.ok) {
//           // Try to parse JSON error response
//           let errorMsg = text || `HTTP ${resp.status}`;
//           try {
//             const errorJson = JSON.parse(text);
//             errorMsg = errorJson.message || errorJson.error || errorMsg;
//           } catch {
//             // If not JSON, use text as is
//           }
//           throw new Error(errorMsg);
//         }
        
//         const json = (() => { try { return JSON.parse(text); } catch { return {}; } })();
        
//         // Check if response indicates no analysis found
//         if (json.message && json.message.toLowerCase().includes("not found")) {
//           setErr("Analysis not found. The contract may still be processing. Please try again later.");
//         } else if (Object.keys(json).length === 0) {
//           setErr("No analysis data available. The contract may still be processing.");
//         } else {
//           setData(json);
//         }
//       } catch (e) {
//         console.error("Analysis fetch error:", e);
//         setErr(e.message || "Failed to fetch analysis");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAnalysis();
//   }, [contractId]);

//   const pretty = (v) =>
//     typeof v === "string" ? v : v == null ? "—" : JSON.stringify(v, null, 2);

//   const Section = ({ title, value }) => (
//     <div className="bg-white rounded-xl border border-regal-beige/50 p-4">
//       <h3 className="font-semibold text-regal-burgundy mb-2">{title}</h3>
//       <pre className="whitespace-pre-wrap text-sm text-regal-black/80">{pretty(value)}</pre>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-regal-offwhite to-regal-beige/30 px-6 py-8">
//       <div className="max-w-5xl mx-auto">
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl font-bold text-regal-burgundy">Contract Analysis</h1>
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 rounded-lg bg-white border border-regal-beige hover:shadow"
//           >
//             Back
//           </button>
//         </div>

//         {loading && <div className="text-regal-black/70">Loading analysis…</div>}
//         {err && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
//             <div className="text-red-800 font-semibold mb-1">Error</div>
//             <div className="text-red-700">{err}</div>
//           </div>
//         )}
//         {!loading && !err && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <Section title="Risk" value={data?.Risk} />
//             <Section title="Benefits" value={data?.Benefits} />
//             <Section title="Clauses" value={data?.Clauses} />
//             <Section title="Renewal" value={data?.Renewal} />
//             <Section title="Red Flags" value={data?.RedFlags} />
//             <div className="md:col-span-2 bg-white rounded-xl border border-regal-beige/50 p-4">
//               <h3 className="font-semibold text-regal-burgundy mb-2">Raw JSON</h3>
//               <pre className="text-xs whitespace-pre-wrap">{pretty(data)}</pre>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// src/pages/Analysis.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://tsq50u94z7.execute-api.ap-south-1.amazonaws.com/prod";

// (same decodeJwtPayload/getUserId helpers as before)...
const decodeJwtPayload = (token) => {
  try {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length < 2) return null;
    let payload = parts[1];
    const pad = payload.length % 4;
    if (pad) payload += "=".repeat(4 - pad);
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
};

const getUserId = () => {
  const idToken = sessionStorage.getItem("idToken");
  if (idToken) {
    const p = decodeJwtPayload(idToken);
    if (p?.sub) return p.sub;
    if (p?.email) return p.email;
  }
  const stored = JSON.parse(localStorage.getItem("cq_user") || "{}");
  return stored?.email || null;
};

export default function Analysis() {
  const { contractId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [rawOpen, setRawOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchAnalysis = async () => {
      setLoading(true);
      setErr("");
      const userId = getUserId();
      const idToken = sessionStorage.getItem("idToken");
      if (!userId || !idToken) {
        setErr("Not signed in");
        setLoading(false);
        return;
      }
      if (!contractId) {
        setErr("Invalid contract ID");
        setLoading(false);
        return;
      }

      try {
        const resp = await fetch(`${API_URL}/analysis`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(idToken ? { Authorization: idToken } : {}),
          },
          body: JSON.stringify({ action: "analysis_get", userId, contractId }),
        });

        if (resp.status === 401) {
          setErr("The incoming token has expired");
          setLoading(false);
          return;
        }

        const text = await resp.text();
        if (!resp.ok) {
          let errorMsg = text || `HTTP ${resp.status}`;
          try {
            const errorJson = JSON.parse(text);
            errorMsg = errorJson.message || errorJson.error || errorMsg;
          } catch {}
          throw new Error(errorMsg);
        }

        const json = (() => {
          try {
            return JSON.parse(text);
          } catch {
            return {};
          }
        })();

        if (json.message && json.message.toLowerCase().includes("not found")) {
          setErr("Analysis not found. The contract may still be processing. Please try again later.");
        } else if (Object.keys(json).length === 0) {
          setErr("No analysis data available. The contract may still be processing.");
        } else {
          setData(json);
        }
      } catch (e) {
        console.error("Analysis fetch error:", e);
        setErr(e.message || "Failed to fetch analysis");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [contractId]);

  // Utility formatters
  const pretty = (v) => (typeof v === "string" ? v : v == null ? "—" : JSON.stringify(v, null, 2));

  const riskBadgeClass = (level) => {
    const l = (level || "").toLowerCase();
    if (l === "low") return "bg-emerald-100 text-emerald-800";
    if (l === "medium") return "bg-amber-100 text-amber-800";
    if (l === "high") return "bg-rose-100 text-rose-800";
    return "bg-gray-100 text-gray-700";
  };

  // Export / copy helpers
  const exportJSON = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${contractId}_analysis.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const copyJSON = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      // small confirmation
      const el = document.createElement("div");
      el.textContent = "Copied JSON to clipboard";
      el.style.position = "fixed";
      el.style.right = "16px";
      el.style.top = "80px";
      el.style.background = "#111827";
      el.style.color = "white";
      el.style.padding = "8px 12px";
      el.style.borderRadius = "8px";
      document.body.appendChild(el);
      setTimeout(() => document.body.removeChild(el), 1400);
    } catch {
      alert("Copy failed");
    }
  };

  // Clause card with expand
  function Clause({ c }) {
    const [open, setOpen] = useState(false);
    return (
      <div
        className={
          "bg-white rounded-lg border p-4 shadow-sm transform transition duration-300 ease-in-out " +
          (mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3")
        }
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-semibold text-regal-burgundy text-lg">{c.name || "Clause"}</div>
            <div className="text-xs text-gray-500 mt-1">{(c.type || "other") + " • risk: " + (c.risk || "unknown")}</div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className={`px-3 py-1 rounded-full text-sm ${riskBadgeClass(c.risk)}`}>{(c.risk || "").toUpperCase()}</div>
            <button
              onClick={() => setOpen((s) => !s)}
              className="text-sm px-3 py-1 bg-white border rounded hover:shadow-sm"
              aria-expanded={open}
            >
              {open ? "Hide" : "Details"}
            </button>
          </div>
        </div>

        <div className={`mt-3 text-sm text-regal-black/80 transition-all ${open ? "max-h-96" : "max-h-0 overflow-hidden"}`}>
          <p className="whitespace-pre-wrap">{c.summary}</p>
        </div>
      </div>
    );
  }

  // Render formatted renewal block
  const RenewalBlock = ({ renewal }) => {
    if (!renewal || Object.keys(renewal).length === 0) {
      return <div className="text-sm text-gray-600">No renewal information detected.</div>;
    }
    return (
      <div className="grid grid-cols-1 gap-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">Auto renew</div>
          <div className="font-medium">{renewal.autoRenew ? "Yes" : "No"}</div>
        </div>
        <div className="flex items-start justify-between">
          <div className="text-xs text-gray-500">Term</div>
          <div className="max-w-lg text-right whitespace-pre-wrap">{renewal.term || "Not specified"}</div>
        </div>
        <div className="flex items-start justify-between">
          <div className="text-xs text-gray-500">Notice</div>
          <div className="max-w-lg text-right whitespace-pre-wrap">{renewal.notice || "Not specified"}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-regal-offwhite to-regal-beige/30 px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-regal-burgundy">Contract Analysis</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="px-4 py-2 rounded-lg bg-white border hover:shadow">Back</button>
            <button onClick={exportJSON} className="px-4 py-2 rounded-lg bg-regal-burgundy text-white hover:brightness-95 transition">Export JSON</button>
            <button onClick={copyJSON} className="px-3 py-2 rounded-lg bg-white border hover:shadow">Copy JSON</button>
          </div>
        </div>

        {loading && (
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3 animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="h-48 bg-white rounded-lg p-4 shadow animate-pulse" />
              <div className="h-48 bg-white rounded-lg p-4 shadow animate-pulse" />
            </div>
          </div>
        )}

        {err && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <div className="text-red-800 font-semibold mb-1">Error</div>
            <div className="text-red-700">{err}</div>
          </div>
        )}

        {!loading && !err && data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left column */}
            <div className="space-y-4">
              {/* Risk card */}
              <div className={"bg-white rounded-xl border p-4 transition-transform duration-300 hover:-translate-y-1"}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-regal-burgundy">Risk</h3>
                    <div className="mt-2 text-sm text-regal-black/80">
                      {/* show summary cleanly */}
                      {data.Risk?.summary ? <p className="whitespace-pre-wrap">{data.Risk.summary}</p> : <p>—</p>}
                    </div>
                  </div>

                  <div className="ml-4">
                    <div className={`px-4 py-2 rounded-full text-sm ${riskBadgeClass(data.Risk?.level || (data.Risk && data.Risk.level))}`}>
                      {(data.Risk?.level || (data.Risk && data.Risk.level) || "—").toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Clauses list */}
              <div className="bg-white rounded-xl border p-4">
                <h3 className="font-semibold text-regal-burgundy mb-3">Clauses</h3>
                <div className="space-y-3">
                  {(data.Clauses || []).map((c, idx) => (
                    <Clause c={c} key={idx} />
                  ))}
                </div>
              </div>

              {/* Red flags */}
              <div className="bg-white rounded-xl border p-4">
                <h3 className="font-semibold text-regal-burgundy mb-2">Red Flags</h3>
                <ul className="list-disc list-inside mt-3 text-regal-black/80">
                  {(data.RedFlags || []).length === 0 ? <li>None detected</li> : (data.RedFlags || []).map((r, i) => <li key={i}>{r}</li>)}
                </ul>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              <div className="bg-white rounded-xl border p-4">
                <h3 className="font-semibold text-regal-burgundy mb-2">Benefits</h3>
                <ul className="list-disc list-inside mt-3 text-regal-black/80">
                  {(data.Benefits || []).length === 0 ? <li>None detected</li> : (data.Benefits || []).map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>

              <div className="bg-white rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-regal-burgundy">Renewal</h3>
                  <button onClick={() => setRawOpen(true)} className="text-sm px-3 py-1 bg-white border rounded">View raw</button>
                </div>
                <div className="mt-3">
                  <RenewalBlock renewal={data.Renewal} />
                </div>
              </div>

              <div className="bg-white rounded-xl border p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-regal-burgundy">Actions</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        // try to download extracted text (calls your API /file endpoint if present)
                        const textKey = data.sourceTextKey || data.sourceTextKey?.S;
                        if (!textKey) return alert("No extracted text available");
                        // fallback: if you don't have file endpoint, just open S3 console or implement presign flow
                        alert("To download, implement a /file presign endpoint or copy the S3 key: " + textKey);
                      }}
                      className="px-3 py-2 rounded bg-white border"
                    >
                      Download text
                    </button>
                    <button onClick={() => window.print()} className="px-3 py-2 rounded bg-regal-burgundy text-white">Print</button>
                  </div>
                </div>
                <div className="mt-3 text-sm text-regal-black/80">Export, print, or download the extracted contract text.</div>
              </div>
            </div>

            {/* Large optional raw modal trigger (hidden raw block removed from page) */}
          </div>
        )}

        {/* Raw JSON modal (hidden by default; open via "View raw" button) */}
        {rawOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-11/12 md:w-3/4 bg-white rounded-lg p-6 max-h-[80vh] overflow-auto shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Raw JSON</h3>
                <div className="flex items-center gap-2">
                  <button onClick={() => { navigator.clipboard.writeText(JSON.stringify(data || {}, null, 2)); }} className="px-3 py-1 bg-white border rounded">Copy</button>
                  <button onClick={() => setRawOpen(false)} className="px-3 py-1 bg-regal-burgundy text-white rounded">Close</button>
                </div>
              </div>
              <pre className="whitespace-pre-wrap text-xs">{JSON.stringify(data, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
