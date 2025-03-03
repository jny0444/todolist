"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import './styles.css';

type Event = {
  id: number;
  name: string;
  date: string;
  location: string;
};

const events = [
  { id: 1, name: "Concert A", date: "2023-12-01", location: "Venue A" },
  { id: 2, name: "Concert B", date: "2023-12-05", location: "Venue B" },
];

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="container">
      <h1>Event Listing</h1>
      <ul className="event-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <h2 className="font-black">{event.name}</h2>
            <p className="font-black">Date: {event.date}</p>
            <p className="font-black">Location: {event.location}</p>
            <button onClick={() => setSelectedEvent(event)} className="font-black">Book Now</button>
          </li>
        ))}
      </ul>

      {selectedEvent && (
        <div className="ticket">
          <h2>Booking Confirmation</h2>
          <div className="ticket-details">
            <p><strong>Event:</strong> {selectedEvent.name}</p>
            <p><strong>Date:</strong> {selectedEvent.date}</p>
            <p><strong>Location:</strong> {selectedEvent.location}</p>
          </div>
          <div className="qr-code">
            <QRCodeSVG value={`Event: ${selectedEvent.name}, Date: ${selectedEvent.date}, Location: ${selectedEvent.location}`} />
          </div>
        </div>
      )}
    </div>
  );
}
