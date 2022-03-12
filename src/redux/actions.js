export const SET_USER_NAME = "SET_USER_NAME";
export const SET_USER_ID = "SET_USER_ID";

export const setName = (name) => (dispatach) => {
  dispatach({
    type: SET_USER_NAME,
    payload: name,
  });
};

export const setUserId = (uId) => (dispatach) => {
  dispatach({
    type: SET_USER_ID,
    payload: uId,
  });
};
