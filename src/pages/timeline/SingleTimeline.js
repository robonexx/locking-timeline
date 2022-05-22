import React from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '../../components/avatar/Avatar';
import { useFirestore } from '../../hooks/useFirestore';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function SingleTimeline({ document }) {
  const { deleteDocument } = useFirestore('timeline');
  const { user } = useAuthContext();
  const history = useHistory();

  const handleDelete = () => {
    deleteDocument(document.id);
    history.push('/');
  };
  return (
    <div className='timeline-summary'>
      <h2 className='page-title'>{document.name}</h2>
      <div>
        <p className='date'>
          Created by{' '}
          <span style={{ color: '#ee4e34' }}>
            {document.createdBy.displayName}
          </span>
        </p>
        <Avatar src={document.createdBy.photoURL} />
      </div>
      <p className='date'>Date: {document.date.toDate().toDateString()}</p>
      <p className='details'>{document.details}</p>
      {user.uid === document.createdBy.id && (
        <button className='btn error' onClick={handleDelete}>
          Delete timeline
        </button>
      )}
    </div>
  );
}
