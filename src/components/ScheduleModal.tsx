import { View, Text, Modal, Pressable, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';

interface ScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  data: Array<{id: number, day: string, time?: string, type?: string}>
}

function ScheduleModal({ visible, onClose, data }: ScheduleModalProps) {
console.log(data)
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <Pressable
          className="flex-1 bg-black/50 justify-center items-center min-h-full"
          onPress={onClose}
        >
          {/* Modal Content */}
          <Pressable
            className="bg-white rounded-2xl p-6 w-[100vw] h-[60vh] max-w-md my-8"
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View className="flex flex-row justify-between items-center mb-4">
              <Text className="text-2xl font-bold text-black">Schedules</Text>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={28} color="#000" />
              </TouchableOpacity>
            </View>

            {/* Schedule List */}
            <ScrollView className="h-full" showsVerticalScrollIndicator={false}>
              {data && data.length > 0 ? (
                <View className="gap-3">
                  {data.map((schedule) => (
                    <View
                      key={schedule.id}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                      <View className="flex flex-row justify-between items-center mb-2">
                        <Text className="text-lg font-semibold text-gray-800">
                          {schedule.day}
                        </Text>
                        {schedule.time && (
                          <Text className="text-base text-blue-600 font-medium">
                            {schedule.time}
                          </Text>
                        )}
                      </View>
                      {schedule.type && (
                        <View className="flex flex-row items-center gap-2">
                          <Text className="text-sm text-gray-600">{schedule.type}</Text>
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              ) : (
                <View className="bg-gray-100 p-6 rounded-lg items-center">
                  <Ionicons name="calendar-outline" size={48} color="#9CA3AF" />
                  <Text className="text-base text-gray-500 mt-3 text-center">
                    No schedules available
                  </Text>
                </View>
              )}
            </ScrollView>
          </Pressable>
        </Pressable>
      </ScrollView>
    </Modal>
  );
}

export default ScheduleModal;

