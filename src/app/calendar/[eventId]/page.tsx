import React from "react";
import EventDetails from "@/components/calendar/EventDetails";

export default function Page({ params }: { params: { eventId: string } }) {
    return <EventDetails eventId={params.eventId} />;
}