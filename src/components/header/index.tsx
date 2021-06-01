import React from 'react'
import {  IonHeader, IonToolbar } from '@ionic/react';
import { Link } from 'react-router-dom';
import './index.scss'

export const Header = () => {
    return (
        <IonHeader>
        <IonToolbar>
            <Link className="header__link" to="/">
                Все психологи
            </Link>
            <Link className="header__link" to="/adding-form">
                Добавить специалиста
            </Link>
            <Link className="header__link" to="/favorite">
                Любимые психологи
            </Link>
            <Link className="header__link" to="/disfavorite">
                Нелюбимые психологи
            </Link>
            <Link className="header__link" to="/analytics">
                Аналитика
            </Link>
        </IonToolbar>
      </IonHeader>
    )
}
