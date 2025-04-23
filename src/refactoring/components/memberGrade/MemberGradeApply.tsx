import { useCartContext } from "../../provider/CartProvider";
import { useMemberContext } from "../../provider/MemberProvider";

const MemberGradeApply = () => {
  const { grades } = useMemberContext();
  const { selectedGrade, applyGrade } = useCartContext();

  return (
    <div className="mt-6 bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold mb-2">회원 등급 적용</h2>
      <select
        onChange={(e) => {
          const grade = grades[parseInt(e.target.value)];

          applyGrade(grade);
        }}
        className="w-full p-2 border rounded mb-2"
      >
        <option value="">회원 등급 선택</option>
        {grades.map((grade, index) => (
          <option key={grade.id} value={index}>
            {grade.name} - {grade.discountRate}%
          </option>
        ))}
      </select>
      {selectedGrade && (
        <p className="text-green-600">
          적용된 회원등급: {selectedGrade.name}({selectedGrade.discountRate}%
          할인)
        </p>
      )}
    </div>
  );
};

export default MemberGradeApply;
