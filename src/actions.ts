import { CompanionActionDefinition } from '@companion-module/base'
import type { ModuleInstance } from './main.js'

export enum ActionTypes {
	ToggleInputMute = 'toggle_input_mute',
	ToggleOutputMute = 'toggle_output_mute',
	ToggleGlobalMute = 'toggle_global_mute',
	IncreaseVolume = 'increase_volume',
	DecreaseVolume = 'decrease_volume',
	PushToTalk = 'push_to_talk',
}

export type ActionMessage = {
	action: ActionTypes
}

export function UpdateActions(self: ModuleInstance): void {
	const actions: { [key in ActionTypes]: CompanionActionDefinition } = {
		[ActionTypes.ToggleInputMute]: {
			name: 'Toggle input mute',
			options: [],
			callback: async () => {
				self.emitMessage({
					action: ActionTypes.ToggleInputMute,
				})
			},
		},

		[ActionTypes.ToggleOutputMute]: {
			name: 'Toggle output mute',
			options: [],
			callback: async () => {
				self.emitMessage({ action: ActionTypes.ToggleOutputMute })
			},
		},

		[ActionTypes.IncreaseVolume]: {
			name: 'Increase volume',
			options: [],
			callback: async () => {
				self.emitMessage({ action: ActionTypes.IncreaseVolume })
			},
		},

		[ActionTypes.DecreaseVolume]: {
			name: 'Volume down',
			options: [],
			callback: async () => {
				self.emitMessage({ action: ActionTypes.DecreaseVolume })
			},
		},

		[ActionTypes.PushToTalk]: {
			name: 'Push to talk',
			options: [],
			callback: async () => {
				self.emitMessage({ action: ActionTypes.PushToTalk })
			},
		},

		[ActionTypes.ToggleGlobalMute]: {
			name: 'Toggle global mute',
			options: [],
			callback: async () => {
				self.emitMessage({ action: ActionTypes.ToggleGlobalMute })
			},
		},
	}

	self.setActionDefinitions(actions)
}
