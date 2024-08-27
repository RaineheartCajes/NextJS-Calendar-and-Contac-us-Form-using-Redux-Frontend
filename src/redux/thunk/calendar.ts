import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosClient } from '../../../http/http-client';

interface Event {
    id?: number;
    title: string;
    start: string;
    end: string;
    color?: string;
}

interface BackendEvent {
    id?: number;
    title: string;
    startDate: string;
    endDate: string;
    color?: string;
}

export const fetchEvents = createAsyncThunk<Event[]>('calendar/fetchEvents', async () => {
    const response = await axiosClient.get<BackendEvent[]>('/events');
    return response.data.map(event => ({
        id: event.id,
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        color: event.color,
    }));
});

export const addEvent = createAsyncThunk<Event, Event>('calendar/addEvent', async (event) => {
    const response = await axiosClient.post<BackendEvent>('/events', {
        title: event.title,
        startDate: event.start,
        endDate: event.end,
        color: event.color,
    }); 
    return {
        id: response.data.id,
        title: response.data.title,
        start: response.data.startDate,
        end: response.data.endDate,
        color: response.data.color,
    };
});

export const updateEvent = createAsyncThunk<Event, Event>('calendar/updateEvent', async (event) => {
    const response = await axiosClient.put<BackendEvent>(`/events/${event.id}`, {
        title: event.title,
        startDate: event.start,
        endDate: event.end,
        color: event.color,
    });
    return {
        id: response.data.id,
        title: response.data.title,
        start: response.data.startDate,
        end: response.data.endDate,
        color: response.data.color,
    };
});

export const deleteEvent = createAsyncThunk<number, number>('calendar/deleteEvent', async (eventId) => {
    await axiosClient.delete(`/events/${eventId}`);
    return eventId;
});
