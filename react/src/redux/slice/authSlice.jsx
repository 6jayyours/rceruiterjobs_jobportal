import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AUTH_URL, CHAT_URL, USER_SERVICE } from "../../constants/Url";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_URL}authenticate`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const listCandidates = createAsyncThunk(
  "admin/listCandidates",
  async (formData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      // Get the token from the auth state
      const state = getState();
      const token = state.auth.token;
      const response = await axios.get(`${USER_SERVICE}users`, {
        params: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_URL}register`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const resendOTP = createAsyncThunk(
  "auth/resendOTP",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_URL}resendOTP`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_URL}verifyOtp`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUser = createAsyncThunk(
  "auth/getUser",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get(`${USER_SERVICE}candidate`, {
        params: { id },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ id, token, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${USER_SERVICE}/update?id=${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyDoc = createAsyncThunk(
  "auth/verifyDoc",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_URL}verifyDoc`, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addExp = createAsyncThunk(
  "auth/addExp",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.post(`${USER_SERVICE}addExperience`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const changePass = createAsyncThunk(
  "auth/changePass",
  async (passData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${AUTH_URL}changePassword`, passData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data); 
    }
  }
);

export const getExp = createAsyncThunk(
  "auth/getExp",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get(`${USER_SERVICE}getExperience/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addEdu = createAsyncThunk(
  "auth/addEdu",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.post(`${USER_SERVICE}addEducation`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchReceiverIdsBySenderId = createAsyncThunk(
  'chat/fetchReceiverIdsBySenderId',
  async (id, { getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;
      
      const res = await axios.get(`${CHAT_URL}ws/receivers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUsersByIds = createAsyncThunk(
  'auth/getUsersByIds',
  async (userIds, { getState }) => {
    const state = getState();
    const token = state.auth.token;

    try {
      const userIdsString = userIds.join(',');
      const res = await axios.get(`${USER_SERVICE}byIds/${userIdsString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data; // Assuming the response is an array of users
    } catch (error) {
      console.error('Error fetching users by IDs:', error);
      throw error;
    }
  }
);

export const getEdu = createAsyncThunk(
  "auth/getEdu",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get(`${USER_SERVICE}getEducation/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addSkill = createAsyncThunk(
  "auth/addSkill",
  async (formData, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.post(`${USER_SERVICE}addSkill`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getSkill = createAsyncThunk(
  "auth/getSkill",
  async (id, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      const response = await axios.get(`${USER_SERVICE}getSkill/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  id: null,
  user: null,
  token: null,
  role: null,
  email: null,
  subscription: null,
  error: null,
  isAuthenticated: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.id = null;
      state.user = null;
      state.token = null;
      state.role = null;
      state.email = null;
      state.subscription = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.id = action.payload.id;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.email = action.payload.email;
        state.subscription = action.payload.subscription;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
