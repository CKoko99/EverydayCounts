import { createSlice, configureStore } from "@reduxjs/toolkit";

const authInitialState = {
  token: "",
  userId: "",
  isLoggedIn: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userID", action.payload.userId);
      state.userId = action.payload.userId;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = "";
      state.userId = "";
      state.isLoggedIn = false;
      localStorage.removeItem("token");
      localStorage.removeItem("userID");
    },
  },
});
const planningInitialState = {
  day: 1,
  tasks: [],
  totalCompletedTasks: 0,
  totalAttemptedTasks: 0,
  currentGrade: null,
  readyToPost: false
};
export function calculateGrade(value1, value2) {
  const numgrade = value1 / value2;
  if (numgrade < 0.6) {
    return "F";
  }
  if (numgrade < 0.63) {
    return "D-";
  }
  if (numgrade < 0.68) {
    return "D";
  }
  if (numgrade < 0.7) {
    return "D+";
  }
  if (numgrade < 0.73) {
    return "C-";
  }
  if (numgrade < 0.78) {
    return "C";
  }
  if (numgrade < 0.8) {
    return "C+";
  }
  if (numgrade < 0.83) {
    return "B-";
  }
  if (numgrade < 0.88) {
    return "B";
  }
  if (numgrade < 0.9) {
    return "B+";
  }
  if (numgrade < 0.93) {
    return "A-";
  }
  if (numgrade < 0.98) {
    return "A";
  } else {
    return "A+";
  }
}

const planningSlice = createSlice({
  name: "planning",
  initialState: planningInitialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    removeTask(state, action) {
      const newTasks = state.tasks.filter((task) => task.id !== action.payload);
      state.tasks = newTasks;
    },
    toggleRecurring(state, action) {
      //const id = action.payload
      const existingItem = state.tasks.find(
        (item) => item.id === action.payload
      );
      existingItem.recurring = !existingItem.recurring;
    },
    togglePriority(state, action) {
      //const id = action.payload
      const existingItem = state.tasks.find(
        (item) => item.id === action.payload
      );
      existingItem.priority = !existingItem.priority;
    },
    markAsComplete(state, action) {
      const existingItem = state.tasks.find(
        (item) => item.id === action.payload
      );
      existingItem.markAsComplete = !existingItem.markAsComplete;
    },
    endDay(state) {
      state.tasks.forEach((task) => {
        state.totalAttemptedTasks += 1;
        if (task.markAsComplete) {
          state.totalCompletedTasks += 1;
        }
        if (task.recurring) {
          task.markAsComplete = false;
        }
      });

      const newtasks = state.tasks.filter((task) => task.recurring);
      state.tasks = newtasks;
      state.day++;
      state.currentGrade = calculateGrade(
        state.totalAttemptedTasks,
        state.totalCompletedTasks
      );
      state.readyToPost = true
    },
    updateFromDB(state, action) {
      state.day = action.payload.day;
      state.tasks = action.payload.tasks;
      state.totalAttemptedTasks = action.payload.totalAttemptedTasks;
      state.totalCompletedTasks = action.payload.totalCompletedTasks;
      state.currentGrade = action.payload.currentGrade;
    },
    resetReadyToPost(state){
      state.readyToPost = false
    },
    resetState(state){
      state = [...planningInitialState]
    }
  },
});
const pomoInitialState = {
  dailyTotal: 0,
  newSessions: 0,
  completeTotal: 0,
  endDayTotal: 0,
  endDayCurrent: 0,
  readyToPost: false
};
const pomoSlice = createSlice({
  name: "Pomo",
  initialState: pomoInitialState,
  reducers: {
    updateTotal(state) {
      if (state.dailyTotal + state.newSessions < 0) {
        state.dailyTotal = 0;
        state.newSessions = 0;
        state.endDayTotal = 0;
      } else {
        state.dailyTotal += state.newSessions;
        state.endDayTotal = state.dailyTotal;
        state.newSessions = 0;
      }
    },
    updateCurrent(state, action) {
      if (state.dailyTotal + action.payload < 0) {
      } else {
        state.dailyTotal += action.payload;
        state.newSessions += action.payload;
      }
    },
    updateTotalBy1(state, action) {
      state.endDayTotal += action.payload;
    },
    updateEndDayCurrent(state, action) {
      state.endDayCurrent += action.payload;
    },
    resetEndDay(state) {
      state.endDayCurrent = 0;
      state.endDayTotal = state.dailyTotal;
    },
    endDaySubmit(state) {
      state.completeTotal += state.endDayTotal;
      state.dailyTotal = 0;
      state.endDayTotal = 0;
      state.newSessions = 0;
      state.endDayCurrent = 0;
      state.readyToPost = true
    },
    updateFromDB(state, action) {
      state.dailyTotal = action.payload.dailyTotal;
      state.completeTotal = action.payload.completeTotal;
      state.newSessions = 0;
    },
    resetNewSessions(state) {
      state.newSessions = 0;
    },
    resetReadyToPost(state){
      state.readyToPost = false
    },
    setEndDayTotal(state){
      state.endDayCurrent = state.dailyTotal
    },
    resetState(state){
      state = [...pomoInitialState]
    }
  },
});
const store = configureStore({
  reducer: {
    planning: planningSlice.reducer,
    pomo: pomoSlice.reducer,
    auth: authSlice.reducer,
  },
});

export const planningActions = planningSlice.actions;
export const pomoActions = pomoSlice.actions;
export const authActions = authSlice.actions;
export default store;
