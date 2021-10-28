import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Alert, TextInput} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import styles from './styles';

export function Groups(props: any) {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = React.useState();

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    let all: any = [];
    firestore()
      .collection('groups')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          let data = {
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          };
          all.push(data);
        });
        setGroups(all);
      });
  };
  const create = () => {
    if (newGroup) {
      firestore()
        .collection('groups')
        .add({
          name: newGroup,
        })
        .then(() => {
          getGroups();
          Alert.alert(
            'Group created!',
            'Your Group has been  Successfully created!',
          );
        })
        .catch(error => {
          console.log(
            'Something went wrong with added post to firestore.',
            error,
          );
        });
    } else {
      Alert.alert('Enter Group ', 'Please enter a valid group name ');
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={val => setNewGroup(val)}
          value={newGroup}
          placeholder="Group Name"
        />
        <TouchableOpacity onPress={() => create()} style={styles.button}>
          <Text style={styles.buttonTitle}>Create Group</Text>
        </TouchableOpacity>
        {groups.map((item: any, index: any) => (
          <TouchableOpacity
            key={index}
            onPress={() => props.navigation.navigate('Chat', item)}
            style={styles.groups}>
            <Text style={styles.groupTitle}>{item.data.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default Groups;
