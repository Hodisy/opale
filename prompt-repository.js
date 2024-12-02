/* global chrome */
const generateId = () => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 12; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};
const getCurrentTimestamp = () => new Date().toISOString();
const PromptRepository = (storageKey) => ({
  async create(entity) {
    const entities = await this.getAll();
    const newEntity = {
      id: generateId(),
      createdAt: getCurrentTimestamp(),
      updatedAt: getCurrentTimestamp(),
      ...entity,
    };
    entities.push(newEntity);
    await chrome.storage.local.set({ [storageKey]: entities });
    return newEntity;
  },
  async update(id, updatedEntity) {
    const entities = await this.getAll();
    const index = entities.findIndex((entity) => entity.id === id);
    if (index !== -1) {
      entities[index] = {
        ...entities[index],
        ...updatedEntity,
        updatedAt: getCurrentTimestamp(),
      };
      await chrome.storage.local.set({ [storageKey]: entities });
      return entities[index];
    }
    console.error('Entity not found');
  },
  async delete(id) {
    const entities = await this.getAll();
    const filteredEntities = entities.filter((entity) => entity.id !== id);
    await chrome.storage.local.set({ [storageKey]: filteredEntities });
  },
  async getAll() {
    const result = await chrome.storage.local.get(storageKey);
    return result[storageKey] || [];
  },
  async getById(id) {
    const entities = await this.getAll();
    return entities.find((entity) => entity.id === id) || null;
  },
});
export const promptRepository = PromptRepository('opale-prompt');
