import type { ModuleInstance } from './main.js'
import { ChannelXVariables, Variables } from './variables.js'

export enum Feedbacks {
	GET_BUTTON_VARIABLE_STATE = 'GetButtonVariableState',
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
	})
}
