import React from 'react';
import {
    View, ImageBackground,
    Text, Button, Linking,
} from 'react-native';

export default (props) => {
    const { photo } = props;
    return (
        <View style={{
            margin: 8, backgroundColor: '#ffffff', elevation: 2,
            shadowOffset: {
                width: 2,
                height: 2
            },
            borderRadius: 2, overflow: 'hidden'
        }}>
            <ImageBackground
                source={{ uri: photo.url }}
                style={{
                    width: '100%', height: 150,
                    justifyContent: 'flex-end'
                }}
                resizeMode="cover"
            >
                <Text numberOfLines={1} style={{
                    color: '#ffffff',
                    fontSize: 25,
                    margin: 16
                }}>{photo.title}</Text>
            </ImageBackground>

            <View style={{ padding: 16 }} >
                <Text numberOfLines={1} style={{ color: '#00000088' }}># {photo.id}</Text>
                <Text style={{ color: '#000000DD' }}>{photo.title}</Text>
            </View>

            <View style={{ backgroundColor: '#00000033', height: 1 }} />

            <View style={{ padding: 16 }} >
                <Button title="ABRIR FOTO"
                    onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.hyperkani.airhockey')} />
            </View>

        </View>
    )

}