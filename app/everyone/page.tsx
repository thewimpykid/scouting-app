'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Users } from 'lucide-react';
import Link from 'next/link';

interface Submission {
  team_name: string;
  team_number: string;
  specimens_autonomous: number;
  samples_autonomous: number;
  park_specimen_auto: boolean;
  park_teleop_auto: boolean;
  specimens_teleop: number;
  samples_teleop: number;
  ascent: number;
}

interface TeamStats {
  teamName: string;
  teamNumber: string;
  avgAutoSpecimens: number;
  avgAutoSamples: number;
  avgTeleopSpecimens: number;
  avgTeleopSamples: number;
  avgAscent: number;
}

export default function TeamsStatsPage() {
  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { data, error } = await supabase.from('scouting_data').select('*');
      if (error) {
        console.error('Failed to fetch:', error);
        return;
      }

      const teamMap: Record<string, Submission[]> = {};
      data.forEach((entry: Submission) => {
        if (!teamMap[entry.team_number]) teamMap[entry.team_number] = [];
        teamMap[entry.team_number].push(entry);
      });

      const stats: TeamStats[] = Object.entries(teamMap).map(([teamNumber, entries]) => {
        const teamName = entries[0].team_name;
        const total = entries.length;

        const sum = entries.reduce(
          (acc, cur) => ({
            autoSpecimens: acc.autoSpecimens + cur.specimens_autonomous,
            autoSamples: acc.autoSamples + cur.samples_autonomous,
            teleopSpecimens: acc.teleopSpecimens + cur.specimens_teleop,
            teleopSamples: acc.teleopSamples + cur.samples_teleop,
            ascent: acc.ascent + cur.ascent
          }),
          {
            autoSpecimens: 0,
            autoSamples: 0,
            teleopSpecimens: 0,
            teleopSamples: 0,
            ascent: 0
          }
        );

        return {
          teamName,
          teamNumber,
          avgAutoSpecimens: Math.round(sum.autoSpecimens / total),
          avgAutoSamples: Math.round(sum.autoSamples / total),
          avgTeleopSpecimens: Math.round(sum.teleopSpecimens / total),
          avgTeleopSamples: Math.round(sum.teleopSamples / total),
          avgAscent: Math.round(sum.ascent / total)
        };
      });

      setTeamStats(stats);
      setLoading(false);
    }

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated blurred background lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-600/8 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header links */}
        <div className="flex justify-between items-center mb-8 max-w-6xl mx-auto">
          <Link
            href="/"
            className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-medium px-4 py-2 rounded-md border border-purple-500 transition"
          >
            📝 Scouting Form
          </Link>
          <Link
            href="/team"
            className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-medium px-4 py-2 rounded-md border border-blue-500 transition"
          >
            🤖 View Our Team
          </Link>
        </div>

        {/* Data Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_40px_rgba(128,90,213,0.2)] p-6 max-w-6xl mx-auto overflow-x-auto">
          <div className="text-white mb-6 flex items-center space-x-2">
            <Users className="w-6 h-6 text-purple-400" />
            <h1 className="text-3xl font-bold">Team Statistics Overview</h1>
          </div>
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : (
            <table className="w-full text-white text-sm table-auto border-collapse">
              <thead>
                <tr className="border-b border-white/20 text-left">
                  <th className="px-4 py-2">Team Number</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Auto Specimens</th>
                  <th className="px-4 py-2">Auto Samples</th>
                  <th className="px-4 py-2">Teleop Specimens</th>
                  <th className="px-4 py-2">Teleop Samples</th>
                  <th className="px-4 py-2">Ascent</th>
                </tr>
              </thead>
              <tbody>
                {teamStats.map((team) => (
                  <tr key={team.teamNumber} className="border-t border-white/10">
                    <td className="px-4 py-2">{team.teamNumber}</td>
                    <td className="px-4 py-2">{team.teamName}</td>
                    <td className="px-4 py-2">{team.avgAutoSpecimens}</td>
                    <td className="px-4 py-2">{team.avgAutoSamples}</td>
                    <td className="px-4 py-2">{team.avgTeleopSpecimens}</td>
                    <td className="px-4 py-2">{team.avgTeleopSamples}</td>
                    <td className="px-4 py-2">{team.avgAscent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
