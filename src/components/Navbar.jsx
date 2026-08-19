 import { NavLink } from "react-router";
import { useState, useEffect } from "react";
 
export default function Navbar() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({ step: "phone", phone: "", code: "", error: "", showCode: false });
 
    useEffect(() => {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', '[]');
        }
    }, []);
 
    function closeModal() {
        setIsModalOpen(false);
        setForm({ step: "phone", phone: "", code: "", error: "", showCode: false });
    }
 
    let user = null;
    try {
        user = JSON.parse(localStorage.getItem('user'));
    } catch {
        user = null;
    }
 
    function authenticate(e) {
        e.preventDefault();
 
        fetch('https://rest.sergosht-api.uz/api/send-verification-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: e.target.phone.value })
        })
        .then(res => {
            if (!res.ok) throw new Error('Ошибка отправки кода');
            setForm(prev => ({ ...prev, showCode: true, step: "code" }));
        })
        .catch(() => setForm(prev => ({ ...prev, error: 'Не удалось отправить код' })));
    }
 
    function checkCode(e) {
        e.preventDefault();
 
        fetch('https://rest.sergosht-api.uz/api/check-verification-code', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: e.target.phone.value, code: e.target.code.value })
        })
        .then(res => res.json())
        .then(data => {
            if (data?.error) {
                setForm(prev => ({ ...prev, error: 'Неверный код' }));
            } else {
                localStorage.setItem('user', JSON.stringify(data));
                setIsModalOpen(false);
                setForm(prev => ({ ...prev, showCode: false }));
                window.location.reload();
            }
        });
    }
 
    return (
        <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <NavLink className="navbar-item" to="/">
                    <img src="https://cdn.foodpicasso.com/assets/2023/07/06/eb22f9d7023be861993888ee788ed89d---png_original_919c8_convert.webp" alt="" />
                </NavLink>
 
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
 
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start"></div>
                <div className="navbar-end">
                    <div className="navbar-item">
 
                       {user ? (
                        <button className="button is-danger is-light" onClick={() => {
                        localStorage.removeItem('user')
                        window.location.reload()
                        }}>
                            <strong>Выйти</strong>
                        </button>
                        ) : (
                    <button className="button is-primary" onClick={() => setIsModalOpen(true)}>
                        <strong>Войти</strong>
                    </button>
                    )}
 
                        {isModalOpen && (
                            <div className="modal is-active">
                                <div className="modal-background" onClick={closeModal}></div>
                                <div className="modal-card">
                                    <header className="modal-card-head">
                                        <p className="modal-card-title">авторизация</p> <button className="delete" aria-label="close" onClick={closeModal}></button>
                                    </header>
                                    {form.step === "phone" && (
                                        <form onSubmit={authenticate}>
                                            <section className="modal-card-body">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    name="phone"
                                                    placeholder="Введите свой номер"
                                                    value={form.phone}
                                                    onChange={(e) => setForm(prev => ({ ...prev, phone: e.target.value }))}
                                                    required
                                                />
                                                {form.error && <p className="help is-danger">{form.error}</p>}
                                            </section>
                                            <footer className="modal-card-foot">
                                                <div className="buttons">
                                                    <button className="button is-success">Получить код</button>
                                                </div>
                                            </footer>
                                        </form>
                                    )}
 
                                    {form.step === "code" && (
                                        <form onSubmit={checkCode}>
                                            <section className="modal-card-body">
                                                <input type="hidden" name="phone" value={form.phone} readOnly />
                                                <input
                                                    className="input"
                                                    type="text"
                                                    name="code"
                                                    placeholder="Введите код отправленный на ваш телефон"
                                                    value={form.code}
                                                    onChange={(e) => setForm(prev => ({ ...prev, code: e.target.value }))}
                                                    maxLength={4}
                                                    required
                                                />
                                                {form.error && <p className="help is-danger">{form.error}</p>}
                                            </section>
                                            <footer className="modal-card-foot">
                                                <div className="buttons">
                                                    <button className="button is-success">Проверить код</button>
                                                </div>
                                            </footer>
                                        </form>
                                    )}
                                </div>
                            </div>
                        )}
 
                    </div>
                </div>
            </div>
        </nav>
    );
}