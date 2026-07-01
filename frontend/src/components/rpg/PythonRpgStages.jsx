import PythonRpgStageCard from "./PythonRpgStageCard";

export default function PythonRpgStages({ stages, onSelect }) {
    if (!stages || !Array.isArray(stages)) return null;

    return (
        <PythonRpgStageCard
            stages={stages}
            onStageClick={onSelect}
        />
    );
}