'use client'
import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';

const CustomNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "HOME",
    "ABOUT US",
    "COMMITTEE",
    "NEWS & EVENTS",
    "CONNECT WITH US",
    "CONTACT US",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src="/logo.png" width={190} height={50} alt="logo" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center ">
        <NavbarItem>
          <Link color="foreground" href="/home">
            HOME
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="aboutus">
            ABOUT US
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/committee">
            COMMITTEE
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="news">
            NEWS & EVENTS
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/connectwithus">
            CONNECT WITH US
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contactus">
            CONTACT US
          </Link>
        </NavbarItem>
        
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default CustomNavBar