import React, { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';
import { Link } from 'react-router-dom';
// styles
import './Signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
    setEmail('');
    setPassword('');
    setDisplayName('');
    setThumbnail(null);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0]; // get the first file selected only one allowed
    console.log(selected);

    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }

    if (!selected.type.includes('image')) {
      setThumbnailError('Please file must be image');
      return;
    }

    if (selected.size > 100000) {
      setThumbnailError('Image filesize must be less than 100kb');
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
    console.log('thumbnail updated');
  };

  return (
    <div className='signup'>
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <label>
          <span>Email:</span>
          <input
            type='email'
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type='password'
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>Name:</span>
          <input
            type='text'
            required
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label>
          <span>Profile image:</span>
          <input type='file' required onChange={handleFileChange} />
          {thumbnailError && <div className='error'>{thumbnailError}</div>}
        </label>
        {!isPending && <button className='btn'>Sign up</button>}
        {isPending && (
          <button className='btn' disabled>
            Loading...
          </button>
        )}
        {error && <div className='error'>{error}</div>}
      </form>
      <p>
        Already have an account? <Link to='/login'>Login</Link>!
      </p>
    </div>
  );
}
