import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/database'; // Import the Firebase Realtime Database module


interface Post {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

const SocialMediaFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Initialize Firebase with your config
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    // Reference to the posts in your Firebase database
    const postsRef = firebase.database().ref('posts');

    // Listen for changes in the Firebase database
    postsRef.on('value', (snapshot) => {
      const postData: Post[] = [];

      snapshot.forEach((childSnapshot) => {
        const post = childSnapshot.val();
        postData.push(post);
      });

      setPosts(postData);
      setLoading(false);
    });

    return () => {
      // Unsubscribe from Firebase database when the component unmounts
      postsRef.off();
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.author}</h3>
          <p>{post.content}</p>
          <p>Posted {post.timestamp}</p>
          <p>Likes: {post.likes}</p>
          <p>Comments: {post.comments}</p>
        </div>
      ))}
    </div>
  );
};

export default SocialMediaFeed;
