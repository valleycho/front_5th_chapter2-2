import { useToggleShow } from "../../hooks";

const MemberGrade = () => {
  const { show, setShow } = useToggleShow();

  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">회원 등급 관리</h2>
      <button
        onClick={() => setShow(!show)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        회원등급 추가
      </button>

      {show && <div>회원등급 추가 폼</div>}
    </>
  );
};

export default MemberGrade;
