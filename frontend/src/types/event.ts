export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventData {
  title: string;
  description?: string;
  date: string;
  location: string;
}