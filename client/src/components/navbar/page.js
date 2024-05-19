"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Logo from "@/components/logo/page";

const NavBar = () => {
  return (
    <Navbar className="shadow-lg max-w-full flex justify-center  ">
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit">Social Justice</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link
            className="hover:bg-gray-400 rounded-lg p-1"
            color="foreground"
            href="#"
          >
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            className="hover:bg-gray-400 rounded-lg p-1"
            color="foreground"
            href="#"
          >
            About us
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            className="hover:bg-gray-400 rounded-lg p-1"
            color="foreground"
            href="#"
          >
            News & Events
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            className="hover:bg-gray-400 rounded-lg p-1"
            color="foreground"
            href="#"
          >
            Articles
          </Link>
        </NavbarItem>
        
        <NavbarItem isActive>
          <Link
            className="hover:bg-gray-400 rounded-lg p-1"
            color="foreground"
            href="#"
          >
            Publications
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link
            className="hover:bg-gray-400 rounded-lg p-1"
            color="foreground"
            href="#"
          >
            About us
          </Link>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
