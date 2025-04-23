import { useNewGrade } from "../../hooks";
import { useMemberContext } from "../../provider/MemberProvider";

interface MemberGradeFormProps {
  setShow: (show: boolean) => void;
}

const MemberGradeForm = ({ setShow }: MemberGradeFormProps) => {
  const { newGrade, setNewGrade, clearNewGrade } = useNewGrade();
  const { addGrade } = useMemberContext();

  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">새 회원 등급 추가</h3>
      <div className="mb-2">
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          등급명
        </label>
        <input
          id="productName"
          type="text"
          value={newGrade.name}
          onChange={(e) => {
            setNewGrade({
              ...newGrade,
              name: e.target.value,
            });
          }}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          할인율(%)
        </label>
        <input
          id="productName"
          type="number"
          value={newGrade.discountRate}
          onChange={(e) => {
            setNewGrade({
              ...newGrade,
              discountRate: parseInt(e.target.value),
            });
          }}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={() => {
          addGrade(newGrade);
          setShow(false);
          clearNewGrade();
        }}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </div>
  );
};

export default MemberGradeForm;
