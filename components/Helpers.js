import {AsyncStorage} from 'react-native';
import PushNotification from 'react-native-push-notification';

export async function scheduleNotification() {
  try{
      const value = await AsyncStorage.getItem('Notify');
      console.log(value);
      if(value !== null) {
          if (value === 'true') {
              PushNotification.localNotificationSchedule({
                  message: "Reminder to take survey", // (required)
                  repeatType: 'weekly', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`.
                  date: new Date(Date.now() + (604800 * 1000)) // in 60 secs
              });
          } else {
              PushNotification.cancelAllLocalNotifications();
          }
      }
  } catch(error) {
      console.log(error)
  }
}


export async function setNotify() {
  try {
      const value = await AsyncStorage.getItem('Notify');
      if (value === null) {
          await AsyncStorage.setItem('Notify', 'true');
      }
  } catch(error) {
      console.log("Error setting notification data" + error);
  }
}

