import React, { useEffect } from 'react';
import { 
  IonList, 
  IonContent,
} from '@ionic/react';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stote/rootReducer';
import { fetchDataList, updatePsychologRating } from '../stote/features/psychologists-data';
import { IPsycholog } from '../types/psycholog';
import { AppDispatch } from '../stote';
import { PsychologItem } from '../components/psycholog-item';
  
export const AllList: React.FC = () => {
  // get the store.dispatch function from useDispatch
  const dispatch = useDispatch<AppDispatch>();

  // mapping value from store
  const state = useSelector((state:RootState) => state.psychologistsList.psychologistsList)
  
  //requesting data
  useEffect(() => {
    dispatch(fetchDataList())
  }, [dispatch])

  //changing rating value
  const onRatingChange = (rating: string, id: string) => {
    dispatch(updatePsychologRating({rating, id}))
    console.log(`rating`, rating, `id`, id)
  }

  const renderList = () => {
    return <IonList>
      {
        state.map((items: IPsycholog) => {
          return <PsychologItem key={items.id} items={items} onRatingChange={onRatingChange}/>
        })
      }
    </IonList>
  }
  return (
    <IonContent>
      {renderList()}
    </IonContent>
  )
};