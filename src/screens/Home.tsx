import {
  Text,
  View,
  StatusBarStyle,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryHeading from '@/components/CategoryHeading.tsx';
import Ionicons from '@react-native-vector-icons/ionicons';
import CampaignCard from '@/components/CampaignCard.tsx';
import FeatureCard from '../components/FeatureCard.tsx';
import ScheduleModal from '@/components/ScheduleModal';
import BookModal from '@/components/BookModal';
import useAuthStore from '@/stores/useAuthStore';
import useUserStore from '@/stores/useUserStore';

function Home({ navigation }: { navigation: LoginScreenNavigationProp }) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showBookModal, setShowBookModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [bookingData, setBookingData] = useState<{
    title: string;
    day: string;
    time: string;
    frequency: 'daily' | 'weekly' | 'monthly';
  } | null>(null);
  const user = useUserStore(state => state.user);

  const features = [
    {
      type: 'schedule',
      title: 'Weekly Garbage Collection',
      subText: 'schedule date & time for pickup',
      btnText: 'View Schedules',
      iconPath: require('../../assets/calendar-clock.png'),
      gradientPath: require('../../assets/green-gradient-blob.png'),
      color: 'rgba(74, 230, 74, 0.3)',
      offsetLeft: 'left-20',
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
      data: [
        {
          id: 1,
          category: 'Small Electronics',
          items: ['Phones', 'Laptops', 'Tablets', 'Cameras'],
          notes: 'Must be properly packaged',
        },
        {
          id: 2,
          category: 'Large Appliances',
          items: ['Refrigerators', 'Washing Machines', 'TVs', 'Microwaves'],
          notes: 'Appointment required for large items',
        },
        {
          id: 3,
          category: 'Batteries',
          items: ['Lithium-ion', 'Lead-acid', 'Nickel-metal hydride'],
          notes: 'Must be taped and separated',
        },
      ],
    },
  ];

  const campaigns = [
    {
      title: 'Parvaah',
      subText: 'a tree plantation drive',
      url: 'https://parvaah.org/our-campaigns/tree-plantation-drive.html',
      icon: 'leaf',
      color: '#97FFAA',
    },
    {
      title: 'Boondh',
      subText: 'water distribution initiative',
      url: 'https://parvaah.org/-our-projects/project-boond.html',
      icon: 'water',
      color: '#6bf0ff',
    },
  ];

  const handleBookingConfirm = (booking: {
    title: string;
    day: string;
    time: string;
    frequency: 'daily' | 'weekly' | 'monthly';
  }) => {
    setBookingData(booking);
    console.log('Booking confirmed:', booking);
    // You can also save to AsyncStorage, API, or Zustand store here
    // Example: await AsyncStorage.setItem('booking', JSON.stringify(booking));
  };

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
          title={'Our Services'}
          width={'w-[85vw]'}
          onViewMore={() => navigation.navigate('Services')}
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
                    if (!user) {
                      return navigation.navigate('Login');
                    }
                    setModalData(feature.title);
                    setShowBookModal(true);
                    break;
                  default:
                    break;
                }
              }}
              {...feature}
            />
          );
        })}

        <Pressable
          className="w-[85vw] p-4 rounded-xl mb-8"
          style={{ backgroundColor: 'rgba(74, 230, 74, 0.3)' }}
        >
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-semibold">Service Area Map</Text>
            <Ionicons name={'expand'} size={28} color="#111" />
          </View>
        </Pressable>

        <CategoryHeading
          title={'Ongoing Campaigns'}
          width={'w-[85vw]'}
          onViewMore={() => {}}
        />
        {campaigns.map(campaign => {
          return <CampaignCard key={campaign.title} {...campaign} />;
        })}

        {showScheduleModal && (
          <ScheduleModal
            data={modalData}
            visible={showScheduleModal}
            onClose={() => setShowScheduleModal(false)}
          />
        )}

        {showBookModal && (
          <BookModal
            title={modalData}
            visible={showBookModal}
            onClose={() => setShowBookModal(false)}
            onConfirm={handleBookingConfirm}
          />
        )}
      </View>
    </ScrollView>
  );
}

export default Home;
