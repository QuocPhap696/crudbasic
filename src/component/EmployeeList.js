import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmployeeDetail from './EmployeeDetail'
import Service from '../service/Service'
import swal from 'sweetalert';
import { React } from 'react';
import fa from 'fontawesome';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import Spinner from './layout/Spinner';

const Employee = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [idEmployee, setIdEmployee] = useState();


    const [selectedEmployee, setselectedEmployee] = useState(null);
    useEffect(() => {
        try {
            setLoading(true);
            async function getEmployee() {
                let reponse = await Service.getEmployee();
                setEmployeeList(reponse.data);
            }
            getEmployee();
        } catch (error) {

        }
    }, [])
    const deleteEmployee = (emp, id) => {
        try {
            swal({
                title: "Cảnh Báo!!",
                text: "Bạn Chắc Chắn Muốn Xóa " + emp + " Khỏi Danh Sách",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then(async (del) => {
                if (del) {
                    await Service.deleteEmployee(id);
                    swal("Thông Báo", "Xóa Thành Công " + emp + " Khỏi Danh Sách", "success");
                    setEmployeeList((preList) => preList.filter((emp) => emp.id !== id));
                } else {
                    // Xử lý trường hợp không xóa
                }
            });
        } catch (error) { }
    };

    return (

        <div className="container mt-3">
            {idEmployee && <EmployeeDetail id={idEmployee} />}
            <h2 className="text-danger text-center mt-4"> Employee List</h2>
            <button className="btn btn-sm btn-primary mt-4" style={{}}>
                <NavLink className="nav-link " style={{ color: "white" }} to={'/create'}>
                    <i className="fa fa-plus me-2" />
                    Create
                </NavLink>
            </button>

            <section className="mt-4">
                <table className="table table-hover">
                    <thead>
                        <tr className="tr">
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Salary</th>
                            <th>Birthday</th>
                            <th>Status</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employeeList.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.salary}</td>
                                    <td>{employee.birthday}</td>
                                    <td>{employee.status}</td>
                                    <td>
                                        <NavLink to={`/edit/${employee.id}`}>
                                           
                                            <i role="button" class="fa-solid fa-user-pen me-3 btn btn-success"></i>
                                        </NavLink>

                                        <i role="button" class="fa-solid fa-person-circle-xmark btn btn-danger"
                                        style={{ color: '#ffffff' }}
                                        onClick={() => deleteEmployee(employee.name, employee.id)}/>
                                        
                                        {/* <Link to={`/infor/${employee.id}`}>
                                            < i role="button" className="fa fa-circle-info me-1 btn btn-warning"
                                            />
                                        </Link> */}

                                        {/* <i
                                                role="button"
                                                className="fa fa-circle-info me-1 btn btn-warning"
                                                data-bs-toggle="modal"  
                                                data-bs-target="#studentInfoModal"  
                                                onClick={() => setselectedEmployee(employee)}
                                            /> */}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </section>
            {/* <div className="modal fade " id="studentInfoModal" tabIndex="-1" role="dialog" aria-labelledby="studentInfoModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content ">
                            <div className="modal-header btn btn-warning">
                                <h5 className="modal-title " id="studentInfoModalLabel">Student Information</h5>
                            </div>
                            <div className="modal-body">
                                {selectedEmployee && (
                                    <tr>
                                        <li>Name: {selectedEmployee.name}</li>
                                        <li>Email: {selectedEmployee.email}</li>
                                        <li>Salary: {selectedEmployee.salary}</li>
                                        <li>Birthday: {selectedEmployee.birthday}</li>
                                        <li>Status: {selectedEmployee.status}</li>
                                    </tr>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary btn btn-warning"
                                    data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div> */}
        </div >
    )


}
export default Employee;