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
import {resetPassword} from '../../api/authApi';

const NewPassword = props => {
  const [secureTextEntry, setScureTextEntry] = useState(true);
  const [secureTextEntry2, setScureTextEntry2] = useState(true);

  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [code, setCode] = useState(0);

  const hadnleResetPassowrd = async () => {
    console.log('resset password function start');
    setLoading(true);
    if (password == confirmPassword) {
      console.log('true match');
      const data = {
        password,
        token: code,
        email: props.route.params.email,
      };
      console.log(data);
      const response = await resetPassword(data);
      if (response == 404) {
        console.log('error in ressetting password');
        setLoading(false);
        Alert.alert('Cannot reset password!',"Check your OTP and try again.");
      } else {
        console.log('response is : ', response.data);
        setLoading(false);
        Alert.alert('Password reset successfully!');
        props.navigation.navigate('Login');
      }
    } else {
      Alert.alert('Passowrd and Confirm Password does not match!');
      setLoading(false);
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
        <View style={{marginLeft: wp(5)}}>
          <Spacer space={wp(2)} />
          <SuperText
            value={`New Password`}
            semiBold
            color={colors.GRAY3}
            size={hp(1.8)}
          />
          <Spacer space={wp(1)} />
          <SuperText
            value={`Rest your password to recovery & login\nto your account.`}
            medium
            color={colors.GRAY3}
            size={hp(1.6)}
          />
          <Spacer space={wp(2)} />
        </View>
        <Input
          stateHandler={setPassword}
          onRightClick={() => {
            setScureTextEntry(!secureTextEntry);
          }}
          secureTextEntry={secureTextEntry}
          placeholder="New Password"
          rightIcon={secureTextEntry ? images.eyeHide : images.eyeOpen}
        />
        <Input
          stateHandler={setConfirmPassword}
          onRightClick={() => {
            setScureTextEntry2(!secureTextEntry2);
          }}
          secureTextEntry={secureTextEntry2}
          placeholder="Retype Password"
          rightIcon={secureTextEntry2 ? images.eyeHide : images.eyeOpen}
        />
        <Input stateHandler={setCode} placeholder="Verification code" />
        <Spacer space={hp(2)} />
        {/* <TouchableOpacity onPress={hadnleResetPassowrd}> */}
        {loading ? (
          <ActivityIndicator color={colors.GRADIENT1} size={'large'} />
        ) : (
          <Button label="Reset Password" onPress={hadnleResetPassowrd} />
        )}
        {/* </TouchableOpacity> */}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default NewPassword;
