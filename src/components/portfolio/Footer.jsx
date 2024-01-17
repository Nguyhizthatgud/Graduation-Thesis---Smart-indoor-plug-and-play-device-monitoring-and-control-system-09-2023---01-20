import React from 'react'

function Footer() {
    return (
        <div>
            <div>
                <footer className="footer py-4">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-4 text-lg-start">Copyright © Your Website 2023</div>
                            <div className="col-lg-4 my-3 my-lg-0">
                                <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Twitter"><i className="fab fa-twitter" /></a>
                                <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
                                <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
                            </div>
                            <div className="col-lg-4 text-lg-end">
                                <a className="link-dark text-decoration-none me-3" href="#!">Privacy Policy</a>
                                <a className="link-dark text-decoration-none" href="#!">Terms of Use</a>
                            </div>
                        </div>
                    </div>
                </footer>
                {/* Portfolio Modals*/}
                {/* Portfolio item 1 modal popup*/}
                <div className="portfolio-modal modal fade" id="portfolioModal1" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="modal-body">
                                            {/* Project details*/}
                                            <h2 className="text-uppercase">ESP32</h2>
                                            <p className="item-intro text-muted">ESP32 đóng vai trò là bộ xử lý trung tâm trong một nút của hệ thống, thiết bị kết nối với các thiết bị ngoại vi và cảm biến qua các GPIO bằng giao thức UART</p>
                                            <div className='d-flex '>
                                                <img className='img-fluid pe-2' src="assets/img/portfolio/P11.png" style={{ width: '20rem' }} alt="..." />
                                                <p className='text-start'>Hiện nay trên thị trường loại SoC-Wifi phù hợp với yêu cầu thiết kế (nhỏ gọn, kết nối internet,…) và giá thành rẻ, phù hợp với mục đích nghiên cứu nhưng có giá trị thực tiễn cao nhất đó là ESP32-WROOM, nên em đã chọn ESP32 làm đối tượng tìm hiểu và ứng dựng cho “khối xử lý trung tâm” của đề tài.</p>
                                            </div>


                                            <ul className="list-inline text-start">
                                                <li>
                                                    <strong>Cách kết nối trong nút:</strong>
                                                    <br />
                                                    +Với các thiết bị ngoại vị và các cảm biến:
                                                    <br />
                                                    -Chân G14 của ESP32 kết nối với chân “Data”  của khối cảm biến nhiệt ẩm.
                                                    <br />
                                                    -Chân G21, G22, G23 của ESP32 kết nối lần lượt với các “led đơn” mô tả kết nối với các thiết bị chấp hành.
                                                    <br />
                                                    -Chân G0 của ESP32 nối với chân “A-out” của cảm biến khí Gas MQ-2 Flying Fish.

                                                </li>
                                                <li>
                                                    <strong>Kết nối đến API:</strong>
                                                    sử dụng mã JWT được tạo bởi hệ thống
                                                </li>
                                            </ul>
                                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                                <i className="fas fa-xmark me-1" />
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Portfolio item 2 modal popup*/}
                <div className="portfolio-modal modal fade" id="portfolioModal2" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="modal-body">
                                            {/* Project details*/}
                                            <h2 className="text-uppercase">DHT22</h2>
                                            <p className="item-intro text-muted">Cảm biến nhiệt độ & độ ẩm.</p>
                                            <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/2.jpg" alt="..." />
                                            <p>Cảm biến độ ẩm và nhiệt độ DHT11 là cảm biến rất thông dụng hiện nay vì chi phí rẻ và rất dễ lấy dữ liệu thông qua giao tiếp 1 wire (giao tiếp digital 1 dây truyền dữ liệu duy nhất). Bộ tiền xử lý tín hiệu tích hợp trong cảm biến giúp bạn có được dữ liệu chính xác mà không phải qua bất kỳ tính toán nào!</p>
                                            <ul className="list-inline">
                                                <li>
                                                    <strong>Client:</strong>
                                                    Explore
                                                </li>
                                                <li>
                                                    <strong>Category:</strong>
                                                    Graphic Design
                                                </li>
                                            </ul>
                                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                                <i className="fas fa-xmark me-1" />
                                                Close Project
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Portfolio item 3 modal popup*/}
                <div className="portfolio-modal modal fade" id="portfolioModal3" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="modal-body">
                                            {/* Project details*/}
                                            <h2 className="text-uppercase">Project Name</h2>
                                            <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                            <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/3.jpg" alt="..." />
                                            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                            <ul className="list-inline">
                                                <li>
                                                    <strong>Client:</strong>
                                                    Finish
                                                </li>
                                                <li>
                                                    <strong>Category:</strong>
                                                    Identity
                                                </li>
                                            </ul>
                                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                                <i className="fas fa-xmark me-1" />
                                                Close Project
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Portfolio item 4 modal popup*/}
                <div className="portfolio-modal modal fade" id="portfolioModal4" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="modal-body">
                                            {/* Project details*/}
                                            <h2 className="text-uppercase">Project Name</h2>
                                            <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                            <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/4.jpg" alt="..." />
                                            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                            <ul className="list-inline">
                                                <li>
                                                    <strong>Client:</strong>
                                                    Lines
                                                </li>
                                                <li>
                                                    <strong>Category:</strong>
                                                    Branding
                                                </li>
                                            </ul>
                                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                                <i className="fas fa-xmark me-1" />
                                                Close Project
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Portfolio item 5 modal popup*/}
                <div className="portfolio-modal modal fade" id="portfolioModal5" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="modal-body">
                                            {/* Project details*/}
                                            <h2 className="text-uppercase">Project Name</h2>
                                            <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                            <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/5.jpg" alt="..." />
                                            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                            <ul className="list-inline">
                                                <li>
                                                    <strong>Client:</strong>
                                                    Southwest
                                                </li>
                                                <li>
                                                    <strong>Category:</strong>
                                                    Website Design
                                                </li>
                                            </ul>
                                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                                <i className="fas fa-xmark me-1" />
                                                Close Project
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Portfolio item 6 modal popup*/}
                <div className="portfolio-modal modal fade" id="portfolioModal6" tabIndex={-1} role="dialog" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="close-modal" data-bs-dismiss="modal"><img src="assets/img/close-icon.svg" alt="Close modal" /></div>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-lg-8">
                                        <div className="modal-body">
                                            {/* Project details*/}
                                            <h2 className="text-uppercase">Project Name</h2>
                                            <p className="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                            <img className="img-fluid d-block mx-auto" src="assets/img/portfolio/6.jpg" alt="..." />
                                            <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                            <ul className="list-inline">
                                                <li>
                                                    <strong>Client:</strong>
                                                    Window
                                                </li>
                                                <li>
                                                    <strong>Category:</strong>
                                                    Photography
                                                </li>
                                            </ul>
                                            <button className="btn btn-primary btn-xl text-uppercase" data-bs-dismiss="modal" type="button">
                                                <i className="fas fa-xmark me-1" />
                                                Close Project
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer
