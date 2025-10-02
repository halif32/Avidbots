import { createSlice } from '@reduxjs/toolkit';
import { TempService } from 'store/services/ChatServices';

type InitialStateType = {
  tempData: string;
  status: string;
  loading: boolean;
  error: any; 
};

const initialState: InitialStateType = {
  tempData: '',
  status: 'idle',
  loading: false,
  error: null,
};
const appData = createSlice({
  name: 'chatServices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(TempService.pending, (state) => {
        state.status = 'loading';
        state.loading=true;
      })
      .addCase(TempService.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tempData = action.payload;
        state.loading=false;
      })
      .addCase(TempService.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        state.loading=false;
      });
  },
});

// export const {} = appData.actions;

export default appData.reducer;
