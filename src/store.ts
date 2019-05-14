import { Container } from "unstated";

interface IStoreContainer {
  image: string
}

class Store extends Container<IStoreContainer> {
  state = {
    image: ""
  }
}

const store = new Store();

export default store;
