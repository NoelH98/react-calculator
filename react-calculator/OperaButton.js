import { ACTIONS } from './App'

export default function OperaButton({ dispatch, operation }){
	return <button onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, results: {operation} })}>{operation}</button>
}