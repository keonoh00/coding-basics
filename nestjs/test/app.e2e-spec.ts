import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      // For initial response, movies should return empty array
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'testing',
          year: 2000,
          genres: ['testing', 'testing2'],
        })
        .expect(201);
    });

    it('POST', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'testing',
          year: 2000,
          genres: ['testing', 'testing2'],
          wrongItem: 'iiiiii',
        })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });

    it('PATCH', () => {
      return request(app.getHttpServer()).patch('/movies').expect(404);
    });
  });

  describe('movie/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/9999').expect(404);
    });

    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'EDITED TITLE in TEST',
        })
        .expect(200);
    });

    it('PATCH 400', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          director: 'TESTING',
        })
        .expect(400);
    });

    it('PATCH 404', () => {
      return request(app.getHttpServer())
        .patch('/movies/5000')
        .send({
          title: 'EDITED TITLE in TEST',
        })
        .expect(404);
    });

    it('DELETE 404', () => {
      return request(app.getHttpServer()).delete('/movies/9999').expect(404);
    });

    it('DELETE 200', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });

    it.todo('PATCH');
  });
});
