import { CSSProperties, ReactNode } from "react";

interface Props {
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  justify?: "start" | "end" | "center" | "between" | "around" | "stretch";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  children: ReactNode;
  style?: CSSProperties;
}

export function Flex({ direction, justify, align, style, children }: Props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
