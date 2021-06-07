import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IPsycholog } from '../../../types/psycholog';
import * as api from '../../../api'

export interface AppState {
    psychologistsList: IPsycholog[];
    status: string
    error?: boolean;
}

const initialState: AppState = {
    psychologistsList: [],
    status: 'idle',
    error: false
}

export const fetchDataList = createAsyncThunk<{ list: IPsycholog[] }>(
    "@@DATA/fetchDataList",
    async () => {
      const data = await api.getList();
      return { list: data };
    }
);

export const createPsycholog = createAsyncThunk(
    "@@DATA/createPsycholog",
    async (data: IPsycholog) => {
        await api.createPsycholog(data)
        return data
    }
);

export const updatePsychologRating = createAsyncThunk(
    "@@DATA/updatePsychologRating",
    async (data:any) => {
        const { rating, id } = data;
        await api.updateRating(rating, id)
        return data
    }
);

const psychologistsSlice = createSlice({
    name: "@@DATA",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDataList.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchDataList.fulfilled, (state, action) => {
            state.psychologistsList = action.payload.list;
            state.status = 'successed';;
        })    
        builder.addCase(fetchDataList.rejected, 
            (state) => {
            state.status = 'failed';
            state.error = true;
        });
        builder.addCase(createPsycholog.fulfilled, (state, action) => {
            state.psychologistsList.push(action.payload)
        })
        builder.addCase(updatePsychologRating.fulfilled, (state, action) => {
            const { rating, id } = action.payload;
            const existingPost = state.psychologistsList.find((item) => item.id === id)
            if (existingPost) {
                existingPost.rating = rating;
            }
        })
    },
});
  
export default psychologistsSlice.reducer;


