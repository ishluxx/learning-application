import React from 'react';

const achievements = [
  { id: 1, title: 'First Steps', description: 'Completed your first lesson.' },
  { id: 2, title: 'Consistency', description: 'Logged in for 7 consecutive days.' },
  { id: 3, title: 'Quiz Master', description: 'Scored 100% on a quiz.' },
];

export default function AchievementsPage() {
  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Achievements</h1>
      <ul className="space-y-4">
        {achievements.map(achievement => (
          <li key={achievement.id} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold">{achievement.title}</h2>
            <p className="text-gray-600">{achievement.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}