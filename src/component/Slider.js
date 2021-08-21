import React from 'react';
import './component.css';
import { assetsImages } from '../constants/images';
import { Carousel } from 'react-bootstrap';
import SmallLoader from './SmallLoader';

const Slider = ({ tokenNames, tokenPrices, profileImages }) => {
    console.log({ profileImages })
    return (
        <div>
            <Carousel>
                {tokenNames.map((tokenName, index) => {
                    return (
                        <Carousel.Item>
                            <div className="item d-flex flex-column justify-content-center align-items-center w-100 carousel-artist" style={{ height: "300px" }}>
                                <div className="mb-5">
                                    <img src={profileImages[index] ? `${process.env.REACT_APP_SERVER_URL}/${profileImages[index]}` : assetsImages.artist} height="150" width="150" style={{ borderRadius: "50%" }} alt="artistimage" />
                                </div>
                                <div className="information-row d-flex justify-content-around align-items-center w-100">
                                    <div className="name-person">
                                        {tokenName?tokenName:<SmallLoader />}
                                        <span className="categories">Rap</span>
                                    </div>
                                    <div className="name-person">
                                        {tokenPrices[index] ? `$ ${tokenPrices[index]}` : <SmallLoader />}
                                        <span className="up-down">--</span>
                                    </div>
                                </div>
                            </div>
                        </Carousel.Item>
                        )
                    })
                }
{/* 
                <Carousel.Item>
                    <div className="item d-flex flex-column justify-content-center align-items-center w-100 carousel-artist" style={{ height: "300px" }}>
                        <div className="mb-5">
                            <img src={assetsImages.person} height="100" width="100" style={{ borderRadius: "50%" }} alt="artistimage" />
                        </div>

                        <div className="information-row d-flex justify-content-around align-items-center w-100">
                            <div className="name-person">
                                Drake
                                <span className="categories">Rap</span>
                            </div>
                            <div className="name-person">
                                $ 107.88
                                <span className="up-down">+5.7%</span>
                            </div>

                        </div>

                    </div>
                </Carousel.Item> */}
            </Carousel>
        </div>

    )

    // return (
    //     <div className="new-slider-main">
    //         <div className="slider">
    //             <input type="radio" name="testimonial" id="t-1" />
    //             <input type="radio" name="testimonial" id="t-2" />
    //             <input type="radio" name="testimonial" id="t-3" checked onChange={() => null} />
    //             <input type="radio" name="testimonial" id="t-4" />
    //             <input type="radio" name="testimonial" id="t-5" />

    //             <div className="testimonials">
    //                 <label className="item" htmlFor="t-1">
    //                     <img src={assetsImages.person} alt="artistimage" />
    //                     <div className="information-row">
    //                         <div className="name-person">
    //                             Drake
    //                             <span className="categories">Rap</span>
    //                         </div>
    //                         <div className="name-person">
    //                             $ 107.88
    //                             <span className="up-down">+5.7%</span>
    //                         </div>

    //                     </div>

    //                 </label>

    //                 <label className="item" htmlFor="t-2">
    //                     <img src={assetsImages.person} alt="picturesque" />
    //                     <div className="information-row">
    //                         <div className="name-person">
    //                             Drake
    //                             <span className="categories">Rap</span>
    //                         </div>
    //                         <div className="name-person">
    //                             $ 107.88
    //                             <span className="up-down">+5.7%</span>
    //                         </div>

    //                     </div>

    //                 </label>
    //                 <label className="item" htmlFor="t-3">
    //                     <img src={assetsImages.person} alt="picturesque" />
    //                     <div className="information-row">
    //                         <div className="name-person">
    //                             Drake
    //                             <span className="categories">Rap</span>
    //                         </div>
    //                         <div className="name-person">
    //                             $ 107.88
    //                             <span className="up-down">+5.7%</span>
    //                         </div>
    //                     </div>

    //                 </label>
    //                 <label className="item" htmlFor="t-4">
    //                     <img src={assetsImages.person} alt="picturesque" />
    //                     <div className="information-row">
    //                         <div className="name-person">
    //                             Drake
    //                             <span className="categories">Rap</span>
    //                         </div>
    //                         <div className="name-person">
    //                             $ 107.88
    //                             <span className="up-down">+5.7%</span>
    //                         </div>

    //                     </div>
    //                 </label>
    //                 <label className="item" htmlFor="t-5">
    //                     <img src={assetsImages.person} alt="picturesque" />
    //                     <div className="information-row">
    //                         <div className="name-person">
    //                             Drake
    //                             <span className="categories">Rap</span>
    //                         </div>
    //                         <div className="name-person">
    //                             $ 107.88
    //                             <span className="up-down">+5.7%</span>
    //                         </div>

    //                     </div>
    //                 </label>

    //             </div>
    //             <div className="dots">

    //                 <label htmlFor="t-2" />
    //                 <label htmlFor="t-3" />
    //                 <label htmlFor="t-4" />

    //             </div>
    //         </div>

    //     </div>
    // )
}



export default Slider

