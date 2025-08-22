# WebSocket Server for Ask the Government

This is a simple WebSocket server that handles real-time vote updates for the Ask the Government platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

Or for development with auto-restart:
```bash
npm run dev
```

The server will start on port 8080.

## Features

- **Real-time Communication**: Handles WebSocket connections for live updates
- **Vote Broadcasting**: Broadcasts vote updates to all connected clients
- **Connection Management**: Tracks connected clients and handles disconnections
- **Error Handling**: Graceful error handling and reconnection logic

## Message Types

### Vote Updates
- **Type**: `vote_update`
- **Payload**: Contains question ID, vote counts, and user ID
- **Action**: Broadcasts to all connected clients

### Question Updates
- **Type**: `question_update`
- **Payload**: Contains question data
- **Action**: Broadcasts to all connected clients

### User Connection
- **Type**: `user_connected`
- **Payload**: Welcome message
- **Action**: Sent to newly connected clients

## Testing

1. Start the server: `npm start`
2. Open the frontend application
3. Log in to establish WebSocket connection
4. Vote on questions to see real-time updates
5. Open multiple browser tabs to test real-time synchronization

## Stopping the Server

Press `Ctrl+C` to stop the server gracefully.
