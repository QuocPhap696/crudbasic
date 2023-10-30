import axios from "axios";

class Service {
    static getEmployee() {
        return axios.get(`http://localhost:3300/employee`);
    }
    static getEmployeeId(id) {
        return axios.get(`http://localhost:3300/employee/${id}`);
    }
    static getEmployeeEdit(id, data) {
        return axios.get(`http://localhost:3300/employee/${id}`, data);
    }
    static editEmployee(id, data) {
        return axios.put(`http://localhost:3300/employee/${id}`, data)
    }
    static postEmployee(data) {
        return axios.post(`http://localhost:3300/employee`, data);
    }
    static deleteEmployee(id) {
        return axios.delete(`http://localhost:3300/employee/${id}`)
    }
}
export default Service;