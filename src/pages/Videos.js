import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { ref, onValue, remove, update } from 'firebase/database';

function Videos() {
  const [vidData, setVidData] = useState([]);
  const [vidNameClicked, setVidNameClicked] = useState(false);
  const [submitButton, setSubmitButton] = useState(false);
  const [videoName, setVidName] = useState('');

  const getVideos = () => {
    const vidsRef = ref(db, 'videos');
    onValue(vidsRef, (snapshot) => {
      const data = snapshot.val();
      const mappedData = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key]
        };
      });
      setVidData(mappedData);
    });
  };

  const deleteVideo = (id) => {
    remove(ref(db, 'videos/' + id));
  };

  const handleVidNameClick = () => {
    setVidNameClicked(true);
    setSubmitButton(true);
  };

  const handleUpdates = (id) => {
    const vidRef = ref(db, 'videos/' + id);
    update(vidRef, {
      vidName: `${videoName}`
    }).then(() => {
      setVidNameClicked(false);
      setSubmitButton(false);
    });
  };

  useEffect(() => {
    getVideos();
  }, []);
  return (
    <div className="flex flex-wrap bg-white shadow-xl w-min min-w-[55vw] max-w-[70vw] p-10 pb-0 absolute top-0 right-10 min-h-screen overflow-auto content-start">
      <h1 className="w-full mb-6 text-3xl font-semibold text-theme">Videos</h1>
      {vidData &&
        vidData.map((item) => (
          <div className="relative p-4 m-2 bg-white border-2 shadow-xl border-theme rounded-2xl w-max text-text h-min">
            <button
              onClick={() => deleteVideo(item.id)}
              className="absolute grid p-2 text-xs font-bold border rounded-full w-7 h-7 top-3 right-3 place-content-center border-theme text-theme hover:bg-theme hover:text-white">
              X
            </button>
            <h2
              className="text-2xl font-semibold text-theme"
              onClick={() => handleVidNameClick()}>
              {vidNameClicked ? (
                <input
                  placeholder="Enter New video name"
                  className="border"
                  onChange={(e) => setVidName(e.target.value)}
                />
              ) : (
                <p>{item.vidName ? <p>{item.vidName}</p> : 'no name'}</p>
              )}
            </h2>
            {item.url.includes('youtube.com') ? (
              <div className="w-full bg-black">
                <iframe
                  width="280"
                  height="157"
                  src={`https://www.youtube.com/embed/${
                    item.url.split('v=')[1]
                  }`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="mx-auto my-3 bg-black"
                  allowFullScreen></iframe>
              </div>
            ) : (
              <video
                src={item.url}
                alt={item.vidName}
                className="w-20 h-20"
                controls
              />
            )}
            <div>{item.description}</div>
            <div className="text-sm text-gray-600">
              Uploaded by:{' '}
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </div>
            {submitButton && (
              <button
                className="w-full p-2 duration-200 border rounded-full text-theme border-theme hover:bg-theme hover:text-white"
                onClick={() => handleUpdates(item.id)}>
                Submit updates
              </button>
            )}
          </div>
        ))}
    </div>
  );
}

export default Videos;
