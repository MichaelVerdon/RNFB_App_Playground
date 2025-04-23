if (platformSupportedModules.includes('firestore')) {
    const firestoreTests = require.context('../packages/firestore/e2e', true, /\.e2e\.js$/);
    const filteredTests = firestoreTests.keys().filter(test => {
    return test.includes('QuerySnapshot.e2e') || test.includes('DocumentSnapshot.e2e');
    });
    filteredTests.forEach(firestoreTests);
  }