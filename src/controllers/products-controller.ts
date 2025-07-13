import { Router } from 'express';

const router = Router();

/**
 * Middleware samo za Products controller
 * Svi Middlewares koji su definisane pre middleware-a u `products-controller` se izvrsavaju, a tek zatim se
 * izvrsava i ovaj middleware 
 */
router.use((request, response, next) => {
  console.log('Product controller');
  next();
});

router.get('/all', (request, response, next) => {
  response
    .contentType('application/json')
    .status(200)
    .send([{ name: 'product1' }, { name: 'product2' }])
    .end();
});

router.get('/:id', (request, response, next) => {
  const { id } = request.params;
  response
    .contentType('application/json')
    .status(200)
    .send({ id, name: `Product_${id}` })
    .end();
});

export default router;