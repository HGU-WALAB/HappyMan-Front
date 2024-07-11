// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Link } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import axios from "axios";

import { getAllAdmin } from "services/user";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";

const InstructorsListItems = (props) => {
    const [adminInfo, setAdminInfo] = useState([]);

    const columns = useMemo(
        () => [
            { accessor: "id", Header: "ID", show: false },
            {
                accessor: "name",
                Header: "이름",
                Cell: ({ value, row }) => {
                    return (
                        <div className="d-flex align-items-center">
                            <DotBadge bg="success"></DotBadge>
                            <h5 className="mb-0">{value}</h5>
                        </div>
                    );
                },
            },
            { accessor: "uniqueId", Header: "직번" },
            { accessor: "email", Header: "이메일" },
            { accessor: "department", Header: "부서" },
        ],
        []
    );

    const data = useMemo(() => adminInfo);

    const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        );
    });

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        state,
        gotoPage,
        pageCount,
        prepareRow,
        setGlobalFilter,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageSize: 10,
                hiddenColumns: columns.map((column) => {
                    if (column.show === false) return column.accessor || column.id;
                    else return false;
                }),
            },
        },
        useFilters,
        useGlobalFilter,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllPageRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );

    const { pageIndex, globalFilter } = state;

    useLayoutEffect(() => {
        readAdmin();
    }, []);

    const readAdmin = async () => {
        const responsea = await getAllAdmin();
        console.log(responsea);
        setAdminInfo(responsea);
        console.log("userInfo", adminInfo);
        // const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "admin/waitinstructors");
        // console.log("res", response);
        // setUserInfo(response.data);
    };

    // const removeAdmin = async (e) => {
    //     var removeAdminId = [];

    //     e.map((d) => removeAdminId.push(d.original.id));

    //     var params = new URLSearchParams();
    //     params.append("id", removeAdminId);

    //     if (window.confirm("관리자에서 내보내시겠습니까?")) {
    //         const response = await axios.post(process.env.REACT_APP_RESTAPI_HOST + "admin/delete", params);
    //         alert("내보내졌습니다.");
    //         readAdmin();
    //         window.location.reload();
    //     }
    // };

    const removeAdmin = async (selectedRows) => {
        const addAdminId = selectedRows.map((row) => row.original.uniqueId);

        const params = new URLSearchParams();
        params.append("uniqueIds", addAdminId.join(","));
        params.append("status", "USER"); // status를 params에 추가

        console.log("params", params.toString()); // params 내용을 문자열로 변환하여 콘솔에 출력

        // 아무것도 선택하지 않으면 안된다고 하는 부분 추가하기
        if (window.confirm("관리자에서 내보내시겠습니까?")) {
            try {
                const token = sessionStorage.getItem("token");
                const response = await axios.patch(
                    `${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/users/status?${params.toString()}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("제거 되었습니다.");
                await readAdmin();
                window.location.reload();
            } catch (error) {
                console.error("Error adding admin", error);
            }
        }
    };

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <Link
            to=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </Link>
    ));

    return (
        <Fragment>
            <div className=" overflow-hidden">
                <Row className="justify-content-md-between m-3 mb-xl-0">
                    <Col xl={8} lg={6} md={6} xs={12}>
                        <div className="mb-2 mb-lg-4">
                            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="관리자를 검색하세요" />
                        </div>
                    </Col>
                    <Col xxl={2} lg={6} md={6} xs={12} className="justify-content-between mb-2 mb-lg-4">
                        <Button
                            onClick={() => {
                                removeAdmin(selectedFlatRows);
                            }}
                        >
                            관리자에서 내보내기
                        </Button>
                    </Col>
                </Row>
            </div>

            <div className="table-responsive ">
                <Table {...getTableProps()} className="text-nowrap">
                    <thead className="table-light">
                        {headerGroups?.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => (
                                    <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

            {/* Pagination @ Footer */}
            <Pagination previousPage={previousPage} pageCount={pageCount} pageIndex={pageIndex} gotoPage={gotoPage} nextPage={nextPage} />
        </Fragment>
    );
};

export default InstructorsListItems;
