import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import database from '@react-native-firebase/database';

export default function ListScreen({navigation}) {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    const onValueChange = database()
      .ref('teacher')
      .on('value', (querySnapshot) => {
        const msg = [];

        querySnapshot.forEach((documentSnapshot) => {
          msg.push({
            key: documentSnapshot.key,
            // _id: documentSnapshot.val()._id,
            // text: documentSnapshot.val().text,
            // createdAt: documentSnapshot.val().createdAt,
            user: documentSnapshot.val().user,
            isReply: documentSnapshot.val().isReply,
            // ...documentSnapshot.val(),
          });
        });
        // let ArrayOfMessageObject = Object.values(msg);
        // console.log(querySnapshot);
        setMsg(msg);
        // console.log(msg);
        setLoading(false);
        // console.log(ArrayOfMessageObject);
      });

    // Unsubscribe from events when no longer in use
    return () => {
      database().ref('/teacher/').off('value', onValueChange);
    };
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <SafeAreaView>
      <Header navigation={navigation} title="Danh sách tin nhắn" />
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={false}
      />
      <FlatList
        style={{marginTop: 10}}
        data={msg}
        keyExtractor={(item) => item.key}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                database().ref(`/teacher/${item.key}`).update({isReply: true});
                console.log(item);
                navigation.navigate('TeacherChat', {
                  key: item.key,
                  user: item.user,
                });
              }}
              style={[
                {
                  height: 60,
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 5,
                  marginBottom: 5,
                  borderColor: '#68C2E8',
                  borderWidth: 1,
                },
                item.isReply ? null : styles.item,
              ]}>
              <Text style={{fontSize: 17}}>{item.user.name}</Text>
              {/* <Text>{item.text}</Text> */}
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#68C2E8',
  },
});
