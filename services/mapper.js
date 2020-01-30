// Must finish!
const response = {
  data1: 'data1',
  data2: {
    data21: 'data21',
    data22: 'data22'
  },
  data3: 'data3'
};
const structure = {
  data1: true,
  data2: {
    data21: true,
  }
};

const mappedObject = {};

function explore(object) {
  if (typeof object === 'object') {
    for (const key of Object.keys(object)) {
      if (typeof object[key] === 'object') {
        console.log(key);
        explore(object[key]);
      } else {
        console.log(key);
      }
    }
  }
}

explore(response);