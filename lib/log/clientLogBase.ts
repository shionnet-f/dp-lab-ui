type ExperimentSet = {
    phase: string;
    label: string;
};

type ExperimentPlan = {
    sessionId?: string;
    participantId?: string;
    setOrder?: string;
    educationVersion?: string;
    sets?: Record<string, ExperimentSet>;
};

type ClientLogBaseParams = {
    searchParams: URLSearchParams;
};

export function getClientLogBase({ searchParams }: ClientLogBaseParams) {
    const rawPlan = localStorage.getItem("experimentPlan");

    let plan: ExperimentPlan = {};

    if (rawPlan) {
        try {
            plan = JSON.parse(rawPlan) as ExperimentPlan;
        } catch {
            plan = {};
        }
    }

    const set = searchParams.get("set");
    const trial = searchParams.get("trial");

    const setIndex = set ? Number(set) : undefined;
    const trialNo = trial ? Number(trial) : undefined;

    const taskSetId =
        setIndex !== undefined ? plan.sets?.[String(setIndex)]?.phase : undefined;

    return {
        sessionId: plan.sessionId,
        participantId: plan.participantId,
        setIndex,
        taskSetId,
        trialNo,
    };
}