'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Send, Sparkles, Users, Hash, Target, Zap, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface FormData {
  teamName: string;
  teamNumber: string;
  specimensAutonomous: number;
  samplesAutonomous: number;
  parkSpecimenAuto: boolean;
  parkTeleopAuto: boolean;
  specimensTeleop: number;
  samplesTeleop: number;
  ascent: number;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    teamNumber: '',
    specimensAutonomous: 1,
    samplesAutonomous: 1,
    parkSpecimenAuto: false,
    parkTeleopAuto: false,
    specimensTeleop: 1,
    samplesTeleop: 1,
    ascent: 1
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const router = useRouter();

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.teamName.trim()) newErrors.teamName = 'Team name is required';
    if (!formData.teamNumber.trim()) newErrors.teamNumber = 'Team number is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase.from('scouting_data').insert([{ 
        team_name: formData.teamName,
        team_number: formData.teamNumber,
        specimens_autonomous: formData.specimensAutonomous,
        samples_autonomous: formData.samplesAutonomous,
        park_specimen_auto: formData.parkSpecimenAuto,
        park_teleop_auto: formData.parkTeleopAuto,
        specimens_teleop: formData.specimensTeleop,
        samples_teleop: formData.samplesTeleop,
        ascent: formData.ascent,
      }]);
      if (error) {
        console.error('Supabase insert error:', error);
        alert('There was an error submitting the form.');
      } else {
        console.log('Submission saved:', data);
        router.push('/team');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | number | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="absolute top-6 left-6 right-6 z-20 flex justify-between items-center">
  <a
    href="/team"
    className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 font-medium px-4 py-2 rounded-md border border-blue-500 transition"
  >
    🤖 Our Team
  </a>
  <a
    href="/everyone"
    className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 font-medium px-4 py-2 rounded-md border border-purple-500 transition"
  >
    📊 View All Team Stats
  </a>
</div>
        <Card className="w-full max-w-2xl glass-card shadow-2xl shadow-purple-500/10">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-white/10">
                  <Sparkles className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">MakEMinds Scouting App</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="teamName" className="text-white/90 font-medium">
                    <Users className="w-4 h-4 inline mr-2" /> Team Name
                  </Label>
                  <Input id="teamName" type="text" placeholder="Enter team name" value={formData.teamName} onChange={(e) => handleInputChange('teamName', e.target.value)} className="glass-input text-white placeholder:text-white/40" />
                  {errors.teamName && <p className="text-red-400 text-sm mt-1">{errors.teamName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teamNumber" className="text-white/90 font-medium">
                    <Hash className="w-4 h-4 inline mr-2" /> Team Number
                  </Label>
                  <Input id="teamNumber" type="text" placeholder="Enter team number" value={formData.teamNumber} onChange={(e) => handleInputChange('teamNumber', e.target.value)} className="glass-input text-white placeholder:text-white/40" />
                  {errors.teamNumber && <p className="text-red-400 text-sm mt-1">{errors.teamNumber}</p>}
                </div>
              </div>

              {/* Autonomous Section */}
              <div className="space-y-6 p-6 rounded-lg glass-card">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-400" /> Autonomous Period
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-white/90 font-medium">
                      Specimens in Autonomous: {formData.specimensAutonomous}
                    </Label>
                    <Slider value={[formData.specimensAutonomous]} onValueChange={(value) => handleInputChange('specimensAutonomous', value[0])} max={10} min={1} step={1} className="w-full [&_[role=slider]]:bg-purple-500 [&_[role=slider]]:border-purple-400" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/90 font-medium">
                      Samples in Autonomous: {formData.samplesAutonomous}
                    </Label>
                    <Slider value={[formData.samplesAutonomous]} onValueChange={(value) => handleInputChange('samplesAutonomous', value[0])} max={10} min={1} step={1} className="w-full [&_[role=slider]]:bg-purple-500 [&_[role=slider]]:border-purple-400" />
                  </div>
                </div>
              </div>

              {/* Teleop Section */}
              <div className="space-y-6 p-6 rounded-lg glass-card">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-blue-400" /> Teleop Period
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-white/90 font-medium">
                      Specimens in Teleop: {formData.specimensTeleop}
                    </Label>
                    <Slider value={[formData.specimensTeleop]} onValueChange={(value) => handleInputChange('specimensTeleop', value[0])} max={20} min={1} step={1} className="w-full [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-400" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-white/90 font-medium">
                      Samples in Teleop: {formData.samplesTeleop}
                    </Label>
                    <Slider value={[formData.samplesTeleop]} onValueChange={(value) => handleInputChange('samplesTeleop', value[0])} max={20} min={1} step={1} className="w-full [&_[role=slider]]:bg-blue-500 [&_[role=slider]]:border-blue-400" />
                  </div>
                </div>
              </div>

              {/* Ascent Section */}
              <div className="space-y-4 p-6 rounded-lg glass-card">
                <h3 className="text-xl font-semibold text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" /> Ascent
                </h3>
                <div className="space-y-3">
                  <Label className="text-white/90 font-medium">
                    Ascent Level: {formData.ascent}
                  </Label>
                  <Slider value={[formData.ascent]} onValueChange={(value) => handleInputChange('ascent', value[0])} max={3} min={1} step={1} className="w-full [&_[role=slider]]:bg-green-500 [&_[role=slider]]:border-green-400" />
                </div>
              </div>

              {/* Park Options (Autonomous switches) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 rounded-lg glass-card">
                  <Label htmlFor="parkSpecimenAuto" className="text-white/90 font-medium">Park in Specimen Auto</Label>
                  <Switch id="parkSpecimenAuto" checked={formData.parkSpecimenAuto} onCheckedChange={(checked) => handleInputChange('parkSpecimenAuto', checked)} className="data-[state=checked]:bg-purple-600" />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg glass-card">
                  <Label htmlFor="parkTeleopAuto" className="text-white/90 font-medium">Park in Teleop Auto</Label>
                  <Switch id="parkTeleopAuto" checked={formData.parkTeleopAuto} onCheckedChange={(checked) => handleInputChange('parkTeleopAuto', checked)} className="data-[state=checked]:bg-purple-600" />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg transition-all duration-300 shadow-lg">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" /> Submit
                  </div>
                )}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
