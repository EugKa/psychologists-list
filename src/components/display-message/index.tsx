import { IonContent, IonToast } from '@ionic/react';
import React, { useState } from 'react'

interface Props {
    type: any;
    message: string;
    showToast: boolean;
}

export const DisplayMessage = () => {
    console.log('eee')
    
    return <IonContent>
        <IonToast
            color={'success'}
            position="top"
            isOpen={true}
            message={'success'}
            buttons={[
                {
                text: 'Закрыть',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
                }
            ]}
        />
    </IonContent>
}

