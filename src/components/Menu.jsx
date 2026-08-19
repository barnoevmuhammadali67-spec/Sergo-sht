import { NavLink } from "react-router";

export default function Menu({ categories }) {
    return (
        <aside className="menu menu-fixed">
            <p className="menu-label">Sahifalar</p>
            <ul className="menu-list">

                <li><NavLink to="/about">Sergosht haqida qisqacha</NavLink></li>
                <li><NavLink to="/rewiews">Отзывы</NavLink></li>
                <li><NavLink to="/cart">Корзина</NavLink></li>
                <li><NavLink to="/Deliavery">Мои заказы</NavLink></li>

            </ul>
            <p className="menu-label">Kategoriyalar</p>
            <ul className="menu-list">
                {categories.map(category => (
                    <li><a href={`#${category.slug}`}>{category.title}</a></li>

                ))}
            </ul>
        </aside>
    )
}