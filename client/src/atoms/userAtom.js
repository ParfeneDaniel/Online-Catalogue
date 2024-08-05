import { atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const oldValue = localStorage.getItem(key);
    if (oldValue != null) {
      setSelf(JSON.parse(oldValue));
    }
    onSet((newValue, _, isReset) => {
      isReset
        ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
  };

const userAtom = atom({
  key: "userAtom",
  default: null,
  effects: [localStorageEffect("user")],
});

export default userAtom;
