import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../thunk/calendar';

interface Event {
    id?: number;
    title: string;
    start: string;
    end: string;
    color?: string;
}

interface CalendarState {
    events: Event[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: CalendarState = {
    events: [],
    status: 'idle',
    error: null,
};

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEvents.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
                state.status = 'succeeded';
                state.events = action.payload;
            })
            .addCase(fetchEvents.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Failed to fetch events';
            })
            .addCase(addEvent.fulfilled, (state, action: PayloadAction<Event>) => {
                state.events.push(action.payload);
            })
            .addCase(updateEvent.fulfilled, (state, action: PayloadAction<Event>) => {
                const index = state.events.findIndex(event => event.id === action.payload.id);
                if (index !== -1) {
                    state.events[index] = action.payload;
                }
            })
            .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<number>) => {
                state.events = state.events.filter(event => event.id !== action.payload);
            });
    },
});

export default calendarSlice.reducer;
