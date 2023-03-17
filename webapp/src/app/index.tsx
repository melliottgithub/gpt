import React from 'react';
import Gpt from '../gpt';


function App() {
  return (
    <div className="flex-column m-auto max-width p-xsmall-left p-xsmall-right">
      <header className="flex-row secondary-1 font-size-xxlarge">
        <p>GPT 4</p>
      </header>
      <div className="flex-row justify-center font-size-medium">
        <Gpt />
      </div>
    </div>
  );
}

export default App;
