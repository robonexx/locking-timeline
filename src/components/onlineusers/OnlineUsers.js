import React from 'react';
import { useCollection } from '../../hooks/useCollection';
import Avatar from '../avatar/Avatar';
import {AiOutlineArrowDown} from 'react-icons/ai'

// styles
import './OnlineUsers.css';

export default function OnlineUsers() {
  const { error, documents } = useCollection('users');

  return (
    <div className='online-users'>
      <div className='online-side'>
        online <AiOutlineArrowDown />
      </div>
      <h2>Online</h2>
      {error && <div className='error'>{error}</div>}
      {documents &&
        documents.map((user) => (
          <div key={user.id} className='user-item'>
            {user.online && <span className='user-online'></span>}
            <span className='user-name'>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
