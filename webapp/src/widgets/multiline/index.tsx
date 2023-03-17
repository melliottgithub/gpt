import Flex from "../flex";

interface MultilineProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

const Multiline: React.FC<MultilineProps> = (props) => {
  const { label, className,  ...rest } = props;
  
  return (
    <Flex className="" flexDirection="column">
      {label && <label className="font-size-small">{label}</label>}
      <textarea className={`${className} font-size-medium`} {...rest} />
    </Flex>
  );
};
export default Multiline;
