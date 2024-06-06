import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { MotiView } from 'moti'
import { Easing } from 'react-native-reanimated'

export default function RecordAnimation() {
  return [...Array(3).keys()].map((index) => {
    return (
      <MotiView
        from={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 1, scale: 3 }}
        transition={{
          type: 'timing',
          duration: 1500,
          easing: Easing.out(Easing.ease),

          loop: true,
        }}
        key={index}
        style={[styles.fill, styles.dot]}
      />
    )
  })
}

const styles = StyleSheet.create({
  dot: {
    borderRadius: 100,
    backgroundColor: '#fecaca',
  },
  fill: {
    position: 'absolute',
    top: 15,
    bottom: 15,
    right: 15,
    left: 15,
  },
})
