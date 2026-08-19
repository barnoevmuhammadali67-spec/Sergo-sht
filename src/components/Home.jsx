 

import { useEffect, useState } from "react";
import Navbar from "./Navbar"
import Menu from "./Menu"
import ProductList from "./ProductList"
import { Swiper, SwiperSlide } from 'swiper/react';
import { ToastContainer } from 'react-toastify';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { Navigation, Autoplay } from 'swiper/modules';
import { data } from "react-router";

export default function Home() {
    const [categories, setCategories] = useState([]);
    const [slides, setSlides] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)


    useEffect(() => {
        fetch('https://rest.sergosht-api.uz/api/categories/?with_products=1')
            .then(response => response.json())
            .then(data => setCategories(data))

        fetch('https://rest.sergosht-api.uz/api/slider/')
            .then(response => response.json())
            .then(data => setSlides(data))
    }, [])

    return (
        <>
            <div>
                <Navbar />
                <div className="container mt-5">
                    <div className="columns">
                        <div className="column is-2">
                            <Menu categories={categories} />
                        </div>
                        <div className="column is-10">
                            <div className="row mb-6">
                                <Swiper autoplay={true} modules={[Navigation, Autoplay]}>
                                    {slides.map(slide => (
                                        <SwiperSlide>
                                            <img style={{ width: '100%' }} src={slide.image} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            {categories.map(category => <ProductList products={category.products} slug={category.slug} title={category.slug} />)}
                        </div>
                    </div>
                </div>
                <ToastContainer/>
            </div>



            {/* <div className="row mb-6" id={slug}>
                           <div className="block">
                               <h2 className="title">{title}</h2>
           
                               </div>
                           </div>
                       <div class={`modal ${isModalOpen ? 'is-active' : ''}`}>
                           <div class="modal-background"></div>
                           <div class="modal-content">
                               <div className="column is-12">
                                   <div class="card">
                                       <div class="card-image">
                                           <figure class="image-is4by3">
                                               <img
                                                   src=""
                                                   alt="Placeholder image"
                                               />
                                           </figure>
                                       </div>
                                       <div class="card-content">
                                           <div class="media">
                                               <div class="media-content">
                                                   <p class="title is-4">Название</p>
                                                   <p class="subtitle is-6">Цена сум</p>
                                               </div>
                                           </div>
                                           <div class="content">
                                               Описание
                                           </div>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <button onClick={() => setIsModalOpen(false)} class="modal-close is-large" aria-label="close"></button>
                       </div> */}
        </>
    )
}