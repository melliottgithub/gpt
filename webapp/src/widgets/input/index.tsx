import Flex from "../flex";

interface InputProps {
  label?: string;
  name: string;
  type: string;
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, type, value, onChange }) => {
  return (
    <Flex className="" flexDirection="column">
      {label && <label className="font-size-small">{label}</label>}
      <input type={type} name={name} className="font-size-medium" value={value} onChange={onChange} />
    </Flex>
  );
};
export default Input;
