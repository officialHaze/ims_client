import React from "react";

interface Props {
  isError?: boolean;
  message: string;
}

export default function Indicator({ isError, message }: Props) {
  return <div className={`text-left p-1 absolute ${isError && "text-red-500"}`}>{message}</div>;
}
