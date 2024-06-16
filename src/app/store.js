import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer from "../features/user/userSlice";
import courseReducer from '../features/course/courseSlice';
import materialReducer from "../features/courseMaterial/courseMaterialSlice";
import forumReducer from '../features/forum/forumSlice';
import examReducer from '../features/exam/examSlice';
import quizReducer from '../features/quiz/quizSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: courseReducer,
    courseMaterials: materialReducer,
    forum: forumReducer,
    exams: examReducer,
    quizzes: quizReducer
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActionPaths: ['payload.error'],
    },
  }),
});

