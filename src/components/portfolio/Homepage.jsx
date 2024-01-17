import React, { useState } from 'react'
import { Space, Typography } from 'antd';
import { Modal } from 'antd';
import { Steps } from 'antd';
import { message, theme, Badge } from 'antd';
import { Timeline } from 'antd';
import { Col, Divider, Row } from 'antd';
import { Security } from '@mui/icons-material';

const { Text, Link } = Typography;
function Homepage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stepsign, setStepsign] = useState(false);
    const [stepdashboard, stepDashboard] = useState(false);
    const [stepuserinfo, setUserinfor] = useState(false);
    const [current, setCurrent] = useState(0);
    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };
    const handleStepsign = () => {
        setStepsign(true);
        stepDashboard(false);
        setUserinfor(false);

    };
    const handleStepdashboard = () => {
        stepDashboard(true);
        setUserinfor(false);

    }
    const handleStepuserinfo = () => {
        setUserinfor(true);
    }
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const { token } = theme.useToken();


    function Userusecase() {
        return (

            <div className=''>
                <Row className='' >
                    <Col className="gutter-row" span={8} style={{ display: stepsign ? 'block' : 'none' }}  >
                        <Space align='baseline' direction='vertical'>
                            <Badge color="rgb(45, 183, 245)" text="Đăng kí" />
                            <Badge color="rgb(45, 183, 245)" text="Đăng nhập" />
                            <Badge color="rgb(45, 183, 245)" text="Thêm mẫu sinh trắc" />
                        </Space>
                    </Col>
                    <Col className="gutter-row" span={8} >
                        <Space align='baseline' direction='vertical ' style={{ display: stepdashboard ? 'block' : 'none' }}>
                            <Badge color="rgb(45, 183, 245)" text="Thêm thiết bị truy cập" />
                            <Badge color="rgb(45, 183, 245)" text="Cập nhật/xoá thiết bị đã thêm" />
                            <Badge color="rgb(45, 183, 245)" text="Thao tác với các thiết bị ngoại vi" />
                        </Space>
                    </Col>
                    <Col className="gutter-row" span={8} >
                        <Space align='baseline' direction='vertical' style={{ display: stepuserinfo ? 'block' : 'none' }}>
                            <Badge color="rgb(45, 183, 245)" text="Cập nhật dữ liệu người dùng " />
                            <Badge color="rgb(45, 183, 245)" text="Cập nhật dữ liệu sinh trắc" />

                        </Space>
                    </Col>
                </Row>
            </div>
        )
    }
    return (
        <div>
            {/* Services*/}
            <section className="page-section" id="services">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Tính năng </h2>
                        <h3 className="section-subheading text-muted"><figure class="text-start">
                            <blockquote class="blockquote">
                                <p>Hệ thống điều khiển các thiết bị trong nhà thông minh được thiết kế dựa theo các kịch bản thông minh đã được dựng trước - Service Level
                                    Agreements (SLA), bao gồm lịch trình hoạt động, quy mô hệ thống và lượng tác vụ cần xử lý .</p>
                            </blockquote>
                            <figcaption class="blockquote-footer">
                                TCS Innovation Labs, Tata Consultancy Services Limited, New Town, Kolkata, India <cite title="Source Title">Source Title</cite>
                            </figcaption>
                        </figure></h3>
                        <ul className="list-unstyled text-start">
                            <li><Text strong>Các tính năng của giao diện hệ thống:</Text>
                                <ul>
                                    <li><Text italic>Realtime Data - hệ thống cập nhật dữ liệu thời gian thực</Text></li>
                                    <li><Text italic>Giao diện thân thiện</Text></li>
                                    <li><Text italic>Bảo mật</Text></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <br />
                    <div className="row text-center">
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary" />
                                <i className="fas fa-chart-line fa-stack-1x fa-inverse" />
                            </span>
                            <h4 className="my-3">Real-Time Data</h4>
                            <p className="text-muted text-center" >Tất cả dữ liệu Cơ sở dữ liệu sử dụng hệ cơ sở dữ liệu NoSQL <a href="https://www.mongodb.com/">Mongodb</a> được lưu trữ dưới dạng đối tượng JSON, thường được gọi với cái tên BSON
                                <p role='button' className='text-primary' onClick={showModal}>...</p></p>
                            <Modal title="Realtime Database using Web SDK" open={isModalOpen} footer={null} onCancel={handleCancel}>
                                <p>Trong nhiều ứng dụng hiện nay, nhu cầu dữ liệu được hiển thị theo thời gian thực là một yêu cầu tất yếu cho của mọi hệ cơ sở dữ liệu cần đáp ứng.
                                    Cho dù đó là cảm biến IoT báo cáo giá trị, giá trị cổ phiếu mà bạn muốn theo dõi hay ứng dụng trò chuyện, bạn sẽ muốn dữ liệu tự động cập nhật giao diện người dùng của mình.
                                    Điều này có thể thực hiện được bằng cách sử dụng Luồng thay đổi MongoDB với <a href="http://https://www.mongodb.com/developer/products/mongodb/real-time-data-javascript/">SDK Web Realm.</a>
                                </p>
                            </Modal>


                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary" />
                                <i class="fas fa-calendar-days  fa-stack-1x fa-inverse"></i>

                            </span>
                            <h4 className="my-3">Responsive UI</h4>
                            <p className="text-muted">Giao diện được thiết kế khoa học và thân thiện với người dùng, phần giới thiệu đề tài và bảng điều khiển được thiết kế bằng các thư viện hỗ trợ thiết kế website chuyên nghiệp như
                                <a href="http://"> Bootstrap 5</a>, <a href="http://">Material UI</a> và <a href="http://">Ant Design</a> và được xây dựng bằng <a href="http://">Reactjs</a>- một thư viện JS-frontend mã nguồn mở.</p>
                        </div>
                        <div className="col-md-4">
                            <span className="fa-stack fa-4x">
                                <i className="fas fa-circle fa-stack-2x text-primary" />
                                <i className="fas fa-lock fa-stack-1x fa-inverse" />
                            </span>
                            <h4 className="my-3">Web Security</h4>
                            <p className="text-muted">phần bảo mật hệ thống điều khiển sử dụng quy trình User Credential. Các dữ liệu cá nhân sẽ được sử dụng cho việc bảo mật.</p>
                        </div>
                    </div>
                </div>
                <section className="page-section p-4" id="steps">

                    <div className='container'>
                        <h3 className='p-2'>User Usecase</h3>
                        <Steps
                            onChange={onChange}
                            current={current}
                            type="navigation"
                            className="site-navigation-steps"
                        >
                            <Steps.Step title='Sign-In/Sign-Up' onClick={handleStepsign} />
                            <Steps.Step title='CRUD Dashboard' onClick={handleStepdashboard} />
                            <Steps.Step title='CRUD User Information' onClick={handleStepuserinfo} />
                        </Steps>
                        <Userusecase />
                    </div>

                </section>
            </section >
            {/* Portfolio Grid*/}
            < section className="page-section bg-light" id="portfolio" >
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Thiết bị</h2>
                        <h3 className="section-subheading text-muted">Các thiết bị sử dụng cho đề tài được dựa trên môi trường và nhu cầu kĩ thuật phục vụ việc <br /> quan trắc, đo đạc các thông số môi trường qua cảm biến và các thiết bị ngoại vi.</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-4 col-sm-6 mb-4">
                            {/* Portfolio item 1*/}
                            <div className="portfolio-item">
                                <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal1">
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x" /></div>
                                    </div>
                                    <img className="img-fluid" src="assets/img/portfolio/P1.jpg" alt="..." />
                                </a>
                                <div className="portfolio-caption">
                                    <div className="portfolio-caption-heading">ESP32-WROOM</div>
                                    <div className="portfolio-caption-subheading text-muted">Khối xử lý trung tâm</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            {/* Portfolio item 2*/}
                            <div className="portfolio-item">
                                <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal2">
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x" /></div>
                                    </div>
                                    <img className="img-fluid" src="assets/img/portfolio/P2.jpg" alt="..." />
                                </a>
                                <div className="portfolio-caption">
                                    <div className="portfolio-caption-heading">DHT22</div>
                                    <div className="portfolio-caption-subheading text-muted">Cảm biến nhiệt độ & độ ẩm</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4">
                            {/* Portfolio item 3*/}
                            <div className="portfolio-item">
                                <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal3">
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x" /></div>
                                    </div>
                                    <img className="img-fluid" src="assets/img/portfolio/P3.jpg" alt="..." />
                                </a>
                                <div className="portfolio-caption">
                                    <div className="portfolio-caption-heading">MC-38</div>
                                    <div className="portfolio-caption-subheading text-muted">Cảm biến cửa từ</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4 mb-lg-0">
                            {/* Portfolio item 4*/}
                            <div className="portfolio-item">
                                <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal4">
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x" /></div>
                                    </div>
                                    <img className="img-fluid" src="assets/img/portfolio/P4.jpg" alt="..." />
                                </a>
                                <div className="portfolio-caption">
                                    <div className="portfolio-caption-heading">Cảm biến ánh sáng</div>
                                    <div className="portfolio-caption-subheading text-muted">Module Quang trở</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4 mb-sm-0">
                            {/* Portfolio item 5*/}
                            <div className="portfolio-item">
                                <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal5">
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x" /></div>
                                    </div>
                                    <img className="img-fluid" src="assets/img/portfolio/P5.jpg" alt="..." />
                                </a>
                                <div className="portfolio-caption">
                                    <div className="portfolio-caption-heading">MQ-4</div>
                                    <div className="portfolio-caption-subheading text-muted">Cảm biến khí gas & khói</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6 mb-4 mb-lg-0">
                            {/* Portfolio item 6*/}
                            <div className="portfolio-item">
                                <a className="portfolio-link" data-bs-toggle="modal" href="#portfolioModal6">
                                    <div className="portfolio-hover">
                                        <div className="portfolio-hover-content"><i className="fas fa-plus fa-3x" /></div>
                                    </div>
                                    <img className="img-fluid" src="assets/img/portfolio/P6.jpg" alt="..." />
                                </a>
                                <div className="portfolio-caption">
                                    <div className="portfolio-caption-heading">SR-602</div>
                                    <div className="portfolio-caption-subheading text-muted">Cảm biến PIR nhiệt chuyển động</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/* About*/}
            < section className="page-section" id="about" >
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Quá Trình</h2>
                        <h3 className="section-subheading text-muted">Quá trình hoàn thiện đề tài</h3>
                    </div>
                    <ul className="timeline">
                        <li>
                            <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/1.jpg" alt="..." /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>Bắt đầu</h4>
                                    <h4 className="subheading">15/9</h4>
                                </div>
                                <div className="timeline-body"><p className="text-muted"></p></div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/2.jpg" alt="..." /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>5/10</h4>
                                    <h4 className="subheading">Tìm hiểu công nghệ </h4>
                                </div>
                                <div className="timeline-body"><p className="text-muted"></p></div>
                            </div>
                        </li>
                        <li>
                            <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/3.jpg" alt="..." /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>21/10</h4>
                                    <h4 className="subheading"></h4>
                                </div>
                                <div className="timeline-body"><p className="text-muted"></p></div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-image"><img className="rounded-circle img-fluid" src="assets/img/about/4.jpg" alt="..." /></div>
                            <div className="timeline-panel">
                                <div className="timeline-heading">
                                    <h4>18/11 đến nay</h4>
                                    <h4 className="subheading"></h4>
                                </div>
                                <div className="timeline-body"><p className="text-muted"></p></div>
                            </div>
                        </li>
                        <li className="timeline-inverted">
                            <div className="timeline-image">
                                <h4>
                                    Be Part
                                    <br />
                                    Of Our
                                    <br />
                                    Story!
                                </h4>
                            </div>
                        </li>
                    </ul>
                </div>
            </section >
            {/* Team*/}
            < section className="page-section bg-light" id="team" >
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Creator</h2>
                        <h3 className="section-subheading text-muted">Full-stack Dev.</h3>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="team-member ">
                                <img className="mx-auto rounded-circle" src="assets/img/team/1.png" alt="..." />
                                <h4>Nguy Duc Huy</h4>
                                <p className="text-muted">Designer</p>
                                <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand Twitter Profile"><i className="fab fa-twitter" /></a>
                                <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand Facebook Profile"><i className="fab fa-facebook-f" /></a>
                                <a className="btn btn-dark btn-social mx-2" href="#!" aria-label="Parveen Anand LinkedIn Profile"><i className="fab fa-linkedin-in" /></a>
                            </div>

                        </div>
                        <div className='col  border-start' style={{ paddingLeft: '5rem' }}>
                            <Timeline
                                items={[
                                    {
                                        children: 'Create a services site 2015-09-01',
                                    },
                                    {
                                        children: 'Solve initial network problems 2015-09-01',
                                    },
                                    {
                                        children: 'Technical testing 2015-09-01',
                                    },
                                    {
                                        children: 'Network problems being solved 2015-09-01',
                                    },
                                ]}
                            />
                        </div>

                    </div>
                </div></section >
            {/* Clients*/}
            {/* Contact*/}
            {/* <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Contact Us</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                    {/* * * * * * * * * * * * * * * **/}
            {/* * * SB Forms Contact Form * **/}
            {/* * * * * * * * * * * * * * * **/}
            {/* This form is pre-integrated with SB Forms.*/}
            {/* To make this form functional, sign up at*/}
            {/* https://startbootstrap.com/solution/contact-forms*/}
            {/* to get an API token!*/}
            {/* <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                        <div className="row align-items-stretch mb-5">
                            <div className="col-md-6">
                                <div className="form-group">
                                    {/* Name input*/}
            {/* <input className="form-control" id="name" type="text" placeholder="Your Name *" data-sb-validations="required" />
                                    <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                </div>
                                <div className="form-group"> */}
            {/* Email address input*/}
            {/* <input className="form-control" id="email" type="email" placeholder="Your Email *" data-sb-validations="required,email" />
                                    <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                    <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                </div>
                                <div className="form-group mb-md-0"> */}
            {/* Phone number input*/}
            {/* <input className="form-control" id="phone" type="tel" placeholder="Your Phone *" data-sb-validations="required" />
                                    <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group form-group-textarea mb-md-0"> */}
            {/* Message input*/}
            {/* <textarea className="form-control" id="message" placeholder="Your Message *" data-sb-validations="required" defaultValue={""} />
                                    <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                                </div>
                            </div>
                        </div> */}
            {/* Submit success message*/}
            {/**/}
            {/* This is what your users will see when the form*/}
            {/* has successfully submitted*/}
            {/* <div className="d-none" id="submitSuccessMessage">
                            <div className="text-center text-white mb-3">
                                <div className="fw-bolder">Form submission successful!</div>
                                To activate this form, sign up at
                                <br />
                                <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                            </div>
                        </div> */}
            {/* Submit error message*/}
            {/**/}
            {/* This is what your users will see when there is*/}
            {/* an error submitting the form*/}
            {/* <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div> */}
            {/* Submit Button*/}
            {/* <div className="text-center"><button className="btn btn-primary btn-xl text-uppercase disabled" id="submitButton" type="submit">Send Message</button></div> */}
            {/* </form> */}
            {/* </div> */}
            {/* </section> */}
        </div >

    )
}

export default Homepage
