import { Title as PageTitle } from "@solidjs/meta";
import { useLocation } from "@solidjs/router";

interface Props {
  children: string;
}

export default function Title(props: Props) {
  const location = useLocation();

  const title =
    location.pathname === "/"
      ? "Solid Notifications"
      : `${props.children} | Solid Notifications`;

  return <PageTitle>{title}</PageTitle>;
}
