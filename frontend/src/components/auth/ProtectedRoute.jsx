/* Người dùng chưa đăng nhập sẽ chuyển hướng về trang đăng nhập 
*/
import React from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Loader from "../layout/Loader"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  // loading = false khi xác nhận tài khoản, trả về thông tin người dùng.
  if (loading) return <Loader />

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    children
  )
}

export default ProtectedRoute