import { SVGProps } from "react";

export function DeleteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M19.7143 9.42847L18 23.1428H6.00001L4.28572 9.42847M1.71429 5.9999H22.2857M7.64572 5.50275V2.53704C7.64572 2.08238 7.82634 1.64635 8.14783 1.32486C8.46932 1.00337 8.90535 0.822754 9.36001 0.822754H14.5029C14.9575 0.822754 15.3936 1.00337 15.715 1.32486C16.0365 1.64635 16.2172 2.08238 16.2172 2.53704V5.96561"
        stroke="#313145"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
