import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom"
import Service from "../service/Service";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup"

const editSchema = yup.object({
    name: yup.string()
        .required("Vui lòng nhập tên")
        .max(100, "Tên phải có ít hơn 100 kí tự"),
    email: yup.string()
        .required("Vui lòng nhập email")
        .max(50, "Phải ít hơn 50 kí tự"),
    salary: yup.number()
        .required("Nhập salary")
        .max(1000000, "Phải ít hơn 1 triệu")
        .positive()
        .typeError("Vui lòng nhập số"),
    // birthday: yup.number()
    //     .required("Nhập ngày sinh")
    //     .positive()
    //     .typeError("Vui lòng nhập số"),
    status: yup.string()
        .required("Chọn trạng thái")
});

const EditEmployee = () => {
    const { employeeId } = useParams({});
    const [update, setUpdate] = useState({});
    const back = useNavigate();

    useEffect(() => {
        try {
            async function getEmployee() {
                let response = await Service.getEmployeeEdit(employeeId);
                setUpdate(response.data)
            }
            getEmployee()
        } catch (error) {
            console.log(error);
        }
    }, [employeeId])

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(editSchema),
        values: update
    });
    console.log(update);

    const editEmployee = async (setValue) => {
        try {
            await Service.editEmployee(employeeId, setValue);
            setUpdate(setValue)
            swal("Chinh Sua Thanh Cong", "success");
            back("/")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="row col-md-4 rounded mt-5" id="formAddStudent">
                <h2 className="text-primary text-center mt-4">Edit Employee</h2>
                <form onSubmit={handleSubmit(editEmployee)}>

                    <div className="form-group mb-3">
                        <label className="label-form">Name</label>
                        <input
                            type="text"
                            name="name"
                            className={`${errors.name ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('name')}
                        />
                        <span className="invalid-feedback">{errors.name?.message}</span>
                    </div>

                    <div className="form-group mb-3">
                        <label className="label-form">Email</label>
                        <input
                            type="text"
                            name="email"
                            className={`${errors.email ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('email')}
                        />
                        <span className="invalid-feedback">{errors.email?.message}</span>
                    </div>

                    <div className="form-group mb-3">
                        <label className="label-form">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            className={`${errors.salary ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('salary')}
                        />
                        <span className="invalid-feedback">{errors.salary?.message}</span>
                    </div>

                    <div className="form-group mb-3">
                        <label className="label-form">Birthday</label>
                        <input
                            type="date"
                            name="birthday"
                            className={`${errors.birthday ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('birthday', { required: true })}
                        />
                        <span className="invalid-feedback">{errors.birthday?.message}</span>
                    </div>

                    {/* <div className="form-group mb-3">
                        <label className="label-form">Status</label>
                        <select
                            className={`${errors.status ? 'form-control is-invalid' : 'form-control'}`}
                            {...register('status')}
                        >
                            <option value="Active">Active</option>
                            <option value="Nonactive">Nonactive</option>
                        </select>
                        <span className="invalid-feedback">{errors.status?.message}</span>
                    </div> */}

                    <div className="form-group mb-3">
                        <label className="label-form">Status</label>
                        <div>
                            <label className="form-check-label me-3">
                                <input
                                    type="radio"
                                    value="Active"
                                    className="form-check-input"
                                    {...register('status')}
                                /> Active
                            </label>
                       
                            <label className="form-check-label">
                                <input
                                    type="radio"
                                    value="Nonactive"
                                    className="form-check-input"
                                    {...register('status')}
                                /> Nonactive
                            </label>
                        </div>
                        <span className="invalid-feedback">{errors.status?.message}</span>
                    </div>


                    <div className="d-flex justify-content-center mb-3">
                        <NavLink type="submit" className="btn btn-warning me-3" to={'/'}>Back</NavLink>
                        <button type="submit" className="btn btn-success me-3">Update</button>
                        <button type="button" className="btn btn-danger"
                            onClick={() => reset()}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default EditEmployee;