import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IPsycholog } from '../../../types/psycholog';
import * as api from '../../../api'
import { stat } from 'fs';

export interface AppState {
    psychologistsList: IPsycholog[];
    loading?: boolean;
    error?: boolean;
}

const initialState: AppState = {
    psychologistsList: [],
    loading: false,
    error: false
}

export const fetchDataList = createAsyncThunk<{ list: IPsycholog[] }>(
    "data/fetchDataList",
    async () => {
      const data = await api.getList();
      return { list: data };
    }
);

export const addPsycholog = createAsyncThunk(
    "data/addPsycholog",
    async (data: IPsycholog) => {
    await api.createPsycholog(data)
    }
);

export const updatePsychologRating = createAsyncThunk(
    "data/updatePsychologRating",
    async (data:any) => {
        const { rating, id } = data;
        await api.updateRating(rating, id)
    }
);

const psychologistsSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataList.pending, (state) => {
            state.loading = true;
            state.error = false;
        })
        builder.addCase(fetchDataList.fulfilled, (state, action) => {
            state.psychologistsList = action.payload.list;
            state.loading = false;
            state.error = false;
        })    
        builder.addCase(fetchDataList.rejected, 
            (state) => {
            state.loading = false;
            state.error = true;
        });
    },
});
  
export default psychologistsSlice.reducer;


