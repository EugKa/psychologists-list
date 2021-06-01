import React, { useEffect } from 'react'
import { 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonRow, 
  IonCol 
} from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stote/rootReducer';
import { AppDispatch } from '../stote';
import { fetchDataList } from '../stote/features/psychologists-data';


export const Analytics = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchDataList())
    
  }, [dispatch])
  const state = useSelector((state: RootState) => 
    state.psychologistsList.psychologistsList
  )
  
  const getCount = (value: string, type: string) => {
    if(type === 'type') {
      const filtvau = state.filter(items => items.type === value)
      return <IonCardTitle>{filtvau.length}</IonCardTitle>
    } else if (type === 'rating') {
      const filtvau = state.filter(items => items.rating === value)
      return <IonCardTitle>{filtvau.length}</IonCardTitle>
    }
    return null;
  }

  return (
    <IonContent>
      <IonRow>
        <IonCol>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Количество Психологов</IonCardSubtitle>
              {getCount('Психолог','type')}
            </IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Количество Психотерапевтов</IonCardSubtitle>
              {getCount('Психотерапевт','type')}
            </IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Количество Психиатров</IonCardSubtitle>
              {getCount('Психиатр','type')}
            </IonCardHeader>
          </IonCard>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Любимые</IonCardSubtitle>
              {getCount('favorite','rating')}
            </IonCardHeader>
          </IonCard>
        </IonCol>
        <IonCol>
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Нелюбимые</IonCardSubtitle>
              {getCount('disfavorite','rating')}
            </IonCardHeader>
          </IonCard>
        </IonCol>
      </IonRow>
    </IonContent>
  )
}
