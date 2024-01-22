import React, { useState } from "react";
import { categories, dashOptions, navList } from "../../Data/data";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlineUserAdd,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsTags, BsFillKeyboardFill } from "react-icons/bs";
import { BiSolidUserCircle, BiSolidKey } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
  Input,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { selectLoggedInUserInfo } from "../user/userSlice";
import { selectLoggedInUserToken } from "../Auth/authSlice";

const NavbarList = ({ navState }) => {
  const [category, setCategory] = useState("");
  const [dashoptions, setdashoptions] = useState("");
  const user = useSelector(selectLoggedInUserInfo);
  const userToken = useSelector(selectLoggedInUserToken);

  return (
    <>
      {" "}
      {navState == false && (
        <div className="hidden lg:flex flex-row w-2/3 py-2 justify-center gap-5 font-bold">
          <div className="flex flex-row items-center gap-2">
            <AiOutlineHome className="w-8 h-5" />
            <Link to={"/"} className="hover:scale-105 hover:font-extrabold">
              Home
            </Link>
          </div>
          {userToken && (
            <div className="flex flex-row items-center gap-2">
              <BiSolidUserCircle className="w-8 h-5" />

              <Menu className="bg-white w-full">
                <MenuHandler className="bg-white text-black px-3">
                  <Button className="w-full  whitespace-pre-wrap text-xl">
                    {dashoptions ? dashoptions : "Dashboard"}
                  </Button>
                </MenuHandler>
                <MenuList className="flex flex-col gap-2 max-h-72">
                  {dashOptions.map((item) => {
                    return (
                      <Link className="capitalize" key={item.id} to={item.name}>
                        <MenuItem
                          className="cursor-pointer text-md"
                          value={item.name}
                          onClick={(e) => {
                            setdashoptions(e.target.value);
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      </Link>
                    );
                  })}{" "}
                </MenuList>
              </Menu>
            </div>
          )}
          {!userToken ? (
            <>
              <div className="flex flex-row items-center gap-2">
                <BiSolidKey className="w-8 h-5" />
                <Link
                  to={"/login"}
                  className="hover:scale-105 hover:font-extrabold"
                >
                  Login
                </Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <BsFillKeyboardFill className="w-8 h-5" />
                <Link
                  to={"/register"}
                  className="hover:scale-105 hover:font-extrabold"
                >
                  Signup
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <AiOutlineLogout className="w-8 h-5" />
              <Link
                to={"/logout"}
                className="hover:scale-105 hover:font-extrabold"
              >
                Logout
              </Link>
            </div>
          )}{" "}
        </div>
      )}
      {navState == true && (
        <div className="flex lg:hidden h-screen flex-col text-black font-bold w-full px-3 py-10 items-center gap-14">
          <div className="flex flex-row items-center gap-2">
            <AiOutlineHome className="w-8 h-5" />
            <Link to={"/"} className="hover:scale-105 hover:font-extrabold">
              Home
            </Link>
          </div>
          {userToken && (
            <div className="flex flex-row items-center gap-2">
              <BiSolidUserCircle className="w-8 h-5" />

              <Menu className="bg-white w-full">
                <MenuHandler className="bg-white text-black px-3">
                  <Button className="w-full  whitespace-pre-wrap text-xl">
                    {dashoptions ? dashoptions : "Dashboard"}
                  </Button>
                </MenuHandler>
                <MenuList className="flex flex-col gap-2 max-h-72">
                  {dashOptions.map((item) => {
                    return (
                      <Link className="capitalize" key={item.id} to={item.name}>
                        <MenuItem
                          className="cursor-pointer text-md"
                          value={item.name}
                          onClick={(e) => {
                            setdashoptions(e.target.value);
                          }}
                        >
                          {item.name}
                        </MenuItem>
                      </Link>
                    );
                  })}{" "}
                </MenuList>
              </Menu>
            </div>
          )}

          {!userToken ? (
            <>
              <div className="flex flex-row items-center gap-2">
                <BiSolidKey className="w-8 h-5" />
                <Link
                  to={"/login"}
                  className="hover:scale-105 hover:font-extrabold"
                >
                  Login
                </Link>
              </div>
              <div className="flex flex-row items-center gap-2">
                <BsFillKeyboardFill className="w-8 h-5" />
                <Link
                  to={"/register"}
                  className="hover:scale-105 hover:font-extrabold"
                >
                  Signup
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-row items-center gap-2">
              <AiOutlineLogout className="w-8 h-5" />
              <Link
                to={"/logout"}
                className="hover:scale-105 hover:font-extrabold"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      )}{" "}
    </>
  );
};

export default NavbarList;
