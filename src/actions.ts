import { CompanionActionDefinition } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

export function UpdateActions(self: ModuleInstance): void {
	const actions: { [key: string]: CompanionActionDefinition } = {
		sample_action: {
			name: 'My First Action Test',
			options: [
				{
					id: 'num',
					type: 'number',
					label: 'Test',
					default: 5,
					min: 0,
					max: 100,
				},
			],
			callback: async (event) => {
				console.log('Hello world!', event.options.num)
			},
		},

		toggle_input_mute: {
			name: 'Toggle input mute',
			options: [],
			callback: async () => {
				self.sendToFrontend({
					action: 'toggle_input_mute',
				})
			},
		},

		toggle_output_mute: {
			name: 'Toggle output mute',
			options: [],
			callback: async () => {
				self.sendToFrontend({ action: 'toggle_output_mute' })
			},
		},

		increase_volume: {
			name: 'Increase volume',
			options: [],
			callback: async () => {
				self.sendToFrontend({ action: 'increase_volume' })
			},
		},

		decrease_volume: {
			name: 'Volume down',
			options: [],
			callback: async () => {
				self.sendToFrontend({ action: 'decrease_volume' })
			},
		},

		push_to_talk: {
			name: 'Push to talk',
			options: [],
			callback: async () => {
				self.sendToFrontend({ action: 'push_to_talk' })
			},
		},

		toggle_global_mute: {
			name: 'Toggle global mute',
			options: [],
			callback: async () => {
				self.sendToFrontend({ action: 'toggle_global_mute' })
			},
		},
	}

	self.setActionDefinitions(actions)
}
