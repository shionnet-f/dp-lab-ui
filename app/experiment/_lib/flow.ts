import type { GateKind, Phase, RestAfter, SetOrder } from "./types";

const FLOW_MAP: Record<
    SetOrder,
    { set1: Phase; set2: Phase; set3: Phase }
> = {
    A_Ap_B: {
        set1: "a1", // A
        set2: "a2", // A'
        set3: "b1", // B
    },
    B_Bp_A: {
        set1: "b1", // B
        set2: "b2", // B'
        set3: "a1", // A
    },
};

export function getPhaseByGateKind(
    setOrder: SetOrder,
    kind: GateKind
): Phase | null {
    if (kind === "education") return null;
    return FLOW_MAP[setOrder][kind];
}

export function getFirstTrialPath(
    phase: Phase,
    setIndex: 1 | 2 | 3
): string {
    return `/trials/${phase}/trial1-1/start?set=${setIndex}`;
}

export function getGatePath(kind: GateKind): string {
    return `/experiment/gate?kind=${kind}`;
}

export function getFixationPath(
    setIndex: 1 | 2 | 3,
    position: "before" | "after"
): string {
    return `/experiment/fixation?set=${setIndex}&position=${position}`;
}

export function getRestPath(after: RestAfter): string {
    return `/experiment/rest?after=${after}`;
}

export function getNextGatePathAfterRest(after: RestAfter): string {
    switch (after) {
        case "set1":
            return getGatePath("education");
        case "education":
            return getGatePath("set2");
        case "set2":
            return getGatePath("set3");
        default:
            return "/";
    }
}