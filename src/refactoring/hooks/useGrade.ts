import { useEffect, useState } from "react";
import { Grade } from "../../types";

export const initialGrade = {
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

  useEffect(() => {
    getGrades();
  }, []);

  const getGrades = async () => {
    const response = await fetch("/api/member/grade");
    
    const data = await response.json();
    setGrades(data);
  }

  
  const addGrade = async (grade: Grade) => {
    const response = await fetch("/api/member/grade", {
      method: "POST",
      body: JSON.stringify(grade),
    });

    const data = await response.json();
    setGrades([...grades, data]);
  }

  return {
    grades,
    addGrade,
  }
}

export const useSelectedGrade = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);

  const applyGrade = (grade: Grade) => {
    setSelectedGrade(grade);
  }

  return {
    selectedGrade,
    applyGrade,
  }
}
