import {
  View,
  Text,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
} from 'react-native'
import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import Share from 'react-native-share'

export default function MoreOptionModal({
  hideModal,
  name,
  rename,
  encodedAudio,
  deleteRecording,
}) {
  const { height, width } = useWindowDimensions()
  const { AudioModule } = NativeModules

  const shareAudioFile = async () => {
    try {
      const options = {
        title: name,
        url: 'data:audio/mpeg;base64,' + encodedAudio,
        type: 'mp3',
      }
      await Share.open(options)
    } catch (error) {
      console.log('Error sharing audio file:', error.message)
    }
  }

  return (
    <Modal animationType='fade' transparent={true} visible={true}>
      <TouchableOpacity
        onPress={hideModal}
        style={styles.modalBackDrop}
        activeOpacity={1}
      >
        <View
          className='bg-white  mx-4 rounded-2xl'
          style={{
            width: width * 0.8,
            height: height * 0.16,
            marginTop: height * 0.77,
            marginLeft: width * 0.1,
          }}
        >
          <Text className='text-center py-3 font-semibold text-lg'>
            {name}.mp3
          </Text>
          <View className='px-8 justify-between flex-row items-center'>
            <TouchableOpacity
              className='items-center space-y-1'
              onPress={() => {
                hideModal()
                deleteRecording()
              }}
            >
              <MaterialIcons name='delete-outline' size={24} color='#93c5fd' />
              <Text className='text-center text-xs opacity-50'>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='items-center space-y-1'
              onPress={() => {
                rename()
                hideModal()
              }}
            >
              <FontAwesome5 name='edit' size={21} color='#93c5fd' />
              <Text className='text-center text-xs opacity-50'>Rename</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className='items-center space-y-1'
              onPress={async () => {
                // const audioFilePath = await AudioModule.shareAudio(encodedAudio)
                shareAudioFile()
                hideModal()
              }}
            >
              <MaterialIcons name='ios-share' size={25} color='#93c5fd' />
              <Text className='text-center text-xs opacity-50'>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackDrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.10)',
  },
})
