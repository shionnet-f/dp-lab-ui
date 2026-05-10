export type TrialSetId = "a1" | "a2" | "b1" | "b2";

const commonTrialOrder = [
  "trial1-1",
  "trial1-2",
  "trial1-3",
  "trial1-4",
  "trial1-5",
  "trial2",
  "trial3",
  "trial4",
  "trial5",
  "trial6",
  "trial7",
  "trial8",
  "trial9",
  "trial10",
  "trial11",
] as const;

export const trialOrder: Record<TrialSetId, string[]> = {
  a1: [...commonTrialOrder],
  a2: [...commonTrialOrder],
  b1: [...commonTrialOrder],
  b2: [...commonTrialOrder],
};
