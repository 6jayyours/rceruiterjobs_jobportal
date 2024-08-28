import React from 'react'
import { Outlet } from 'react-router'
import AppHeader from '../../components/common/AppHeader'
import AppFooter from '../../components/common/AppFooter'
import HirerSidebar from '../../components/recruiter/sections/HirerSidebar'

const HirerDashboard = () => {
  return (
    <div className="flex h-screen">
      <HirerSidebar/>
      <div className="wrapper d-flex flex-column  w-full ml-64">
        <AppHeader title="Recruiter Dashboard"/>
        <div className="body flex-grow-1 min-h-[677.5px]">
          <Outlet />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default HirerDashboard