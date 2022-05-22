import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Select from 'react-select';

import { timestamp } from '../../firebase/config';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';

// styles
import './Create.css';

/* 
Select library makes options and select box much easier to handle
just add the right properties and 
<option value label />
then ad it in the Select tag and do options and onChange
*/

const categories = [
  { value: 'timeline', label: 'Timeline' },
  { value: 'history', label: 'History' },
];

export default function Create() {
  const history = useHistory();
  const { addDocument, response } = useFirestore('timeline');
  
  const { user } = useAuthContext();

  // form fields
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [formError, setFormError] = useState(null);
  /* 
  useEffect(() => {
    if (documents) {
      const options = documents.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!category) {
      setFormError('Please select timeline category');
      return;
    }

    // creating a createdby object from user
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    // creating timeline document object
    const timeline = {
      name,
      details,
      category: category.value,
      date: timestamp.fromDate(new Date(date)),
      comments: [],
      createdBy,
    };

    await addDocument(timeline);

    if (!response.error) {
      history.push('/');
    }
  };

  return (
    <div className='assignment-form'>
      <h2 className='page-title'>New timeline</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Timeline title:
          <input
            type='text'
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Timeline description:
          <textarea
            type='text'
            value={details}
            required
            onChange={(e) => setDetails(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type='date'
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Cateogry:
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </label>

        <button className='btn assign-form-btn'>Add assignment</button>
        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  );
}
