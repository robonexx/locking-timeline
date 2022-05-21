import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';

// styles
import './Navbar.css';

export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <div className='navbar'>
      <div className='logo'>Locking Timeline</div>
      <ul>
        {!user && (
          <>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/signup'>Signup</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <button className='btn' onClick={logout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
