import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import { firebaseConfig } from './app/firebase/config';
import { getApp, getApps, initializeApp } from 'firebase/app';
// import firebase from 'firebase/app';
// import 'firebase/firestore';
// const firestore = (
//   !getApps().length ? initializeApp(firebaseConfig): getApps()
// ).firestore();

const authConfig = {
  pages: {
    signIn: '/login' //sigin page
  },
  providers: [],
 
} satisfies NextAuthConfig;

export default authConfig;
