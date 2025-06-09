import React, { useEffect, useState } from 'react';
import { AppRegistry, Button, Text, View, TextInput, Alert } from 'react-native';

import firebase, { utils } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  async function onPhoneNumberSubmit() {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setVerificationId(confirmation.verificationId);
      Alert.alert('Verification code has been sent to your phone.');
    } catch (error) {
      console.error('Phone Sign-In failed:', error);
      Alert.alert('Error', error.message);
    }
  }

  async function onVerificationCodeSubmit() {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        verificationCode
      );
      await auth().signInWithCredential(credential);
      Alert.alert('Success', 'Phone authentication successful!');
    } catch (error) {
      console.error('Code verification failed:', error);
      Alert.alert('Error', error.message);
    }
  }

  return (
    <View style={{ padding: 20 }}>
      <Text>text text text</Text>
      <Text>text text text</Text>
      <Text>text text text</Text>
      <Text>text text text</Text>
      
      {/* Phone Authentication */}
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>Phone Authentication</Text>
        <TextInput
          placeholder="Phone number (e.g. +1234567890)"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            marginBottom: 10,
            borderRadius: 5
          }}
        />
        <Button
          title="Send Verification Code"
          onPress={onPhoneNumberSubmit}
          disabled={!phoneNumber}
        />

        {verificationId ? (
          <View style={{ marginTop: 20 }}>
            <TextInput
              placeholder="Enter verification code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
              style={{
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                marginBottom: 10,
                borderRadius: 5
              }}
            />
            <Button
              title="Verify Code"
              onPress={onVerificationCodeSubmit}
              disabled={!verificationCode}
            />
          </View>
        ) : null}
      </View>

      <Button
        title="Sign out"
        onPress={async () => {
          try {
            await auth().signOut();
            Alert.alert('Success', 'Signed out successfully!');
          } catch (error) {
            console.error('Sign out failed:', error);
            Alert.alert('Error', error.message);
          }
        }}
        color="#841584"
      />
      <Text>auth testing</Text>
    </View>
  );
}

AppRegistry.registerComponent('testing', () => App);
