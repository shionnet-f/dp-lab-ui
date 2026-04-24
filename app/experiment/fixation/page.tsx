"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
    getFirstTrialPath,
    getPhaseByGateKind,
    getRestPath,
} from "../_lib/flow";
import { loadExperimentSetup } from "../_lib/storage";
import type {
    ExperimentSetup,
    FixationPosition,
    GateKind,
} from "../_lib/types";

const DURATION_SECONDS = 30;

function isFixationPosition(value: string | null): value is FixationPosition {
    return value === "before" || value === "after";
}

function isSetIndex(value: string | null): value is "1" | "2" | "3" {
    return value === "1" || value === "2" || value === "3";
}

function getGateKindFromSet(setIndex: "1" | "2" | "3"): GateKind {
    switch (setIndex) {
        case "1":
            return "set1";
        case "2":
            return "set2";
        case "3":
            return "set3";
        default:
            return "set1";
    }
}

function getNextPath(
    setup: ExperimentSetup,
    setIndex: "1" | "2" | "3",
    position: FixationPosition
) {
    if (position === "before") {
        const gateKind = getGateKindFromSet(setIndex);
        const phase = getPhaseByGateKind(setup.setOrder, gateKind);

        if (!phase) return "/";
        return getFirstTrialPath(phase, Number(setIndex) as 1 | 2 | 3);
    }

    if (setIndex === "1") {
        return getRestPath("set1");
    }
    if (setIndex === "2") {
        return getRestPath("set2");
    }
    return "/experiment/survey";
}

export default function ExperimentFixationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [setup, setSetup] = useState<ExperimentSetup | null | undefined>(undefined);
    const [remainingSeconds, setRemainingSeconds] = useState(DURATION_SECONDS);

    const setParam = searchParams.get("set");
    const positionParam = searchParams.get("position");

    const setIndex = isSetIndex(setParam) ? setParam : null;
    const position = isFixationPosition(positionParam) ? positionParam : null;

    useEffect(() => {
        const data = loadExperimentSetup();
        setSetup(data);
    }, []);

    const nextPath = useMemo(() => {
        if (!setup || !setIndex || !position) return "/";
        return getNextPath(setup, setIndex, position);
    }, [setup, setIndex, position]);

    useEffect(() => {
        if (!setup || !setIndex || !position) return;

        if (remainingSeconds <= 0) {
            router.push(nextPath);
            return;
        }

        const timer = window.setTimeout(() => {
            setRemainingSeconds((prev) => prev - 1);
        }, 1000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [remainingSeconds, nextPath, position, router, setIndex, setup]);

    if (setup === undefined || setup === null || !setIndex || !position) {
        return null;
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-400 cursor-none">
            <div className="relative h-8 w-8">
                {/* 縦線 */}
                <div className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-white" />
                {/* 横線 */}
                <div className="absolute top-1/2 left-0 w-full h-[3px] -translate-y-1/2 bg-white" />
            </div>
        </main>
    );
}