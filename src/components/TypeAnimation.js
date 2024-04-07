import { useEffect, useState } from 'react';

// Define constants for phases
const PHASE_TYPING = 'TYPING';
const PHASE_PAUSING = 'PAUSING';
const PHASE_DELETING = 'DELETING';

const TYPING_INTERVAL = 150;
const PAUSE_INTERVAL = 1000;
const DELETE_INTERVAL = 50;
/*TYpe writer animation component */
const useTypematerial = ({ assignments }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [phase, setPhase] = useState(PHASE_TYPING);
    const [typeAssignments, setAssignmnetpower] = useState('');

    useEffect(() => {
        switch (phase) {
            case PHASE_TYPING: {
                if (phase === PHASE_PAUSING) return;

                const nextTypeAssignment = assignments[selectedIndex].slice(0, typeAssignments.length + 1);

                if (nextTypeAssignment === typeAssignments) {
                    setPhase(PHASE_PAUSING);
                    return;
                }

                const timeout = setTimeout(() => {
                    setAssignmnetpower(nextTypeAssignment);
                }, TYPING_INTERVAL);
                return () => clearTimeout(timeout);
            }
            case PHASE_DELETING: {
                if (!typeAssignments) {
                    const nextIndex = selectedIndex + 1;
                    setSelectedIndex(assignments[nextIndex] ? nextIndex : 0);
                    setPhase(PHASE_TYPING);
                    return;
                }

                const nextRemaining = assignments[selectedIndex].slice(0, typeAssignments.length - 1);
                const timeout = setTimeout(() => {
                    setAssignmnetpower(nextRemaining);
                }, DELETE_INTERVAL);
                return () => clearTimeout(timeout);
            }
            case PHASE_PAUSING:
            default: {
                const timeout = setTimeout(() => {
                    setPhase(PHASE_DELETING);
                }, PAUSE_INTERVAL);
                return () => clearTimeout(timeout);
            }
        }
    }, [assignments, typeAssignments, selectedIndex, phase]);

    return typeAssignments;
};

export default useTypematerial;
