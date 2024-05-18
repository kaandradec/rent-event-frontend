import { Switch } from "@nextui-org/react";
import { MoonIcon } from "../icons/MoonIcon";
import { SunIcon } from "../icons/SunIcon";
import { useTheme } from "next-themes";

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      defaultSelected
      size="sm"
      color="primary"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    ></Switch>
  );
}
