"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { fetchEvents } from '@/redux/thunk/calendar';
import { Container, Card, CardContent, Typography, Box, Divider, Button } from '@mui/material';
import { useRouter } from 'next/navigation';

interface EventDetailsProps {
    eventId: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventId }) => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const event = useSelector((state: RootState) =>
        state.calendar.events.find((e) => e.id === Number(eventId))
    );

    useEffect(() => {
        if (!event) {
            dispatch(fetchEvents());
        }
    }, [dispatch, event, eventId]);

    if (!event) {
        return <Container><Typography variant="h5">Loading...</Typography></Container>;
    }

    const handleGoBack = () => {
        router.push('/');
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, backgroundColor: '#e3f2fd', borderRadius: 2, p: 3 }}>
            <Card sx={{ backgroundColor: '#ffffff', color: '#0d47a1', boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#0d47a1' }}>
                        {event.title}
                    </Typography>
                    <Divider sx={{ mb: 2, backgroundColor: '#0d47a1' }} />
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1" color="textSecondary">
                            <strong>Start:</strong> {new Date(event.start).toLocaleString()}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1" color="textSecondary">
                            <strong>End:</strong> {new Date(event.end).toLocaleString()}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mb={2}>
                        <Typography variant="body1" color="textSecondary">
                            <strong>Color:</strong> {event.color}
                        </Typography>
                    </Box>
                    <Box display="flex" justifyContent="center" mt={4}>
                        <Button variant="contained" color="primary" onClick={handleGoBack} sx={{ backgroundColor: '#0d47a1' }}>
                            Go back to calendar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default EventDetails;
