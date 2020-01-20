import React from 'react'
import { StyleSheet, View, PanResponder, Dimensions } from 'react-native'
import HelloWorld from './HelloWorld'
import { Easing } from 'react-native-reanimated'

class Test extends React.Component {

    
    constructor(props) {
        super(props)
        this.state = {
            topPosition: 0,
            leftPostion:0
        }

        var {height, width} = Dimensions.get('window');
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                let touches = evt.nativeEvent.touches;
                if (touches.length == 1) {
                    this.setState({
                        topPosition: touches[0].pageY - height/2,
                        leftPostion: touches[0].pageX - width/2
                    })
                }
            }
        })
    }

    render() {
        return (
            <View style={styles.main_container}>
                <View 
                    {...this.panResponder.panHandlers}
                    style={[styles.animated_view, {top: this.state.topPosition, left: this.state.leftPostion}] }>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    animated_view: {
        backgroundColor:  'red',
        height: 100,
        width: 100
    }
})

export default Test