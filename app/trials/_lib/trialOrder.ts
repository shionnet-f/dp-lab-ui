export type TrialSetId = "a1" | "a2" | "b1" | "b2";

const commonTrialOrderA1 = [
  "trial5",
  "trial1-3",
  "trial2",
  "trial7",
  "trial1-1",
  "trial9",
  "trial4",
  "trial1-5",
  "trial10",
  "trial6",
  "trial1-2",
  "trial11",
  "trial3",
  "trial1-4",
  "trial8",
] as const;

const commonTrialOrderA2 = [
  "trial8",
  "trial1-2",
  "trial6",
  "trial3",
  "trial1-5",
  "trial10",
  "trial2",
  "trial1-1",
  "trial11",
  "trial7",
  "trial1-3",
  "trial4",
  "trial9",
  "trial1-4",
  "trial5",
];

const commonTrialOrderB1 = [
  "trial4",
  "trial1-4",
  "trial9",
  "trial2",
  "trial1-1",
  "trial7",
  "trial10",
  "trial1-2",
  "trial5",
  "trial11",
  "trial1-5",
  "trial3",
  "trial8",
  "trial1-3",
  "trial6",
];

const commonTrialOrderB2 = [
  "trial11",
  "trial1-2",
  "trial5",
  "trial3",
  "trial1-4",
  "trial8",
  "trial6",
  "trial1-1",
  "trial9",
  "trial2",
  "trial1-5",
  "trial10",
  "trial4",
  "trial1-3",
  "trial7",
];

export const trialOrder: Record<TrialSetId, string[]> = {
  a1: [...commonTrialOrderA1],
  a2: [...commonTrialOrderA2],
  b1: [...commonTrialOrderB1],
  b2: [...commonTrialOrderB2],
};
