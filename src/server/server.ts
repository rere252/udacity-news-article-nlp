import * as express from 'express';

const port = 8081;
const app = express();

// Serve static site.
app.use(express.static('dist/client'));

// Base router.
const apiRouter = express.Router();

// API's
app.use('/api', apiRouter);
apiRouter.use('/test', (req, resp) => resp.json({ ok: 'dvj' }));

// Start the server.
app.listen(port, () => console.log(`Server started on ${port}.`));
