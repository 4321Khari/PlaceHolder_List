"use client";
import React, { useEffect, useState } from "react";
import GeneralHeader from "../components/GeneralHeader";
import { useRouter } from "next/navigation";

export default function EditUser() {
  // const [formdata, setFormdata] = useState({
  //   name: "",
  //   email: "",
  //   phone: "",
  // });
  const [id, setId] = useState();
  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    website: "",
    company: "",
    address: {
      street: "",
      suite: "Apt. 556",
      city: "",
      zipcode: "92998-3874",
    },
  });
  const [nameError, setNameError] = useState();
  const [companyError, setCompanyError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const [phoneNumberError, setPhoneNumberError] = useState();
  useEffect(() => {
    let data = localStorage.getItem("data");
    const user = JSON.parse(data);
    if (user) {
      localStorage.removeItem("data");
      setId(user.id);
      setFormdata({
        name: user.name,
        email: user.email,
        phone: user.phone,

        username: user.username,
        website: user.website,
        company: user.company,
        address: {
          street: user.address.street,
          suite: "Apt. 556",
          city: user.address.city,
          zipcode: "92998-3874",
        },
      });
    }
  });
  const [sucess, setSuccess] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    if (formdata.name.length < 3) {
      setNameError(true);
      console.log("nameisshort");
      return;
    }
    if (formdata.company) {
      if (formdata.company.length < 3) {
        setCompanyError(true);
        console.log("nameisshort");
        return;
      }
    }

    if (formdata.username.length < 3) {
      setUsernameError(true);
      console.log("nameisshort");
      return;
    }
    let temp = { ...formdata };
    // setFormdata((prev) => ({
    //   ...prev,
    //   username: `USER-${formdata.username}`,
    // }));
    temp.username = `USER-${formdata.username}`;
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(temp),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    const res = await response.json();
    if (response.ok) {
      console.log("response", res);

      localStorage.setItem("EditData", JSON.stringify(res));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        router.push("/");
      }, 3000);
    }
    console.log("Created", res);
  };
  const handleBack = () => {
    router.push("/");
  };
  return (
    <div className=" w-full h-full flex items-center p-2 justify-center ">
      {sucess && (
        <div className=" absolute w-full h-full flex items-center justify-center">
          <div className=" w-38 px-2 h-10 flex justify-center items-center rounded-lg bg-green-500">
            User Created Successfully!!
          </div>
        </div>
      )}
      <form
        className=" w-full  "
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        action=""
      >
        <GeneralHeader mainSection="Edit User" />
        <div
          onClick={handleBack}
          className=" text-sm  font-bold cursor-pointer  "
        >
          Goback
        </div>
        <div className=" mt-2 bg-gray-100 rounded-lg w-full h-full flex">
          <div className="   w-1/2 p-2">
            <div className="  flex w-[60%]  justify-between ">
              {" "}
              <label htmlFor="">Name</label>
              {nameError && (
                <p className=" text-red-200  pl-1"> Minimum 3 characters</p>
              )}
            </div>

            <div className="w-full">
              <input
                onChange={(e) => {
                  setFormdata((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
                value={formdata.name}
                required
                type="text"
                className="  pl-2 w-[60%] h-10 rounded-lg  outline-none"
              />
            </div>
            <div className=" mt-2">
              <label>Phone Number</label>
              <div className="w-full">
                <input
                  onChange={(e) => {
                    setFormdata((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }));
                  }}
                  onKeyDown={(e) => {
                    // Allow only numeric characters and control keys
                    if (
                      !/[\d]/.test(e.key) && // Deny non-numeric characters
                      ![
                        "Backspace",
                        "ArrowLeft",
                        "ArrowRight",
                        "Tab",
                        "Delete",
                      ].includes(e.key) // Allow control keys
                    ) {
                      e.preventDefault();
                    }
                  }}
                  required
                  value={formdata.phone}
                  type="tel"
                  className=" pl-2 w-[60%] h-10 rounded-lg  outline-none"
                />
              </div>
            </div>
            <div className=" mt-2">
              <label>Address:</label>
              <div className="w-full mt-2">
                <p className=" mt-1 pl-1">Street</p>
                <input
                  onChange={(e) => {
                    setFormdata((prev) => ({
                      ...prev,
                      address: { street: e.target.value },
                    }));
                  }}
                  value={formdata.address?.street}
                  required
                  type="text"
                  className="  pl-2 w-[60%] h-10 rounded-lg  outline-none"
                />
                <p className=" mt-1 pl-1">City</p>
                <input
                  onChange={(e) => {
                    setFormdata((prev) => ({
                      ...prev,
                      address: { city: e.target.value },
                    }));
                  }}
                  value={formdata.address?.city}
                  required
                  type="text"
                  className="  mt-2 pl-2 w-[60%] h-10 rounded-lg  outline-none"
                />
              </div>
            </div>
            <div className=" mt-2 ">
              <label>Website</label>
              <div className="w-full">
                <input
                  onChange={(e) => {
                    setFormdata((prev) => ({
                      ...prev,
                      website: e.target.value,
                    }));
                  }}
                  value={formdata.website}
                  type="text"
                  className="  pl-2 w-[60%] h-10 rounded-lg  outline-none"
                />
              </div>
            </div>
          </div>
          <div className="w-1/2 p-2">
            <label htmlFor="">Email</label>
            <div className=" w-full">
              <input
                onChange={(e) => {
                  setFormdata((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
                required
                value={formdata.email}
                type="email"
                className=" pl-2 w-[60%] h-10 rounded-lg  outline-none"
              />
            </div>
            <div className=" mt-2">
              <div className="  flex w-[60%]  justify-between ">
                {" "}
                <label htmlFor="">Username</label>
                {usernameError && (
                  <p className=" text-red-200  pl-1"> Minimum 3 characters</p>
                )}
              </div>

              <div className=" w-full">
                <input
                  disabled={true}
                  onChange={(e) => {
                    setUsernameError(false);
                    setFormdata((prev) => ({
                      ...prev,
                      username: `${e.target.value}`,
                    }));
                  }}
                  required
                  value={formdata.username}
                  type="text"
                  className=" pl-2 w-[60%] bg-white h-10 rounded-lg  outline-none"
                />
              </div>
            </div>
            <div className=" mt-2">
              <div className=" flex w-[60%]  justify-between ">
                {" "}
                <label htmlFor="">Company Name</label>
                {companyError && (
                  <p className="  text-red-200 pl-1"> Minimum 3 characters</p>
                )}
              </div>

              <div className=" w-full">
                <input
                  onChange={(e) => {
                    setFormdata((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }));
                  }}
                  value={formdata.company}
                  type="text"
                  className=" pl-2 w-[60%] h-10 rounded-lg  outline-none"
                />
              </div>
            </div>

            <div className=" w-[60%]">
              <div className=" justify-end  flex ">
                <button
                  type="submit"
                  className=" mt-5 w-24 h-10 bg-blue-400 rounded-lg flex items-center justify-center"
                >
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
