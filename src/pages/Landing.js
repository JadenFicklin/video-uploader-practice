import React from 'react';
import Form from './Form';
import Videos from './Videos';

function Landing() {
  return (
    <div className="w-full min-h-screen p-10 bg-backgroundColor">
      <Form />
      <Videos />
    </div>
  );
}

export default Landing;
