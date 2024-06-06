import {
  View,
  Text,
  TouchableOpacity,
  NativeModules,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import { useRealm, useQuery } from '@realm/react'
import { Recording } from '../models/Recording'
import MoreOptionModal from './MoreOptionModal'
import NameModal from './NameModal'

export default function RecordingLists({ sortMethod, searchText }) {
  const { AudioModule } = NativeModules
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeAudio, setActiveAudio] = useState({})
  const [modalVisibility, setModalVisibility] = useState(false)
  const [renameVisibility, setRenameVisibility] = useState(false)
  const [name, setName] = useState('')

  const realm = useRealm()
  const recordings = useQuery(Recording)
  const filteredRecordings = realm
    .objects(Recording)
    .filtered('name CONTAINS[c] $0', searchText)

  const msToTime = (duration) => {
    var milliseconds = Math.floor((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    return hours + ':' + minutes + ':' + seconds
  }

  const updateRecording = () => {
    const toUpdate = realm
      .objects(Recording)
      .filtered('_id==$0', activeAudio._id)
    realm.write(() => {
      toUpdate[0].name = name
    })
  }

  const deleteRecording = () => {
    const toDelete = realm
      .objects(Recording)
      .filtered('_id==$0', activeAudio._id)

    Alert.alert('', `Do you want to delete ${activeAudio.name}.mp3 ?`, [
      {
        text: 'Delete',
        onPress: async () => {
          realm.write(() => {
            realm.delete(toDelete)
          })
        },
      },
      { text: 'Cancel', onPress: () => console.log('cancel Pressed') },
    ])
  }

  return (
    <View>
      <FlatList
        inverted={sortMethod == 'Newest'}
        showsVerticalScrollIndicator={false}
        data={searchText.length == 0 ? recordings : filteredRecordings}
        renderItem={({ item }) => {
          if (item != null) {
            return (
              <TouchableOpacity
                onLongPress={() => {
                  setModalVisibility(true)
                  setActiveAudio(item)
                }}
                className={`flex-row items-center space-x-2 my-2 mx-1 px-2 py-3  border bg-green-50  rounded-2xl ${
                  isPlaying && activeAudio._id === item._id
                    ? 'border-green-400'
                    : 'border-green-50'
                }`}
                style={styles.shadow}
                onPress={() => {
                  setActiveAudio(item)
                  setIsPlaying(!isPlaying)
                  isPlaying
                    ? AudioModule.stopPlaying()
                    : AudioModule.playAudio(item.encodedAudio)
                  setTimeout(() => {
                    setIsPlaying(false)
                  }, item.length)
                }}
              >
                <AntDesign
                  name={`${
                    isPlaying && activeAudio._id === item._id
                      ? 'pausecircleo'
                      : 'playcircleo'
                  }`}
                  size={24}
                  color='lightgreen'
                />
                <Text className={`flex-1 pl-1 `}>{item.name}</Text>
                <Text className='opacity-40 text-xs '>
                  {msToTime(item.length)}
                </Text>

                {modalVisibility && (
                  <MoreOptionModal
                    hideModal={() => setModalVisibility(false)}
                    name={activeAudio.name}
                  />
                )}

                {modalVisibility && (
                  <MoreOptionModal
                    hideModal={() => setModalVisibility(false)}
                    name={activeAudio.name}
                    rename={() => setRenameVisibility(true)}
                    deleteRecording={deleteRecording}
                    encodedAudio={activeAudio.encodedAudio}
                  />
                )}

                {renameVisibility && (
                  <NameModal
                    setModalVisibility={setRenameVisibility}
                    name={name}
                    placeholder={activeAudio.name}
                    setName={setName}
                    createNewRecording={updateRecording}
                  />
                )}
              </TouchableOpacity>
            )
          }
        }}
      />
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
    backgroundColor: '#f0fdf4',
  },
})
