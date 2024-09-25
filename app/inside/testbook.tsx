import React from 'react';
import { View, Image, StyleSheet,Text } from 'react-native';
import { FontAwesome ,AntDesign} from '@expo/vector-icons';

const LocalImageExample = () => {
  return (
    <View style={styles.container}  className="flex-1 items-center justify-center bg-black">
      <Image
        source={{ uri: 'https://th.bing.com/th/id/OIP.82X8V1KaJYhaBLorrVMyzAHaE8?w=300&h=201&c=7&r=0&o=5&dpr=1.3&pid=1.7'}} // Local image path
        style={styles.image}
      />
      <Text style={styles.drname} >Dr: hrmtprikaur</Text>
      <Text style={styles.para} >hello my clients rate me to good cause i give the very good service</Text>
      <View style={{flexDirection:'row',width:"50%",justifyContent:"space-between"}}>
        <View style={{justifyContent:'center', alignItems:'center'}}> <FontAwesome name="rocket" size={24} color="purple" /> FAST</View>
        <View style={{justifyContent:'center', alignItems:'center'}}><AntDesign name="rightcircle" size={24} color="black" />FORWARD</View>
      </View>
      <Text style={styles.big}>WHY SHOULD I ?</Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#f9f9f9',
  },
  image: {
    width: "100%",
    height: "40%",
    borderBottomLeftRadius:10,
    borderBottomRightRadius:20,
  },
  drname:{
    fontSize:40,
    fontFamily:'System',
    marginTop:20,
    fontWeight:200,
  },
  para:{
    maxWidth:300,
    marginBottom:20,
  },
  big:{
    fontSize:30,
    fontWeight:800,
    color:"grey",
    marginTop:20,
  }
});

export default LocalImageExample;
