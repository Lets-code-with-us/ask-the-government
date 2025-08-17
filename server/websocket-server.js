const WebSocket = require('ws');

// Create WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server started on port 8080');

// Store connected clients
const clients = new Set();

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.add(ws);

  // Send welcome message
  ws.send(JSON.stringify({
    type: 'user_connected',
    payload: { message: 'Connected to Ask the Government WebSocket server' },
    timestamp: Date.now()
  }));

  // Handle incoming messages
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log('Received message:', message);

      // Handle different message types
      switch (message.type) {
        case 'vote_update':
          // Broadcast vote update to all connected clients
          broadcastVoteUpdate(message.payload);
          break;
        
        case 'question_update':
          // Broadcast question update to all connected clients
          broadcastQuestionUpdate(message.payload);
          break;
        
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
    clients.delete(ws);
  });

  // Handle errors
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
    clients.delete(ws);
  });
});

// Broadcast vote update to all connected clients
function broadcastVoteUpdate(voteUpdate) {
  const message = {
    type: 'vote_update',
    payload: voteUpdate,
    timestamp: Date.now()
  };

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });

  console.log('Broadcasted vote update:', voteUpdate);
}

// Broadcast question update to all connected clients
function broadcastQuestionUpdate(questionUpdate) {
  const message = {
    type: 'question_update',
    payload: questionUpdate,
    timestamp: Date.now()
  };

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });

  console.log('Broadcasted question update:', questionUpdate);
}

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('Shutting down WebSocket server...');
  wss.close(() => {
    console.log('WebSocket server closed');
    process.exit(0);
  });
});

console.log('WebSocket server is running. Press Ctrl+C to stop.');
