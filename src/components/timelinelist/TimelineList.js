import React from 'react';

// styles
import './TimelineList.css';

export default function ProjectList({ timeline }) {
  return (
    <div>
      {timeline.lenght === 0 && <p>Nothing here yet</p>}
      {timeline.map((t) => (
        <div key={t.id}>
          <h2>{t.name}</h2>
          <p>{t.details}</p>
        </div>
      ))}
    </div>
  );
}
