import { getTrialPath } from "./path";
import { trialOrder, type TrialSetId } from "./trialOrder";

type GetCurrentTrialFolderNameArgs = {
  setId: TrialSetId;
  trialIndex: string;
};

type GetNextTrialStepArgs = {
  setId: TrialSetId;
  trialIndex: string;
};

export type NextTrialStep = {
  nextPath: string;
  nextParams?: Record<string, string>;
};

export function getCurrentTrialFolderName({
  setId,
  trialIndex,
}: GetCurrentTrialFolderNameArgs) {
  const index = Number(trialIndex) - 1;

  if (!Number.isInteger(index) || index < 0) {
    return null;
  }

  return trialOrder[setId][index] ?? null;
}

export function getNextTrialStep({
  setId,
  trialIndex,
}: GetNextTrialStepArgs): NextTrialStep {
  const currentIndex = Number(trialIndex);

  if (!Number.isInteger(currentIndex) || currentIndex < 1) {
    return {
      nextPath: "/experiment/fixation",
      nextParams: { position: "after" },
    };
  }

  const nextIndex = currentIndex + 1;
  const nextTrialFolderName = trialOrder[setId][nextIndex - 1];

  if (!nextTrialFolderName) {
    return {
      nextPath: "/experiment/fixation",
      nextParams: { position: "after" },
    };
  }

  return {
    nextPath: getTrialPath(setId, nextTrialFolderName, "start"),
    nextParams: { trial: String(nextIndex) },
  };
}
