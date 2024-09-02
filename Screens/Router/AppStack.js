import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// Import the custom header
import Login from "../Authentiction/Login";
import Sign_up from "../Authentiction/Sign_up";
import Home from "../Home/Home";
import Forget_Password from "../Authentiction/Forget_password";
import Email_Sent from "../Authentiction/Email_Sent";
import News from "../News/News";
import Podcasts from "../Podcasting/Podcasts";
import Chat_page from "../Chat_room/Chat_page";
import MeditationTimer from "../Meditation/MeditationTimer";
import Meditation_Page from "../Meditation/Meditation_page";
import Jabam from "../Meditation/Jabam";
import AppHeader from "../../Components/AppHeader";

const Stack = createStackNavigator();

export default function AppStack() {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={Login}
            />
            <Stack.Screen
                name="Sign_up"
                options={{ headerShown: false }}
                component={Sign_up}
            />
            <Stack.Screen
                name="Home"
                options={{
                    headerTitle: '', 
                    header: (props) => <AppHeader {...props} /> // Use the custom header
                }}
                component={Home}
            />
            <Stack.Screen
                name="Forget_Password"
                options={{ headerShown: false }}
                component={Forget_Password}
            />
            <Stack.Screen
                name="Email_Sent"
                options={{ headerShown: false }}
                component={Email_Sent}
            />
            <Stack.Screen
                name="News"
                options={{
                    headerTitle: '', 
                    header: (props) => <AppHeader {...props} /> // Use the custom header
                }}
                component={News}
            />
            <Stack.Screen
                name="Podcast"
                options={{
                    headerTitle: '', 
                    header: (props) => <AppHeader {...props} /> // Use the custom header
                }}
                component={Podcasts}
            />
            <Stack.Screen
                name="Chat_room"
                options={{
                    headerTitle: '', 
                    header: (props) => <AppHeader {...props} /> // Use the custom header
                }}
                component={Chat_page}
            />
            <Stack.Screen
                name="MeditationTimer"
                options={{
                    headerTitle: '', 
                    header: (props) => <AppHeader {...props} /> // Use the custom header
                }}
                component={MeditationTimer}
            />
            <Stack.Screen
                name="Meditation_page"
                options={{
                    headerTitle: '', 
                    header: (props) => <AppHeader {...props} /> // Use the custom header
                }}
                component={Meditation_Page}
            />
            <Stack.Screen
                name="Jabam"
                options={{
                    headerTitle: '', 
                    header: (props) => <AppHeader {...props} /> // Use the custom header
                }}
                component={Jabam}
            />
        </Stack.Navigator>
    );
}
