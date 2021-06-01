import React from 'react'

import { setVisibilityFilter, VisibilityFilter } from '../../stote/features/psychologists-filter'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../stote/rootReducer';


interface Props {
  visibilityFilter: VisibilityFilter,
  text: string,
}

export function FilterButton({ visibilityFilter, text }: Props): JSX.Element {
  const dispatch = useDispatch();

  const currentvisibilityFilter = useSelector(
    (state: RootState) => state.visibilityFilter
  );

  return (
    <button
      disabled={currentvisibilityFilter === visibilityFilter}
      onClick={() => dispatch(setVisibilityFilter(visibilityFilter))}>
      {text}
    </button>
  );
}