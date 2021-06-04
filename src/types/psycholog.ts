
enum Specialists {
    psychiatrist = 'Психиатр',
    psychologist = 'Психолог',
    psychotherapist = 'Психотерапевт'
  }
export interface IPsycholog {
    id?: string;
    name: string;
    email: string;
    type: Specialists;
    rating?: string | null;
}