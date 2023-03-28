import Realm from 'realm';

const ProductSchema = {
  name: 'Product',
  properties: {
    name: 'string',
    price: 'double',
    isSynced: {type: 'bool', default: false},
  },
};
const AddProductSchema = {
  name: 'AddProduct',
  properties: {
    serviceName: 'string?',
    image: 'string?',
    quantity: 'int?',
    price: 'int?',
    details: 'string?',
    category: '{}?',
    createdAt: 'date',
  },
};

export const realm = new Realm({
  schema: [ProductSchema, AddProductSchema],
});
