import {
  View,
  Text,
  useWindowDimensions,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native'
import React, { useState } from 'react'

export default function ModalComponent({
  hideModal,
  sortMethod,
  setSortMethod,
}) {
  const { height, width } = useWindowDimensions()

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
            height: height * 0.19,
            marginTop: height * 0.75,
            marginLeft: width * 0.1,
          }}
        >
          <Text className='font-semibold text-center pt-4 border-b border-gray-50 pb-2 w-full'>
            Sort by
          </Text>
          <View className='px-3'>
            <TouchableOpacity
              onPress={() => {
                setSortMethod('Newest')
                hideModal()
              }}
            >
              <Text
                className={`border-b border-gray-50 py-2  ${
                  sortMethod === 'Newest' && ' text-blue-300'
                }`}
              >
                Newest on top
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSortMethod('Oldest')
                hideModal()
              }}
            >
              <Text
                className={`py-2 ${
                  sortMethod === 'Oldest' && ' text-blue-300'
                }`}
              >
                Oldest on top
              </Text>
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
    backgroundColor: 'rgba(0,0,0,0.30)',
  },
})
