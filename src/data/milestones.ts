export interface MilestoneDay {
  day: 7 | 14 | 21 | 30;
  name: string;
  description: string;
  color: string;
}

export const MILESTONES: Record<number, MilestoneDay> = {
  7: {
    day: 7,
    name: 'First week done',
    description: "Seven days in. The habit is forming. You've set up your AI foundation and built your first architecture.",
    color: '#7F77DD',
  },
  14: {
    day: 14,
    name: 'Two weeks strong',
    description: "Your Azure web app is scored, validated with tfsec and checkov, documented, and pushed to GitHub.",
    color: '#1D9E75',
  },
  21: {
    day: 21,
    name: 'Multi-cloud builder',
    description: "Azure. AWS. GCP. Same architecture, three clouds, all validated, documented, and published.",
    color: '#EF9F27',
  },
  30: {
    day: 30,
    name: '30-Day challenge complete',
    description: "30 days. One complete project across three clouds. The 75-Day Advanced Track is now unlocked.",
    color: '#D85A30',
  },
};

export const MILESTONE_DAYS = [7, 14, 21, 30] as const;
