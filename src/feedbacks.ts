import type { ModuleInstance } from './main.js'

export function UpdateFeedbacks(self: ModuleInstance): void {
	self.setFeedbackDefinitions({
		ChannelState: {
			name: 'Global Mute',
			type: 'boolean',
			defaultStyle: {},
			options: [],
			callback: () => {
				console.log(self.getVariableValue('globalMute'))
				return !!self.getVariableValue('globalMute')
			},
		},
	})
}
