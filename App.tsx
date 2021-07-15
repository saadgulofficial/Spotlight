import React from 'react'
import { LogBox } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MainStackNav } from './Src/Navigation'

const App = () => {
  return (
    <SafeAreaProvider>
      <MainStackNav />
    </SafeAreaProvider>
  )
}

export default App

{ LogBox.ignoreAllLogs() }