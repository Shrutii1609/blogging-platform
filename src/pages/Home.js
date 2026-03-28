import { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(res => setPosts(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24 }}>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <div key={post._id} style={{ border: '1px solid #ddd', borderRadius: 8, padding: 16, marginBottom: 16 }}>
          <h2><Link to={`/posts/${post._id}`}>{post.title}</Link></h2>
          <p>By {post.author?.username} · {new Date(post.createdAt).toLocaleDateString()}</p>
          <p>{post.content.slice(0, 150)}...</p>
        </div>
      ))}
    </div>
  );
}