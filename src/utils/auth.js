// utils/auth.js

import { supabase } from '@/lib/supabaseClient';

export const signIn = async (email, password) => {
  const { error, user } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return user;
};

export const signUp = async (email, password) => {
  const { error, user } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) throw error;
  return user;
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
