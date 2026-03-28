import { useState } from 'react';
import { createPost } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost(form);
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <h2>Create Post</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }} />
        <textarea placeholder="Content" rows={8} value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          style={{ display: 'block', width: '100%', marginBottom: 12, padding: 8 }} />
        <button type="submit" style={{ padding: '8px 24px' }}>Publish</button>
      </form>
    </div>
  );
}