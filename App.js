import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import list from './.expo/navigator/list';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [data,setdata]= useState([]);
  const [titledata,settitledata]= useState(list);

  const getAPIData = async ()=>{
    const url="https://jsonplaceholder.typicode.com/posts";
    let result= await fetch(url);
    result= await result.json();
    setdata(result);
  }
  useEffect(()=>{
    getAPIData()
  },[])



  let handlePress=()=>{
    
    settitledata(titledata)
    console.log("pressed");
  }

  
  return (
    <NavigationContainer>
        <View style={styles.container}>
      <Text style={{fontSize:30}}>Fetch Data</Text>
      {
        data.length?
        <FlatList
        data={data}
        renderItem={({item})=><View>
                <Text>{item.id}</Text>
                <Text title="press me" onPress={handlePress}>{item.title}</Text>
        </View>}
        />
        :null
      }
      <StatusBar style="auto" />
    </View>
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
