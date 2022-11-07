
 import React from 'react';
 import {SafeAreaView, StyleSheet } from 'react-native';
 import SignInScreen from './src/screens/SignInScreen';
 import RegisterScreen from './src/screens/RegisterScreen';
 
 const App = () => {
   return (
     <SafeAreaView style={styles.root}>
       <SignInScreen />
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   root: {
     flex: 1,
     backgroundColor: '#3d3d3d'
   },
 });
 
 export default App;
