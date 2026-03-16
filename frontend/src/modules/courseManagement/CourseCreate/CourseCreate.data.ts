/**
 * CourseCreate static data and configurations
 */

import * as yup from 'yup';
import { DynamicFieldConfig } from '@/components/DynamicForm/DynamicForm.interface';
import { CategoryOption, InstructorOption } from './CourseCreate.interface';

// Validation schema
export const courseValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Course title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must not exceed 100 characters'),
  description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must not exceed 2000 characters'),
  categoryId: yup
    .string()
    .required('Category is required'),
  instructorId: yup
    .string()
    .required('Instructor is required'),
  duration: yup
    .number()
    .required('Duration is required')
    .positive('Duration must be greater than 0')
    .max(500, 'Duration must not exceed 500 hours'),
  maxStudents: yup
    .number()
    .required('Max students is required')
    .positive('Max students must be greater than 0')
    .max(10000, 'Max students must not exceed 10000'),
  price: yup
    .number()
    .required('Price is required')
    .min(0, 'Price cannot be negative')
    .max(100000, 'Price must not exceed 100000'),
  status: yup
    .string()
    .required('Status is required')
    .oneOf(['draft', 'published'], 'Invalid status'),
});

// Mock category options
export const CATEGORY_OPTIONS: CategoryOption[] = [
  { id: '1', label: 'Web Development', value: 'web-dev' },
  { id: '2', label: 'Mobile Development', value: 'mobile-dev' },
  { id: '3', label: 'Data Science', value: 'data-science' },
  { id: '4', label: 'AI & Machine Learning', value: 'ai-ml' },
  { id: '5', label: 'Cloud Computing', value: 'cloud' },
  { id: '6', label: 'DevOps', value: 'devops' },
  { id: '7', label: 'Design', value: 'design' },
  { id: '8', label: 'Business', value: 'business' },
];

// Mock instructor options
export const INSTRUCTOR_OPTIONS: InstructorOption[] = [
  { id: '1', label: 'John Smith', value: 'instructor-1' },
  { id: '2', label: 'Jane Doe', value: 'instructor-2' },
  { id: '3', label: 'Mike Johnson', value: 'instructor-3' },
  { id: '4', label: 'Sarah Williams', value: 'instructor-4' },
  { id: '5', label: 'David Brown', value: 'instructor-5' },
];

// Status options
export const STATUS_OPTIONS = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
];

// Form field configurations
export const getCourseFormFields = (
  categories: CategoryOption[] = CATEGORY_OPTIONS,
  instructors: InstructorOption[] = INSTRUCTOR_OPTIONS
): DynamicFieldConfig[] => [
  {
    name: 'title',
    label: 'Course Title',
    type: 'text',
    placeholder: 'Enter course title',
    required: true,
  },
  {
    name: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Enter course description',
    required: true,
    multiline: true,
    rows: 5,
  },
  {
    name: 'categoryId',
    label: 'Category',
    type: 'select',
    required: true,
    options: categories.map((cat) => ({
      label: cat.label,
      value: cat.value,
    })),
  },
  {
    name: 'instructorId',
    label: 'Instructor',
    type: 'select',
    required: true,
    options: instructors.map((inst) => ({
      label: inst.label,
      value: inst.value,
    })),
  },
  {
    name: 'duration',
    label: 'Duration (hours)',
    type: 'number',
    placeholder: 'Enter course duration',
    required: true,
    min: 1,
    max: 500,
  },
  {
    name: 'maxStudents',
    label: 'Max Students',
    type: 'number',
    placeholder: 'Enter maximum number of students',
    required: true,
    min: 1,
    max: 10000,
  },
  {
    name: 'price',
    label: 'Price ($)',
    type: 'number',
    placeholder: 'Enter course price',
    required: true,
    min: 0,
    max: 100000,
    step: 0.01,
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    required: true,
    defaultValue: 'draft',
    options: STATUS_OPTIONS,
  },
];

export const DEFAULT_FORM_VALUES = {
  title: '',
  description: '',
  categoryId: '',
  instructorId: '',
  duration: 10,
  maxStudents: 50,
  price: 0,
  status: 'draft' as const,
};
