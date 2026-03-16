/**
 * Redux course management slice
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Course, CreateCoursePayload, UpdateCoursePayload } from '@/types/course';
import { Lesson } from '@/types/lesson';
import { Student } from '@/types/student';
import { Enrollment } from '@/types/enrollment';
import { PaginatedResponse } from '@/types/common';
import * as courseService from '@/services/courseManagement/courseService';

interface CourseManagementState {
  courses: Course[];
  selectedCourse: Course | null;
  lessons: Lesson[];
  students: Student[];
  enrollments: Enrollment[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: CourseManagementState = {
  courses: [],
  selectedCourse: null,
  lessons: [],
  students: [],
  enrollments: [],
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

/**
 * Async thunk for fetching courses
 */
export const fetchCourses = createAsyncThunk(
  'courseManagement/fetchCourses',
  async (
    params: {
      page?: number;
      pageSize?: number;
      search?: string;
      status?: string;
      sortBy?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await courseService.getCourses(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch courses');
    }
  }
);

/**
 * Async thunk for fetching a course by ID
 */
export const fetchCourseById = createAsyncThunk(
  'courseManagement/fetchCourseById',
  async (id: string, { rejectWithValue }) => {
    try {
      const course = await courseService.getCourseById(id);
      return course;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch course');
    }
  }
);

/**
 * Async thunk for creating a course
 */
export const createCourseThunk = createAsyncThunk(
  'courseManagement/createCourse',
  async (payload: CreateCoursePayload, { rejectWithValue }) => {
    try {
      const course = await courseService.createCourse(payload);
      return course;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create course');
    }
  }
);

/**
 * Async thunk for updating a course
 */
export const updateCourseThunk = createAsyncThunk(
  'courseManagement/updateCourse',
  async (
    { id, payload }: { id: string; payload: UpdateCoursePayload },
    { rejectWithValue }
  ) => {
    try {
      const course = await courseService.updateCourse(id, payload);
      return course;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update course');
    }
  }
);

/**
 * Async thunk for deleting a course
 */
export const deleteCourseThunk = createAsyncThunk(
  'courseManagement/deleteCourse',
  async (id: string, { rejectWithValue }) => {
    try {
      await courseService.deleteCourse(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete course');
    }
  }
);

const courseManagementSlice = createSlice({
  name: 'courseManagement',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedCourse: (state, action) => {
      state.selectedCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch courses
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          pageSize: action.payload.pageSize,
          total: action.payload.total,
          totalPages: action.payload.totalPages,
        };
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch course by ID
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create course
    builder
      .addCase(createCourseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
      })
      .addCase(createCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update course
    builder
      .addCase(updateCourseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        if (state.selectedCourse?.id === action.payload.id) {
          state.selectedCourse = action.payload;
        }
      })
      .addCase(updateCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete course
    builder
      .addCase(deleteCourseThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourseThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter((c) => c.id !== action.payload);
        if (state.selectedCourse?.id === action.payload) {
          state.selectedCourse = null;
        }
      })
      .addCase(deleteCourseThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectCourses = (state: any) => state.courseManagement.courses;
export const selectSelectedCourse = (state: any) =>
  state.courseManagement.selectedCourse;
export const selectCoursesLoading = (state: any) =>
  state.courseManagement.loading;
export const selectCoursesError = (state: any) => state.courseManagement.error;
export const selectCoursesPagination = (state: any) =>
  state.courseManagement.pagination;

export const { clearError, setSelectedCourse } = courseManagementSlice.actions;
export default courseManagementSlice.reducer;
