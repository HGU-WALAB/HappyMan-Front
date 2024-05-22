// import node module libraries
import React, { Fragment, useMemo, useLayoutEffect, useState, useEffect } from "react";
import { useTable, useFilters, useGlobalFilter, usePagination, useRowSelect } from "react-table";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import axios from "axios";

// import custom components
import GlobalFilter from "components/elements/advance-table/GlobalFilter";
import Pagination from "components/elements/advance-table/Pagination";
import DotBadge from "components/elements/bootstrap/DotBadge";
import Icon from "@mdi/react";
import { mdiAccountMultipleOutline } from "@mdi/js";
import { Collection } from "react-bootstrap-icons";

const ApplicantsListItems2 = (props) => {
    const [userInfo, setUserInfo] = useState([]);
    const [applicantInformationLoading, setApplicantInformationLoading] = useState(null);
    const [program_id, setProgram_id] = useState();
    const [applicant_id, setApplicant_id] = useState([]);
    const [program_status, setProgram_status] = useState([]);
    const [applicant_status, setApplicant_status] = useState("0");
    const [programQuota, setProgramQuota] = useState();
    const [applicants_num, setApplicants_num] = useState();
    const [applicants, setApplicants] = useState([]);
    const [ids, setIds] = useState([]);
    const [applicantStatus, setApplicantStatus] = useState("미수료");

    const infinite = "무제한";

    // 이게 아래 테이블의 상위 부분
    const columns = useMemo(
        () => [
            { accessor: "id", Header: "ID", show: false },
            {
                accessor: "name",
                Header: "이름",
                Cell: ({ value }) => {
                    return (
                        <div className="d-flex align-items-center">
                            <h5 className="mb-0">{value}</h5>
                        </div>
                    );
                },
            },
            {
                accessor: "uniqueId",
                Header: "학번",
                Cell: ({ value }) => {
                    if (value === 0) return "";
                    else return value;
                },
            },
            { accessor: "email", Header: "이메일" },
            {
                accessor: "major1",
                Header: "1전공",
            },
            {
                accessor: "semester",
                Header: "학기",
                Cell: ({ value }) => {
                    return value + " 학기";
                },
            },

            {
                accessor: "status",
                Header: "상태",
                Cell: ({ value, row }) => {
                    return (
                        <div className="d-flex align-items-center">
                            <DotBadge
                                bg={
                                    row.original.status === "대기"
                                        ? "warning"
                                        : row.original.status === "수료"
                                        ? "success"
                                        : row.original.status === "거절"
                                        ? "danger"
                                        : row.original.status === "미수료"
                                        ? "secondary"
                                        : row.original.status === 4
                                        ? "primary"
                                        : ""
                                }
                            ></DotBadge>
                            {value === "대기"
                                ? "대기"
                                : value === "수료"
                                ? "수료"
                                : value === "거절"
                                ? "거절"
                                : value === "미수료"
                                ? "미수료"
                                : value === 4
                                ? "수료"
                                : ""}
                        </div>
                    );
                },
            },
        ],
        []
    );

    // console.log("열에 담은 메모내용 ", columns);

    // const update = async (e) => {
    //     var updateApplicantStatus = [];
    //     var params = new URLSearchParams();

    //     e.map((d) => {
    //         updateApplicantStatus.push(applicant_status);
    //     });

    //     params.append("status", updateApplicantStatus);
    //     params.append("program_id", program_id);
    //     console.log(params);

    //     if (updateApplicantId != "") {
    //         if (window.confirm("사용자 상태를 수정하시겠습니까?")) {
    //             const response = await axios.patch(process.env.REACT_APP_RESTAPI_HOST + "/api/happyman/admin/programs/110/applicants", params);
    //             readApplicantInformation(props.param4.id);
    //             alert("사용자 상태가 수정되었습니다.");
    //         }
    //     }
    // };

    const update = async () => {
        if (ids.length > 0) {
            // Construct the query string
            const queryString = `ids=${ids.join(",")}&status=${applicantStatus}`;

            // Retrieve the token
            const token = sessionStorage.getItem("token");

            // Log the ids, status, and token before making the API call
            console.log("Selected IDs:", ids);
            console.log("Applicant Status:", applicantStatus);
            console.log("Query String:", queryString);
            console.log("Token:", token); // Check the token

            if (window.confirm("사용자 상태를 수정하시겠습니까?")) {
                try {
                    const response = await axios.patch(
                        `${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/participants/change-status?${queryString}`,
                        {},
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    readApplicantInformation(props.param4.id);
                    window.location.reload();
                    alert("사용자 상태가 수정되었습니다.");
                } catch (error) {
                    console.error("Error updating user status:", error);
                    alert("사용자 상태 수정에 실패하였습니다. 다시 시도해 주세요.");
                }
            }
        }
    };

    const updateIds = (id) => {
        setIds((prevIds) => {
            if (prevIds.includes(id)) {
                return prevIds.filter((prevId) => prevId !== id); // 이미 선택되어 있는 경우 제거
            } else {
                return [...prevIds, id]; // 선택되어 있지 않은 경우 추가
            }
        });
    };

    useEffect(() => {
        console.log("Updated IDs:", ids);
    }, [ids]);

    const data = useMemo(() => userInfo, [userInfo]);

    // 테이블의 체크박스 생성
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
        selectedFlatRows, // 이 줄을 추가합니다.
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
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                                onChange={(e) => {
                                    row.getToggleRowSelectedProps().onChange(e);
                                    updateIds(row.original.id); // Call the function to update the IDs
                                }}
                            />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );

    const { pageIndex, globalFilter } = state;

    // const handleChangeSelect = (e) => {
    //     setApplicant_status(e.target.value);
    // };
    const handleChangeSelect = (e) => {
        setApplicantStatus(e.target.value);
        console.log(applicantStatus);
    };

    useLayoutEffect(() => {
        readProgramStatus(props.param4.id);
        readApplicantInformation(props.param4.id);
        setProgram_id(props.param4.id);
    }, []);

    const readProgramStatus = async (id) => {
        const response = await axios.get(`${process.env.REACT_APP_RESTAPI_HOST}/api/happyman/admin/programs/${id}/participants`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });

        console.log("ID는", id);
        const programData = response.data.participants; // 여러 사용자의 정보를 배열 형태로 가져옴

        // 프로그램 정보 갱신
        setProgram_status(programData.status); // 일단 첫 번째 사용자의 상태를 사용하겠습니다.

        // 총원 가져오기
        setProgramQuota(response.data.quota);
        // 현재원 가져오기
        setApplicants_num(response.data.currentQuota);

        setUserInfo(programData);

        console.log(programData);
    };

    const readApplicantInformation = async (id) => {
        setApplicantInformationLoading(false);

        const response = await axios.get(process.env.REACT_APP_RESTAPI_HOST + "applicant/applicants/" + id);

        setApplicantInformationLoading(true);
        setUserInfo(response.data);
    };

    return (
        <Fragment>
            <div className=" overflow-hidden">
                <Row className="pe-3">
                    <Col xl={3} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 px-5 py-4 ">
                        <div className="d-flex align-items-center fs-5 mt-3">
                            <Icon path={mdiAccountMultipleOutline} size={1} />
                            신청현황 :{" "}
                            <span>
                                {" "}
                                {applicants_num + "명"} /{" "}
                                {programQuota == null || programQuota === 0 || programQuota === "무제한" ? infinite : programQuota + "명"}{" "}
                            </span>
                        </div>
                    </Col>
                    <Col xl={6} lg={12} md={6} sm={12} className="mb-lg-0 mb-2 px-5 py-4">
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} placeholder="Search Students" />
                    </Col>

                    <Col xl={2} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 px-3 py-4 ">
                        <Form.Select onChange={handleChangeSelect}>
                            <option value="수료">수료</option>
                            <option value="미수료">미수료</option>
                        </Form.Select>
                    </Col>
                    <Col xl={1} lg={12} md={3} sm={12} className="mb-lg-0 mb-2 py-4 d-flex justify-content-evenly">
                        <Button variant="primary" onClick={update}>
                            저장
                        </Button>
                    </Col>
                    {/* <Form.Group className="mb-3 w-26 ">
            <FormSelect options={templateOptions} id="application-template" name="application_form" onChange={handleChange} placeholder="신청서 템플릿 선택" />
          </Form.Group> */}
                </Row>
            </div>

            <div className="table-responsive ">
                <Table {...getTableProps()} className="text-nowrap">
                    <thead className="table-light">
                        {headerGroups.map((headerGroup) => (
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

export default ApplicantsListItems2;
