interface ProductEditInputProps {
  label: string;
  inputType: "text" | "number";
  inputValue: string | number;
  onInputChange: (value: string) => void;
}

const ProductEditInput = ({
  label,
  inputType,
  inputValue,
  onInputChange,
}: ProductEditInputProps) => {
  return (
    <div className="mb-4">
      <label className="block mb-1">{label} </label>
      <input
        type={inputType}
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
};

export default ProductEditInput;
