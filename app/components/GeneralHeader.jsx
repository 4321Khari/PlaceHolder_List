import React from "react";

export default function GeneralHeader({
  mainSection,
  button,
  onClickFunction,
}) {
  return (
    <div className=" flex w-full h-20 justify-between">
      <p className=" text-lg font-bold">{mainSection}</p>
      <button></button>
      {button && (
        <button
          className="w-24 rounded-lg text-sm font-bold bg-blue-200 h-10 "
          onClick={onClickFunction}
        >
          {button}
        </button>
      )}
    </div>
  );
}
