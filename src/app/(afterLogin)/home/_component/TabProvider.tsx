"use client";
import { createContext, useState } from "react";

export const TabContext = createContext({
  tab: "rec",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTab: (value: "rec" | "fol") => {},
});

type Props = {
  children: React.ReactNode;
};

export default function TabProvider({ children }: Props) {
  const [tab, setTab] = useState("rec");

  return (
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  );
}
