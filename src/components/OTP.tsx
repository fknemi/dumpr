import React, { useRef, useState } from 'react';
import { View, TextInput, TextInputProps } from 'react-native';

interface OTPInputProps extends TextInputProps {
  length?: number;
}

const OTP: React.FC<OTPInputProps> = ({ length = 6, ...props }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<TextInput[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input if a digit is entered
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View className="flex-row justify-between">
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => (inputRefs.current[index] = ref as TextInput)}
          className="w-10 h-12 border border-gray-300 rounded-lg text-center text-lg mx-1"
          maxLength={1}
          keyboardType="numeric"
          onChangeText={text => handleChangeText(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          value={digit}
          autoFocus={index === 0}
          {...props}
        />
      ))}
    </View>
  );
};

export default OTP;
