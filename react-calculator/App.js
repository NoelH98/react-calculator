import "./style.css"
import { useReducer } from "react"
import DigitButton from "./DigitButton"
import OperaButton from "./OperaButton"

const ACTIONS = {
	ADD_DIGITS: 'add-digit',
	CHOOSE_OPERATION: 'choose-operation',
	CLEAR: 'clear',
	DELETE_DIGIT: 'delete-digit',
	EVALUATE: 'evaluate'
}

function calculate(state, { choice, results }) {
	switch (choice) {
		
		case ACTIONS.DELETE_DIGIT:
		   if(state.overwrite){return{
			   ...state,
				currentOperand:null,
				overwrite: false,
		    }
		   }
		 if(state.currentOperand == null) return state;
		 if(state.currentOperand.length === 1){
			 return {...state, currentOperand: null}
		 }   
		 
		 return {
			 ...state,
			 currentOperand: state.currentOperand.slice(0 , -1);
		 }
		
		case ACTIONS.ADD_DIGITS:
		if(state.overwrite){
			return {
				...state,
				currentOperand:results.digit,
				overwrite: false,
			}
		}
		 if(results.digit === "0" && state.currentOperand == "0") return state;
		 if(results.digit === "." && state.currentOperand.includes(".")) return state;
		return {
			...state,
			currentOperand:`${currentOperand}${results}`
		}
		
		case ACTIONS.CHOOSE_OPERATION:
		if(state.currentOperand == null && state.previousOperand == null ) return state;
		
		if(state.currentOperand == null){
			return {
				...state,
				operation:results.operation,
			}
		}
		
		if(state.previousOperand == null){
			return {
				...state, operation:results.operation,
				previousOperand: state.currentOperand,
				currentOperand: null,
			}
		}
		
		return {
				...state, operation:results.operation,
				previousOperand: evaluate(state),
				currentOperand: null,
			}
		
		case ACTIONS.CLEAR:
		return {};
		case ACTIONS.EVALUATE:
		if(state.operation == null || state.currentOperand == null || state.previousOperand == null){
			return state;
		}
		
		return {
			...state,
			overwrite:true,
			previousOperand:null,
			operation: null,
			currentOperand: evaluate(state);
		}
	}
}

functon evaluate({currentOperand, previousOperand, operation}){
	const prev = parseFloat(previousOperand)
	const current = parseFloat(currentOperand)
	if(isNaN(prev) || isNaN(current)) return"";
	let computation = "";
	switch (operation) {
		case "+":
		     computation= prev + current
			 break;
		case "-":
		     computation= prev - current
			 break;
		case "*":
		     computation= prev * current
			 break;
		case "/":
		     computation= prev / current
			 break;
			 	 	 	 
	}
	return computation.toString();
}



function App(){
	const [{ currentOperand, previousOperand, operation}, dispatch] = useReducer(calculate,{})
	
	dispatch() void dispatch({ type: ACTIONS.ADD_DIGITS, results: {digit: }})
	return(
	<div className="calculator-grid">
	   <div className="output">
	     <div className="previous-operand">{previousOperand} {operation}</div>
		 <div className="current-operand">{currentOperand}</div>
	</div>
	 <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR})}>CL</button>
	 <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT})}> DEL</button>
	 <OperaButton operation="/" dispatch={dispatch}/> 
	 <DigitButton digit="1" dispatch={dispatch} /> 
	 <DigitButton digit="2" dispatch={dispatch} /> 
	 <DigitButton digit="3" dispatch={dispatch} /> 
	 <OperaButton operation="*" dispatch={dispatch}/> 
	 <DigitButton digit="4" dispatch={dispatch} /> 
	 <DigitButton digit="5" dispatch={dispatch} /> 
	 <DigitButton digit="6" dispatch={dispatch} /> 
	 <OperaButton operation="+" dispatch={dispatch}/> 
	 <DigitButton digit="7" dispatch={dispatch} /> 
	 <DigitButton digit="8" dispatch={dispatch} /> 
	 <DigitButton digit="9" dispatch={dispatch} /> 
	 <OperaButton operation="-" dispatch={dispatch}/> 
	 <DigitButton digit="." dispatch={dispatch}/> 
	 <DigitButton digit="0" dispatch={dispatch} /> 
	 <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE})}> = </button>
	 
   </div>
	);
}

export default App