import { Grid, Animation, Text, Toaster, fr } from '@prismane/core'
import HeaderEmployee from '~/components/HeaderEmployee/HeaderEmployee'
import NavbarEmployee from '~/components/NavbarEmployee/NavbarEmployee'
import NavbarEmployeeIcon from '~/components/NavbarEmployee/NavbarEmployeeIcon'

import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import Content from '~/pages/Admin/Content/Content'
import Home from '~/pages/Admin/Home/Home'
import Category from '~/pages/Admin/Category/Category'
import Menu from '~/pages/Admin/Menu/Menu'
import Table from '~/pages/Admin/Table/Table'
import EmployeeManager from '~/pages/Admin/EmployeeManager/EmployeeManager'
import CustomerManager from '~/pages/Admin/CustomerManager/CustomerManager'
import Reservation from '~/pages/Admin/Reservation/Reservation'
import Order from '~/pages/Admin/Order/Order'

const Admin = ({ employee }) => {
  const [open, setOpen] = useState(
    sessionStorage.getItem('openNavbar') === 'true' ? true : false
  )
  return (
    <>
      <Toaster position='top-right' mt={fr(10)}>
        <Grid templateColumns={12} templateRows={13} h={'100vh'}>
          {/* Navbar */}
          <Grid.Item
            columnStart={1}
            columnEnd={!open ? 2 : 3}
            h={'100vh'}
            bsh={'md'}
          >
            {open ? (
              <Animation animation={'scale-x'} animated={open}>
                <NavbarEmployee employee={employee} />
              </Animation>
            ) : (
              <NavbarEmployeeIcon employee={employee} />
            )}
          </Grid.Item>
          {/* Header */}
          <Grid.Item
            columnStart={!open ? 2 : 3}
            columnEnd={13}
            rowStart={1}
            rowEnd={2}
            bsh={'base'}
          >
            <HeaderEmployee open={open} setOpen={setOpen} employee={employee} />
          </Grid.Item>
          {/* Body */}
          <Grid.Item
            columnStart={!open ? 2 : 3}
            columnEnd={13}
            rowStart={2}
            rowEnd={'auto'}
          >
            <Routes>
              <Route path='home' element={<Home />} />
              <Route path='content' element={<Content />} />
              <Route path='category' element={<Category />} />
              <Route path='menu' element={<Menu />} />
              <Route path='table' element={<Table />} />
              <Route path='employees' element={<EmployeeManager />} />
              <Route path='customers' element={<CustomerManager />} />
              <Route path='reservation' element={<Reservation />} />
              <Route path='order' element={<Order />} />
              <Route path='*' element={<Home />} />
            </Routes>
          </Grid.Item>
        </Grid>
      </Toaster>
    </>
  )
}

export default Admin
