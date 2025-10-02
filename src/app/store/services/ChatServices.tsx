import { createAsyncThunk } from '@reduxjs/toolkit';

export const TempService = createAsyncThunk('data/TempService', async () => {
  const data = 'Temp service function';
  return data;
});
