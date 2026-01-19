import {
  Text,
  View,
  StatusBarStyle,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryHeading from '@/components/CategoryHeading.tsx';
import Ionicons from '@react-native-vector-icons/ionicons';
import CampaignCard from '@/components/CampaignCard.tsx';

import FeatureCard from '../components/FeatureCard.tsx';
function Home({ navigation }: { navigation: LoginScreenNavigationProp }) {
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
          return <FeatureCard key={feature.title} {...feature} />;
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
      </View>
    </ScrollView>
  );
}
export default Home;
