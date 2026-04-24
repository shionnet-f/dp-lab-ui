export type SetOrder = "A_Ap_B" | "B_Bp_A";

export type Phase = "a1" | "a2" | "b1" | "b2";

export type GateKind = "set1" | "education" | "set2" | "set3";

export type FixationPosition = "before" | "after";

export type RestAfter = "set1" | "education" | "set2";

export type ExperimentSetup = {
    participantId: string;
    setOrder: SetOrder;
};