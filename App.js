import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native';
import { ThemeProvider } from './context/ThemeContext';
import SplashScreen from './components/SplashScreen';
import HomeScreen from './components/HomeScreen';
import SearchScreen from './components/SearchScreen';
import RemindersScreen from './components/RemindersScreen';
import CreateLabelScreen from './components/CreateLabelScreen';
import ArchiveScreen from './components/ArchiveScreen';
import TrashScreen from './components/TrashScreen';
import Sidebar from './components/Sidebar';
import SettingsScreen from './components/SettingsScreen';
import CreateNoteScreen from './components/CreateNoteScreen';
import CreateChecklistScreen from './components/CreateChecklistScreen';
import DrawingScreen from './components/DrawingScreen';
import NoteDetailScreen from './components/NoteDetailScreen';

const Stack = createNativeStackNavigator();

const App = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(false);

    const toggleSidebar = () => {
        setSidebarVisible(prev => !prev);
    };

    return (
        <ThemeProvider>
            <NavigationContainer>
                <View style={{ flex: 1 }}>
                    <Stack.Navigator 
                        initialRouteName="Splash"
                        screenOptions={{ headerShown: false }}
                    >
                        <Stack.Screen name="Splash" component={SplashScreen} />
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Search" component={SearchScreen} />
                        <Stack.Screen name="Reminders">
                            {props => (
                                <>
                                    <RemindersScreen {...props} toggleSidebar={toggleSidebar} />
                                    <Sidebar 
                                        isVisible={isSidebarVisible} 
                                        toggleSidebar={toggleSidebar} 
                                        navigation={props.navigation} 
                                    />
                                </>
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="CreateLabel" component={CreateLabelScreen} />
                        <Stack.Screen name="Archive">
                            {props => (
                                <>
                                    <ArchiveScreen {...props} toggleSidebar={toggleSidebar} />
                                    <Sidebar 
                                        isVisible={isSidebarVisible} 
                                        toggleSidebar={toggleSidebar} 
                                        navigation={props.navigation} 
                                    />
                                </>
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Trash">
                            {props => (
                                <>
                                    <TrashScreen {...props} toggleSidebar={toggleSidebar} />
                                    <Sidebar 
                                        isVisible={isSidebarVisible} 
                                        toggleSidebar={toggleSidebar} 
                                        navigation={props.navigation} 
                                    />
                                </>
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Settings">
                            {props => (
                                <>
                                    <SettingsScreen {...props} toggleSidebar={toggleSidebar} />
                                    <Sidebar 
                                        isVisible={isSidebarVisible} 
                                        toggleSidebar={toggleSidebar} 
                                        navigation={props.navigation} 
                                    />
                                </>
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="CreateNote" component={CreateNoteScreen} />
                        <Stack.Screen name="CreateChecklist" component={CreateChecklistScreen} />
                        <Stack.Screen name="Drawing" component={DrawingScreen} />
                        <Stack.Screen name="NoteDetailScreen" component={NoteDetailScreen} />
                    </Stack.Navigator>
                </View>
            </NavigationContainer>
        </ThemeProvider>
    );
};

export default App;