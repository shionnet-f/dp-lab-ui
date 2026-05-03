export type SetOrder = "A_Ap_B" | "B_Bp_A";
export type Phase = "a1" | "a2" | "b1" | "b2";
export type SetIndex = "1" | "2" | "3";
export type EducationVersion = "A" | "B";
export type GateStep = "set1" | "education" | "set2" | "set3";
export type RestNext = "education" | "set2" | "set3";
export type FixationPosition = "before" | "after";

export type ExperimentSet = {
  phase: Phase;
  label: "A" | "A'" | "B" | "B'";
};

export type ExperimentPlan = {
  participantId: string;
  setOrder: SetOrder;
  educationVersion: EducationVersion;
  sets: Record<SetIndex, ExperimentSet>;
};
