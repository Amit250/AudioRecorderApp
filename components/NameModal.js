import {
  View,
  Text,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  TextInput,
} from 'react-native'
import React, { useState } from 'react'

export default function ModalComponent({
  setModalVisibility,
  name,
  placeholder,
  setName,
  createNewRecording,
}) {
  const { height, width } = useWindowDimensions()

  return (
    <Modal animationType='fade' transparent={true} visible={true}>
      <TouchableOpacity
        // onPress={() => setModalVisibility(false)}
        style={styles.modalBackDrop}
        activeOpacity={1}
      >
        <View
          className='bg-white  mx-4 rounded-2xl py-4 px-4'
          style={{
            width: width * 0.8,
            height: height * 0.19,
            marginTop: height * 0.35,
            marginLeft: width * 0.1,
          }}
        >
          <TextInput
            placeholder={placeholder}
            value={name}
            onChangeText={(value) => setName(value)}
            className='py-1 px-2 border rounded-3xl border-gray-100 bg-gray-50 mt-4'
          />
          {name.length < 1 && (
            <Text className='text-xs text-center text-red-500 py-2'>
              Recording Name can't be empty
            </Text>
          )}
          <Pressable
            onPress={() => {
              if (name.length > 0) {
                setModalVisibility(false)
                setName('')
                createNewRecording()
              }
            }}
          >
            <Text
              className={`text-right  pr-5 text-blue-500 ${
                name.length < 1 ? 'pt-0' : 'pt-8'
              }`}
            >
              OK
            </Text>
          </Pressable>
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
