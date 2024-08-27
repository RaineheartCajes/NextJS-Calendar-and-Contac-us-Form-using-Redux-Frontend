'use client';

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Calendar, momentLocalizer, Views, View } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import MyEventDialog from './CalendarDialog';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchEvents, addEvent, updateEvent, deleteEvent } from '../../redux/thunk/calendar'; // Import new thunks

const localizer = momentLocalizer(moment);

interface MyEvent {
    id?: number;
    title: string;
    start: Date;
    end: Date;
    color?: string;
}

const MyCalendar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { events, status } = useSelector((state: RootState) => state.calendar);
    const [currentView, setCurrentView] = useState<View>(Views.MONTH);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // To track if we are editing
    const [selectedEventId, setSelectedEventId] = useState<number | undefined>(); // Track the selected event
    const [newEvent, setNewEvent] = useState<MyEvent>({
        title: '',
        start: new Date(),
        end: new Date(),
        color: getRandomColor(),
    });

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEvents());
        }
    }, [status, dispatch]);

    const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
        setNewEvent({ title: '', start, end, color: getRandomColor() });
        setIsEditing(false);
        setDialogOpen(true);
    };

    const handleSelectEvent = (event: MyEvent) => {
        setNewEvent({ ...event });
        setSelectedEventId(event.id);
        setIsEditing(true);
        setDialogOpen(true);
    };

    const handleSaveEvent = async () => {
        if (newEvent.title) {
            try {
                if (isEditing && selectedEventId !== undefined) {
                    await dispatch(updateEvent({
                        id: selectedEventId,
                        title: newEvent.title,
                        start: newEvent.start.toISOString(),
                        end: newEvent.end.toISOString(),
                        color: newEvent.color,
                    })).unwrap();
                } else {
                    const savedEvent = await dispatch(addEvent({
                        ...newEvent,
                        start: newEvent.start.toISOString(),
                        end: newEvent.end.toISOString(),
                    })).unwrap();
                    setNewEvent({
                        ...savedEvent,
                        start: new Date(savedEvent.start),
                        end: new Date(savedEvent.end),
                        title: '',
                    });
                }
                setDialogOpen(false);
            } catch (error) {
                console.error('Failed to save the event:', error);
            }
        }
    };

    const handleDeleteEvent = async () => {
        if (isEditing && selectedEventId !== undefined) {
            try {
                await dispatch(deleteEvent(selectedEventId)).unwrap();
                setDialogOpen(false);
            } catch (error) {
                console.error('Failed to delete the event:', error);
            }
        }
    };

    const eventStyleGetter = (event: MyEvent) => {
        const style = {
            backgroundColor: event.color || 'blue',
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'flex',          
            justifyContent: 'center', 
            alignItems: 'center',     
            height: '100%',           
            padding: '0 4px',         
            whiteSpace: 'nowrap',     
        };
        return { style };
    };

    const handleViewChange = (view: View) => {
        setCurrentView(view);
    };

    return (
        <div style={{ height: '100vh' }}>
            <Calendar
                localizer={localizer}
                events={events.map(event => ({
                    ...event,
                    start: new Date(event.start),
                    end: new Date(event.end),
                })) as MyEvent[]}
                startAccessor="start"
                endAccessor="end"
                view={currentView}
                onView={handleViewChange}
                defaultView={Views.MONTH}
                views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent} // Handle clicking on an event
                style={{ height: 650, margin: '50px' }}
                eventPropGetter={eventStyleGetter}
            />

            <MyEventDialog
                open={dialogOpen}
                title={newEvent.title}
                isEditing={isEditing}
                onClose={() => setDialogOpen(false)}
                onSave={handleSaveEvent}
                onDelete={handleDeleteEvent} // Handle deleting an event
                onTitleChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                eventId={selectedEventId}  // Pass this to the dialog
            />
        </div>
    );
};

function getRandomColor(): string {
    const colors = ['violet', 'green', 'blue'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}

export default MyCalendar;
