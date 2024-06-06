import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  NativeModules,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import RecordAnimation from './RecordAnimation'
import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated'
import { useRealm } from '@realm/react'
import { Recording } from '../models/Recording'
import uuid from 'react-native-uuid'
import NameModal from './NameModal'

export default function CreateRecording() {
  const [isShowRecord, setIsShowRecord] = useState(true)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [encodedAudio, setEncodedAudio] = useState('')
  const [name, setName] = useState('')
  const [modalVisibility, setModalVisibility] = useState(false)

  const realm = useRealm()
  const { AudioModule } = NativeModules

  const createNewRecording = () => {
    realm.write(() => {
      realm.create(Recording, {
        _id: uuid.v4(),
        name: name,
        length: parseInt(endTime - startTime),
        encodedAudio: encodedAudio,
      })
    })
  }

  const animatedRedCircle = useAnimatedStyle(() => ({
    width: withTiming(isShowRecord ? '95%' : '60%'),
    borderRadius: withTiming(isShowRecord ? 35 : 5),
  }))
  return (
    <View
      className='flex items-center justify-center py-2 rounded-t-3xl border-t border-gray-100'
      style={styles.shadow}
    >
      <View className='my-3'>
        {/* <Animated.View style={[styles.recordWave, animatedRecordWave]} /> */}
        {!isShowRecord && <RecordAnimation />}

        <TouchableOpacity
          className='flex items-center justify-center '
          onPress={async () => {
            setIsShowRecord(!isShowRecord)
            if (isShowRecord) {
              AudioModule.recordAudio()
              setStartTime(Date.now())
            } else {
              setEndTime(Date.now())
              const result = await AudioModule.stopRecording()
              setEncodedAudio(result)
              setModalVisibility(true)
            }
          }}
          style={styles.recordButton}
        >
          <Animated.View style={[styles.redCircle, animatedRedCircle]} />
        </TouchableOpacity>
      </View>

      <Text className='py-1 opacity-50'>{`${
        isShowRecord ? 'Record Audio' : 'Stop Recording'
      }`}</Text>

      {modalVisibility && (
        <NameModal
          setModalVisibility={setModalVisibility}
          name={name}
          placeholder={'Enter a Name'}
          setName={setName}
          createNewRecording={createNewRecording}
        />
      )}
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
  recordButton: {
    width: 60,
    height: 60,
    borderRadius: 60,

    borderWidth: 3,
    borderColor: '#e5e7eb',
    padding: '3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redCircle: {
    backgroundColor: 'red',
    aspectRatio: 1,
    borderRadius: 30,
  },
})
