import React from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'
import './Room.scss'
const Controler = (props) => {
    return (
        <Container className='col'>
            <div className="head-bar pt-5 d-flex justify-content-between">
                <span className='mt-1 text-uppercase fw-bold fs-4'>Bảng hiển thị</span>
                <Button variant="outline-warning fw-bold  btn-sm opacity-75"><i class="bi fa-3x bi-plus"></i>Thêm thiết bị</Button>{' '}
            </div>
            <div className="badge-button mt-3 gx-3">
                <button className="btn btn-outline-secondary btn-sm me-3">
                    Tổng số thiết bị <span className="badge text-bg-secondary">4</span>
                </button>
                <button className="btn btn-outline-secondary  btn-sm">
                    Thiết bị đang hoạt động <span className="badge text-bg-secondary">4</span>
                </button>
            </div>
            <div className="table-devices pt-4">
                <div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Handle</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td colspan="2">Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </Container>
    )
}

export default Controler
