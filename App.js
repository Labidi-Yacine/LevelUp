import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import QuestDetail from './src/screens/DetailsQuest';
import AddQuest from './src/screens/AddQuest';
import Parametre from './src/screens/Parametre';
import Profil from './src/screens/Profil';
import Login from './src/screens/Login';
import Inscription from './src/screens/Inscription';
import Competence from './src/screens/Competence'
import DetailsCompetence from './src/screens/DetailsCompetence';
import AddCompetence from './src/screens/AddCompetence';


const Stack = createNativeStackNavigator();

// Fonction pour charger les quêtes sauvegardées
const loadQuests = async () => {
  try {
      const quests = await AsyncStorage.getItem('quests');
      if (quests !== null) {
          setQuests(JSON.parse(quests));
      }
  } catch (error) {
      console.log("Error loading quests:", error);
  }
};

// Fonction pour charger les points d'expérience sauvegardés
const loadExperiencePoints = async () => {
  try {
      const experiencePoints = await AsyncStorage.getItem('experiencePoints');
      if (experiencePoints !== null) {
          setExperiencePoints(JSON.parse(experiencePoints));
      }
  } catch (error) {
      console.log("Error loading experience points:", error);
  }
};


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#173c63", 
          },
          headerTintColor: "#fff", 
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 24,
            
          },
          headerTitleAlign: "center",
        }}
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: "LOG IN"
          }}
        />
        <Stack.Screen
          name="Inscription"
          component={Inscription}
          options={{
            title: "REJOINS LES PREDATEURS"
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          // options={{ headerShown: false }}
        />


        <Stack.Screen
          name="QuestDetail"
          component={QuestDetail}
          options={ {title: "QUEST INFO"} }
        />
        <Stack.Screen
          name="AddQuest"
          component={AddQuest}
          options={{ title: 'Add Quest' }}
        />

        <Stack.Screen
          name="Parametre"
          component={Parametre}
          options={{ title: 'Reglages' }}
        />


        <Stack.Screen
          name="Competence"
          component={Competence}
          options={{ title: 'Compétencces' }}
        />


        <Stack.Screen
          name="AddCompetence"
          component={AddCompetence}
          options={{ title: 'Add Competence' }}
        />


        <Stack.Screen
          name="DetailsCompetence"
          component={DetailsCompetence}
          options={{ title: 'Competence INFOS' }}
        />


        <Stack.Screen
          name="Profil"
          component={Profil}
          options={{ title: 'Status' }}
        />

{/* { headerShown: false } */}


        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
