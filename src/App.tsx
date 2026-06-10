// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Amplify } from "aws-amplify";
import { I18n } from "@aws-amplify/core";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AppLayout from "./layout/AppLayout";
import LunchMapPage from "./mapCmp/LunchMapPage";
import UserSettingsPage from "./mapCmp/Lunch/UserSettingPage";
import TimelinePage from "./pages/TimelinePage";
import QuickRegisterPage from "./pages/QuickRegisterPage";
import FriendSharePage from "./pages/FriendSharePage";
import MyPage from "./pages/MyPage";

import outputs from "./amplify_outputs.json";
import { vocabularies } from "./vocabularies";

Amplify.configure(outputs);

I18n.putVocabulariesForLanguage("ja", vocabularies);
I18n.setLanguage("ja");

const App: React.FC = () => {
  return (
    <>
      <Authenticator>
        {({ user }) => {
          const userId = user?.userId || "";
          return (
            <BrowserRouter>
              <Routes>
                <Route element={<AppLayout />}>
                  <Route path="/" element={<LunchMapPage userId={userId} />} />
                  <Route path="/timeline" element={<TimelinePage userId={userId} />} />
                  <Route path="/register" element={<QuickRegisterPage userId={userId} />} />
                  <Route path="/friends" element={<FriendSharePage userId={userId} />} />
                  <Route path="/mypage" element={<MyPage userId={userId} />} />
                  <Route path="/settings" element={<UserSettingsPage userId={userId} />} />
                </Route>
              </Routes>
            </BrowserRouter>
          );
        }}
      </Authenticator>
    </>
  );
};

export default App;
