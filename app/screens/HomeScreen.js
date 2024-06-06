import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import {
  RecordingLists,
  ModalComponent,
  CreateRecording,
} from '../../components'

export default function HomeScreen({ navigation }) {
  const [openModal, setOpenModal] = useState(false)
  const [sortMethod, setSortMethod] = useState('Oldest')

  return (
    <View className='flex-1 bg-white'>
      {/* Header  */}
      <View className=' flex-row py-3 px-4 ' style={styles.shadow}>
        <Text className='font-semibold text-lg flex-1'>Audio Recorder</Text>
        <TouchableOpacity
          className='px-4'
          onPress={() => navigation.navigate('Search')}
        >
          <Feather name='search' size={22} color='lightgreen' />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setOpenModal(true)}>
          <MaterialIcons name='sort' size={24} color='lightgreen' />
        </TouchableOpacity>
      </View>

      {openModal && (
        <ModalComponent
          hideModal={() => setOpenModal(false)}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
      )}

      {/* List of Audio recordings  */}
      <View className='flex-1 pt-6 pb-2 px-3 justify-start'>
        <RecordingLists sortMethod={sortMethod} searchText='' />
      </View>

      {/* Footer: Recording Button  */}
      <CreateRecording />
    </View>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    backgroundColor: 'white',
  },
})
