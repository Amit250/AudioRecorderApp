import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { RecordingLists } from '../../components'

export default function SearchScreen({ navigation }) {
  const [searchText, setSearchText] = useState('')
  return (
    <View className='flex-1 bg-white  '>
      <View
        className='flex-row px-5 py-3 mb-5 items-center'
        style={styles.shadow}
      >
        <View className='flex-1 flex-row bg-gray-50 rounded-full  px-3 mr-4 items-center space-x-3'>
          <Feather name='search' size={18} color='lightgray' />
          <TextInput
            autoCapitalize='none'
            placeholder='search recording'
            className=' text-xs '
            value={searchText}
            onChangeText={(value) => setSearchText(value)}
          />
        </View>
        <Pressable onPress={() => navigation.goBack()}>
          <Text className='text-blue-400'>Cancel</Text>
        </Pressable>
      </View>

      <View className='px-3'>
        {searchText.length > 0 && (
          <RecordingLists sortMethod={false} searchText={searchText} />
        )}
      </View>
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
