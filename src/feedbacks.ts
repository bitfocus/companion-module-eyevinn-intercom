import type { ModuleInstance } from './main.js'
import { ChannelXVariables, Variables } from './variables.js'

export enum Feedbacks {
	GET_BUTTON_VARIABLE_STATE = 'GetButtonVariableState',
	IS_BUTTON_DISABLED = 'IsButtonDisabled',
}

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		[Feedbacks.GET_BUTTON_VARIABLE_STATE]: {
			name: Feedbacks.GET_BUTTON_VARIABLE_STATE,
			type: 'boolean',
			defaultStyle: {},
			options: [
				{
					id: 'variableId',
					type: 'static-text',
					label: 'Variable ID',
					value: '',
				},
			],
			callback: async (feedback, context) => {
				if (!feedback.options.variableId) return false
				const vId = await context.parseVariablesInString(feedback.options.variableId.toString())
				const isChannelSelectedButton = [
					ChannelXVariables.CHANNEL_X_INPUT_MUTE.toString(),
					ChannelXVariables.CHANNEL_X_OUTPUT_MUTE.toString(),
				].includes(vId)
				const enrichedVID = isChannelSelectedButton
					? vId.replace('X', (self.getVariableValue(Variables.SELECTED_CHANNEL) || 0).toString())
					: vId
				if (enrichedVID) {
					return !!self.getVariableValue(enrichedVID)
				} else {
					return false
				}
			},
		},
		[Feedbacks.IS_BUTTON_DISABLED]: {
			name: Feedbacks.IS_BUTTON_DISABLED,
			type: 'boolean',
			defaultStyle: {},
			options: [
				{
					id: 'channelIndex',
					type: 'number',
					label: 'Channel Index',
					default: 0,
					min: 0,
					max: 18,
				},
			],
			callback: async (feedback) => {
				const isConnected = self.getVariableValue(Variables.IS_CONNECTED)
				if (!isConnected) return true
				let channelIndex = feedback.options.channelIndex
				if (!channelIndex) {
					channelIndex = self.getVariableValue(Variables.SELECTED_CHANNEL) || 0
				}
				const numberOfCalls = self.getVariableValue(Variables.NUMBER_OF_CALLS) || 0
				return !(channelIndex <= numberOfCalls)
			},
		},
	})
}
