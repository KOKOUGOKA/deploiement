// src/redux/store.js
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
  courses: courseReducer,
  // Add other reducers here
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

// src/redux/courseReducer.js
const initialState = {
  courses: [],
  loading: false,
  error: null,
};

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_COURSES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_COURSES_SUCCESS':
      return { ...state, loading: false, courses: action.payload };
    case 'FETCH_COURSES_FAILURE':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_COURSE':
      return { ...state, courses: [...state.courses, action.payload] };
    default:
      return state;
  }
};

export default courseReducer;

// src/redux/courseActions.js
import { getCourses, createCourse } from '../services/api';

export const fetchCourses = () => async (dispatch) => {
  dispatch({ type: 'FETCH_COURSES_REQUEST' });
  try {
    const response = await getCourses();
    dispatch({ type: 'FETCH_COURSES_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_COURSES_FAILURE', payload: error.message });
  }
};

export const addCourse = (courseData) => async (dispatch) => {
  try {
    const response = await createCourse(courseData);
    dispatch({ type: 'ADD_COURSE', payload: response.data });
  } catch (error) {
    console.error('Error adding course:', error);
  }
};

// Update CoursesPage to use Redux
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCourses, addCourse } from '../redux/courseActions';

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector(state => state.courses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleAddCourse = (courseData) => {
    dispatch(addCourse(courseData));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Courses</h1>
      <CourseForm onSubmit={handleAddCourse} />
      <CourseTable courses={courses} />
    </div>
  );
};

export default CoursesPage;
