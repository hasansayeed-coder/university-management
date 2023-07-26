import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewires/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());

//parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Application routes

console.log(app.get(`env`));

// app.use('/api/v1/users/', UserRoutes);
// app.use('/api/v1/academic-semesters' , AcademicSemesterRoutes)
app.use('/api/v1/', routes);

// testing
// app.get('/', async (req: Request, res: Response , next : NextFunction) => {
//   // res.send('Working Successfully')
//   // throw new ApiError(400 , 'Error is here to protect yOU');

//   // Promise.reject((new Error('Unhandled Promise Rejection'))) ;

//   // console.log(x) ;

//   throw new Error('Testing new logger') ;
// })
// app.get('/', (req: Request, res: Response , next : NextFunction) => {
//   // res.send('Working Successfully')
//   next('error is there to protect YOU'); // error
// })

// global error handler
app.use(globalErrorHandler);

// handle not Found error

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });

  next();
});

export default app;
