export interface TabIcon {
  path: string;
  iconName: string;
  iconFamily: string;
}

export interface FeatureCardParams {
  type: string;
  data: object | any[];
  title: string;
  subText: string;
  btnText: string;
  iconPath: string;
  gradientPath: string;
  color: string;
  offsetLeft?: string;
  onBtnPress: (type: string) => void;
}

export interface CategoryHeadingParams {
  title: string;
  width: string;
  onViewMore: () => void;
  hideViewMore?: boolean;
}

export interface CampaignCardParams {
  title: string;
  subText: string;
  url: string;
  icon: string;
  color: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  Login: undefined;
  Registration: undefined;
  Campaign: { id: string };
  Schedule: { id: string };
  Ticket: { id: string };
};

export type TabParamList = {
  Home: undefined;
  Dashboard: undefined;
  Services: undefined;
  Schedules: undefined;
  Profile: undefined;
};
