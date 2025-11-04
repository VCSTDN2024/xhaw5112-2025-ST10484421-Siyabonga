
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

type RoleCardProps = {
  id: string;
  name: string;
  image: any; 
  isSelected: boolean;
  onPress: (id: string) => void;
};

const RoleCard: React.FC<RoleCardProps> = ({ id, name, image, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, isSelected && styles.selectedCard]}
      onPress={() => onPress(id)}
    >
      <Image source={image} style={styles.cardImage} />
      <Text style={[styles.cardText, isSelected && styles.selectedCardText]}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  selectedCard: {
    backgroundColor: '#E6F3FF',
    borderColor: '#007BFF',
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  selectedCardText: {
    color: '#007BFF',
  },
});

export default RoleCard;