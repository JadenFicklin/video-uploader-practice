import React, { useState } from 'react';
import { db } from '../firebase';
import { ref, set } from 'firebase/database';

function Form() {
  const [url, setUrl] = useState('');
  const [vidName, setVidName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function getRandomNumber() {
    return Math.floor(Math.random() * 10000) + 1;
  }

  const createVideo = (e) => {
    e.preventDefault();

    set(ref(db, 'videos/' + getRandomNumber()), {
      url,
      vidName,
      name,
      description
    });

    console.log('submited');
  };

  return (
    <form
      onSubmit={createVideo}
      className="flex flex-wrap p-4 bg-white border-2 border-red-400 shadow-xl rounded-2xl w-min text-text">
      <div className="w-full">
        <h2 className="text-2xl font-medium text-theme">Create video</h2>
        <p className="mt-3">url</p>
      </div>
      <div className="w-full">
        <input
          type="url"
          placeholder="url for video"
          className="pl-1 border "
          onChange={(e) => setUrl(e.target.value)}
        />
        <p className="mt-3">video name</p>
      </div>
      <div className="w-full">
        <input
          type="text"
          placeholder="name of video"
          className="pl-1 border "
          onChange={(e) => setVidName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <p className="mt-3">name</p>

        <input
          type="text"
          placeholder="your name"
          className="pl-1 border "
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full">
        <p className="mt-3">Description</p>

        <textarea
          type="text"
          placeholder="video description"
          className="w-full p-1 border"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 duration-200 border rounded-full text-theme border-theme hover:bg-theme hover:text-white">
        Submit Video
      </button>
    </form>
  );
}

export default Form;
