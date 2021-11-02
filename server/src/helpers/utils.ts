import { Response } from 'express';
import { Driver } from './interfaces';

export const authenticatedDriver: Driver = {
  id: 2654,
  display_name: 'Driver McDrivy',
  first_name: 'Driver',
  full_name: 'Driver Driverson',
  profile_slug: 'the-driver',
};

export const handleInternalServerError = (error: any, res: Response) => {
  // implement a logging feature like winston to log server errors
  // we will go with console.log for this project
  console.log(error.message);

  res.status(500).json({ message: 'Can not handle request at the moment. Please try again later' });
};
