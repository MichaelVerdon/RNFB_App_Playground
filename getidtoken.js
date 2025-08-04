// app.js - Minimal repro of getIdToken() UID mismatch issue in @react-native-firebase/auth

import { getAuth, getIdToken } from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import { Button, View, Text, AppRegistry } from 'react-native';
import React, { useState } from 'react';

export default function App() {
  const [modularToken, setModularToken] = useState(null);
  const [namespacedToken, setNamespacedToken] = useState(null);
  const [uidFromModular, setUidFromModular] = useState(null);
  const [uidFromNamespaced, setUidFromNamespaced] = useState(null);

  const signInAnonymously = async () => {
    try {
      console.log('Starting sign in process...');
      
      // Only sign out if there's a current user
      if (auth().currentUser) {
        console.log('Signing out current user...');
        await auth().signOut();
        console.log('Signed out successfully');
      } else {
        console.log('No current user to sign out');
      }
      
      const userCredential = await auth().signInAnonymously();
      console.log('Signed in anonymously, user:', userCredential.user?.uid);
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const getTokenUsingModular = async () => {
    try {
      console.log('Getting token using modular API...');
      const modularAuth = getAuth();
      console.log('modularAuth:', modularAuth);
      console.log('modularAuth.currentUser:', modularAuth.currentUser);
      
      if (modularAuth.currentUser) {
        const uid = modularAuth.currentUser.uid;
        console.log('modularAuth.currentUser.uid:', uid);
        
        const token = await getIdToken(modularAuth.currentUser, true);
        setModularToken(token);
        setUidFromModular(uid);
        console.log('Modular token retrieved successfully');
      } else {
        console.log('No current user in modular auth');
      }
    } catch (error) {
      console.error('Error getting modular token:', error);
    }
  };

  const getTokenUsingNamespaced = async () => {
    try {
      console.log('Getting token using namespaced API...');
      const currentUser = auth().currentUser;
      console.log('namespaced currentUser:', currentUser);
      
      if (currentUser) {
        const uid = currentUser.uid;
        console.log('currentUser.uid:', uid);
        
        const token = await currentUser.getIdToken(true);
        setNamespacedToken(token);
        setUidFromNamespaced(uid);
        console.log('Namespaced token retrieved successfully');
      } else {
        console.log('No current user in namespaced auth');
      }
    } catch (error) {
      console.error('Error getting namespaced token:', error);
    }
  };

  useEffect(() => {
    console.log('Component mounted, starting sign in...');
    signInAnonymously();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Button title="Get Token (Modular API)" onPress={getTokenUsingModular} />
      {modularToken && (
        <Text>Modular UID: {uidFromModular}{'\n'}Token: {modularToken.slice(0, 30)}...</Text>
      )}

      <View style={{ height: 20 }} />

      <Button title="Get Token (Namespaced API)" onPress={getTokenUsingNamespaced} />
      {namespacedToken && (
        <Text>Namespaced UID: {uidFromNamespaced}{'\n'}Token: {namespacedToken.slice(0, 30)}...</Text>
      )}
      
      <View style={{ height: 20 }} />
      <Button title="Sign In Again" onPress={signInAnonymously} />
    </View>
  );
}

AppRegistry.registerComponent('testing', () => App);
