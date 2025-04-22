import React, { useEffect } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import messaging from '@react-native-firebase/messaging';


messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Background message received:', remoteMessage);
});

function App() {

  // Subscribe to the topic on app start
  useEffect(() => {
    const subscribeToTopic = async () => {
      try {
        console.log('Requesting notification permissions...');
        const authStatus = await messaging().requestPermission();

        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          console.log('Notification permissions granted.');

          // Subscribe to the topic
          await messaging().subscribeToTopic('10039');
          console.log('Subscribed to topic: 10039');
        } else {
          console.log('Notification permissions denied.');
        }
      } catch (error) {
        console.error('Error subscribing to topic:', error);
      }
    };

    subscribeToTopic();
  }, []);

  // Listen for foreground messages
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground message received:', remoteMessage.data);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Subscribed to Topic: 10039</Text>
    </View>
  );
}


AppRegistry.registerComponent('testing', () => App);
