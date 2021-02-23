import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts, addPost } from './Posts.actions';

const Posts = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div>
      <button
        onClick={() => {
          dispatch(getPosts());
        }}
      >
        Get Posts
      </button>

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
      <button
        onClick={() => {
          dispatch(addPost({ title, description }));
        }}
      >
        Add Item
      </button>
    </div>
  );
};

export default Posts;
