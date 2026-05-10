export type TrialSetId = "a1" | "a2" | "b1" | "b2";

const commonTrialOrder = [
  "trial2",
  "trial1-1",
  "trial3",
  "trial4",
  "trial1-2",
  "trial5",
  "trial6",
  "trial1-3",
  "trial7",
  "trial8",
  "trial1-4",
  "trial9",
  "trial10",
  "trial1-5",
  "trial11",
] as const;

export const trialOrder: Record<TrialSetId, string[]> = {
  a1: [...commonTrialOrder],
  a2: [...commonTrialOrder],
  b1: [...commonTrialOrder],
  b2: [...commonTrialOrder],
};
