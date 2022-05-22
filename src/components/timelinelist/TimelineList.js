import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
// styles
import './TimelineList.css';

export default function TimelineList({ timeline }) {
  return (
    <div className='timeline-list'>
      {timeline.lenght === 0 && <p>Nothing here yet</p>}
      {timeline.map((t) => (
        <Link key={t.id} to={`/timelines/${t.id}`}>
          <div>
            {' '}
            <h4>{t.name}</h4>
            <Avatar src={t.createdBy.photoURL} />
          </div>

          <p>Date: {t.date.toDate().toDateString()} </p>
        </Link>
      ))}
    </div>
  );
}
