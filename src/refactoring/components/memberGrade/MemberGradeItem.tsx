import { Grade } from "../../../types";

interface MemberGradeItemProps {
  grade: Grade;
}

const MemberGradeItem = ({ grade }: MemberGradeItemProps) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-2 flex items-center gap-3">
      <h3 className="text-lg font-semibold">{grade.name} 등급</h3>
      <h4 className="text-gray-600 text-lg font-semibold">
        {grade.discountRate}% 할인
      </h4>
    </div>
  );
};

export default MemberGradeItem;
