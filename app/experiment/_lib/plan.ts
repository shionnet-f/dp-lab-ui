import type { ExperimentPlan, SetOrder } from "./types";

export function createExperimentPlan(
  participantId: string,
  setOrder: SetOrder,
): ExperimentPlan {
  const trimmedParticipantId = participantId.trim();

  if (setOrder === "A_Ap_B") {
    return {
      participantId: trimmedParticipantId,
      setOrder,
      educationVersion: "A",
      sets: {
        "1": { phase: "a1", label: "A" },
        "2": { phase: "a2", label: "A'" },
        "3": { phase: "b1", label: "B" },
      },
    };
  }

  return {
    participantId: trimmedParticipantId,
    setOrder,
    educationVersion: "B",
    sets: {
      "1": { phase: "b1", label: "B" },
      "2": { phase: "b2", label: "B'" },
      "3": { phase: "a1", label: "A" },
    },
  };
}

export function formatSetOrder(setOrder: SetOrder) {
  if (setOrder === "A_Ap_B") return "A → A' → B";
  return "B → B' → A";
}
