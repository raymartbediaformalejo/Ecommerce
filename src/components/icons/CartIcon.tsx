import { SVGProps } from "react";

export function CartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M3 6h19l-3 10H6L3 6Zm0 0l-.75-2.5m8.75 16a1.5 1.5 0 0 1-3 0m9 0a1.5 1.5 0 0 1-3 0"
      ></path>
    </svg>
  );
}
