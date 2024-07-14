'use client'
import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem} from "@nextui-org/react";
import Image from 'next/image';
import Link from 'next/link';

const CustomNavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { id: 1, name: "Home", link: "/home" },
    { id: 2, name: "About Us", link: "/aboutus" },
    { id: 3, name: "Committee", link: "/committee" },
    { id: 4, name: "News & Events", link: "/news" },
    { id: 5, name: "Connect With Us", link: "/connectwithus" },
    { id: 6, name: "Contact Us", link: "/contactus" },
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
          <Link color="foreground" href="/aboutus">
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
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}

export default CustomNavBar