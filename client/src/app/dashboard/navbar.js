'use client'
import React from 'react'
import {Navbar, NavbarBrand, NavbarItem, Link, Button} from "@nextui-org/react";
import Logo from '@/components/logo/page';

const AdminNavbar = () => {
  return (
    <Navbar className='shadow-lg'>
    <NavbarBrand className='flex '>
        <Logo/>
    </NavbarBrand>
    
      <NavbarItem>
        <Button as={Link} color="primary" href="#" variant="flat">
          Log out
        </Button>
      </NavbarItem>
    
  </Navbar>
  )
}

export default AdminNavbar