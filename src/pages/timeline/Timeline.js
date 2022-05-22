import { useParams } from 'react-router-dom';
import { useDocument } from '../../hooks/useDocument';
import TimelineComments from './TimelineComments';
import SingleTimeline from './SingleTimeline';

// styles
import './Timeline.css';

export default function Timeline() {
  const { id } = useParams();
  const { error, document } = useDocument('timeline', id);

  if (error) {
    return <div className='error'>{error}</div>;
  }
  if (!document) {
    return <div className='loading'>Loading...</div>;
  }
  return (
    <div className='timeline-details'>
      <SingleTimeline document={document} />
      <TimelineComments timeline={document} />
    </div>
  );
}
