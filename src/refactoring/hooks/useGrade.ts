import { useState } from "react";
import { Grade } from "../../types";

const initialGrade = {
    id: "",
    name: "",
    discountRate: 0,
}

export const useNewGrade = () => {
    const [newGrade, setNewGrade] = useState<Grade>(initialGrade);

    const clearNewGrade = () => {
        setNewGrade(initialGrade);
    }

    return {
        newGrade,
        setNewGrade,
        clearNewGrade,
    }
}

export const useGrade = () => {
    const [grades, setGrades] = useState<Grade[]>([]);

    const addGrade = (grade: Grade) => {
        setGrades([...grades, grade]);
    }

    return {
        grades,
        addGrade,
    }
}