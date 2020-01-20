import React from 'react'
import { Animated, Dimensions } from 'react-native'

class FadeIn extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            positionleft: new Animated.Value(Dimensions.get('window').width)
        }
    }

    componentDidMount() {
        Animated.spring(
            this.state.positionleft,
            {
                toValue: 0
            }
        ).start()
    }

    render() {
        return (
            <Animated.View style={{left: this.state.positionleft}}>
                {this.props.children}
            </Animated.View>
        )
    }
}

export default FadeIn
