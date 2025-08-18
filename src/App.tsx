// src/App.tsx
import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import MapWithPinForm from './mapCmp/mapPage';
import outputs from "./amplify_outputs.json";
console.log(2)

Amplify.configure(outputs);

const App: React.FC = () => {
  return (
    <>
    <Authenticator>
      {({ signOut }) => (
        <div>
          <button onClick={signOut}>ログアウト</button>
        </div>
      )}

    </Authenticator>
    <MapWithPinForm />
    </>
  );
};

export default App;
