export type SetOrder = "A_Ap_B" | "B_Bp_A";

export type SetIndex = "1" | "2" | "3";

export type FixationPosition = "before" | "after";

export type GateStep = "set1" | "education" | "set2" | "set3";

export type RestNext = "education" | "set2" | "set3";

export type ExperimentSet = {
  phase: "a1" | "a2" | "b1" | "b2";
  label: string;
};

export type ExperimentPlan = {
  sessionId: string;
  participantId: string;
  setOrder: SetOrder;
  educationVersion: "A" | "B";
  sets: Record<SetIndex, ExperimentSet>;
};