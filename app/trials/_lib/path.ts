export function getTrialPath(
  setType: "a1" | "a2" | "b1" | "b2",
  trialId: string,
  page: "start" | "product" | "checkout" | "confirm" | "complete",
) {
  return `/trials/${setType}/${trialId}/${page}`;
}

export function getPracticePath(
  trialId: string,
  page: "start" | "product" | "checkout" | "confirm" | "complete",
) {
  return `/practice/${trialId}/${page}`;
}
