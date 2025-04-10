import { Feedbacks } from './feedbacks.js'
import { ModuleInstance } from './main.js'
import { Variables } from './variables.js'

export enum MessageTypes {
	CALL_STATE_UPDATE = 'CALL_UPDATE',
	CALLS_STATE_UPDATE = 'CALLS_STATE_UPDATE',
}

export interface Call {
	callId: string
	index: number
	isInputMuted: boolean
	isOutputMuted: boolean
	volume: number
}

export type CallStateUpdate = { type: MessageTypes.CALL_STATE_UPDATE } & Call

export type CallsStateUpdate = {
	type: MessageTypes.CALLS_STATE_UPDATE
	globalMute: boolean
	numberOfCalls: number
	calls: Call[]
}

export const handleMessage = (self: ModuleInstance, msg: CallStateUpdate | CallsStateUpdate): void => {
	console.log(msg)
	const getCallStateVariableUpdates = (call: Call) => {
		const updates: { [key: string]: boolean } = {}
		const inputMuteVariable = Variables.CHANNEL_X_INPUT_MUTE.replace('X', call.index.toString())
		const variableIsInputMuted = self.getVariableValue(inputMuteVariable)
		if (variableIsInputMuted !== call.isInputMuted) {
			updates[inputMuteVariable] = call.isInputMuted
		}
		const outputMuteVariable = Variables.CHANNEL_X_OUTPUT_MUTE.replace('X', call.index.toString())
		const variableIsOutputMuted = self.getVariableValue(outputMuteVariable)
		if (variableIsOutputMuted !== call.isOutputMuted) {
			updates[outputMuteVariable] = call.isOutputMuted
		}
		return updates
	}

	if (msg.type === MessageTypes.CALL_STATE_UPDATE) {
		const updates = getCallStateVariableUpdates(msg)
		if (Object.keys(updates).length) {
			self.setVariableValues(updates)
			self.checkFeedbacks(Feedbacks.GET_BUTTON_VARIABLE_STATE)
		}
	} else if (msg.type === MessageTypes.CALLS_STATE_UPDATE) {
		const variableIsGlobalMute = self.getVariableValue(Variables.GLOBAL_MUTE)
		const variableNumberOfCalls = self.getVariableValue(Variables.NUMBER_OF_CALLS)
		let updates: { [key: string]: string | boolean | number } = {}
		if (variableIsGlobalMute !== msg.globalMute) {
			msg.calls.forEach((call) => {
				updates = {
					...updates,
					...getCallStateVariableUpdates(call),
				}
			})
			updates[Variables.GLOBAL_MUTE] = msg.globalMute
		}
		if (variableNumberOfCalls !== msg.numberOfCalls) {
			updates[Variables.NUMBER_OF_CALLS] = msg.numberOfCalls
		}
		if (Object.keys(updates).length) {
			self.setVariableValues(updates)
			self.checkFeedbacks(Feedbacks.GET_BUTTON_VARIABLE_STATE, Feedbacks.IS_BUTTON_DISABLED)
		}
	}
}
