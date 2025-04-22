import React, { useEffect } from 'react';
import { AppRegistry, Button, Text, View } from 'react-native';
import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
const db = firestore();
// db.settings({ host: '10.0.2.2:8080', ssl: false, persistence: true });
function App() {
  async function runQuery() {
    console.log('INITIAL');
    const value = await db.collection('playground').add({ inDb: 'NO?????' });
    console.log('RETURNED', value);
  }
  useEffect(() => {
    const subscribe = db.collection('playground').onSnapshot(snap => {
      if (snap) {
        const results = [];
        snap.forEach(doc => {
          results.push(doc.data());
        });
        console.log('snap', results.length);
      }
    });
    return subscribe;
  }, []);
  return (
    <View>
      <Text>text text text</Text>
      <Text>text text text</Text>
      <Button
        title="Run Queryss"
        onPress={async () => {
          try {
            runQuery();
          } catch (e) {
            console.log('EEEE', e);
          }
        }}
      />
    </View>
  );
}
AppRegistry.registerComponent('testing', () => App);
