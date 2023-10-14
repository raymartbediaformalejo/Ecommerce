import { SVGProps } from "react";
export function ArrowIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.3em"
      height="1.3em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        opacity={0.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="m6 9l6 6l6-6"
      ></path>
    </svg>
  );
}
