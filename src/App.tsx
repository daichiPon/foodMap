// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import LunchMapPage from './mapCmp/LunchMapPage';
import outputs from "./amplify_outputs.json";
import NightMapPage from './mapCmp/NightMapPage';
console.log(2)

Amplify.configure(outputs);

const App: React.FC = () => {
  return (
    <>
    <Authenticator>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LunchMapPage />} />
          <Route path="/night" element={<NightMapPage />} />
        </Routes>
      </BrowserRouter>
    </Authenticator>

    </>
  );
};

export default App;
