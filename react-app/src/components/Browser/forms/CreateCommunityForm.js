import React, {useState} from 'react'
import { useDispatch } from 'react-redux';


import * as communityActions from '../../../store/communities';

export default function CreateCommunityForm({setShowModal}) {
  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      communityActions.createCommunity({name,description})
      );
    if (response.ok) {
      setShowModal(false)
    } else {
      const data = await response.json()
      setErrors(data)
    };
  };

  return (
    <form method='POST' onSubmit={handleSubmit}>
      <div className='errors'>
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>
      <div>
        <label>Community Name</label>
        <input
          type='text'
          onChange={(e)=>setName(e.target.value)}
          value={name}
          placeholder='Name'
          required
          />
      </div>

      <div>
        <label>Description</label>
        <input
          type='textarea'
          onChange={(e)=>setDescription(e.target.value)}
          value={description}
          />
      </div>


      <button type='submit'>Confirm</button>
    </form>
  )
}