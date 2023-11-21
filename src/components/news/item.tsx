import React, { Component } from 'react';

interface NewsItemProps {
  title: string;
  description: string;
  imageUrl?: string;
  newsUrl: string;
}

export class NewsItem extends Component<NewsItemProps> {
  render() {
    const { title, description, imageUrl, newsUrl } = this.props;

    const containerStyle: React.CSSProperties = {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      backgroundColor: '#f9f9f9',
    };

    const defaultImageUrl = 'https://www.moroylab.org/wp-content/uploads/2018/05/news-2444778_640.jpg'; // Replace with the path to your stock image

    return (
      <div style={containerStyle}>
        <img
          src={imageUrl || defaultImageUrl}
          alt={title}
          style={{ maxWidth: '100%' }}
        />
        <h3>{title}...</h3>
        <p>{description}...</p>
        <a
          href={newsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#007bff', textDecoration: 'none' }}
        >
          Read More
        </a>
      </div>
    );
  }
}

export default NewsItem;
