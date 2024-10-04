## BẢNG MỤC LỤC

* [Hướng dẫn setup project trên Visual Studio code](#SetupProjectinVisualStudioCode)
* [Lưu ý khi làm việc trong project](#projectnotice)
* [Quy định chung](#quydinhchung)
* [Thành viên nhóm](#thanhvien)
<!-- * [ ](#giangvien) -->
<!-- * [ Đồ án môn học](#doan) -->

## Setup project in Visual Studio Code

<a name="SetupProjectinVisualStudioCode"></a>
Project được cài cài đặt tại `D:/FashionShop`:

1. **Open a Terminal or Command Prompt**:
   * Trên Windows, mở Command Prompt bằng tổ hợp phím `Win + R`, gõ `cmd`, và nhấn Enter.
   * Lựa chọn khác, có thể sử dụng PowerShell.

2. **Navigate to your project directory**:
   Sử dụng lệnh `cd` để thay đổi đường dẫn đến project folder:

   ```bash
   cd D:/FashionShop
   ```

3. **Install dependencies**:
   Sử dụng lệnh sau để cài the dependencies được liệt kê trong `package.json` file:

   ```bash
   npm install
   ```

4. **Configure environment variables (Skip)**:
   Nếu project sử dụng environment variables lưu ở trong một `.env` file, đảm bảo rằng tạo một `.env` file trong project directory (`D:/FashionShop`)  và theit61 lập các environment variables cần thiết.

5. **Run your project**:
   Nếu `package.json` file chứa một `"start"` script để chạy ứng dụng, sử dụng lệnh sau:

   ```bash
   npm start
   ```

   Nếu bạn có script khác để chạy ứng dụng, thay `"start"` với appropriate script name.

6. **Testing (skip)**:
   Để run tests, thực thi test script được định nghĩa in your `package.json`:

   ```bash
   npm test
   ```

7. **Install FRONTEND dependencies**:
   Thực thi các lệnh sau trong git bash:

   ```bash
   cd /d/FashionShop/frontend
   npm install
   ```

8. **Extension**:
   Các thư viện cần cài đặt:
   * Auto Rename Tag
   * Bootstrap 5 Quick snippets
   * ES7+ React/Redux/React-Native/JS snippets
   * HTML CSS Support
   * Live Server
   * markdownlint
   * Prettier - Code formatter
   * gitignore

## Lưu ý khi làm việc trong project:

<a name="projectnotice"></a>

1. Các lệnh bash:
   * npm install: cài đặt project (dựa trên file package.json)
   * npm start: chạy project ở trạng thái normal
   * npm run dev: chạy project ở chế độ nodemon (auto-restart server khi có sự thay đổi trong source code)
   * npm run seeder: xoá sạch-deleteMany() và nạp dữ liệu từ backend\seeder\data.js vào CSDL Mongo Atlas
2. Để view web với frontend:
   * B1: Mở project ở với đường dẫn active ở git bash có dạng ... /FashionShop
   * B2: npm start
   * B3: Mở thêm 1 git bash
   * B4: cd frontend
   * B5: npm install
   * B6: npm start
   * B7: Chọn 'Y' khi có câu "Would you like to run the app on another port instead (Y/n)".
3. Phải Fetch trước khi edit project để update mới nhất từ git 'main' và tránh không bị lỗi conflict khi commit.

## Quy định chung

<a name="quydinhchung"></a>

1. Tab khi thụt lề: 2 spaces (chỉnh trong 'Tab Size' của Setting hoặc Spaces ở thanh properties dưới cùng bên trái của Visual Studio Code)
2. Remark code đầy đủ: tiếng Việt (có thể dùng keyword tiếng Anh)
3. * Tên biến (bao gồm cả thuộc tính database trong MongoDB): danh từ, sẽ được format ở dạng tiếng Anh, dùng chuẩn Camel
   * Các nội dung có hiển thị ra màn hình 100% tiếng Việt có dấu.
4. Tên hàm: động từ / cụm động từ
5. Biến trong JavaScript dùng let thay vì dùng var
6. Dùng " " thay vì dùng ' '

**Lưu ý: tuân thủ các yêu cầu/ mong đợi của thầy về tiêu chí format.**

## THÀNH VIÊN NHÓM

<a name="thanhvien"></a>
| STT    | MSSV          | Họ và Tên              | Github                                               | Email                   |
| ------ |:-------------:| ----------------------:|-----------------------------------------------------:|-------------------------:
| 1      | 22540008      | Trần Quang Hùng        |[ricardotran92](https://github.com/ricardotran92)     |<22540008@gm.uit.edu.vn>   |
| 2      | 22540012      | Phạm Tiến Nam          |[ALong202](https://github.com/ALong202)               |<22540012@gm.uit.edu.vn>   |

