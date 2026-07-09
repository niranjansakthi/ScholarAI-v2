import "./RecentDocuments.css";

const documents = [
  { name: "Product Strategy.pdf", updated: "2h ago" },
  { name: "Research Notes.docx", updated: "Today" },
  { name: "Engineering Handbook.pdf", updated: "Yesterday" },
];

function RecentDocuments() {
  return (
    <section className="recent-docs">
      <div className="section-heading">
        <h3>Recent documents</h3>
        <span>Recent uploads</span>
      </div>

      <ul className="recent-docs__list">
        {documents.map((doc) => (
          <li key={doc.name} className="recent-docs__item">
            <div>
              <strong>{doc.name}</strong>
              <p>Ready for AI review</p>
            </div>
            <span>{doc.updated}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default RecentDocuments;
