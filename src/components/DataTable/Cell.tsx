import { typedEntries } from "@/functions/object";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  value: unknown;
  className?: string;
};

export const Cell = ({ value, className }: Props) => {
  switch (typeof value) {
    case "string":
    case "number":
    case "boolean":
    case "bigint":
      return <div className={className}>{`${value}`}</div>;
    case "symbol":
    case "undefined":
    case "function":
      return <div className={className}>{typeof value}</div>;
    case "object":
      if (value === null) return <div>null</div>;
      if (Array.isArray(value)) {
        return value.map((item, index) => (
          <div
            className={twMerge("p-2", index !== 0 && "border-t", className)}
            key={item}
          >
            <Cell value={item} />
          </div>
        ));
      }
      if (isObject(value)) {
        return (
          <div className="grid grid-cols-[min-content_1fr]">
            {typedEntries(value).map(([key, value], index) => (
              <Fragment key={key}>
                <div className={twMerge("p-2", index !== 0 && "border-t")}>
                  {key}
                </div>
                <Cell
                  className={twMerge(
                    "p-2",
                    index !== 0 && "border-t",
                    className,
                  )}
                  value={value}
                />
              </Fragment>
            ))}
          </div>
        );
      }

      return <div className={className}>{String(value)}</div>;
  }
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  value !== undefined;
