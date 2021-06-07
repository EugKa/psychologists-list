import React, { useEffect } from 'react'
import { IonContent, IonList, IonProgressBar } from '@ionic/react'
import { useDispatch, useSelector } from 'react-redux';
import { PsychologItem } from '../components/psycholog-item';
import { AppDispatch } from '../stote';
import { fetchDataList, updatePsychologRating, } from '../stote/features/psychologists-data';
import { RootState } from '../stote/rootReducer';
import { IPsycholog } from '../types/psycholog';
import { VisibilityFilter } from '../stote/features/psychologists-filter';
import { FilterButton } from '../components';
import { DisplayMessage } from '../components/display-message';

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
  const data = useSelector((state:RootState) =>  
  getVisibleFilter(state.psychologistsList.psychologistsList, state.visibilityFilter))
  
  const status = useSelector((state:RootState) => state.psychologistsList.status)

  useEffect(() => {
    if(status === 'idle') {
      dispatch(fetchDataList())
    }
  }, [status, dispatch])

  const onRatingChange = (rating: string, id: string) => {
    const findEl = data.find((item) => item.id === id)
    if(findEl?.rating === rating) {
      dispatch(updatePsychologRating({rating: null, id}))
    } else {
      dispatch(updatePsychologRating({rating, id}))
    }
  }

  const ErrorBannerElement = status === 'failed' ? 
    <DisplayMessage type="danger" message="Что то пошло не так. Пожалуйста попробуйте позже"/>
    : null;
  
  const rendeTitle = ratingType === 'favorite' ? (
    <h2>Любимые</h2>
  ) : <h2>Нелюбимые</h2>;

  const renderList = () => {
    return <IonList>
      {
        data.filter(items => items.rating === ratingType).map((items: IPsycholog) => {
          return <PsychologItem key={items.id} items={items} onRatingChange={onRatingChange}/>
        })
      }
    </IonList>
  }
  return (
    <IonContent>
      {ErrorBannerElement}
      {rendeTitle}
      <FilterButton visibilityFilter={VisibilityFilter.ShowAll} text="Все"/>
      <FilterButton visibilityFilter={VisibilityFilter.ShowPsychiatrist} text="Психиатр"/>
      <FilterButton visibilityFilter={VisibilityFilter.ShowPsychologist} text="Психолог"/>
      <FilterButton visibilityFilter={VisibilityFilter.ShowPsychotherapist} text="Прихотерапевты"/>
      {status === 'loading' ? <IonProgressBar/> : renderList()}
    </IonContent>
  )
}
