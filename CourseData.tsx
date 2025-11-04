
export type Course = {
  id: string;
  title: string;
  fees: number;
  type: 'learnership' | 'short-course';
  purpose: string;
  content: string[];
};

export const learnershipCourses: Course[] = [
  {
    id: 'first-aid',
    title: 'First Aid',
    fees: 1500,
    type: 'learnership',
    purpose: 'To equip individuals with essential life-saving skills.',
    content: ['Basic CPR', 'Wound care', 'Responding to emergencies']
  },
  {
    id: 'sewing',
    title: 'Sewing',
    fees: 1500,
    type: 'learnership',
    purpose: 'To develop practical sewing skills for personal use or business.',
    content: ['Machine operation', 'Basic garment construction', 'Fabric knowledge']
  },
  {
    id: 'landscaping',
    title: 'Landscaping',
    fees: 1500,
    type: 'learnership',
    purpose: 'To teach principles of landscape design and maintenance.',
    content: ['Plant selection', 'Garden design', 'Lawn maintenance']
  },
  {
    id: 'life-skills',
    title: 'Life Skills',
    fees: 1500,
    type: 'learnership',
    purpose: 'To empower individuals with practical skills for daily life and work.',
    content: ['Financial literacy', 'Communication skills', 'Problem-solving']
  }
];

export const shortCourses: Course[] = [
  {
    id: 'child-minding',
    title: 'Child Minding',
    fees: 750,
    type: 'short-course',
    purpose: 'To provide skills for safe and effective child care.',
    content: ['Child safety protocols', 'Age-appropriate activities', 'First aid basics']
  },
  {
    id: 'cooking',
    title: 'Cooking',
    fees: 750,
    type: 'short-course',
    purpose: 'To teach basic cooking skills and kitchen hygiene.',
    content: ['Meal preparation', 'Food safety', 'Cooking techniques']
  },
  {
    id: 'garden-maintenance',
    title: 'Garden Maintenance',
    fees: 750,
    type: 'short-course',
    purpose: 'To equip individuals with skills for garden upkeep.',
    content: ['Pruning and planting', 'Pest control', 'Water management']
  }
];

// For backward compatibility and when we need all courses
export const courses: Course[] = [...learnershipCourses, ...shortCourses];
export default courses;