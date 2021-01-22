import { handleActions } from 'redux-actions';
import { authState } from 'stores/auth/state';
import { AUTH_TYPE } from 'stores/auth/type';

export default handleActions({}, authState);
