export interface TabIcon {
  path: string;
  iconName: string;
  iconFamily: string;
}

export interface FeatureCardParams {
  title: string;
  subText: string;
  btnText: string;
  iconPath: string;
  gradientPath: string;
  color: string;
}

export interface CategoryHeadingParams {
  title: string;
  width: string;
  onViewMore: () => void;
}

export interface CampaignCardParams {
  title: string;
  subText: string;
  url: string;
  icon: string;
  color: string;
}
