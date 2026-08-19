import { useState } from "react"
import { toast } from 'react-toastify';

export default function Product({ productId, open, photo, title, price, description }) {

    const [isHovered, setIsHovered] = useState(false)

    function addToCart() {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]')

        const isExist = cart.find(product => product.id === productId)

        if (isExist) {
            cart = cart.map(product => {
                if (product.id === isExist.id) {
                    product.count++
                }

                return product
            })

            toast.success(`${title} savatda ${isExist.count} ta mavjud`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            cart.push({
                id: productId,
                photo,
                title,
                price,
                count: 1
            })

            toast.success(`${title} savatga qoshildi`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart))
    }

    return (
        <div
            onMouseLeave={() => {
                setIsHovered(false)
            }}
            onMouseEnter={() => {
                setIsHovered(true)
            }}
            className="column is-3"
            onClick={open}
        >
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img
                            src={photo}
                            alt="Placeholder image"
                        />
                    </figure>
                </div>

                <div class="card-content">
                    <div class="media">
                        <div class="media-content">
                            <div class="is-flex is-justify-content-space-between">
                                <div>
                                    <p class="title is-4">{title}</p>
                                    <p class="subtitle is-6">{price} sum</p>
                                </div>

                                {isHovered && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            addToCart()
                                        }}
                                        class="button is-dark"
                                    >
                                        <b>+</b>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div class="content">
                        {description}
                    </div>
                </div>
            </div>
        </div>
    )
}