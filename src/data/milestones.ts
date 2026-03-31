export interface Milestone {
  day: 7 | 14 | 21 | 30;
  name: string;
  description: string;
  milestoneLabel: string;
  serial: string;
  color: {
    bg: string;
    border: string;
    ghost: string;
    ghostOpacity: number;
    dayLabel: string;
    dayNumber: string;
    achName: string;
    bottomBorder: string;
    uni: string;
    serialText: string;
    milestoneLbl: string;
  };
}

export const MILESTONES: Record<number, Milestone> = {
  7: {
    day: 7,
    name: 'First week done',
    description: "Seven days in. The habit is forming. You've set up your AI foundation and built your first architecture.",
    milestoneLabel: 'Milestone 1',
    serial: 'ICB · 30D · 007',
    color: {
      bg: '#0c0a1d',
      border: '#1e1a38',
      ghost: '#534AB7',
      ghostOpacity: 0.06,
      dayLabel: '#534AB7',
      dayNumber: '#e8e6ff',
      achName: '#AFA9EC',
      bottomBorder: '#1e1a38',
      uni: '#534AB7',
      serialText: '#26215C',
      milestoneLbl: '#534AB7',
    },
  },
  14: {
    day: 14,
    name: 'Two weeks strong',
    description: "Your Azure web app is validated with tfsec and checkov, documented, and published to GitHub.",
    milestoneLabel: 'Milestone 2',
    serial: 'ICB · 30D · 014',
    color: {
      bg: '#020d08',
      border: '#073d26',
      ghost: '#0F6E56',
      ghostOpacity: 0.08,
      dayLabel: '#0F6E56',
      dayNumber: '#e0f5ed',
      achName: '#5DCAA5',
      bottomBorder: '#073d26',
      uni: '#0F6E56',
      serialText: '#04342C',
      milestoneLbl: '#0F6E56',
    },
  },
  21: {
    day: 21,
    name: 'Multi-cloud builder',
    description: "Azure. AWS. GCP. Same architecture, three clouds, all validated, documented, and published.",
    milestoneLabel: 'Milestone 3',
    serial: 'ICB · 30D · 021',
    color: {
      bg: '#0d0900',
      border: '#3d2600',
      ghost: '#854F0B',
      ghostOpacity: 0.08,
      dayLabel: '#854F0B',
      dayNumber: '#fff4e0',
      achName: '#EF9F27',
      bottomBorder: '#3d2600',
      uni: '#854F0B',
      serialText: '#412402',
      milestoneLbl: '#854F0B',
    },
  },
  30: {
    day: 30,
    name: '30-Day challenge complete',
    description: "30 days. One complete project across three clouds. The 75-Day Advanced Track is now unlocked.",
    milestoneLabel: 'Complete',
    serial: 'ICB · 30D · 030',
    color: {
      bg: '#0e0500',
      border: '#3d1500',
      ghost: '#712B13',
      ghostOpacity: 0.09,
      dayLabel: '#993C1D',
      dayNumber: '#ffe8e0',
      achName: '#D85A30',
      bottomBorder: '#3d1500',
      uni: '#993C1D',
      serialText: '#4A1B0C',
      milestoneLbl: '#993C1D',
    },
  },
};

export const MILESTONE_DAYS = [7, 14, 21, 30] as const;
