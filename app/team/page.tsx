'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Users, Target, Zap, TrendingUp, Hash, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

interface ScoutingSubmission {
  id: number;
  teamName: string;
  teamNumber: string;
  specimensAutonomous: number;
  samplesAutonomous: number;
  parkSpecimenAuto: boolean;
  parkTeleopAuto: boolean;
  specimensTeleop: number;
  samplesTeleop: number;
  ascent: number;
  submittedAt: string;
}

export default function TeamPage() {
  const [submissions, setSubmissions] = useState<ScoutingSubmission[]>([]);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    const storedSubmissions = JSON.parse(localStorage.getItem('scoutingSubmissions') || '[]');
    setSubmissions(storedSubmissions);
    setTimeout(() => setShowStats(true), 500);
  }, []);

  const totalSubmissions = submissions.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-600/8 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
  <Link href="/">
    <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300">
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back to Scouting Form
    </Button>
  </Link>
  <Link href="/everyone">
    <Button variant="outline" className="border-purple-500 text-purple-300 hover:bg-purple-600/20 transition-all duration-300">
      Scout Other Teams
    </Button>
  </Link>
</div>


          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">MakEMinds FTC Team #23786</h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              “Have fun, raise STEM awareness, and build a robot to do impossible things!”
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, label: 'Avg Solo Score', value: 201 },
            { icon: Target, label: 'Avg Auto Specimens', value: 5 },
            { icon: Zap, label: 'Avg Auto Samples', value: 4 },
            { icon: TrendingUp, label: 'Level Two Ascent', value: '✔️' }
          ].map((stat, index) => (
            <Card
              key={index}
              className={`glass-card p-6 text-center transition-all duration-700 transform ${
                showStats ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </Card>
          ))}
        </div>

        {/* Achievements */}
        <Card className="glass-card p-6 text-white mb-16">
          <h2 className="text-2xl font-bold mb-4">MakEMinds Highlights</h2>
          <ul className="list-disc list-inside space-y-2 text-white/80">
            <li>93% autonomous navigation success using "Pedro Pathing".</li>
            <li>4-stage Viper Slide and 3-axis claw with fully student-led development.</li>
            <li>
              Hosted <a href="https://hackeminds2025.devpost.com/" target="_blank" className="text-purple-400 underline">HackEMinds</a>, a global hackathon with 250+ participants from 10+ countries.
            </li>
            <li>300+ hours mentoring 5 FLL teams impacting 3,200+ students.</li>
            <li>Entirely student-driven operations with LinkedIn-mentored guidance.</li>
          </ul>
        </Card>

        {/* Submissions */}
        {submissions.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Recent Scouting Data</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.slice(-6).reverse().map((submission) => (
                <Card className="glass-card p-6 text-white mb-16">
  <h2 className="text-3xl font-bold mb-6 text-center">🚀 MakEMinds Team Highlights</h2>
  <div className="space-y-5 text-white/90 text-sm md:text-base leading-relaxed">
    <div>
      <h3 className="font-semibold text-purple-300 mb-1">⚙️ Engineering Innovation</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Built a <strong>4-stage Viper Slide</strong> for rapid vertical travel.</li>
        <li>Designed a <strong>3-axis claw</strong> with wrist and shoulder for multi-positional grabs.</li>
        <li>Implemented a reliable <strong>Level 2 ascent mechanism</strong> scoring consistently in endgame.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-purple-300 mb-1">🧠 Autonomous Mastery</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Achieved <strong>93% autonomous success</strong> with "Pedro Pathing" trajectory planner.</li>
        <li>Utilized multi-threaded CV pipelines with TensorFlow and OpenCV.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-purple-300 mb-1">🌐 Community Impact</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li>Hosted <strong><a href="https://hackeminds2025.devpost.com/" target="_blank" className="text-purple-400 underline">HackEMinds</a></strong>, a global hackathon with 250+ participants from 10+ countries.</li>
        <li>Mentored <strong>5 FLL teams</strong> with 300+ hours volunteered, impacting 3,200+ students.</li>
        <li>Ran <strong>STEM clinics</strong> for local underserved schools in-person and virtually.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-purple-300 mb-1">🏆 Recognition & Outreach</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li><strong>Finalist Alliance Captain</strong> at the MA States Championship.</li>
        <li>1st Place in <strong>Inspire Award</strong> and <strong>Innovate Award</strong> at qualifiers.</li>
        <li>Featured in <strong>FIRST Tech Challenge global showcase</strong> (2025).</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-purple-300 mb-1">👥 Team Culture</h3>
      <ul className="list-disc list-inside ml-4 space-y-1">
        <li><strong>100% student-led</strong> design, engineering, and strategy.</li>
        <li>Mentors from <strong>LinkedIn, Harvard, and FIRST alumni</strong>.</li>
        <li>Focus on <strong>gracious professionalism</strong> and peer-to-peer mentorship.</li>
      </ul>
    </div>
  </div>
</Card>

              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
