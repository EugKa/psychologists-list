import React from 'react'
import { IonIcon, IonItem, IonLabel } from '@ionic/react'
import { thumbsUpOutline, thumbsDownOutline } from 'ionicons/icons';
import { IPsycholog } from '../../types/psycholog';
import './index.scss'

interface Props {
    items: IPsycholog;
    onRatingChange: (value: string, id: string) => void;
}


export const PsychologItem = ({items, onRatingChange}: Props) => {
    const { id, name, type, email } = items;
    return (
        <IonItem lines="full">
            <IonLabel>{name}</IonLabel>
            <IonLabel>{type}</IonLabel>
            <IonLabel>{email}</IonLabel>
            <IonIcon className="psycholog-item__btn" onClick={() => onRatingChange('favorite', id!)} icon={thumbsUpOutline} slot="end" />
            <IonIcon className="psycholog-item__btn" onClick={() => onRatingChange('disfavorite', id!)} icon={thumbsDownOutline} slot="end" />
        </IonItem>
    )
}
