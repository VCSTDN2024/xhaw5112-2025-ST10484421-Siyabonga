import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';

const AboutUsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Image
            source={require('./assets/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>About Empowering the Nation</Text>
          <Text style={styles.description}>
            We are dedicated to empowering individuals through education and skills development.
            Our mission is to provide accessible, quality training programs that enable people
            to build successful careers and contribute to their communities.
          </Text>
          
          <Text style={styles.sectionTitle}>Our Vision</Text>
          <Text style={styles.sectionText}>
            To be the leading provider of practical skills training and development,
            creating opportunities for growth and economic empowerment across the nation.
          </Text>
          
          <Text style={styles.sectionTitle}>Our Values</Text>
          <View style={styles.valuesList}>
            <Text style={styles.valueItem}>• Excellence in Education</Text>
            <Text style={styles.valueItem}>• Community Development</Text>
            <Text style={styles.valueItem}>• Practical Skills Focus</Text>
            <Text style={styles.valueItem}>• Inclusive Learning Environment</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a365d',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
    marginBottom: 20,
  },
  valuesList: {
    marginTop: 10,
  },
  valueItem: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default AboutUsScreen;