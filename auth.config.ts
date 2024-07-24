import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { app, auth } from './app/firebase/config';
import { getFirestore } from 'firebase/firestore';

interface User {
  email: string;
  password: string;
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
    console.log('loginUser ~ auth:', userCredential, db);

    // Return relevant user data (replace with your desired user object)
    return {
      id: firebaseUser.uid, // Assuming Firebase uses uid for user identification
      email: firebaseUser.email
      // Add other relevant user information (name, etc.) if needed
    };
  } catch (error) {
    // Handle authentication errors
    console.error('Error during login:', error);
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
        }
      },
      async authorize(credentials, req) {
        const user = {
          email: credentials?.email as string,
          password: credentials?.password as string
        };
        try {
          const userCredential = await loginUser(user);
          console.log('userCredential:', userCredential);
          // Successful Login
          // Return relevant user data (replace with your desired user object)
          return userCredential;
        } catch (err) {
          console.log('~ err:', err);
          return null;
        }
      }
    })
  ],
  secret: process.env.SECRET,
  pages: {
    signIn: '/' //sigin page
  }
} satisfies NextAuthConfig;

export default authConfig;
