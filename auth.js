import React, { useEffect } from 'react';
import { AppRegistry, Button, Text, View } from 'react-native';

import firebase, { utils } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { appleAuth, AppleButton } from '@invertase/react-native-apple-authentication';

function App() {

  async function onAppleButtonPress() {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL], // Ensure full name is requested
      });
  
      console.log('Apple Auth Response:', appleAuthRequestResponse);
  
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }
  
      const { identityToken, nonce, fullName } = appleAuthRequestResponse; // Full name should be available here
  
      console.log('Full Name:', fullName);
  
      // Send credentials to Firebase
      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      const userCredential = await auth().signInWithCredential(appleCredential);
  
      console.log('Firebase User:', userCredential.user);
    } catch (error) {
      console.error('Apple Sign-In failed:', error);
    }
  }

  return (
    <View>
      <Text>text text text</Text>
      <Text>text text text</Text>
      <Text>text text text</Text>
      <Text>text text text</Text>
      <AppleButton
      buttonStyle={AppleButton.Style.WHITE}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: 160,
        height: 45,
      }}
      onPress={() => onAppleButtonPress().then(() => console.log('Apple sign-in complete!'))}
    />
      <Button
        title="sign in"
        
      />
      <Button
        onPress={async () => {}}
        title="Sign out"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text>auth testing</Text>
    </View>
  );
}

AppRegistry.registerComponent('testing', () => App);