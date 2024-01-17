import React, { useState, useEffect } from 'react'
import Typed from 'typed.js';
import { Link } from 'react-router-dom';
function Header() {
    const el = React.useRef(null);
    const [navbar, setNavbar] = useState(false);
    React.useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [' điều khiển', 'quản lý', 'giám sát'],
            typeSpeed: 50,
            backSpeed: 50,
            loop: true,
            smartBackspace: true
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);

    const changeBackground = () => {
        if (window.scrollY >= 60) {
            setNavbar(true)
        }
        else
            setNavbar(false)
    }


    window.addEventListener('scroll', changeBackground)



    return (
        <>

            <nav className='navbar navbar-expand-lg navbar-dark fixed-top' id="mainNav">
                <nav className={navbar ? "navbar navbar-expand-lg navbar-dark fixed-top navbar-shrink" : "navbar navbar-expand-lg navbar-dark fixed-top"}>

                    <div className="container">
                        <a className="navbar-brand" href="#page-top"><img style={{ height: '3.1rem' }} src="assets/img/ute_bdrp.png" className="img1" alt=" ..." />
                        </a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            Menu
                            <i className="fas fa-bars" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
                                <li className="nav-item"><a className="nav-link" href="#services">Tính năng</a></li>
                                <li className="nav-item"><a className="nav-link" href="#portfolio">Thiết bị </a></li>
                                <li className="nav-item"><a className="nav-link" href="#about">Quá Trình</a></li>
                                <li className="nav-item"><a className="nav-link" href="#team">Creator</a></li>
                                <Link to='/dashboard ' className='link-underline-light link-underline-opacity-0'>
                                    <li className="nav-item"><a className='nav-link'  >Start Free</a></li>
                                </Link>

                            </ul>
                        </div>
                    </div>
                </nav>
            </nav>


            {/* Masthead*/}
            <header className="masthead">
                <div className="container">
                    <div className="masthead-subheading">Đồ án tốt nghiệp</div>
                    <div className="masthead-heading text-uppercase fs-1 ">Hệ thống
                        <span class="first-subheading text-warning">  </span>
                        <span className='text-warning fs-1' ref={el} />
                        <br />
                        <span className="masthead-heading text-uppercase fs-1">thiết bị trong nhà thông minh</span>
                    </div>
                    <div>
                        <a className="btn  btn-secondary btn-lg text-uppercase" href="#services">
                            <i className="fa-solid fa-arrow-down" />
                            Thông tin thêm
                        </a>
                    </div>
                </div>
            </header>




        </>

    )
}

export default Header
