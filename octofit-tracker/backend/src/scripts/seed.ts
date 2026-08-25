import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex', email: 'alex@mergington.edu', profile: { grade: 10 } },
      { username: 'sam', email: 'sam@mergington.edu', profile: { grade: 11 } },
    ]);

    await Team.create({ name: 'Morning Movers', members: users.map((user) => user._id) });
    await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 30, points: 30 },
      { userId: users[1]._id, type: 'strength', durationMinutes: 25, points: 25 },
    ]);
    await Leaderboard.create([
      { userId: users[0]._id, points: 30, rank: 1 },
      { userId: users[1]._id, points: 25, rank: 2 },
    ]);
    await Workout.create([
      { name: 'Easy Run', description: 'A steady run for building endurance.', difficulty: 'beginner', activityType: 'running' },
      { name: 'Bodyweight Basics', description: 'A short full-body strength session.', difficulty: 'beginner', activityType: 'strength' },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
