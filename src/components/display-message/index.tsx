import React from 'react'
import { IonContent, IonToast } from '@ionic/react';
interface Props {
    type: string;
    message: string;
}

export const DisplayMessage = ({ type, message }:Props) => {
    return <IonContent>
        <IonToast
            color={type}
            position="top"
            isOpen={true}
            message={message}
            buttons={[
                {
                text: 'Закрыть',
                role: 'cancel',
                }
            ]}
        />
    </IonContent>
}

