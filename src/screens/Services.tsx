import {
  Text,
  View,
  StatusBarStyle,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';

import { useState } from 'react';
import { safeareaview } from 'react-native-safe-area-context';
import CategoryHeading from '@/components/CategoryHeading.tsx';
import FeatureCard from '@/components/FeatureCard.tsx';
import Ionicons from '@react-native-vector-icons/ionicons';
import ScheduleModal from '@/components/ScheduleModal';
function Services() {
  const features = [
    {
      type: 'schedule',
      title: 'Weekly Garbage Collection',
      subText: 'schedule date & time for pickup',
      btnText: 'View Schedules',
      iconPath: require('../../assets/calendar-clock.png'),
      gradientPath: require('../../assets/green-gradient-blob.png'),
      color: 'rgba(74, 230, 74, 0.3)',
            data: [
              { id: 1, day: 'Monday', time: '8:00 AM', type: 'General Waste' },
              { id: 2, day: 'Tuesday', time: '9:00 AM', type: 'Recyclables' },
              { id: 3, day: 'Wednesday', time: '10:00 AM', type: 'Organic Waste' },
              { id: 4, day: 'Thursday', time: '8:00 AM', type: 'General Waste' },
              { id: 5, day: 'Friday', time: '2:00 PM', type: 'Recyclables' },
              { id: 6, day: 'Saturday', time: '10:00 AM', type: 'Organic Waste' },
              { id: 7, day: 'Sunday', time: '9:00 AM', type: 'General Waste' },
            ],
    },
    {
      type: 'book',
      title: 'Electric Waste Pickup',
      subText: 'get rid of your electric waste',
      btnText: 'Book a Pickup',
      iconPath: require('../../assets/ev-truck.png'),
      gradientPath: require('../../assets/blue-gradient-blob.png'),
      color: 'rgba(74, 124, 230, 0.3)',

    },
    {
      type: 'book',
      title: 'Call Pickup',
      subText: 'get rid of your trash at any time 24/7',
      btnText: 'Get It Now',
      iconPath: require('../../assets/truck.png'),
      gradientPath: require('../../assets/purple-gradient-blob.png'),
      color: 'rgba(196, 187, 245, 1)',
      offsetLeft: '-right-32 -mb-[0.5vh]',
    },
  ];

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [modalData, setModalData] = useState({});

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: 'center',
        gap: 16,
        paddingVertical: 16,
        paddingBottom: 100,
      }}
    >
      <View className="flex flex-col items-center justify-center gap-4">
        <CategoryHeading
          title={'Services'}
          width={'w-[85vw]'}
          onViewMore={() => {}}
          hideViewMore={true}
        />

        {features.map(feature => {
          return (
            <FeatureCard
              key={feature.title}
              onBtnPress={type => {
                switch (type) {
                  case 'schedule':
                    setModalData(feature.data);
                    setShowScheduleModal(true);
                    break;
                  case 'book':
                    break;
                  default:
                    break;
                }
              }}
              {...feature}
            />
          );
        })}

        {showScheduleModal && (
          <ScheduleModal
            data={modalData}
            visible={showScheduleModal}
            onClose={() => setShowScheduleModal(false)}
          />
        )}
      </View>
    </ScrollView>
  );
}

export default Services;
