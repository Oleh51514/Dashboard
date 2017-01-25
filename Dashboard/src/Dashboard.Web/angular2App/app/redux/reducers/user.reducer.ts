import { User } from '../../shared/models/user.model';
import { GET_USERS } from '../actions/action.constant';

export default (state: User[] = null, action: any): User[] => {
  if (!action.type || !action.payload) {
    return state;
  }

  switch (action.type) {
    case GET_USERS:
      return action.payload;   
    default:
      return state;
  }
};



