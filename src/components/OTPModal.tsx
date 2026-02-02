import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  Pressable,
  Keyboard,
  Alert,
  InteractionManager,
} from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import auth from '@react-native-firebase/auth'; // Re-added Firebase

interface OTPModalProps {
  visible: boolean;
  onClose: () => void;
  phoneNumber: string;
  callingCode: string;
  onVerify: (userCredential: any) => void;
}

const OTPModal = ({
  visible,
  onClose,
  phoneNumber,
  callingCode,
  onVerify,
}: OTPModalProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [confirmation, setConfirmation] = useState<any>(null); // Firebase confirmation result
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // 1. Send OTP via Firebase on mount
  useEffect(() => {
    const sendOTP = async () => {
      if (visible && phoneNumber) {
        setIsLoading(true);
        try {
          const fullPhoneNumber = `+${callingCode}${phoneNumber}`;
          const confirmationResult = await auth().signInWithPhoneNumber(fullPhoneNumber);
          setConfirmation(confirmationResult);
        } catch (error: any) {
          Alert.alert('Error', error.message || 'Failed to send OTP.');
          onClose();
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (visible) {
      setOtp(['', '', '', '', '', '']);
      setTimer(60);
      sendOTP();
      setTimeout(() => inputRefs.current[0]?.focus(), 500);
    }
  }, [visible, phoneNumber, callingCode]);

  // 2. Timer logic
  useEffect(() => {
    if (timer > 0 && visible) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer, visible]);

  const handleChangeText = (text: string, index: number) => {
    if (text && !/^\d+$/.test(text)) return;
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) inputRefs.current[index + 1]?.focus();

    if (newOtp.every(digit => digit !== '') && text) {
      Keyboard.dismiss();
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // 3. Firebase Verification Logic
  const handleVerify = async (otpCode?: string) => {
    const code = otpCode || otp.join('');
    if (code.length === 6 && confirmation) {
      setIsLoading(true);
      try {
        const userCredential = await confirmation.confirm(code);
        
        // SUCCESS: Close modal first to clean up UI
        onClose();
        
        // WAIT for Modal & Keyboard to clear before triggering navigation
        InteractionManager.runAfterInteractions(() => {
          onVerify(userCredential);
        });
        
      } catch (error: any) {
        Alert.alert('Error', 'Invalid verification code.');
        setOtp(['', '', '', '', '', '']);
        inputRefs.current[0]?.focus();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const fullPhoneNumber = `+${callingCode}${phoneNumber}`;
      const confirmationResult = await auth().signInWithPhoneNumber(fullPhoneNumber);
      setConfirmation(confirmationResult);
      setTimer(60);
      Alert.alert('Success', 'OTP resent.');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 justify-end bg-black/50" onPress={onClose}>
        <Pressable className="bg-white rounded-t-3xl p-6 min-h-[450px]" onPress={e => e.stopPropagation()}>
          <View className="items-center mb-8 mt-4">
            <Text className="text-2xl font-bold text-slate-900">Verify OTP</Text>
            <Text className="text-slate-500">+{callingCode} {phoneNumber}</Text>
          </View>

          <View className="flex-row justify-between mb-8 px-2">
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                className="w-12 h-14 border-2 rounded-xl text-center text-2xl font-semibold border-slate-300"
                value={digit}
                onChangeText={text => handleChangeText(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                editable={!isLoading}
              />
            ))}
          </View>

          <TouchableOpacity
            onPress={() => handleVerify()}
            disabled={isLoading || otp.some(d => d === '')}
            className={`w-full h-14 rounded-xl justify-center items-center ${isLoading ? 'bg-slate-300' : 'bg-blue-500'}`}
          >
            <Text className="text-white font-bold">{isLoading ? 'Verifying...' : 'Verify OTP'}</Text>
          </TouchableOpacity>

          <View className="items-center mt-6">
            {timer > 0 ? (
               <Text className="text-slate-500">Resend in {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend} disabled={isLoading}>
                <Text className="text-blue-500 font-semibold">Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default OTPModal;
