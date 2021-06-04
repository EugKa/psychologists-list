import React from 'react';
import { 
    IonSelectOption, 
    IonSelect, 
    IonContent, 
    IonButton,  
    IonInput, 
    IonItem, 
    IonLabel, 
    IonCard, 
    IonList,
} from '@ionic/react';
import './adding-form.scss'
import { useDispatch } from 'react-redux';
import { addPsycholog } from '../stote/features/psychologists-data';
import { IPsycholog } from '../types/psycholog'
import { useForm, SubmitHandler } from "react-hook-form";


export const AddingForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IPsycholog>({
    defaultValues: {
      rating: null,
    }
  });
  // get the store.dispatch function from useDispatch
  const dispatch = useDispatch()
  //submitting and checking form values
  const onSubmit: SubmitHandler<IPsycholog> = data => {
    dispatch(addPsycholog(data))
    console.log(`data`,  data)
    reset(data)
  };

  return (
      <IonContent>
      <IonCard>
          <form onSubmit={handleSubmit(onSubmit)} className="adding-form__form">
            <IonList>
              <IonItem>
                  <IonLabel position="floating">Имя</IonLabel>
                  <IonInput {...register("name", { 
                      required: true, 
                      minLength: 5, 
                      pattern: /^([a-zA-Z0-9]+|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{1,}|[a-zA-Z0-9]+\s{1}[a-zA-Z0-9]{3,}\s{1}[a-zA-Z0-9]{1,})$/
                    })}
                  />
              </IonItem>
              {errors.name && <div className="adding-form__error">Введите имя.</div>}  
              <IonItem>
                  <IonLabel position="floating">Email</IonLabel>
                    <IonInput 
                      autocomplete="email"
                      {...register("email", {
                        required: true,
                        pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                      })}
                />
              </IonItem>
              {errors.email && <div className="adding-form__error">Введите email.</div>}  
              <IonItem>
                  <IonLabel>Выберите тип специалиста</IonLabel>
                  <IonSelect  {...register("type", { required: true })}>
                    <IonSelectOption value="Психолог">Психолог</IonSelectOption>
                    <IonSelectOption value="Психотерапевт">Психотерапевт</IonSelectOption>
                    <IonSelectOption value="Психиатр">Психиатр</IonSelectOption>
                  </IonSelect>
              </IonItem>
              {errors.type && <div className="adding-form__error">Выберите специалиста.</div>}  
              <IonButton type="submit" className="adding-form__btn" color="primary">Добавить</IonButton>
            </IonList>    
          </form>     
      </IonCard>
    </IonContent> 
  );
};