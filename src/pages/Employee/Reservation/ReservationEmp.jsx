import { Grid, Animation, fr, Divider } from '@prismane/core'
import React, { useState } from 'react'
import HeaderEmployee from '~/components/HeaderEmployee/HeaderEmployee'
import NavbarEmployee from '~/components/NavbarEmployee/NavbarEmployee'
import NavbarEmployeeIcon from '~/components/NavbarEmployee/NavbarEmployeeIcon'

const ReservationEmp = ({ employee }) => {
  const [open, setOpen] = useState(
    sessionStorage.getItem('openNavbar') === 'true' ? true : false
  )
  return (
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
            <NavbarEmployee />
          </Animation>
        ) : (
          <NavbarEmployeeIcon />
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
      ></Grid.Item>
    </Grid>
  )
}

export default ReservationEmp
