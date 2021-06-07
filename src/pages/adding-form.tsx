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
    IonList,
} from '@ionic/react';
import './adding-form.scss'
import { useDispatch } from 'react-redux';
import { createPsycholog } from '../stote/features/psychologists-data';
import { IPsycholog } from '../types/psycholog'
import { useForm, SubmitHandler } from "react-hook-form";
import { DisplayMessage } from '../components/display-message';


export const AddingForm: React.FC = () => {
  const [submitStatus, setSubmitStatus] = useState('')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IPsycholog>({
    defaultValues: {
      rating: null,
    }
  });
  // get the store.dispatch function from useDispatch
  const dispatch = useDispatch()

  //submitting and checking form values
  const onSubmit: SubmitHandler<IPsycholog> = data => {
    try {
      dispatch(createPsycholog(data))
      setSubmitStatus('pending')
      reset();
    } catch (error) {
      console.error('Failed to save: ', error)
      setSubmitStatus('falied')
    } finally {
      setSubmitStatus('success')
    }
  };

  const statusBanner = submitStatus === 'success' ?  ( 
    <DisplayMessage type="success" message="Спецыалист добавлен"/>
  ) : submitStatus === 'falied' ? (
    <DisplayMessage type="danger" message="Что то пошло не так. Пожалуйста попробуйте позже"/>
  ) : null


  console.log('submited',submitStatus);
  return (
      <IonContent>
      <IonCard>
          {statusBanner}
          <form onSubmit={handleSubmit(onSubmit)} className="adding-form__form">
            <IonList>
              <IonItem>
                  <IonLabel position="floating">Имя и фамалия</IonLabel>
                  <IonInput {...register("name", { 
                      required: true, 
                      minLength: 5, 
                      pattern: /([а-яА-яa-zA-z]+\s)+([а-яА-яa-zA-z]+)/ig
                    })}
                  />
              </IonItem>
              {errors.name && <div className="adding-form__error">Введите имя и фамилию.</div>}  
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