import express from "express";
import sendToken  from '../utils/sendToken.js';
import {
  resetPassword, 
  forgotPassword, 
  logout, 
  loginUser, 
  registerUser, 
  getUserProfile,
  updatePassword,
  updateProfile,
  uploadAvatar,
  allUsers,
  getUserDetails,
  deleteUser,
  updateUser
} from "../controllers/authControllers.js";
import { authorizeRoles, isAuthenticatedUser } from "../middlewares/auth.js";
const router = express.Router();

// Router route(dẫn) đến mục "/products" để get (nhận request) và đưa vào controller function (hàm điều khiển)
router.route("/register").post(registerUser);

// Đăng nhập thông thường
router.route("/login").post(loginUser);



// router.get("/login/success", (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: "Đăng nhập thành công với Google.",
//       user: req.user,
//       cookies: req.cookies,
//     })
//   }
// });

// router.get("/login/failed", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "Đăng nhập thất bại với Google. Vui lòng thử lại."
//   })
// });

// router.get("/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// })




// Đăng xuất người dùng
router.route("/logout").get(logout);

// Yêu cầu đặt lại mật khẩu
router.route("/password/forgot").post(forgotPassword);

// Yêu cầu cập nhật mật khẩu bằng token đã cung cấp
router.route("/password/reset/:token").put(resetPassword);

// Lấy thông tin hồ sơ của người dùng hiện tại
router.route("/me").get(isAuthenticatedUser, getUserProfile);

// Cập nhật mật khẩu của người dùng hiện tại
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// Cập nhật thông tin hồ sơ của người dùng hiện tại
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/me/upload_avatar").put(isAuthenticatedUser, uploadAvatar);

// Lấy thông tin tất cả người dùng (chỉ cho quản trị viên)
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);

// Lấy thông tin chi tiết của một người dùng cụ thể (chỉ cho quản trị viên)
router.route("/admin/users/:id")
  // Lấy thông tin chi tiết của người dùng (GET)
  .get(isAuthenticatedUser, authorizeRoles("admin"), getUserDetails)
  // Cập nhật thông tin người dùng (PUT)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateUser)
  // Xóa người dùng (DELETE)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

  export default router;