import { createContext, useContext } from "react";
import { Grade } from "../../types";
import { useGrade } from "../hooks";

interface MemberContextType {
  grades: Grade[];
  addGrade: (grade: Grade) => void;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider = ({ children }: { children: React.ReactNode }) => {
  const { grades, addGrade } = useGrade();

  return (
    <MemberContext.Provider value={{ grades, addGrade }}>
      {children}
    </MemberContext.Provider>
  );
};
export const useMemberContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("useMemberContext must be used within a MemberProvider");
  }
  return context;
};
