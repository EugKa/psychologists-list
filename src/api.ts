import { db } from "./firebase";
import { IPsycholog } from "./types/psycholog";

export function getList() {
    return db.collection("psychologists").get().then((snapshot:any) => {
        const items = snapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        return items;
      });
}

export function createPsycholog(data: IPsycholog) {
  return db.collection('psychologists').add({
      ...data,
  })
      .then((docRef:any) => docRef.get())
      .then((doc:any) => ({
          id: doc.id,
          ...doc.data()
      }));
}

export function updateRating(rating:string, id: string) {
  return db.collection('psychologists').doc(id).update({
    "rating": rating,
  }).then(() => {
    console.log("Document successfully updated!");
})
}