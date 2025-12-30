import {
  Text,
  View,
  StatusBarStyle,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryHeading from '../components/CategoryHeading.tsx';
import FeatureCard from '../components/FeatureCard.tsx';
import Ionicons from '@react-native-vector-icons/ionicons';

function Services() {
  const features = [
    {
      title: 'Weekly Garbage Collection',
      subText: 'schedule date & time for pickup',
      btnText: 'View Schedules',
      iconPath: require('../../assets/calendar-clock.png'),
      gradientPath: require('../../assets/green-gradient-blob.png'),
      color: 'rgba(74, 230, 74, 0.3)',
    },
    {
      title: 'Electric Waste Pickup',
      subText: 'get rid of your electric waste',
      btnText: 'Book a Pickup',
      iconPath: require('../../assets/ev-truck.png'),
      gradientPath: require('../../assets/blue-gradient-blob.png'),
      color: 'rgba(74, 124, 230, 0.3)',
    },
    {
      title: 'Call Pickup',
      subText: 'get rid of your trash at any time 24/7',
      btnText: 'Get It Now',
      iconPath: require('../../assets/truck.png'),
      gradientPath: require('../../assets/purple-gradient-blob.png'),
      color: 'rgba(196, 187, 245, 1)',
      offsetLeft: '-right-32 -mb-[0.5vh]',
    },
  ];

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
          return <FeatureCard key={feature.title} {...feature} />;
        })}
      </View>
    </ScrollView>
  );
}

export default Services;
