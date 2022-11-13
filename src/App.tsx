import React from 'react';
import {useWasm} from './Utils/useWasm';
import {Homeview} from './Views/Homeview';
const App: React.FC = () => {
  const {isLoading, error} = useWasm();
  if (error) {
    return <h1>Error</h1>;
  }
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return <Homeview />;
};

export default App;
