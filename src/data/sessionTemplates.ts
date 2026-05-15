export interface SessionSection {
  name: string;
  timeBlock: string;
  movementFamilies: string[];
}

export interface SessionTemplate {
  id: string;
  name: string;
  sections: SessionSection[];
}

export const defaultSession: SessionTemplate = {
  id: 'standard-session',
  name: 'Standard 60-Minute Session',
  sections: [
    {
      name: 'Warm-Up: Explore + Prepare',
      timeBlock: '0:00–0:08',
      movementFamilies: ['Warm-Up / Movement Prep'],
    },
    {
      name: 'Structural Capacity: Build the Frame',
      timeBlock: '0:08–0:25',
      movementFamilies: [
        'Knee / Quad / Split Squat', 
        'Calf / Achilles / Ankle', 
        'Hamstring / Hip / Posterior Chain', 
        'Trunk / Brace / Rotate'
      ],
    },
    {
      name: 'Neuromuscular Coordination: Organize the Athlete',
      timeBlock: '0:25–0:42',
      movementFamilies: [
        'Landing / Deceleration', 
        'Lateral Movement', 
        'Ground-Based Movement', 
        'Shoulder / Scap / Upper Body'
      ],
    },
    {
      name: 'Force Expression: Express Power',
      timeBlock: '0:42–0:55',
      movementFamilies: ['Power Circuit'],
    },
    {
      name: 'Reset + Reflect',
      timeBlock: '0:55–1:00',
      movementFamilies: ['Reset / Mobility'],
    },
  ],
};
