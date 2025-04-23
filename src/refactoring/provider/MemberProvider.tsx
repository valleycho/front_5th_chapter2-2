import { createContext, useContext } from "react";
import { Grade, Member } from "../../types";
import { useMember } from "../hooks/useMember";
import { useGrade } from "../hooks";

interface MemberContextType {
  member: Member;
  grades: Grade[];
  addGrade: (grade: Grade) => void;
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export const MemberProvider = ({
  children,
  initialMember,
}: {
  children: React.ReactNode;
  initialMember: Member;
}) => {
  const { member } = useMember(initialMember);
  const { grades, addGrade } = useGrade();

  return (
    <MemberContext.Provider value={{ member, grades, addGrade }}>
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
