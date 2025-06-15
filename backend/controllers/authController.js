export const generateAuthTemplate = async (req, res) => {
  const { authType } = req.body;

  try {
    let files = {};

    if (authType === 'google') {
      files = {
        'firebase.js': `import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);`,

        'Login.jsx': `import React from "react";
import { signInWithGoogle } from "./firebase";

export default function Login() {
  return (
    <div>
      <h2>Login with Google</h2>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
}`
      };
    } else if (authType === 'email') {
      files = {
        'firebase.js': `import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "yourapp.firebaseapp.com",
  projectId: "yourapp",
  storageBucket: "yourapp.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);`,

        'Login.jsx': `import React, { useState } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(user => console.log("Logged in", user))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}`
      };
    } else {
      return res.status(400).json({ error: "Unsupported auth type" });
    }

    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate auth template", details: err.message });
  }
};
