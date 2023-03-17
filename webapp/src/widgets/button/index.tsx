import { ButtonHTMLAttributes } from "react";
import './styles.css';

type ButtonVariantType = 'primary' | 'secondary' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariantType;
  busy?: boolean;
}

// write a SVG icon of hourglass component in array function below
const Hourglass = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="white">
      <path d="M0 0h24v24H0V0z" fill="none" />
      <path d="M6 2v6h.01L6 8.01 10 12l-4 4 .01.01H6V22h12v-5.99h-.01L18 16l-4-4 4-3.99-.01-.01H18V2H6zm10 14.5V20H8v-3.5l4-4 4 4zm-4-5l-4-4V4h8v3.5l-4 4z" />
    </svg>
  );
}

export default function Button(props: ButtonProps) {
  const disabledStyle = props.disabled || props.busy ? `-disabled` : '';
  const variantStyle = `button-${props.variant}${disabledStyle}`;
  const labelVariantStyle = `button-label-${props.variant}`;
  const busy = props.busy ? true : false;
  return (
    <button className={`button font-size-small ${variantStyle} ${props.className || ''}`} type="button" disabled={props.disabled || busy} onClick={props.onClick}>
      {!busy && <span className={`button-label font-size-small ${labelVariantStyle}`}>{props.children}</span>}
      {busy && <Hourglass />}
    </button>
  );
}