import React from 'react';
import { AppRegistry, Button, Text, View } from 'react-native';
import { initializeApp } from '@react-native-firebase/app';
import { increment, setPersistenceEnabled, getDatabase, set, ref, child, get } from '@react-native-firebase/database';
function App() {
  // TODO: Replace the following with your app's Firebase project configuration
  // See: https://firebase.google.com/docs/web/learn-more#config-object
  const firebaseConfig = {
    // ...
    // The value of `databaseURL` depends on the location of the database
    databaseURL: "https://react-native-firebase-testing.firebaseio.com/",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  db.setPersistenceEnabled(true);

  async function runTest() {
    const incrementObj = increment(1)
    console.log('increment', incrementObj)
  }

  async function setPath() {
    try {
      await set(ref(db, 'hello_world/'), {
        username: "User",
        email: "User@email.com",
      });
      console.log('Data set successfully!');
    } catch (e) {
      console.error('Failed to set data:', e);
    }
  }

  async function getData(){
    const dbRef = ref(getDatabase());
    get(child(dbRef, `hello_world/`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }
  return (
    <View>
      <Text>text text text</Text>
      <Text>text text text</Text>
      <Text>text text text</Text>
      <Text>text text text</Text>
      <Button
        title="RUN TEST"
        onPress={async () => {
          try {
            runTest();
          } catch (e) {
            console.log('EEEE', e);
          }
        }}
      />

      <Button
        title="setPath"
        onPress={async () => {
          try {
            setPath();
          } catch (e) {
            console.log('EEEE', e);
          }
        }}
      />

      <Button
        title="getData"
        onPress={async () => {
          try {
            getData();
          } catch (e) {
            console.log('EEEE', e);
          }
        }}
      />
      {/* <Button
        title="CLEAR PERSISTENCE AND ENABLE NETWORK"
        onPress={async () => {
          try {
            runEnabled();
          } catch (e) {
            console.log('EEEE', e);
          }
        }}
      /> */}
    </View>
  );
}
AppRegistry.registerComponent('testing', () => App);
