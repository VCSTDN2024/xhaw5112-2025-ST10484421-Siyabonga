import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Image,
} from 'react-native';
import { learnershipCourses, shortCourses, Course } from './CourseData';

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

const openWebsite = () => {
  const url = 'http://http://127.0.0.1:5500/Web%20pages/Home.html'; // Replace with your desired URL
  Linking.openURL(url).catch((err) => console.error("Couldn't load page", err));
};

// We'll revert to a single FlatList with header and footer to handle scrolling
// This prevents the common error of nesting FlatList inside ScrollView

const Header: React.FC<{ navigation: any }> = ({ navigation }) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerContent}>
      <View style={styles.logo}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logoImage}
        />
        <Text style={styles.logoText}>Empowering the Nation</Text>
      </View>
      <View style={styles.authButtons}>
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.authButton}
          onPress={() => navigation.navigate('Registration')}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.headerButtons}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.navigate('AboutUs')}>
        <Text style={styles.headerButtonText}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.navigate('QuoteBuilder')}>
        <Text style={styles.headerButtonText}>Get a Quote</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => navigation.navigate('ContactUs')}>
        <Text style={styles.headerButtonText}>Contact</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const SocialMediaLinks: React.FC = () => (
  <View style={styles.socialLinksContainer}>
    <TouchableOpacity
      style={styles.socialButton}
      onPress={() => Linking.openURL('https://www.facebook.com/share/14Qm4aEndwB/')}>
      <Text style={styles.socialButtonText}>Facebook</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.socialButton}
      onPress={() => Linking.openURL('https://x.com/empowering83378?t=h8k_neAcqymiogZmZnyK8Q&s=08')}>
      <Text style={styles.socialButtonText}>Twitter</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.socialButton}
      onPress={() => Linking.openURL('https://www.instagram.com/3mpo.weringthenation?utm_source=qr&igsh=MW03MjBrN3o1Z2NuNQ==')}>
      <Text style={styles.socialButtonText}>Instagram</Text>
    </TouchableOpacity>
  </View>
);

const CourseListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [filter, setFilter] = useState<'all' | 'learnership' | 'short-course'>('all');
  
  const filteredCourses = React.useMemo(() => {
    if (filter === 'all') {
      return [...learnershipCourses, ...shortCourses];
    }
    return filter === 'learnership' ? learnershipCourses : shortCourses;
  }, [filter]);

  const renderItem = ({ item }: { item: Course }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() => navigation.navigate('CourseDetails', { course: item })}>
      <Image
        source={courseImages[item.id as keyof typeof courseImages]}
        style={styles.courseImage}
      />
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseFees}>R{item.fees}</Text>
      <Text style={styles.courseType}>
        {item.type === 'learnership' ? 'Learnership' : 'Short Course'}
      </Text>
    </TouchableOpacity>
  );

  const FilterButton = ({ title, value }: { title: string; value: typeof filter }) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === value && styles.filterButtonActive]}
      onPress={() => setFilter(value)}>
      <Text style={[styles.filterButtonText, filter === value && styles.filterButtonTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.fixedHeaderContainer}>
        <Header navigation={navigation} />
      </View>
      <FlatList
        contentContainerStyle={styles.scrollContent}
        data={[null]}
        keyExtractor={() => 'main'}
        renderItem={() => (
          <>
            <View style={styles.heroSection}>
              <Text style={styles.heroTitle}>Empowering the Nation</Text>
              <Text style={styles.heroSubtitle}>
                Skills Development Programs
              </Text>
            </View>

            <View style={styles.filterContainer}>
              <FilterButton key="all" title="All Courses" value="all" />
              <FilterButton key="learnership" title="Learnerships" value="learnership" />
              <FilterButton key="short-course" title="Short Courses" value="short-course" />
            </View>

            <View style={styles.coursesSection}>
              <View style={styles.courseGrid}>
                {filteredCourses.map((item) => (
                  <React.Fragment key={item.id}>
                    {renderItem({ item })}
                  </React.Fragment>
                ))}
              </View>
            </View>
          </>
        )}
        ListFooterComponent={
          <View style={styles.footerContainer}>
            <Text style={styles.socialHeader}>Check Out Our Socials</Text>
            <SocialMediaLinks />
          </View>
        }
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  fixedHeaderContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1,
  },
  scrollContent: {
    paddingTop: 10,
  },
  headerContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a365d',
    marginLeft: 10,
    flexShrink: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1a365d',
    paddingVertical: 12,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 16,
  },
  authButton: {
    backgroundColor: '#d4af37',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  courseContainer: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1a365d',
  },
  filterButtonActive: {
    backgroundColor: '#1a365d',
  },
  filterButtonText: {
    color: '#1a365d',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  coursesSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a365d',
    marginTop: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  headerButton: {
    padding: 8,
  },
  headerButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  footerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    marginTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 20,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 15,
    marginBottom: 10,
  },
  courseCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  courseImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a365d',
  },
  courseFees: {
    fontSize: 16,
    color: '#d4af37',
    fontWeight: '600',
    marginTop: 5,
  },
  courseType: {
    fontSize: 14,
    color: '#4a5568',
    marginTop: 5,
    textTransform: 'uppercase',
  },
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 20,
  },
  socialHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a365d',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSection: {
    padding: 24,
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a365d',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#4a5568',
    textAlign: 'center',
  },
  socialLinksContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    paddingVertical: 16,
    backgroundColor: '#1a365d',
  },
  socialButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#d4af37',
    borderRadius: 20,
  },
  socialButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default CourseListScreen;
