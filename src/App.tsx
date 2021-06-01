import { Route, Switch } from 'react-router-dom';
import { IonApp } from '@ionic/react';

import { AddingForm, AllList, Rating, Analytics } from './pages';
import { Header } from './components';

import '@ionic/react/css/core.css';

export const App: React.FC = () => (
  <IonApp>
    <Header/>
      <Switch>
        <Route exact path="/" component={AllList}/>
        <Route path="/adding-form" component={AddingForm}/>
        <Route path="/favorite" render={()=> <Rating ratingType="favorite"/>}/>
        <Route path="/disfavorite" render={()=> <Rating ratingType="disfavorite"/>}/>
        <Route path="/analytics" component={Analytics}/>
      </Switch>
  </IonApp>
);


