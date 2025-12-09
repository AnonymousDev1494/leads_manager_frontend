import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';
import Contacts from 'react-native-contacts';

const API_URL = 'https://leads-manager-backend.onrender.com/incoming-call'; // Update with your backend URL

const App = () => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [status, setStatus] = useState('Ready to start monitoring');
  const callDetector = useRef(null);

  useEffect(() => {
    checkInitialPermissions();
    return () => {
      stopMonitoring();
    };
  }, []);

  const checkInitialPermissions = async () => {
    const hasPermissions = await checkPermissions();
    if (hasPermissions) {
      setStatus('Ready to start monitoring');
    } else {
      setStatus('Permissions needed - Click Start');
    }
  };

  const checkPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const phoneState = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        );
        const contacts = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );

        return phoneState && contacts;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return false;
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        ]);

        const allGranted = Object.values(granted).every(
          status => status === PermissionsAndroid.RESULTS.GRANTED,
        );

        if (allGranted) {
          Alert.alert('Success', 'Permissions granted');
          startMonitoring();
        } else {
          Alert.alert('Error', 'Permissions denied');
          setStatus('Permissions needed to monitor calls');
        }
      } catch (err) {
        console.warn(err);
        Alert.alert('Error', 'Failed to request permissions');
      }
    }
  };

  const isNumberInContacts = async phoneNumber => {
    try {
      const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
      const contacts = await Contacts.getContactsByPhoneNumber(cleanNumber);
      return contacts.length > 0;
    } catch (err) {
      console.warn('Error checking contacts:', err);
      return false;
    }
  };

  const sendToBackend = async phoneNumber => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phoneNumber,
        }),
      });

      if (response.ok) {
        console.log('Successfully sent phone number to backend');
      } else {
        console.error('Backend returned error:', response.status);
      }
    } catch (error) {
      console.error('Failed to send to backend:', error.message);
    }
  };

  const handleIncomingCall = async phoneNumber => {
    if (!phoneNumber) {
      return;
    }

    // Check if number is in contacts
    const inContacts = await isNumberInContacts(phoneNumber);
    if (inContacts) {
      console.log(`Number ${phoneNumber} is in contacts, skipping`);
      return;
    }

    // Clean phone number
    const cleanNumber = phoneNumber.replace(/[^0-9]/g, '');
    console.log('Unknown number detected:', cleanNumber);

    // Send to Flask backend
    await sendToBackend(cleanNumber);
  };

  const startMonitoring = async () => {
    const hasPermissions = await checkPermissions();
    if (!hasPermissions) {
      await requestPermissions();
      return;
    }

    try {
      callDetector.current = new CallDetectorManager(
        (event, phoneNumber) => {
          console.log('Call event:', event, phoneNumber);
          if (event === 'IncomingCallReceived' || event === 'Connected') {
            handleIncomingCall(phoneNumber);
          }
        },
        true, // readPhoneNumber - set to true to get phone numbers
        () => {
          console.log('Call detection permission denied');
        },
      );

      setIsMonitoring(true);
      setStatus('Monitoring active - Waiting for calls...');
      Alert.alert('Success', 'Call monitoring started');
    } catch (error) {
      console.error('Error starting call monitoring:', error);
      Alert.alert('Error', 'Failed to start monitoring');
      setStatus('Error starting monitoring');
    }
  };

  const stopMonitoring = () => {
    if (callDetector.current) {
      callDetector.current.dispose();
      callDetector.current = null;
    }
    setIsMonitoring(false);
    setStatus('Monitoring stopped');
  };

  const handleStart = () => {
    if (isMonitoring) {
      Alert.alert('Info', 'Monitoring is already active');
      return;
    }
    startMonitoring();
  };

  const handleStop = () => {
    if (!isMonitoring) {
      Alert.alert('Info', 'Monitoring is not active');
      return;
    }
    stopMonitoring();
    Alert.alert('Success', 'Call monitoring stopped');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call Monitor</Text>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Start Monitoring"
          onPress={handleStart}
          disabled={isMonitoring}
        />
        <View style={styles.buttonSpacing} />
        <Button
          title="Stop Monitoring"
          onPress={handleStop}
          disabled={!isMonitoring}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  status: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  buttonSpacing: {
    height: 16,
  },
});

export default App;

