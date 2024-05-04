import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Spacer = ({ space, row }) => {
    return (
        <View style={{ marginVertical: space && space, marginHorizontal: row && row }} />
    )
}

export default Spacer