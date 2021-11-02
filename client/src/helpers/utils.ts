import { Driver } from './interfaces';

export const authenticatedDriver: Driver = {
  id: 2654,
  display_name: 'Driver McDrivy',
  first_name: 'Driver',
  full_name: 'Driver Driverson',
  profile_slug: 'the-driver',
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.toDateString()} ${date.toLocaleTimeString()}`;
};

export const errorMessage = (error: any) => {
  return error.response ? error.response.data.message : 'Error processing request. Please try again later';
};
