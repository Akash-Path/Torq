import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from './style';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../res/colors';
import SuperText from '../../components/SuperText';
import {hp, wp} from '../../res/constants';
import {SafeAreaView} from 'react-native-safe-area-context';
import Spacer from '../../components/Spacer';
import {images} from '../../res/images';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {global} from '../../res/global';
import {forgotPassword} from '../../api/authApi';

const ForgotPassword = props => {
  const [email, setEmail] = useState('');

  const [loading, setLoding] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoding(true);
      const data = {
        email,
      };
      console.log(data);
      const response = await forgotPassword(data);
      if (response === 404) {
        console.log('error in request reset password take some actions here!');
        Alert.alert('Internal server error!');
        setLoding(false);
      } else {
        console.log(response);
        console.log('data is : ', response?.data);
        Alert.alert('Email has been sent! Please Check');
        props.navigation.navigate('NewPassword', {email});
        setLoding(false);
      }
    } catch (error) {
      console.log('error is in request reset password : ', error);
      setLoding(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.GRADIENT1, colors.GRADIENT2]}
        style={styles.gradient}
        start={{x: 0, y: 0.4}}
        end={{x: 1.6, y: 0}}>
        {!isIphoneX() && <Spacer space={wp(2)} />}
        <SafeAreaView
          style={[
            global.row,
            {alignItems: 'center', justifyContent: 'space-between'},
          ]}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{width: wp(14), alignItems: 'center'}}>
            <Image source={images.back} />
          </TouchableOpacity>
          <SuperText
            value="Forgot Password"
            medium
            color={colors.WHITE}
            size={wp(5)}
          />
          <Spacer row={wp(7)} />
        </SafeAreaView>
        <Spacer space={isIphoneX() ? wp(2) : wp(5)} />
      </LinearGradient>

      <KeyboardAwareScrollView
        contentContainerStyle={{flex: 1}}
        resetScrollToCoords={{x: 0, y: 0}}
        style={styles.subView}>
        <View style={{alignItems: 'center'}}>
          <Spacer space={wp(2)} />
          <Image source={images.forgotPassImg} />
          <Spacer space={wp(1)} />
          <SuperText
            value={`Please enter your email to receive a link,\nto create new password via email.`}
            medium
            style={{textAlign: 'center'}}
            color={colors.GRAY3}
            size={hp(1.6)}
          />
        </View>
        <Spacer space={wp(2)} />
        <Input
          label="Email"
          placeholder="Enter Email"
          icon={images.email}
          stateHandler={setEmail}
        />
        <Spacer space={hp(2)} />
        {loading ? (
          <ActivityIndicator color={colors.GRADIENT1} size={'large'} />
        ) : (
          <Button
            onPress={() => {
              handleForgotPassword();
            }}
            label="Reset Password"
          />
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForgotPassword;
