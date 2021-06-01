import React, { useEffect } from 'react'
import { IonContent, IonList } from '@ionic/react'
import { useDispatch, useSelector } from 'react-redux';
import { PsychologItem } from '../components/psycholog-item';
import { AppDispatch } from '../stote';
import { fetchDataList, updatePsychologRating } from '../stote/features/psychologists-data';
import { RootState } from '../stote/rootReducer';
import { IPsycholog } from '../types/psycholog';
import { VisibilityFilter } from '../stote/features/psychologists-filter';
import { FilterButton } from '../components';

interface Props {
    ratingType: string;
}

//filtering the lists and check their coincidence
const getVisibleFilter = (items: IPsycholog[], filter: VisibilityFilter) => {
  switch (filter) {
    case VisibilityFilter.ShowAll:
      return items
    case VisibilityFilter.ShowPsychiatrist:
      return items.filter(item => item.type === "Психиатр")
    case VisibilityFilter.ShowPsychologist:
      return items.filter(item => item.type === "Психолог")
    case VisibilityFilter.ShowPsychotherapist:
      return items.filter(item => item.type === 'Психотерапевт')
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

export const Rating = ({ratingType}:Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const state = useSelector((state:RootState) =>  
  getVisibleFilter(state.psychologistsList.psychologistsList, state.visibilityFilter))
  
  useEffect(() => {
    dispatch(fetchDataList())
    
  }, [dispatch])

  const onRatingChange = (rating: string, id: string) => {
    dispatch(updatePsychologRating({rating, id}))
    console.log(`value`, rating, `id`, id)
  }

  const renderList = () => {
    return <IonList>
      {
        state.filter(items => items.rating === ratingType).map((items: IPsycholog) => {
          return <PsychologItem key={items.id} items={items} onRatingChange={onRatingChange}/>
        })
      }
    </IonList>
  }
  return (
    <IonContent>
      <FilterButton visibilityFilter={VisibilityFilter.ShowAll} text="Все"/>
      <FilterButton visibilityFilter={VisibilityFilter.ShowPsychiatrist} text="Психиатр"/>
      <FilterButton visibilityFilter={VisibilityFilter.ShowPsychologist} text="Психолог"/>
      <FilterButton visibilityFilter={VisibilityFilter.ShowPsychotherapist} text="Прихотерапевты"/>
      {renderList()}
    </IonContent>
  )
}
