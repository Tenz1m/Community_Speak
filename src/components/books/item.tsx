import React from "react";

interface BookItemProps {
  title: string;
  authors: string[]; // Assuming authors is always an array
  imageUrl: string;
  previewLink: string;
}

const BookItem: React.FC<BookItemProps> = ({ title, authors, imageUrl, previewLink }) => {
  const containerStyle: React.CSSProperties = {
    border: "2px solid Black",
    borderRadius: "8px",
    padding: "16px",
    marginBottom: "16px",
    backgroundColor: "#e6f0ee",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: "1.5em", // Adjust the font size as needed
    marginBottom: "8px", // Add some space between title and other content
  };

  const authorsStyle: React.CSSProperties = {
    fontSize: "1.2em", // Adjust the font size as needed
    marginBottom: "8px", // Add some space between authors and other content
  };

  return (
    <div style={containerStyle}>
      <img src={imageUrl} alt={title} style={{ maxWidth: "100%" }} />
      <h3 style={titleStyle}>{title}</h3>
      {authors && Array.isArray(authors) && (
        <p style={authorsStyle}>Authors: {authors.join(", ")}</p>
      )}
      <a
        href={previewLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#007bff", textDecoration: "none" }}
      >
        Preview Link
      </a>
    </div>
  );
};

export default BookItem;
