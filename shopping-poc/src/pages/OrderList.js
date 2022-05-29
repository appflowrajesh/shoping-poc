import React, { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Pagination from "react-js-pagination";
import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";
import { getAllOrders } from "../apiCalls/OrderService";
import { useStore } from "../context";
import { useSortableData } from "../hooks/useSortingData";

const OrderList = () => {
  const { orderList, onSubmitOrderList } = useStore();
  const [page, setPage] = useState(1);
  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const { items, requestSort, sortConfig } = useSortableData(orderList);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const getAllOrdersHanlder = useCallback(async () => {
    const res = await getAllOrders(page);
    console.log(res, "resData");
    if (res.status) {
      onSubmitOrderList(
        res.data.map((p) => {
          return {
            orderId: p._id,
            qty: p.qty,
            amount: p.amount,
            ...p.product,
          };
        })
      );
      setTotalItemsCount(res.totalCount);
    }
  }, [page]);

  useEffect(() => {
    getAllOrdersHanlder();
  }, [getAllOrdersHanlder]);

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  console.log(items, "itemsorderList");
  return (
    <>
      <h2 className="title">Order List</h2>
      <div className="body">
        {orderList.length === 0 ? (
          <h3 className="p-5 text-center">No Order Found</h3>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th
                  onClick={() => requestSort("productName")}
                  className={getClassNamesFor("productName")}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Product Name
                    {getClassNamesFor("productName") === "ascending" ? (
                      <BsSortDownAlt />
                    ) : (
                      <BsSortUpAlt />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => requestSort("qty")}
                  className={getClassNamesFor("qty")}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Qty
                    {getClassNamesFor("qty") === "ascending" ? (
                      <BsSortDownAlt />
                    ) : (
                      <BsSortUpAlt />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => requestSort("amount")}
                  className={getClassNamesFor("amount")}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Amount
                    {getClassNamesFor("amount") === "ascending" ? (
                      <BsSortDownAlt />
                    ) : (
                      <BsSortUpAlt />
                    )}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.orderId}>
                  <td>{item.orderId}</td>
                  <td>{item?.productName}</td>
                  <td>{item.qty}</td>
                  <td>{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
      <div className="product_footer mt-4">
        <div></div>
        {orderList.length > 0 && (
          <Pagination
            activePage={page}
            itemsCountPerPage={5}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            linkClass="page-link"
            itemClass="paginate_button page-item"
          />
        )}
      </div>
    </>
  );
};

export default OrderList;
