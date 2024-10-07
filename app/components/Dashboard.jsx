"use client";
import React, { useEffect, useState } from "react";
import Table from "./table";
import GeneralHeader from "./GeneralHeader";
import { useRouter } from "next/navigation";
import PopUp from "./deletePop";

export default function Dashboard() {
  const [users, setUsers] = useState();
  const [open, setOpen] = useState(false);
  const [idToDelete, setId] = useState();
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      let addedData = localStorage.getItem("addedData");
      let EditData = localStorage.getItem("EditData");
      let editTemp = JSON.parse(EditData);
      let temp = JSON.parse(addedData);
      if (editTemp) {
        // localStorage.removeItem("EditData");
        const updatedArray = data.map((obj) =>
          obj.id === editTemp.id ? editTemp : obj
        );
        console.log("updatedArray", updatedArray);
        setUsers(updatedArray);
      }
      if (temp) {
        // localStorage.removeItem("addedData");
        setUsers([temp, ...data]);
      } else {
        if (!editTemp) {
          console.log("updatedArray111", editTemp);
          setUsers(data);
        }
      }
      console.log("data", data);
    })();
  }, []);

  const handleCreate = () => {
    router.push("/create_user");
  };
  const handleEdit = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
    router.push("/edit_user");
  };
  const handleOpen = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleDelete = async () => {
    console.log("hello");

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${idToDelete}`,
      {
        method: "DELETE",
      }
    );
    let data = await response.json();

    let temp = [...users];
    let newData = temp.filter((e) => e.id !== idToDelete);
    setOpen(false);
    setUsers(newData);
  };
  return (
    <div className=" w-full h-full p-2 ">
      {open && (
        <PopUp
          button={"Delete"}
          text={"ARE YOU SURE YOU WANT TO DELETE USER"}
          name={""}
          setOpen={setOpen}
          apicall={handleDelete}
        />
      )}

      <GeneralHeader
        mainSection="Dashboard"
        button="Create User"
        onClickFunction={handleCreate}
      />
      {users && (
        <Table
          users={users}
          handleEdit={handleEdit}
          handleDelete={handleOpen}
        />
      )}
    </div>
  );
}
