import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

// Static image imports
const courseImages = {
  'first-aid': require('./assets/first-aid.png'),
  'sewing': require('./assets/sewing.png'),
  'landscaping': require('./assets/landscaping.png'),
  'life-skills': require('./assets/life-skills.png'),
  'child-minding': require('./assets/child-minding.png'),
  'cooking': require('./assets/cooking.png'),
  'garden-maintenance': require('./assets/garden-maintenance.png'),
};

type CourseDetailsProps = NativeStackScreenProps<RootStackParamList, 'CourseDetails'>;

const CourseDetailsScreen: React.FC<CourseDetailsProps> = ({ route, navigation }) => {
  const { course } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={courseImages[course.id as keyof typeof courseImages]}
            style={styles.courseImage}
            resizeMode="cover"
          />
          
          <View style={styles.headerSection}>
            <View>
              <Text style={styles.title}>{course.title}</Text>
              <Text style={styles.courseType}>{course.type === 'learnership' ? 'Learnership' : 'Short Course'}</Text>
            </View>
            <View style={styles.feesContainer}>
              <Text style={styles.fees}>R{course.fees}</Text>
              <Text style={styles.feesLabel}>Course Fee</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Purpose</Text>
            <Text style={styles.purposeText}>{course.purpose}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Course Content</Text>
            <FlatList
              data={course.content}
              keyExtractor={(_, index) => index.toString()}
              scrollEnabled={false}
              renderItem={({ item }) => (
                <View style={styles.listItemContainer}>
                  <View style={styles.bulletPoint} />
                  <Text style={styles.listItem}>{item}</Text>
                </View>
              )}
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>Back to Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.quoteButton]}
              onPress={() => navigation.navigate('QuoteBuilder')}>
              <Text style={styles.buttonText}>Get Quote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  courseImage: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 20,
  },
  headerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 4,
  },
  courseType: {
    fontSize: 14,
    textTransform: 'uppercase',
    color: '#2563eb',
    letterSpacing: 0.5,
  },
  feesContainer: {
    alignItems: 'flex-end',
  },
  fees: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d4af37',
  },
  feesLabel: {
    fontSize: 14,
    color: '#4a5568',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 12,
  },
  purposeText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4a5568',
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d4af37',
    marginRight: 12,
  },
  listItem: {
    flex: 1,
    fontSize: 16,
    color: '#4a5568',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#2563eb',
  },
  quoteButton: {
    backgroundColor: '#d4af37',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CourseDetailsScreen;