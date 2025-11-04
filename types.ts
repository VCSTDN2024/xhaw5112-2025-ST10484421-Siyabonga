import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Dashboard: {
    user: {
      name: string;
      email: string;
    };
  };
  QuoteBuilder: undefined;
  CourseDetails: {
    course: {
      id: string;
      title: string;
      purpose: string;
      content: string[];
      type: 'learnership' | 'short-course';
      fees: number;
    };
  };
  Registration: undefined;
  AboutUs: undefined;
  ContactUs: undefined;
};

export type CourseDetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'CourseDetails'>;