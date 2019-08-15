import React from 'react';
import { Image } from 'react-native'
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

import getActiveChildNavigationOptions from '../utils/getActiveChildNavigationOptions'

import { theme } from '../constants'

import HomeScreen from '../screens/Home'
import MeetScreen from '../screens/Meet'
import InteractionsScreen from '../screens/Interactions'
import MessagesScreen from '../screens/Messages'
import ProfileScreen from '../screens/Profile'

import HomeIcon from '../assets/icons/home.png'
import HomeIconActive from '../assets/icons/home--active.png'
import SearchIcon from '../assets/icons/search.png'
import SearchIconActive from '../assets/icons/search--active.png'
import InteractionsIcon from '../assets/icons/interactions.png'
import InteractionsIconActive from '../assets/icons/interactions--active.png'
import MessagesIcon from '../assets/icons/messages.png'
import MessagesIconActive from '../assets/icons/messages--active.png'
import ProfileIcon from '../assets/icons/profile.png'
import ProfileIconActive from '../assets/icons/profile--active.png'

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        return <Image source={focused ? HomeIconActive : HomeIcon} />
      }
    }
  },
  Meet: {
    screen: MeetScreen,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        return <Image source={focused ? SearchIconActive : SearchIcon} />
      }
    }
  },
  Interactions: {
    screen: InteractionsScreen,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        return <Image source={focused ? InteractionsIconActive : InteractionsIcon} />
      }
    }
  },
  Messages: {
    screen: MessagesScreen,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        return <Image source={focused ? MessagesIconActive : MessagesIcon} />
      }
    }
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: {
      tabBarIcon: ({focused}) => {
        return <Image source={focused ? ProfileIconActive : ProfileIcon} />
      }
    }
  }
}, {
  tabBarOptions: {
    showLabel: false,
    style: {
        backgroundColor: theme.colors.primary,
        borderTopColor: 'transparent'
    }
  }
});

TabNavigator.navigationOptions = ({navigation, screenProps}) => {
  const childOptions = getActiveChildNavigationOptions(navigation, screenProps)
  return {
    title      : childOptions.title,
    headerLeft : childOptions.headerLeft,
    headerRight: childOptions.headerRight,
    header     : childOptions.header
  }
}

const StackNavigator = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 4,
        backgroundColor: theme.colors.primary,
        borderBottomColor: 'transparent',
        elevation: 0,
        textAlign: 'left'
      },
      headerTitleStyle: {
        fontSize: 36,
        fontFamily: 'CircularStd-Bold',
        color: '#fff',
        textAlign: 'left',
        flex: 1,
        marginLeft: theme.sizes.base * 2
      }
    }
  }
})

export default createAppContainer(StackNavigator);