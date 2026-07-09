import { useState, useRef } from "react";
import { uploadPDF, uploadHandwritten, uploadYoutube } from "../../services/api";
import { useDocuments } from "../../context/DocumentContext";
import "./Upload.css";

const UPLOAD_TYPES = [
  {
    id: "pdf",
    title: "PDF Document",
    icon: "📄",
    desc: "Upload research papers, textbooks, lecture notes",
    accept: "application/pdf",
    color: "blue",
  },
  {
    id: "image",
    title: "Image / Photo",
    icon: "🖼️",
    desc: "Upload images with text for OCR extraction",
    accept: "image/*",
    color: "green",
  },
  {
    id: "handwritten",
    title: "Handwritten Notes",
    icon: "✍️",
    desc: "Scan or photograph your handwritten notes",
    accept: "image/*",
    color: "purple",
  },
];

function UploadZone({ type }) {
  const { addDocument } = useDocuments();
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [statusText, setStatusText] = useState("");
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setStatus("uploading");
    setStatusText(`Uploading ${file.name}…`);
    try {
      if (type.id === "pdf") {
        await uploadPDF(file);
      } else if (type.id === "handwritten") {
        await uploadHandwritten(file);
      } else {
        await uploadPDF(file); // image treated as PDF upload for now
      }

      // ── Register in global document history ──────────────
      addDocument({
        name: file.name,
        type: type.id === "handwritten" ? "image" : type.id,
        size: file.size,
      });

      setStatus("success");
      setStatusText(`${file.name} uploaded successfully!`);
    } catch (err) {
      setStatus("error");
      setStatusText(err.response?.data?.detail || "Upload failed. Try again.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div
      className={`upload-zone upload-zone--${type.color} ${dragging ? "dragging" : ""} ${status !== "idle" ? `status-${status}` : ""}`}
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => status !== "uploading" && inputRef.current?.click()}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept={type.accept}
        className="upload-input-hidden"
        onChange={(e) => handleFile(e.target.files[0])}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="upload-icon">{type.icon}</div>
      <h3 className="upload-type-title">{type.title}</h3>
      <p className="upload-type-desc">{type.desc}</p>

      {status === "idle" && (
        <p className="upload-hint">Click or drag & drop</p>
      )}

      {status === "uploading" && (
        <div className="upload-progress-bar">
          <div className="upload-progress-fill" />
        </div>
      )}

      {(status === "success" || status === "error") && (
        <p className={`upload-status-msg ${status}`}>{statusText}</p>
      )}

      {status !== "uploading" && status !== "idle" && (
        <button
          className="upload-retry-btn"
          onClick={(e) => { e.stopPropagation(); setStatus("idle"); setStatusText(""); }}
        >
          {status === "success" ? "Upload another" : "Try again"}
        </button>
      )}
    </div>
  );
}

function YoutubeUpload() {
  const { addDocument } = useDocuments();
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setStatus("loading");
    setMessage("Processing YouTube video…");
    try {
      await uploadYoutube(url.trim());

      // ── Extract a readable title from the URL ─────────────
      const videoId = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
      const displayName = videoId ? `YouTube: ${videoId}` : "YouTube Video";
      addDocument({ name: displayName, type: "youtube", size: 0 });

      setStatus("success");
      setMessage("YouTube video processed successfully!");
      setUrl("");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.detail || "Failed to process YouTube URL.");
    }
  };

  return (
    <div className="youtube-upload">
      <div className="upload-zone upload-zone--red" style={{ cursor: "default" }}>
        <div className="upload-icon">🎥</div>
        <h3 className="upload-type-title">YouTube Video</h3>
        <p className="upload-type-desc">
          Paste a YouTube URL to extract and index the transcript
        </p>

        <form className="youtube-form" onSubmit={handleSubmit}>
          <input
            type="url"
            className="youtube-url-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
            disabled={status === "loading"}
          />
          <button
            type="submit"
            className="youtube-submit-btn"
            disabled={status === "loading" || !url.trim()}
          >
            {status === "loading" ? "Processing…" : "Process"}
          </button>
        </form>

        {message && (
          <p className={`upload-status-msg ${status === "success" ? "success" : status === "error" ? "error" : ""}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

// ── Recent uploads shown inline on the Upload page ────────────
const typeIcon   = { pdf: "📄", youtube: "🎥", image: "🖼️" };
const typeBadge  = { pdf: "PDF", youtube: "YouTube", image: "Image" };

function RecentUploadsPanel() {
  const { documents } = useDocuments();

  if (documents.length === 0) return null;

  return (
    <div className="recent-uploads-panel">
      <div className="section-header">
        <h3 className="section-title" style={{ fontSize: "1rem" }}>Recent Uploads</h3>
        <p className="section-sub">Files added in this session</p>
      </div>
      <div className="documents-list">
        {documents.slice(0, 8).map((doc) => (
          <div className="doc-row doc-row--new" key={doc.id}>
            <span className="doc-icon">{typeIcon[doc.type] || "📄"}</span>
            <div className="doc-info">
              <p className="doc-name">{doc.name}</p>
              <p className="doc-meta">{doc.size}</p>
            </div>
            <span className={`doc-type-badge doc-type-badge--${doc.type}`}>
              {typeBadge[doc.type] || "File"}
            </span>
            <span className="doc-time">{doc.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Upload() {
  return (
    <div className="upload-page">
      <div className="upload-page-header">
        <h2 className="section-title">Upload Documents</h2>
        <p className="section-sub">
          Add content to your knowledge base. Supports PDFs, images, handwritten notes, and YouTube videos.
        </p>
      </div>

      <div className="upload-grid">
        {UPLOAD_TYPES.map((type) => (
          <UploadZone key={type.id} type={type} />
        ))}
        <YoutubeUpload />
      </div>

      {/* Live recent-uploads panel appears after first upload */}
      <RecentUploadsPanel />
    </div>
  );
}

export default Upload;
