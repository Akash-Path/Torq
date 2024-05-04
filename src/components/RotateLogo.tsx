import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, Image, View } from 'react-native';
import { wp } from '../res/constants';
import { useUser } from "../../context/UserContext";


const Rotate360 = ({ timeRemaining, isDashboard,isTimeSet }: any) => {
        const rotateValue = useRef(new Animated.Value(0)).current;

    const [isClockwise, setIsClockwise] = useState(true);
    const [borderColor, setBorderColor] = useState('green');
    const [stopRotation, setStopRotation] = useState(false);
    const [isSetTime, setisSetTime] = useState(isTimeSet);
    
    const { miningStart  } = useUser(); 


    useEffect(() => {
        
            if (timeRemaining < 0) {
                if (timeRemaining > -3600) {
                    setStopRotation(true)
                    setBorderColor('orange');
                }else{
                    
                        setIsClockwise(false)
                        setStopRotation(false)
                        setBorderColor('red');
                }
            } else {
            setIsClockwise(true)
            setBorderColor('green');
            }

    }, [timeRemaining])

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateValue, {
                toValue: 1,
                duration: 3000, // 1 minute
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [rotateValue]);

    const rotate = rotateValue.interpolate({
        inputRange: [0, 1],
        outputRange: stopRotation || !miningStart  ? ['0deg', '0deg'] : isClockwise ? ['0deg', '360deg'] : ['360deg', '0deg'],
    });

    return (
        <View style={[{
            borderWidth: 4,
            borderColor: borderColor,
            backgroundColor: 'white',
            width: wp(16), height: wp(16), borderRadius: wp(8)
        }, !isDashboard ? {
           position: 'absolute', bottom: '1%',
            left: '47%',
        } : {}
        ]
        }  >
            <Animated.Image
                source={require('../assets/icons/logo_withoutBorder.png')}
                style={{
                    transform: [{ rotate }],
                    resizeMode: 'contain',
                    width: wp(13), height: wp(13), borderRadius: wp(6.5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute', bottom: 0.5
                }}
            />
        </View>
    );
};

export default Rotate360;