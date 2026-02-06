import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import Ionicons from '@react-native-vector-icons/ionicons';
import useSchedulesStore from '@/stores/useSchedulesStore';

interface BookModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
}

type FrequencyType = 'daily' | 'weekly' | 'monthly';

function BookModal({ title, visible, onClose }: BookModalProps) {
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showDayDropdown, setShowDayDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [frequency, setFrequency] = useState<FrequencyType>('daily');

  const addBooking = useSchedulesStore(state => state.addBooking);

  const availableDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const availableTimes = [
    '8:00 AM',
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
  ];

  const handleBook = () => {
    if (selectedDay && selectedTime) {
      addBooking({
        title: title,
        day: selectedDay,
        time: selectedTime,
        frequency: frequency,
      });

      setSelectedDay('');
      setSelectedTime('');
      setFrequency('daily');
      onClose();
    } else {
      alert('Please select both day and time');
    }
  };

  const PillButton = ({
    label,
    value,
    selected,
    onPress,
  }: {
    label: string;
    value: FrequencyType;
    selected: boolean;
    onPress: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`px-6 py-2.5 rounded-full`}
      style={{
        backgroundColor: selected ? '#DBFBC6' : '#f3f4f6',
      }}
      activeOpacity={0.7}
    >
      <Text className="text-base font-medium" style={{ color: '#000000' }}>
        {label.toLowerCase()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="w-[90%] max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <View className="flex-row justify-between items-center p-4 border-b border-gray-100">
            <Text className="text-xl font-bold text-gray-900">
              Schedule Pickup
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full bg-gray-100"
            >
              <Ionicons name="close" size={24} color="#4b5563" />
            </TouchableOpacity>
          </View>

          <ScrollView className="max-h-[70vh]">
            <View className="p-5">
              <View className="mb-4">
                <Text
                  className="text-sm font-medium mb-2"
                  style={{ color: '#000000' }}
                >
                  Day
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowDayDropdown(!showDayDropdown);
                    setShowTimeDropdown(false);
                  }}
                  className="border border-gray-200 rounded-lg p-3.5 flex-row justify-between items-center bg-gray-50"
                  activeOpacity={0.7}
                >
                  <Text
                    className={
                      selectedDay ? 'text-base' : 'text-gray-400 text-base'
                    }
                    style={selectedDay ? { color: '#000000' } : {}}
                  >
                    {selectedDay || 'Choose a day'}
                  </Text>
                  <Ionicons
                    name={showDayDropdown ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>

                {showDayDropdown && (
                  <View className="border border-gray-200 rounded-lg mt-2 bg-white shadow-md">
                    <ScrollView
                      style={{ maxHeight: 224 }}
                      keyboardShouldPersistTaps="handled"
                      nestedScrollEnabled={true}
                    >
                      {availableDays.map((day, index) => (
                        <TouchableOpacity
                          key={`${day}-${index}`}
                          onPress={() => {
                            setSelectedDay(day);
                            setShowDayDropdown(false);
                          }}
                          className="p-3.5 border-b border-gray-100"
                          activeOpacity={0.7}
                        >
                          <Text
                            className={
                              selectedDay === day
                                ? 'font-semibold text-base'
                                : 'text-base'
                            }
                            style={{ color: '#000000' }}
                          >
                            {day}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              <View className="mb-4">
                <Text
                  className="text-sm font-medium mb-3"
                  style={{ color: '#000000' }}
                >
                  Choose Routine
                </Text>
                <View className="flex-row items-center gap-2 flex-wrap">
                  <PillButton
                    label="Daily"
                    value="daily"
                    selected={frequency === 'daily'}
                    onPress={() => setFrequency('daily')}
                  />
                  <PillButton
                    label="Weekly"
                    value="weekly"
                    selected={frequency === 'weekly'}
                    onPress={() => setFrequency('weekly')}
                  />
                  <PillButton
                    label="Monthly"
                    value="monthly"
                    selected={frequency === 'monthly'}
                    onPress={() => setFrequency('monthly')}
                  />
                </View>
              </View>

              <View className="mb-4">
                <Text
                  className="text-sm font-medium mb-2"
                  style={{ color: '#000000' }}
                >
                  Time
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowTimeDropdown(!showTimeDropdown);
                    setShowDayDropdown(false);
                  }}
                  className="border border-gray-200 rounded-lg p-3.5 flex-row justify-between items-center bg-gray-50"
                  activeOpacity={0.7}
                >
                  <Text
                    className={
                      selectedTime ? 'text-base' : 'text-gray-400 text-base'
                    }
                    style={selectedTime ? { color: '#000000' } : {}}
                  >
                    {selectedTime || 'Choose a time'}
                  </Text>
                  <Ionicons
                    name={showTimeDropdown ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#6b7280"
                  />
                </TouchableOpacity>

                {showTimeDropdown && (
                  <View className="border border-gray-200 rounded-lg mt-2 bg-white shadow-md">
                    <ScrollView
                      style={{ maxHeight: 224 }}
                      keyboardShouldPersistTaps="handled"
                      nestedScrollEnabled={true}
                    >
                      {availableTimes.map((time, index) => (
                        <TouchableOpacity
                          key={`${time}-${index}`}
                          onPress={() => {
                            setSelectedTime(time);
                            setShowTimeDropdown(false);
                          }}
                          className="p-3.5 border-b border-gray-100"
                          activeOpacity={0.7}
                        >
                          <Text
                            className={
                              selectedTime === time
                                ? 'font-semibold text-base'
                                : 'text-base'
                            }
                            style={{ color: '#000000' }}
                          >
                            {time}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>
          </ScrollView>

          <View className="p-4 border-t border-gray-100 flex-row justify-end gap-3">
            <Pressable
              onPress={onClose}
              className="py-2.5 px-5 rounded-lg bg-gray-100"
            >
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </Pressable>
            <TouchableOpacity
              onPress={handleBook}
              className="py-2.5 px-5 rounded-lg bg-green-600"
              activeOpacity={0.8}
            >
              <Text className="text-white font-medium">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default BookModal;
