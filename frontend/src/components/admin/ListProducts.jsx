import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "../layout/Loader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MetaData from "../layout/MetaData";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
  useUpdateProductVisibilityMutation,
} from "../../redux/api/productsApi";
import AdminLayout from "../layout/AdminLayout";
import { AgGridReact } from "ag-grid-react";
import { AG_GRID_LOCALE_VN } from "@ag-grid-community/locale";
import { Button } from "react-bootstrap";
import * as XLSX from "xlsx";

const ListProducts = () => {
  const { data, isLoading, error } = useGetAdminProductsQuery();
  const [quickFilterText, setQuickFilterText] = useState(""); // Filter cho table
  const [
    deleteProduct,
    { isLoading: isDeleteLoading, error: deleteError, isSuccess },
  ] = useDeleteProductMutation();
  const [updateProductVisibility] = useUpdateProductVisibilityMutation();

  const navigate = useNavigate();
  const location = useLocation(); // Search param
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const filteredProductId = queryParams.get("productId");
    if (filteredProductId) {
      // Thiết lập filter cho AgGrid dựa trên productId
      setQuickFilterText(filteredProductId);
      // Xóa productId khỏi URL
      queryParams.delete("productId");
      navigate(`?${queryParams.toString()}`, { replace: true });
    }
  }, [location, navigate]);

  const clearSearch = () => {
    setQuickFilterText("");
  }

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Xóa sản phẩm thành công");
    }
  }, [error, deleteError, isSuccess]);

  const deleteProductHandler = (id) => {
    const confirmed = window.confirm("Xác nhận muốn xoá?");
    if (confirmed) {
      deleteProduct(id);
    }
  };

  // AgGrid
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Mã sản phẩm",
      field: "productID",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Tên sản phẩm",
      field: "name",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Giá",
      field: "price",
      sortable: true,
      filter: true,
      resizable: true,
      hide: true,
    },
    {
      headerName: "Đã bán",
      field: "sellQty",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Màu sắc",
      field: "color",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Kích cỡ",
      field: "size",
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: "Tồn kho",
      field: "stock",
      sortable: true,
      filter: true,
      resizable: true,
      cellRenderer: (params) => {
        return params.value >= 0 ? params.value : "Chưa tạo loại màu/size";
      },
    },
    {
      headerName: "Hành động",
      field: "actions",
      cellRenderer: (params) => (
        <>
          <Link
            to={`/admin/products/${params.data.id}`}
            className="btn btn-outline-primary button-outline"
            title="Chỉnh sửa sản phẩm"
          >
            <i className="fa fa-pencil"></i>
          </Link>
          <Link
            to={`/admin/products/${params.data.id}/upload_images`}
            className="btn btn-outline-success ms-2 button-outline"
            title="Cập nhật hình ảnh sản phẩm"
          >
            <i className="fa fa-image"></i>
          </Link>
          <button
            className="btn btn-outline-danger ms-2 button-outline"
            onClick={() => deleteProductHandler(params.data.id)}
            disabled={isDeleteLoading}
            title="Xoá sản phẩm"
          >
            <i className="fa fa-trash"></i>
          </button>
        </>
      ),
      resizable: true,
    },
  ]);

  const rowData = data?.products?.map((product) => ({
    id: product?._id,
    productID: product?.productID,
    name: product?.name,
    price: product?.price,
    sellQty: product?.sellQty,
    color: product?.color.join(", "),
    size: product?.size.join(", "),
    stock: product?.stock,
    visible: product?.visible,
    actions: {},
  }));

  // Hàm để xử lý việc hiển thị chi tiết sản phẩm
  function showDetails(productData) {
    // Logic để hiển thị modal hoặc panel mở rộng với dữ liệu chi tiết của sản phẩm
    console.log("Hiển thị chi tiết cho sản phẩm: ", productData);
  }

  if (isLoading) return <Loader />;

  const onExportClick = () => {
    // Chuyển đổi dữ liệu
    const modifiedData = rowData.map((row) => ({
      ...row,
      color: row.color,
      size: row.size,
      stock: row.stock,
    }));

    // Tạo một workbook mới
    const wb = XLSX.utils.book_new();

    // Chuyển đổi dữ liệu sang sheet
    // const ws = XLSX.utils.json_to_sheet(rowData);
    const ws = XLSX.utils.json_to_sheet(modifiedData);

    // Thêm sheet vào workbook
    XLSX.utils.book_append_sheet(wb, ws, "Products");

    // Tạo tên file
    const exportFileName = "products_data.xlsx";

    // Xuất file
    XLSX.writeFile(wb, exportFileName);
  };

  // Update product visibility
  const onCellValueChanged = async (params) => {
    if (params.colDef.field === "visible") {
      try {
        const { id, visible } = params.data;
        console.log(id, visible);
        await updateProductVisibility({ id, visible });
        toast.success("Cập nhật trạng thái hiển thị sản phẩm thành công");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <AdminLayout>
      <MetaData title={"Danh sách sản phẩm"} />

      <div style={{ width: "100%", margin: "auto", overflowX: "auto" }}>
        {/* <div style={{ width: "1000px", margin: "auto", overflowX: "auto" }}> */}
        {/* <div style={{ width: "100%", margin: "auto", overflowX: "auto" }}> */}
        <div className="table">
          <div>
            <h1 class="my-5">{data?.products?.length} Sản phẩm</h1>
          </div>

          <div
            className="search-and-actions"
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div>
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={quickFilterText}
                onChange={(e) => setQuickFilterText(e.target.value)}
                className="search-input"
              />
              {quickFilterText && (
                <button
                  title="Xóa bộ lọc" 
                  className="clear-search-button"
                  onClick={clearSearch}        
                >
                  <i className="fa fa-times clear-search-icon"></i>
                </button>
              )}
            </div>
            <div style={{ display: "flex", gap: "10px" }}>
              {" "}
              {/* Sử dụng gap để tạo khoảng cách */}
              <Button onClick={onExportClick}>
                <img
                  src="../images/excel.png"
                  alt="Excel_icon"
                  className="icon2"
                />
                Xuất Excel
              </Button>
            </div>
          </div>

          <div
            className="ag-theme-alpine"
            style={{ height: 600, width: "100%" }}
          >
            <AgGridReact
              columnDefs={columnDefs}
              rowData={rowData}
              getRowStyle={(params) => {
                if (params.data.visible === false) {
                  return {backgroundColor: "#d3d3d3", color: "#808080"};
                }
                return {
                  backgroundColor:
                    params.node.rowIndex % 2 === 0 ? "#f5f5f5" : "#ffffff",
                }                 
              }}
              domLayout="autoHeight"
              defaultColDef={{
                flex: 1,
                minWidth: 100,
              }}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 20, 50, 100]}
              localeText={AG_GRID_LOCALE_VN}
              quickFilterText={quickFilterText}
              onCellValueChanged={onCellValueChanged}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListProducts;
