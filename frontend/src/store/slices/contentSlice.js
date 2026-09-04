import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  videos: [],
  pdfs: [],
  activeVideo: null,
  loading: false,
};

export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
    setPdfs: (state, action) => {
      state.pdfs = action.payload;
    },
    setActiveVideo: (state, action) => {
      state.activeVideo = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setVideos, setPdfs, setActiveVideo, setLoading } = contentSlice.actions;

export default contentSlice.reducer;
