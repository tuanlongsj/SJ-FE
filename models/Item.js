// Item model helpers for lowdb

function createItem(data) {
  return {
    id: Date.now().toString(), // simple unique id
    ...data,
  };
}

module.exports = { createItem };