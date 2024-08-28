import React from 'react'
import { Outlet } from 'react-router'
import AppHeader from '../../components/common/AppHeader'
import AppFooter from '../../components/common/AppFooter'
import UserSidebar from '../../components/user/UserSidebar'

const UserDashboard = () => {
  return (
    <div className="flex h-screen">
      <UserSidebar/>
      <div className="wrapper d-flex flex-column  w-full ml-64">
        <AppHeader title="Candidate Dashboard"/>
        <div className="body flex-grow-1 min-h-[677.5px]">
          <Outlet />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default UserDashboard