
import * as faker from 'faker';

let eventsList = []
var times = 5;
for(var i=0; i < times; i++){
  let data =  {
    "name": faker.name.findName(),
    "eventDate": faker.date.between('2020-01-01', '2020-12-31'),
    "budget": faker.finance.amount(),
    "items": faker.lorem.paragraph(),
    "description": faker.lorem.paragraph(),
    "location": faker.address.city(),
    "active": faker.random.boolean(),
    createdAt: `${new Date()}`,
    updatedAt: `${new Date()}`
  };
  eventsList.push(data);
}
export const EventSeed = eventsList;
