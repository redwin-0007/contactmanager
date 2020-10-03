// import navigation

import {createAppContainer} from 'react-navigation'
import{createStackNavigator} from 'react-navigation-stack'

// import screens
import Homescreen from './screens/Homescreen'
import addNewContactscreen from './screens/addNewContactscreen'
import EditContactscreen from './screens/EditContactscreen'
import ViewContactscreen from './screens/ViewContactscreen'




const MainNavigator = createStackNavigator(
  {
    Home:{screen:Homescreen},
    add:{screen:addNewContactscreen},
    Editscreen:{screen:EditContactscreen},
    ViewContactscreen:{screen:ViewContactscreen}
   

  },{
    defaultNavigationOption:{
      headerTintColor:'#fff',
      headerStyle:{
        backgroundColor:"#b83227"
      },
      headerTintStyle:{
        color:'#fff'
      }
    }
  }
)
const App= createAppContainer(MainNavigator)
export default App
