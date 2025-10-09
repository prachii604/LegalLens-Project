// src/pages/Analysis.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "https://tsq50u94z7.execute-api.ap-south-1.amazonaws.com/prod";

// --- helpers (same shape as Dashboard) ---
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

  useEffect(() => {
    const fetchAnalysis = async () => {
      const userId = getUserId();
      const idToken = sessionStorage.getItem("idToken");
      try {
        const resp = await fetch(`${API_URL}/contracts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(idToken ? { Authorization: idToken } : {}),
          },
          body: JSON.stringify({
            action: "analysis_get", // backend must support this
            userId,
            contractId,
          }),
        });
        const text = await resp.text();
        if (!resp.ok) throw new Error(text || `HTTP ${resp.status}`);
        const json = (() => { try { return JSON.parse(text); } catch { return {}; } })();
        setData(json);
      } catch (e) {
        setErr(e.message || "Failed to fetch analysis");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [contractId]);

  // Small renderer helpers
  const pretty = (v) =>
    typeof v === "string"
      ? v
      : v == null
      ? "—"
      : JSON.stringify(v, null, 2);

  const Section = ({ title, value }) => (
    <div className="bg-white rounded-xl border border-regal-beige/50 p-4">
      <h3 className="font-semibold text-regal-burgundy mb-2">{title}</h3>
      <pre className="whitespace-pre-wrap text-sm text-regal-black/80">
        {pretty(value)}
      </pre>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-regal-offwhite to-regal-beige/30 px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-regal-burgundy">Contract Analysis</h1>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-white border border-regal-beige hover:shadow"
          >
            Back
          </button>
        </div>

        {loading && <div className="text-regal-black/70">Loading analysis…</div>}
        {err && <div className="text-red-600">Error: {err}</div>}
        {!loading && !err && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Section title="Risk" value={data?.Risk} />
            <Section title="Benefits" value={data?.Benefits} />
            <Section title="Clauses" value={data?.Clauses} />
            <Section title="Renewal" value={data?.Renewal} />
            <Section title="Red Flags" value={data?.RedFlags} />

            {/* Raw JSON */}
            <div className="md:col-span-2 bg-white rounded-xl border border-regal-beige/50 p-4">
              <h3 className="font-semibold text-regal-burgundy mb-2">Raw JSON</h3>
              <pre className="text-xs whitespace-pre-wrap">
                {pretty(data)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
