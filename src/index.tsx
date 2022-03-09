import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Aluguel do Apartamento',
          amount: 3000,
          owner: 'Luan',
          type: 'withdraw',
          category: 'Casa',
          createdAt: new Date('2022-03-07 09:00:00')
        },
        {
          id: 2,
          title: 'Pagamento',
          amount: 7500,
          owner: 'Luan',
          type: 'deposit',
          category: 'Trabalho',
          createdAt: new Date('2022-03-15 09:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('/transactions', () => {
      return this.schema.all('transaction');
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
