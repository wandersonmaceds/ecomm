import express from 'express';

const app = express();

app.get('/health', async (request, response) => {
    return response.json({ 'status': 'running' })
});

export default app;