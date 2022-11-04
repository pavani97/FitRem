import { createStackNavigator } from "react-navigation-stack";
import EditScreen from "./src/screens/EditScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { createAppContainer } from "react-navigation";
import TimerScreen from "./src/screens/TimerScreen";

const RootStack = createStackNavigator({
  FitnessRemainder: {
    screen: WelcomeScreen,
  },
  SetRemainder: {
    screen: TimerScreen,
  },
  Edit: {
    screen: EditScreen,
  },
});
const App = createAppContainer(RootStack);
export default App;
