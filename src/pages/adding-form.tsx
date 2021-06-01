import React, { useState } from 'react';
import { 
    IonSelectOption, 
    IonSelect, 
    IonContent, 
    IonButton,  
    IonInput, 
    IonItem, 
    IonLabel, 
    IonCard, 
} from '@ionic/react';
import './adding-form.scss'
import { useDispatch } from 'react-redux';
import { addPsycholog } from '../stote/features/psychologists-data';
import { DisplayMessage } from '../components/display-message';


export const AddingForm: React.FC = () => {
    const [showToast, setShowToast] = useState(false);
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>('');
    const [type, setType] = useState<string>('');

    // get the store.dispatch function from useDispatch
    const dispatch = useDispatch()

    //submitting and checking form values
    const sumbmitHandler = (e: any) => {
        e.preventDefault()
        if(name && email && type) {
            dispatch(addPsycholog({
                name, 
                email, 
                type,
                rating: null
            }))
            setName('')
            setEmail('')
            setType("")
            console.log(`submit`, {name, email, type})
        } else {
            console.log('enter value');   
        }

        
    }

    return (
        <IonContent>
        <IonCard>
            <form onSubmit={sumbmitHandler} className="adding-form__form">
                <IonItem>
                    <IonLabel position="floating">Имя</IonLabel>
                    <IonInput
                        inputmode="text"
                        value={name} 
                        placeholder="Введите имя" 
                        onIonChange={e => setName(e.detail.value!)}
                    />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput 
                            autocomplete="email"
                            inputmode="email"
                            pattern="email"
                            type="email" 
                            value={email}
                            onIonChange={e => setEmail(e.detail.value!)}
                        />
                    </IonItem>    
                    <IonItem>
                        <IonLabel>Выберите тип специалиста</IonLabel>
                        <IonSelect 
                            value={type} 
                            placeholder="Выберите одного" 
                            onIonChange={e => setType(e.detail.value)}
                        >
                        <IonSelectOption value="Психолог">Психолог</IonSelectOption>
                        <IonSelectOption value="Психотерапевт ">Психотерапевт </IonSelectOption>
                        <IonSelectOption value="Психиатр">Психиатр</IonSelectOption>
                        </IonSelect>
                </IonItem>
                <IonButton onClick={sumbmitHandler} className="adding-form__btn" color="primary">Добавить</IonButton>    
            </form>     
        </IonCard>
      </IonContent> 
    );
};