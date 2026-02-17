import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

const RootLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            title: 'Price Alert'
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
};

export default RootLayout;
