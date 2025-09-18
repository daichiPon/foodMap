// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { I18n } from "@aws-amplify/core";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import LunchMapPage from "./mapCmp/LunchMapPage";
import NightMapPage from "./mapCmp/NightMapPage";
import UserSettingsPage from "./mapCmp/Lunch/UserSettingPage";

import outputs from "./amplify_outputs.json";
import { vocabularies } from "./vocabularies";

Amplify.configure(outputs);

I18n.putVocabulariesForLanguage("ja", vocabularies);
I18n.setLanguage("ja");

const App: React.FC = () => {
  return (
    <>
      <Authenticator>
        {({ user }) => (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LunchMapPage userId={user?.userId || ""} />} />
              <Route path="/night" element={<NightMapPage />} />
              <Route path="/settings" element={<UserSettingsPage userId={user?.userId || ""} />} />
            </Routes>
          </BrowserRouter>
        )}
      </Authenticator>
    </>
  );
};

export default App;
