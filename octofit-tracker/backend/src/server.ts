import express from 'express'
import { connectDatabase } from './config/database.js'
import { Activity, Leaderboard, Team, User, Workout } from './models.js'

const app = express()
const port = Number(process.env.PORT || 8000)

app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.get('/api/users', async (_request, response, next) => {
  try { response.json(await User.find().sort({ createdAt: -1 })) } catch (error) { next(error) }
})
app.post('/api/users', async (request, response, next) => {
  try { response.status(201).json(await User.create(request.body)) } catch (error) { next(error) }
})

app.get('/api/teams', async (_request, response, next) => {
  try { response.json(await Team.find().populate('members', 'username email')) } catch (error) { next(error) }
})
app.post('/api/teams', async (request, response, next) => {
  try { response.status(201).json(await Team.create(request.body)) } catch (error) { next(error) }
})

app.get('/api/activities', async (request, response, next) => {
  try {
    const filter = request.query.userId ? { userId: request.query.userId } : {}
    response.json(await Activity.find(filter).sort({ occurredAt: -1 }))
  } catch (error) { next(error) }
})
app.post('/api/activities', async (request, response, next) => {
  try { response.status(201).json(await Activity.create(request.body)) } catch (error) { next(error) }
})

app.get('/api/leaderboard', async (_request, response, next) => {
  try { response.json(await Leaderboard.find().populate('userId', 'username').sort({ points: -1 })) } catch (error) { next(error) }
})
app.post('/api/leaderboard', async (request, response, next) => {
  try { response.status(201).json(await Leaderboard.create(request.body)) } catch (error) { next(error) }
})

app.get('/api/workouts', async (_request, response, next) => {
  try { response.json(await Workout.find().sort({ createdAt: -1 })) } catch (error) { next(error) }
})
app.post('/api/workouts', async (request, response, next) => {
  try { response.status(201).json(await Workout.create(request.body)) } catch (error) { next(error) }
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  const status = error instanceof Error && error.name === 'ValidationError' ? 400 : 500
  response.status(status).json({ error: error instanceof Error ? error.message : 'Internal server error' })
})

app.listen(port, async () => {
  console.log(`OctoFit API listening on port ${port}`)
  await connectDatabase()
})