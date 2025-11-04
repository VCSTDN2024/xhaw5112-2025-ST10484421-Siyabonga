// QuoteBuilderScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { learnershipCourses, shortCourses, Course } from './CourseData';

// Reusable card component for the quote builder
const CourseSelectionCard = ({ item, isSelected, onPress }: { item: Course, isSelected: boolean, onPress: () => void }) => (
  <TouchableOpacity
    style={[styles.selectionCard, isSelected && styles.selectedCard]}
    onPress={onPress}
  >
    <Text style={[styles.selectionTitle, isSelected && styles.selectedText]}>{item.title}</Text>
    <Text style={[styles.selectionFees, isSelected && styles.selectedText]}>R{item.fees}</Text>
  </TouchableOpacity>
);

const QuoteBuilderScreen: React.FC = () => {
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Function to toggle a course selection
  const toggleCourseSelection = (course: Course) => {
    setSelectedCourses(prevSelected =>
      prevSelected.find(c => c.id === course.id)
        ? prevSelected.filter(c => c.id !== course.id)
        : [...prevSelected, course]
    );
  };

  // Effect to recalculate the total whenever selectedCourses changes
  useEffect(() => {
    let currentTotal = selectedCourses.reduce((sum, course) => sum + course.fees, 0);
    const courseCount = selectedCourses.length;

    if (courseCount === 2) {
      currentTotal *= 0.95; // 5% discount
    } else if (courseCount === 3) {
      currentTotal *= 0.90; // 10% discount
    } else if (courseCount > 3) {
      currentTotal *= 0.85; // 15% discount
    }

    setTotalPrice(currentTotal);
  }, [selectedCourses]);

  const handleSubmitQuote = () => {
    if (selectedCourses.length === 0 || !name || !email) {
      Alert.alert('Incomplete Form', 'Please select at least one course and fill in your details.');
      return;
    }
   
    Alert.alert(
      'Quote Submitted',
      `Thank you, ${name}! Your quote for R${totalPrice.toFixed(2)} has been sent to ${email}.`
    );
    setSelectedCourses([]);
    setName('');
    setEmail('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={[null]} // Single item to render our content
        keyExtractor={() => 'content'}
        renderItem={() => (
          <View style={styles.container}>
            <Text style={styles.header}>Get a Quote</Text>
            <Text style={styles.instructionText}>Select the courses you're interested in:</Text>
            
            <Text style={styles.sectionTitle}>12-Week Learnership Courses</Text>
            <View style={styles.coursePicker}>
              {learnershipCourses.map(item => (
                <CourseSelectionCard
                  key={item.id}
                  item={item}
                  isSelected={!!selectedCourses.find(c => c.id === item.id)}
                  onPress={() => toggleCourseSelection(item)}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>6-Week Short Courses</Text>
            <View style={styles.coursePicker}>
              {shortCourses.map(item => (
                <CourseSelectionCard
                  key={item.id}
                  item={item}
                  isSelected={!!selectedCourses.find(c => c.id === item.id)}
                  onPress={() => toggleCourseSelection(item)}
                />
              ))}
            </View>

            <View style={styles.quoteSummary}>
              <Text style={styles.summaryText}>Courses Selected: {selectedCourses.length}</Text>
              <Text style={styles.totalText}>Total: R{totalPrice.toFixed(2)}</Text>
            </View>
            
            <Text style={styles.label}>Your Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmitQuote}>
              <Text style={styles.buttonText}>Get Quote</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a365d',
    marginTop: 16,
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#1a365d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center',
  },
  coursePicker: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  selectionCard: {
    flex: 1,
    margin: 5,
    padding: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  selectedCard: {
    borderColor: '#007BFF',
    backgroundColor: '#E6F3FF',
  },
  selectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
    textAlign: 'center',
  },
  selectionFees: {
    fontSize: 12,
    color: '#007BFF',
    marginTop: 5,
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#0056b3',
  },
  quoteSummary: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#E6F3FF',
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#007BFF',
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
    marginTop: 5,
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QuoteBuilderScreen;