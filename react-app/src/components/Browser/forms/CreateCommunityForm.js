import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import * as communityActions from '../../../store/communities';

export default function CreateCommunityForm({setShowModal}) {
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      communityActions.createCommunity({name, description, image_url: imageUrl?imageUrl:null})
      );
    if (response.ok) {
      setShowModal(false);
      setErrors([]);
      history.push(`/${name.replace(' ', '-')}`)
    } else {
      const data = await response.json()
      setErrors(data.errors)
    };
  };
  return (
    <form method='POST' onSubmit={handleSubmit}>
      <div className='errors'>
        {errors.map((error, idx) => (
          <div className='error' key={idx}>{error}</div>
        ))}
      </div>
      <div>
        <label>Community Name *</label>
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
        <textarea
          className='textarea-input'
          type='textarea'
          onChange={(e)=>setDescription(e.target.value)}
          value={description}
          placeholder='Description'
          />
      </div>

      <div>
        <label>Image Url</label>
        <input
          type='text'
          onChange={(e)=>setImageUrl(e.target.value)}
          value={imageUrl}
          placeholder='Image Url'
          />
      </div>


      <button type='submit'>Confirm</button>
    </form>
  )
}
