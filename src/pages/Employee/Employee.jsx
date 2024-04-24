import { Grid, Animation, Text, Toaster, fr } from '@prismane/core'
import HeaderEmployee from '~/components/HeaderEmployee/HeaderEmployee'
import NavbarEmployee from '~/components/NavbarEmployee/NavbarEmployee'
import NavbarEmployeeIcon from '~/components/NavbarEmployee/NavbarEmployeeIcon'

import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import InvoiceEmp from '~/pages/Employee/Invoice/InvoiceEmp'
import OrderEmp from '~/pages/Employee/Order/OrderEmp'
import ReservationEmp from '~/pages/Employee/Reservation/ReservationEmp'
import TableEmp from '~/pages/Employee/Table/TableEmp'
import Contact from '~/pages/Admin/Contact/Contact'

const Employee = ({ employee }) => {
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
              <Route path='invoice' element={<InvoiceEmp />} />
              <Route path='order' element={<OrderEmp />} />
              <Route path='reservation' element={<ReservationEmp />} />
              <Route path='table' element={<TableEmp />} />
              <Route path='contact' element={<Contact employee={employee} />} />
              <Route path='*' element={<InvoiceEmp />} />
            </Routes>
          </Grid.Item>
        </Grid>
      </Toaster>
    </>
  )
}

export default Employee
