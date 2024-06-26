import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app/app.controller';

/*
NestJS likes to separate the business logic from the controller.
- Business logic is the code that is responsible for executing a particular task.
- Controller is the code that is responsible for handling incoming requests and returning the response to the client.
So in the controller, we only define the function that will be called when the client makes a request.
The actual business logic is defined in the service. eg. app.service.ts -> AppService class -> getHello() function.
*/

// AppModule should only have AppController and AppService.
@Module({
  imports: [MoviesModule],
  controllers: [AppController],
  providers: [],
})

// AppModule is a root module of the application, it ties all the pieces together.
export class AppModule {}
