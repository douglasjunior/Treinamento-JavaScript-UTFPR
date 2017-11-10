import React, { Component } from 'react';
import {
    FlatList,
    View,
    Text,
    RefreshControl,
    ActivityIndicator,
} from 'react-native';

import axios from 'axios';

import PhotoCardView from '../components/PhotoCardView';

const URL = 'https://jsonplaceholder.typicode.com/photos';

export default class ExemploLista extends Component {

    state = {
        photos: [],
        refreshing: false,
        loadingMore: false,
    }

    componentDidMount() {
        this.requestPhotos();
    }

    renderItem = (record) => {
        const { item: photo } = record;
        return (
            <PhotoCardView photo={photo} />
        )
    }

    requestPhotos = (page = 1) => {
        this.setState({ refreshing: page === 1, loadingMore: page > 1 });

        axios.get(URL, {
            params: {
                _limit: 10,
                _page: page
            }
        }).then(response => {
            const { photos } = this.state;
            this.setState({
                photos: page === 1 ?
                    response.data :
                    photos.concat(response.data),
                page: page,
                refreshing: false,
                loadingMore: false,
            })
        }).catch(ex => {
            console.warn(ex);
            this.setState({
                refreshing: false,
                loadingMore: false,
            });
        })
    }

    onRefresh = () => {
        this.requestPhotos();
    }

    onLoadMore = () => {
        const { page, loadingMore } = this.state;
        
        if (loadingMore) return;

        this.requestPhotos(page + 1);
    }

    renderFooter = () => {
        const { loadingMore } = this.state;

        if (loadingMore) {
            return (
                <View style={{ padding: 4, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#f00" />
                </View>
            )
        }

        return (
            <Text style={{ padding: 8, textAlign: 'center' }}>Fim da lista.</Text>
        )
    }

    render() {
        // desestruturação (destructuring)
        const { photos, refreshing } = this.state;

        return (
            <FlatList
                data={photos}
                renderItem={this.renderItem}
                keyExtractor={photo => photo.id}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                    onRefresh={this.onRefresh}
                    colors={['#f00', '#0f0', '#00f']}
                />}
                onEndReached={this.onLoadMore}
                ListFooterComponent={this.renderFooter}
            />
        )
    }
}
