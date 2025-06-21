# Microservices Ticketing Platform

A modern web application for managing event ticketing. It allows organizers to create events and sell
tickets, while ensuring high performance, dynamic pricing, and fraud protection — all powered by a distributed
microservices architecture.

---

## Why?

Managing ticket sales for popular events is challenging. Our app solves these common issues:

- **Dynamic Pricing**: Automatically adjusts ticket prices based on real-time demand (like airlines or Uber).
- **Anti-Fraud Tickets**: QR-coded tickets are linked to buyers and validated during entry — reducing fake or reused
  tickets.
- **Fast Performance at Scale**: Redis caching and RabbitMQ event streaming ensure smooth operation even during high
  traffic.
- **Real-Time Check-In**: Instant scanning and validation using a RabbitMQ-based check-in pipeline.

---

## Who is it for?

- **Event organizers** managing concerts, webinars, conferences, or meetups.
- **Attendees** looking to easily purchase, store, and use digital tickets.
- **Venues** wanting quick, secure, and verifiable check-in systems.

---

## User Flow

### Attendee:

1. Sign up / log in.
2. Browse events and buy tickets.
3. Receive unique QR code ticket.
4. Use QR code at the event for check-in.

### Organizer:

1. Log in and create a new event.
2. Set ticket types, prices, and limits.
3. Track ticket sales and attendee check-ins in real time.

### At the Venue:

- Staff scan the QR code.
- The system verifies ticket ownership and validity instantly.
- Entry is logged and confirmed.

---

## System Architecture

This project is built using **microservices**, each with a specific responsibility:

| Service          | Responsibility                                                    |
|------------------|-------------------------------------------------------------------|
| Auth Service     | User registration, login, JWT cookie-based sessions               |
| Event Service    | Create and manage events, venue details, and scheduling           |
| Ticket Service   | Purchase flow, ticket generation, QR code, seat availability      |
| Check-In Service | Validate tickets and scan check-ins via RabbitMQ events           |
| Pricing Engine   | Adjust ticket pricing based on real-time demand (RabbitMQ-driven) |

---

## Tech Stack

| Tool/Framework    | Purpose                                 |
|-------------------|-----------------------------------------|
| **Express**       | Backend framework for each microservice |
| **GraphQL**       | API schema and service communication    |
| **MongoDB**       | Data persistence per service            |
| **Redis**         | In-memory caching and session storage   |
| **RabbitMQ**      | Event streaming between microservices   |
| **JWT + Cookies** | Secure user authentication              |

---

## Key Features

- Real-time ticket availability with Redis caching
- Demand-based ticket pricing with RabbitMQ event tracking
- Unique, non-transferable QR codes per ticket
- Secure ticket transfers with verification
- Real-time check-in and attendance monitoring

---

## DevOps & Scalability

- Services are **containerized** for independent deployment.
- RabbitMQ allows **decoupled asynchronous workflows**.
- Redis enhances **performance and cache invalidation**.
- Modular architecture enables **easy scaling** of high-traffic services like Ticketing or Check-In.

---

## Screenshots & Diagrams

*(system architecture diagram and UI screenshots to be added later)*