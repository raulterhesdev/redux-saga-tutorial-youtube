import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const Posts = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div>
      <button onClick={() => {}}>Get Posts</button>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='title'
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='description'
      />
      <button onClick={() => {}}>Add Item</button>
    </div>
  );
};

export default Posts;
