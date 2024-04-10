import { Task } from './task';

export interface Card {
  id: string;
  title: string;
  tasks: Task[];
  bgColor: string;
  order: number;
}
