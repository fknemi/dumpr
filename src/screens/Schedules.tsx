import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@react-native-vector-icons/ionicons';
import useSchedulesStore from '@/stores/useSchedulesStore';

function Schedules() {
  const bookings = useSchedulesStore(state => state.bookings);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          gap: 16,
        }}
      >
        <Text className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
          My Schedules
        </Text>

        {bookings.length === 0 ? (
          <View className="flex-1 justify-center items-center mt-20">
            <Ionicons name="calendar-outline" size={64} color="#d1d5db" />
            <Text className="text-gray-400 text-lg mt-4">No schedules yet</Text>
            <Text className="text-gray-400 text-sm mt-1">
              Book a pickup to get started
            </Text>
          </View>
        ) : (
          <View className="flex-row flex-wrap gap-4">
            {bookings.map(booking => (
              <View
                key={booking.id}
                className="w-[47%] rounded-2xl p-4 relative overflow-hidden"
                style={{
                  backgroundColor: '#f9fafb',
                }}
              >
                <View
                  className="absolute inset-0"
                  style={{
                    opacity: 0.15,
                  }}
                >
                  {[...Array(8)].map((_, rowIndex) => (
                    <View
                      key={rowIndex}
                      className="flex-row justify-around"
                      style={{ marginVertical: 8 }}
                    >
                      {[...Array(4)].map((_, colIndex) => (
                        <View
                          key={colIndex}
                          className="rounded-full"
                          style={{
                            width: 4,
                            height: 4,
                            backgroundColor: '#9ca3af',
                          }}
                        />
                      ))}
                    </View>
                  ))}
                </View>

                <View className="relative z-10">
                  <View className="flex-row items-center mb-3">
                    <Ionicons name="calendar" size={20} color="#111111" />
                    <Text className="text-md font-semibold ml-2">
                      {booking.day}
                    </Text>
                  </View>

                  <View className="flex-row items-center mb-3">
                    <Ionicons name="leaf" size={20} color="#19C971" />
                    <Text className="text-md font-medium capitalize ml-2">
                      {booking.frequency}
                    </Text>
                  </View>

                  <View className="flex-row items-center">
                    <Ionicons name="time" size={20} color="#3B44EF" />
                    <Text className="text-md font-medium ml-2">
                      {booking.time}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default Schedules;
