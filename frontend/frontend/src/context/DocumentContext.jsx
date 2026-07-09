import { createContext, useContext, useState, useCallback } from "react";

// ─── Context ──────────────────────────────────────────────────
const DocumentContext = createContext(null);

// ─── Helpers ──────────────────────────────────────────────────
function formatBytes(bytes) {
  if (!bytes || bytes === 0) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function timeAgo(date) {
  const diff = Date.now() - date;
  const s = Math.floor(diff / 1000);
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (s < 60) return "Just now";
  if (m < 60) return `${m}m ago`;
  if (h < 24) return `${h}h ago`;
  if (d === 1) return "Yesterday";
  return `${d}d ago`;
}

// ─── Provider ─────────────────────────────────────────────────
export function DocumentProvider({ children }) {
  const [documents, setDocuments] = useState([]);

  /**
   * addDocument({ name, type, size })
   * type: "pdf" | "image" | "handwritten" | "youtube"
   * size: File.size in bytes, or 0 for YouTube
   */
  const addDocument = useCallback(({ name, type, size = 0 }) => {
    setDocuments((prev) => [
      {
        id: Date.now(),
        name,
        type,
        size: formatBytes(size),
        rawSize: size,
        time: "Just now",
        uploadedAt: Date.now(),
      },
      ...prev,
    ]);
  }, []);

  /** Refresh relative time labels on every render (good enough for SPA) */
  const refreshedDocs = documents.map((doc) => ({
    ...doc,
    time: timeAgo(doc.uploadedAt),
  }));

  return (
    <DocumentContext.Provider value={{ documents: refreshedDocs, addDocument }}>
      {children}
    </DocumentContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────
export function useDocuments() {
  const ctx = useContext(DocumentContext);
  if (!ctx) throw new Error("useDocuments must be used inside <DocumentProvider>");
  return ctx;
}
