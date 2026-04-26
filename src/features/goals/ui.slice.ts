import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  goalFilters: {
    status: string[];
    sort: string;
    order: 'asc' | 'desc';
  };
}

const initialState: UiState = {
  goalFilters: {
    status: [],
    sort: 'priority',
    order: 'desc',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<string[]>) => {
      state.goalFilters.status = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.goalFilters.sort = action.payload;
    },
    setOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.goalFilters.order = action.payload;
    },
    resetFilters: (state) => {
      state.goalFilters = initialState.goalFilters;
    },
  },
});

export const { setStatusFilter, setSort, setOrder, resetFilters } = uiSlice.actions;
export default uiSlice.reducer;