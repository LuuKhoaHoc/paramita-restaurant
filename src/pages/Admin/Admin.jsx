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
import Promotion from '~/pages/Admin/Promotion/Promotion'
import EmployeeManager from '~/pages/Admin/EmployeeManager/EmployeeManager'
import CustomerManager from '~/pages/Admin/CustomerManager/CustomerManager'
import Reservation from '~/pages/Admin/Reservation/Reservation'
import Order from '~/pages/Admin/Order/Order'
import CustomerDetail from '~/pages/Admin/CustomerManager/CustomerCard/CustomerDetail/CustomerDetail'
import Invoice from '~/pages/Admin/Invoice/Invoice'
import Contact from '~/pages/Admin/Contact/Contact'

const Admin = ({ employee }) => {
  const [open, setOpen] = useState(
    sessionStorage.getItem('openNavbar') === 'true' ? true : false
  )
  return (
    <>
      <Toaster position='top-right' mt={fr(10)}>
        <Grid templateColumns={12}>
          {/* Header */}
          <Grid.Item
            columnStart={!open ? 2 : 3}
            columnEnd={13}
            h={fr(23)}
            bsh={'base'}
          >
            <HeaderEmployee open={open} setOpen={setOpen} employee={employee} />
          </Grid.Item>
          {/* Navbar */}
          <Grid.Item columnStart={1} columnEnd={!open ? 2 : 3} mt={fr(-22.5)}>
            {open ? (
              <NavbarEmployee employee={employee} />
            ) : (
              <NavbarEmployeeIcon employee={employee} />
            )}
          </Grid.Item>

          {/* Body */}
          <Grid.Item columnStart={!open ? 2 : 3} columnEnd={13}>
            <Routes>
              <Route path='home' element={<Home />} />
              <Route path='content' element={<Content />} />
              <Route path='category' element={<Category />} />
              <Route path='menu' element={<Menu />} />
              <Route path='table' element={<Table employee={employee} />} />
              <Route path='promotion' element={<Promotion />} />
              <Route path='employees' element={<EmployeeManager />} />
              <Route path='customers' element={<CustomerManager />} />
              <Route path='customers/:id' element={<CustomerDetail />} />
              <Route path='customers/:id/:type' element={<CustomerDetail />} />
              <Route
                path='reservation'
                element={<Reservation employee={employee} />}
              />
              <Route path='order' element={<Order employee={employee} />} />
              <Route path='invoice' element={<Invoice employee={employee} />} />
              <Route path='contact' element={<Contact employee={employee} />} />
              <Route path='*' element={<Home />} />
            </Routes>
          </Grid.Item>
        </Grid>
      </Toaster>
    </>
  )
}

export default Admin
