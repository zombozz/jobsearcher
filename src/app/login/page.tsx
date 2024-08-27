"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabaseClient';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [loginStatus, setLoginStatus] = useState('');
  const router = useRouter();

  const handleGoogleSignIn = async () => {

  };

  // const handleEmailPasswordAuth = async () => {
  //   try {
  //     if (isRegistering) {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //       setLoginStatus(`Successfully registered as ${email}`)
  //     } else {
  //       await signInWithEmailAndPassword(auth, email, password);
  //       setLoginStatus(`Successfully logged in as ${email}`)
  //     }
  //     localStorage.setItem('user', JSON.stringify({ email }));
  //     setTimeout(function() {
  //       router.push('/');
  //     }, 2000)
  //   } catch (error) {
  //       const errorMessage = (error as Error).message || 'An unknown error occurred';
  //       console.error(isRegistering ? 'Error registering:' : 'Error signing in:', errorMessage);
  //       setError(errorMessage);
  //   }
  // };
  const handleEmailPasswordAuth = async () => {
    try {
      let response;

      if (isRegistering) {
        response = await supabase.auth.signUp({
          email,
          password,
        });
      } else {
        response = await supabase.auth.signInWithPassword({
          email,
          password,
        });
      }

      if (response.error) {
        throw response.error;
      }

      if (response.data.user) {
        setLoginStatus(`Successfully ${isRegistering ? 'registered' : 'logged in'} as ${email}`);
        localStorage.setItem('user', JSON.stringify({ email }));
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    } catch (error) {
      const errorMessage = (error as Error).message || 'An unknown error occurred';
      console.error(isRegistering ? 'Error registering:' : 'Error signing in:', errorMessage);
      setError(errorMessage);
    }
  };


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-base-100 pb-20">
        <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            {loginStatus}
          </h1>
          <h1 className="text-2xl font-bold text-center mb-6">
            {isRegistering ? 'Register' : 'Sign In'}
          </h1>
          
          <form onSubmit={(e) => {
            e.preventDefault();
            handleEmailPasswordAuth();
          }}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full mb-4">
              {isRegistering ? 'Register' : 'Sign In'}
            </button>

            <div className="mb-4">
              <button
                onClick={handleGoogleSignIn}
                className="btn btn-primary w-full mb-4"
              >
                Sign In with Google
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {setIsRegistering(!isRegistering), setError(""), setPassword("")}}
                className="text-sm text-blue-500 hover:underline"
              >
                {isRegistering ? 'Already have an account? Sign In' : 'Don’t have an account? Register'}
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SignInPage;
