/**
 * CourseCreate Module
 * Form for creating a new course
 */

import React, { useState } from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import { AppBreadcrumbs } from '@/components/Breadcrumbs';
import { DynamicForm } from '@/components/DynamicForm';
import { CourseCreateProps, CourseFormValues } from './CourseCreate.interface';
import { useCourseCreate } from './useCourseCreate';
import {
  courseValidationSchema,
  getCourseFormFields,
  DEFAULT_FORM_VALUES,
  CATEGORY_OPTIONS,
  INSTRUCTOR_OPTIONS,
} from './CourseCreate.data';
import {
  CourseCreateContainer,
  PageTitle,
  FormCard,
  BreadcrumbWrapper,
  SuccessMessage,
  ErrorMessage,
} from './CourseCreate.style';

/**
 * CourseCreate component
 */
export const CourseCreate: React.FC<CourseCreateProps> = ({
  initialValues,
  onSuccess,
  isLoading: externalLoading,
}) => {
  const { onSubmit, loading, error, success, clearSuccess } = useCourseCreate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (values: CourseFormValues) => {
    try {
      await onSubmit(values);
      setShowSuccessMessage(true);
      onSuccess?.(values.title);
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  const breadcrumbItems = [
    { label: 'Dashboard', href: '/' },
    { label: 'Course Management', href: '/courses' },
    { label: 'Courses', href: '/courses' },
    { label: 'Create New Course' },
  ];

  const formFields = getCourseFormFields(CATEGORY_OPTIONS, INSTRUCTOR_OPTIONS);
  const isLoading = loading || externalLoading;
  const showError = error && !showSuccessMessage;
  const showSuccess = success || showSuccessMessage;

  React.useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <CourseCreateContainer maxWidth="lg">
      {/* Breadcrumbs */}
      <BreadcrumbWrapper>
        <AppBreadcrumbs items={breadcrumbItems} />
      </BreadcrumbWrapper>

      {/* Page Title */}
      <PageTitle>Create New Course</PageTitle>

      {/* Success Message */}
      {showSuccess && (
        <SuccessMessage>
          <Typography variant="body2">
            Course created successfully! Redirecting...
          </Typography>
        </SuccessMessage>
      )}

      {/* Error Message */}
      {showError && (
        <ErrorMessage>
          <Typography variant="body2">Error: {error}</Typography>
        </ErrorMessage>
      )}

      {/* Form Card */}
      <FormCard>
        <DynamicForm<CourseFormValues>
          fields={formFields}
          onSubmit={handleSubmit}
          initialValues={initialValues || DEFAULT_FORM_VALUES}
          validationSchema={courseValidationSchema}
          submitLabel={isLoading ? 'Creating...' : 'Create Course'}
          cancelLabel="Cancel"
          loading={isLoading}
          onCancel={() => {
            // Handle cancel - could redirect or just close form
            window.history.back();
          }}
        />
      </FormCard>

      {/* Additional Info */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
          <CircularProgress size={24} sx={{ mr: 1 }} />
          <Typography variant="body2">Creating course...</Typography>
        </Box>
      )}
    </CourseCreateContainer>
  );
};

export default CourseCreate;
