import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


import * as communityActions from '../../../store/communities';

export default function EditCommunityForm({community, setShowModal}) {
  const history = useHistory();

  const [errors, setErrors] = useState([]);
  const [name, setName] = useState(community.name);
  const [description, setDescription] = useState(community.description);
  const [imageUrl, setImageUrl] = useState(community.imageUrl);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(
      communityActions.updateCommunity({id: community.id, name, description, image_url: imageUrl})
      );
    if (response.ok) {
      setShowModal(false)
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
        <textarea
          className='textarea-input'
          type='textarea'
          onChange={(e)=>setDescription(e.target.value)}
          value={description}
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
