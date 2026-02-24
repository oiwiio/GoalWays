import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import { RootNavigator } from './navigation';  

export const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />  
      </NavigationContainer>
    </Provider>
  );
};