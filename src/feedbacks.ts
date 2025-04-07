import type { ModuleInstance } from './main.js'

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
				if (!feedback.options.variableId) {
					return false
				}
				const vId = await context.parseVariablesInString(feedback.options.variableId.toString())
				if (vId) {
					return !!self.getVariableValue(vId)
				} else {
					return false
				}
			},
		},
	})
}
