import React from "react";

export default function PopUp({ setOpen, name, button, apicall, text }) {
  return (
    <div className=" absolute rounded-lg bg-white  flex justify-center top-1/2 left-[40%] w-80 h-40">
      <div className="   text-bold ">
        <div className=" flex justify-center">
          <p className="  bg-green-50 text-bold font-bold ">{button} USER</p>
        </div>
        <p className="  text-sm    text-center mt-2">{text}??</p>
        <div className=" flex items-center justify-between p-2 h-1/2">
          <button
            onClick={() => setOpen(false)}
            className=" bg-black text-white hover:bg-red-400 rounded-lg w-20 h-10  "
          >
            Cancel
          </button>
          <button
            onClick={apicall}
            className=" mt-2 w-20 h-10 bg-black   hover:bg-red-400 rounded-lg text-white"
          >
            {button}
          </button>
        </div>
      </div>
    </div>
  );
}
