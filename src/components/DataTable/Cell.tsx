import { typedEntries } from "@/functions/object";
import Link from "next/link";
import { Fragment } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  value: unknown;
  className?: string;
};

export const Cell = ({ value, className }: Props) => {
  if (value instanceof Date) {
    return <div className={className}>{value.toLocaleString()}</div>;
  }
  switch (typeof value) {
    case "string":
      if (!isUrl(value)) return <div className={className}>{value}</div>;
      if (isImageUrl(value)) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img alt={value} className={className} src={value} />;
      }
      return (
        <Link
          className={twMerge("text-blue-500", className)}
          href={value}
          rel="noopener noreferrer"
          target="_blank"
        >
          {value}
        </Link>
      );

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

const isUrl = (string: string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};

const isImageUrl = (string: string) => {
  const validImageRegex =
    /\.(apng|avif|gif|jpe?g|jfif|pjpeg|pjp|png|svg|webp|bmp|ico|cur|tiff?)($|\?)/i;
  return validImageRegex.test(string);
};
