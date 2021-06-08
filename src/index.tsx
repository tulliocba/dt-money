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
          title: 'Free lancer Website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-04-02 00:00:00')
        },
        {
          id: 2,
          title: 'Free lancer Devops',
          type: 'deposit',
          category: 'Devops',
          amount: 12000,
          createdAt: new Date('2021-06-10 00:00:00')
        },
        {
          id: 3,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Despesas',
          amount: 12000,
          createdAt: new Date('2021-07-13 00:00:00')
        },
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      console.log('Listing transactions');
      return this.schema.all('transaction');
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', {...data, createdAt: new Date()});
    });
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
