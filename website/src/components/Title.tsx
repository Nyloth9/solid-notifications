import { useLocation } from "@solidjs/router";

interface Props {
  children: string;
}

export default function Title(props: Props) {
  const location = useLocation();

  if (typeof document === "undefined") {
    return null;
  }

  document.title =
    location.pathname === "/"
      ? "Solid Notifications"
      : `${props.children} | Solid Notifications`;

  return null;
}
