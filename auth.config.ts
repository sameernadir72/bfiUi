import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
// import { signInWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from './app/firebase/config';
import { getFirestore } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';

import { useRouter } from 'next/router';

interface User {
  email: string;
  password: string;
}
async function createUser(user: User) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const db = getFirestore(app);
    // Successful Login
    const { user: firebaseUser } = userCredential;
    // if (user) {
    //   redirect('/dashboard');
    //   // Return relevant user data (replace with your desired user object)
    // }
    return {
      id: firebaseUser.uid, // Assuming Firebase uses uid for user identification
      email: firebaseUser.email
      // Add other relevant user information (name, etc.) if needed
    };
  } catch (error) {
    // Handle authentication errors
    throw error;
  }
}
async function loginUser(user: User) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const db = getFirestore(app);
    // Successful Login
    const { user: firebaseUser } = userCredential;
    if (user) {
      // const router = useRouter();
      // router.push('/');
      // Return relevant user data (replace with your desired user object)
    }
    return {
      id: firebaseUser.uid, // Assuming Firebase uses uid for user identification
      email: firebaseUser.email
      // Add other relevant user information (name, etc.) if needed
    };
  } catch (error) {
    // Handle authentication errors
    throw error;
  }
}
const authConfig = {
  providers: [
    CredentialProvider({
      credentials: {
        email: {
          type: 'email'
        },
        password: {
          type: 'password'
        },
        name: {
          type: 'name'
        }
      },
      async authorize(credentials, req) {
        const user = {
          email: credentials?.email as string,
          password: credentials?.password as string
        };
        try {
          if (!credentials.name) {
            const userCredential = await loginUser(user);
            // Successful Login
            // Return relevant user data (replace with your desired user object)
            return userCredential;
          } else {
            const userCredential = await createUser(user);
            // Successful Login
            // Return relevant user data (replace with your desired user object)
            return userCredential;
          }
        } catch (err) {
          console.log('~ err:', err);
          return null;
        }
      }
    })
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/dashboard' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
