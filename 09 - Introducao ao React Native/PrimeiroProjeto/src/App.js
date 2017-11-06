import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Image,
    ImageBackground,
    Button
} from 'react-native';

export default class App extends Component {

    renderCardView = () => {
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
                    source={require('./drawables/minha_imagem.jpg')}
                    style={{
                        width: '100%', height: 150,
                        justifyContent: 'flex-end'
                    }}
                    resizeMode="cover"
                >
                    <Text style={{
                        color: '#ffffff',
                        fontSize: 25,
                        margin: 16
                    }}>Este é meu Card View</Text>
                </ImageBackground>

                <View style={{ padding: 16 }} >
                    <Text style={{ color: '#00000088' }}>Novembro</Text>
                    <Text style={{ color: '#000000DD' }}>Este é o conteúdo{'\n'}do meu CardView</Text>
                </View>

                <View style={{ backgroundColor: '#00000033', height: 1 }} />

                <View style={{ padding: 16 }} >
                    <Button title="CLICK ME" onPress={() => alert('Clicou!')} />
                </View>

            </View>
        )
    }

    render() {
        return (
            <ScrollView>
                <Text style={{
                    padding: 20, fontSize: 30,
                    textAlign: 'center'
                }} >Meu primeiro App com React Native</Text>

                {this.renderCardView()}

                <Image source={require('./drawables/minha_imagem.jpg')}
                    style={{ width: '100%', height: 300 }} resizeMode="cover" />

                <Image source={{ uri: 'https://static.todamateria.com.br/upload/58/45/58455fd2206d1-o-que-e-paisagem.jpg' }}
                    style={{ width: '100%', height: 300 }} resizeMode="cover" />

            </ScrollView>
        );
    }
}