import { Feedbacks } from './feedbacks.js'
import { ModuleInstance } from './main.js'
import { Variables } from './variables.js'

export enum MessageTypes {
	CALL_STATE_UPDATE = 'CALL_STATE_UPDATE',
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
	if (msg.type === MessageTypes.CALL_STATE_UPDATE) {
		const updates: { [key: string]: boolean } = {}
		const inputMuteVariable = Variables.CHANNEL_X_INPUT_MUTE.replace('X', msg.index.toString())
		const variableIsInputMuted = self.getVariableValue(inputMuteVariable)
		if (variableIsInputMuted !== msg.isInputMuted) {
			updates[inputMuteVariable] = msg.isInputMuted
		}
		const outputMuteVariable = Variables.CHANNEL_X_OUTPUT_MUTE.replace('X', msg.index.toString())
		const variableIsOutputMuted = self.getVariableValue(outputMuteVariable)
		if (variableIsOutputMuted !== msg.isOutputMuted) {
			updates[outputMuteVariable] = msg.isOutputMuted
		}
		if (Object.keys(updates).length) {
			self.setVariableValues(updates)
			self.checkFeedbacks(Feedbacks.GET_BUTTON_VARIABLE_STATE)
		}
	} else if (msg.type === MessageTypes.CALLS_STATE_UPDATE) {
		const variableIsGlobalMute = self.getVariableValue(Variables.GLOBAL_MUTE)
		if (variableIsGlobalMute !== msg.globalMute) {
			self.setVariableValues({ [Variables.GLOBAL_MUTE]: msg.globalMute })
			self.checkFeedbacks(Feedbacks.GET_BUTTON_VARIABLE_STATE)
		}
	}
}
