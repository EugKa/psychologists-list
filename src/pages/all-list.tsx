import React, { useEffect } from 'react';
import { 
  IonList, 
  IonContent,
  IonProgressBar 
} from '@ionic/react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stote/rootReducer';
import { fetchDataList, updatePsychologRating } from '../stote/features/psychologists-data';
import { IPsycholog } from '../types/psycholog';
import { AppDispatch } from '../stote';
import { PsychologItem } from '../components/psycholog-item';
import { DisplayMessage } from '../components/display-message';

  
export const AllList: React.FC = () => {
  // get the store.dispatch function from useDispatch
  const dispatch = useDispatch<AppDispatch>();

  // mapping value from store
  const data = useSelector((state:RootState) => state.psychologistsList)
  const status = useSelector((state:RootState) => state.psychologistsList.status)
  //requesting data
  useEffect(() => {
    dispatch(fetchDataList())
  }, [dispatch])

  
  const onRatingChange = (rating: string, id: string) => {
    dispatch(updatePsychologRating({rating, id}))
  }

  const ErrorBannerElement = status === 'failed' ? <DisplayMessage type="danger" message="Что то пошло не так. Пожалуйста попробуйте позже"/> : null;

  const renderList = () => {
    return <IonList>
      {
        data.psychologistsList.map((items: IPsycholog) => {
          return <PsychologItem key={items.id} items={items} onRatingChange={onRatingChange}/>
        })
      }
    </IonList>
  }
  return (
    <IonContent>
      {ErrorBannerElement}
      {status === 'loading' ? <IonProgressBar/> : renderList()}
    </IonContent>
  )
};