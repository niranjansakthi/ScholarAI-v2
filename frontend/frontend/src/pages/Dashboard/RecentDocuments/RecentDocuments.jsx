import "./RecentDocuments.css";
import { useDocuments } from "../../../context/DocumentContext";

// Placeholder data shown when no real uploads exist yet
const PLACEHOLDER_DOCS = [
  { id: "p1", name: "Deep Learning Notes.pdf",       type: "pdf",     time: "Demo",  size: "2.4 MB" },
  { id: "p2", name: "Operating System Handbook.pdf", type: "pdf",     time: "Demo",  size: "5.1 MB" },
  { id: "p3", name: "MIT OCW Neural Networks",       type: "youtube", time: "Demo",  size: "—"      },
];

const typeIcon  = { pdf: "📄", youtube: "🎥", image: "🖼️" };
const typeBadge = { pdf: "PDF", youtube: "YouTube", image: "Image" };

function DocRow({ doc, isNew }) {
  return (
    <div className={`doc-row${isNew ? " doc-row--new" : ""}`} key={doc.id}>
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
  );
}

function RecentDocuments() {
  const { documents } = useDocuments();

  const hasUploads = documents.length > 0;
  // Show the 5 most recent real uploads, or fall back to placeholders
  const displayDocs = hasUploads ? documents.slice(0, 5) : PLACEHOLDER_DOCS;

  return (
    <section className="recent-documents">
      <div className="section-header">
        <div>
          <h2 className="section-title">Recent Documents</h2>
          <p className="section-sub">
            {hasUploads
              ? `${documents.length} document${documents.length === 1 ? "" : "s"} in your knowledge base`
              : "Your latest uploaded knowledge sources"}
          </p>
        </div>
        {hasUploads && (
          <span className="live-badge">🟢 Live</span>
        )}
      </div>

      <div className="documents-list">
        {displayDocs.map((doc, i) => (
          <DocRow key={doc.id} doc={doc} isNew={hasUploads && i === 0} />
        ))}

        {!hasUploads && (
          <div className="doc-empty-hint">
            <span>⬆️</span>
            <p>Go to <strong>Documents</strong> to upload your first file</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default RecentDocuments;