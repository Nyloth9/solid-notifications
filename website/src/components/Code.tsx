import { JSX } from "solid-js";

interface Props {
  children: JSX.Element;
}

export default function Code({ children }: Props) {
  return (
    <div class="not-prose my-6 overflow-hidden overflow-x-auto rounded-2xl bg-slate-800 p-4 text-left text-sm leading-5 text-white shadow-md dark:bg-[#1c2635] dark:ring-1 dark:ring-white/10">
      {children}
    </div>
  );
}
