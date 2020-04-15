/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './pages/home';
import Comment from './pages/comment';

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'rgba(0,0,0,0)',
  },
};

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const modalRoutes = [{name: 'Comment', component: Comment}];

const mainRoutes = [{name: 'Home', component: Home}];

function MainStackScreen() {
  return (
    <MainStack.Navigator headerMode={'none'}>
      {mainRoutes.map((v) => (
        <MainStack.Screen name={v.name} component={v.component} key={v.name} />
      ))}
    </MainStack.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer theme={CustomTheme}>
      <RootStack.Navigator
        mode={'modal'}
        headerMode={'none'}
        screenOptions={{}}>
        <RootStack.Screen name={'Main'} component={MainStackScreen} />
        {modalRoutes.map((v) => (
          <RootStack.Screen
            name={v.name}
            component={v.component}
            key={v.name}
          />
        ))}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
