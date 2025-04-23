import { useToggleShow } from "../../hooks";
import { useMemberContext } from "../../provider/MemberProvider";
import MemberGradeForm from "./MemberGradeForm";
import MemberGradeItem from "./MemberGradeItem";

const MemberGrade = () => {
  const { show, setShow } = useToggleShow();
  const { grades } = useMemberContext();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">회원 등급 관리</h2>
      <button
        onClick={() => setShow(!show)}
        className={[
          show
            ? `bg-red-500 hover:bg-red-600`
            : `bg-blue-500 hover:bg-blue-600`,
          "text-white px-4 py-2 rounded mb-4",
        ].join(" ")}
      >
        {show ? "취소" : "회원 등급 추가"}
      </button>

      {show && <MemberGradeForm setShow={setShow} />}
      {grades.map((grade) => (
        <MemberGradeItem key={grade.id} grade={grade} />
      ))}
    </>
  );
};

export default MemberGrade;
