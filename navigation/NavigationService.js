import { NavigationActions } from 'react-navigation';

let _topLevelnavigatorRef;
let _loginNavigatorRef;
let _mainTabNavigatorRef;

function setNavigatorRef(navigator, navigatorRef) {
  switch (navigator){
    case 'topLevel':
      _topLevelnavigatorRef = navigatorRef;
    break;
    case 'login':
      _loginNavigatorRef = navigatorRef;
    break;
    case 'mainTab':
      _mainTabNavigatorRef = navigatorRef;
    break;
  }
}

function navigate(navigator, routeName, params) {
  let navRef;
  switch (navigator){
    case 'topLevel':
      navRef = _topLevelnavigatorRef;
    break;
    case 'login':
      navRef = _loginNavigatorRef;
    break;
    case 'mainTab':
      navRef = _mainTabNavigatorRef;
    break;
  }

  navRef.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

export const topLevelNavigator = {
  navigate: (routeName, params) => navigate('topLevel', routeName, params), 
  setNavigatorRef: navigatorRef => setNavigatorRef('topLevel', navigatorRef), 
};

export const loginNavigator = {
  navigate: (routeName, params) => navigate('login', routeName, params), 
  setNavigatorRef: navigatorRef => setNavigatorRef('login', navigatorRef), 
};

export const mainTabNavigator = {
  navigate: (routeName, params) => navigate('mainTab', routeName, params), 
  setNavigatorRef: navigatorRef => setNavigatorRef('mainTab', navigatorRef), 
};