import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './Pages/AuthContext';

import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";
Kommunicate.init("1706990d261a349eac7181ee0a429d1f8", {
 automaticChatOpenOnNavigation: true,
 popupWidget: true
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
        <App />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

