import { StyleSheet, Text, View, } from 'react-native'
import React from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'


const Maps = () => {
  return (
    <View className='flex-1'>
      <MapView
      style={styles.map}
      initialRegion ={{
        latitude: 32.3915108528629, 
        longitude: 35.174316743020135, 
        latitudeDelta: 1.0, 
        longitudeDelta: 1.0,
      }}
      >
      <Marker
        coordinate={{ latitude: 32.6808559214761,  longitude: 35.376200142328955 }}
        title={"Fitness body gym"}
        description={"Medium-sized gym, but contains diverse exercise machines."}
      >
        
      </Marker>
      <Marker
        coordinate={{ latitude: 32.815560679406246,  longitude: 34.99766059916506 }}
        title={"BOLIK'S GYM"}
        description={"An old school gym that contains plenty of sections."}
      >
        
      </Marker>
      <Marker
        coordinate={{ latitude: 32.704178084619784,  longitude:  35.31941777952287 }}
        title={"Profit gym"}
        description={"A professional gym that contains a vivid style."}
      >

      </Marker>
      <Marker
        coordinate={{ latitude: 32.08579962608895 ,  longitude:  34.7686742207894 }}
        title={"Gordon Gym"}
        description={"Located on the Gordon Beach with an aesthetic view."}
      >

      </Marker>
      <Marker
        coordinate={{ latitude: 32.472371640096426 ,  longitude:  34.94770252821278 }}
        title={"Lions Fitness"}
        description={"A fitness studio that can build workout programs."}
      >

      </Marker>
      <Marker
        coordinate={{ latitude: 32.52655297797216 ,  longitude:  35.15746436736289 }}
        title={"Sparta Gym+"}
        description={"A center-town gym that is accessible."}
      >

      </Marker>
      <Marker
        coordinate={{ latitude: 32.848598950433136 ,  longitude:  35.17800400582924 }}
        title={"Muscle factory gym"}
        description={"A large gym that can accommodate large number of people."}
      >
      </Marker>
      </MapView>
    </View>
  )
}

export default Maps

const styles = StyleSheet.create({
  map:{
    width:'100%',
    height:'100%',
  }
})