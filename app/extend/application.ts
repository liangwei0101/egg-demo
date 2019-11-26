import { Application } from 'egg';
import GraphQL from '../graphql';

const TYPE_GRAPHQL_SYMBOL = Symbol('Application#TypeGraphql');

export default {
  get graphql(this: Application): GraphQL {
    if (!this[TYPE_GRAPHQL_SYMBOL]) {
      this[TYPE_GRAPHQL_SYMBOL] = new GraphQL(this);
    }
    return this[TYPE_GRAPHQL_SYMBOL];
  },
};