import { CompanionActionDefinition, CompanionActionEvent, InputValue } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import open from 'open'

export enum ActionTypes {
	OpenIntercom = 'open_intercom',
	ToggleInputMute = 'toggle_input_mute',
	ToggleOutputMute = 'toggle_output_mute',
	ToggleGlobalMute = 'toggle_global_mute',
	IncreaseVolume = 'increase_volume',
	DecreaseVolume = 'decrease_volume',
	PushToTalk = 'push_to_talk',
}

export type ActionMessage = {
	action: ActionTypes
	index?: InputValue
}

export const defaultOpenUrl = 'https://intercom-dev.app.eyevinn.technology/'

export function UpdateActions(self: ModuleInstance): void {
	const actions: { [key in ActionTypes]: CompanionActionDefinition } = {
		[ActionTypes.OpenIntercom]: {
			name: 'Open Intercom',
			options: [
				{
					id: 'url',
					type: 'textinput',
					label: 'URL',
					default: defaultOpenUrl,
					required: true,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const URL = action.options.url?.toString()
				if (URL) {
					return open(URL).then(
						() => console.info('Successfully opened Intercom'),
						() => {
							console.error('Unsuccessfully opened Intercom')
						},
					)
				}
			},
		},
		[ActionTypes.ToggleInputMute]: {
			name: 'Toggle input mute',
			options: [
				{
					id: 'channelIndex',
					type: 'number',
					label: 'Channel',
					default: 1,
					min: 1,
					max: 10,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const channelIndex = action.options.channelIndex?.toString()
				if (!channelIndex) return
				self.emitMessage({
					action: ActionTypes.ToggleInputMute,
					index: action.options.channelIndex,
				})
			},
		},

		[ActionTypes.ToggleOutputMute]: {
			name: 'Toggle output mute',
			options: [
				{
					id: 'channelIndex',
					type: 'number',
					label: 'Channel',
					default: 1,
					min: 1,
					max: 10,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				self.emitMessage({ action: ActionTypes.ToggleOutputMute, index: action.options.channelIndex })
			},
		},

		[ActionTypes.IncreaseVolume]: {
			name: 'Increase volume',
			options: [
				{
					id: 'channelIndex',
					type: 'number',
					label: 'Channel',
					default: 1,
					min: 1,
					max: 10,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				self.emitMessage({ action: ActionTypes.IncreaseVolume, index: action.options.channelIndex })
			},
		},

		[ActionTypes.DecreaseVolume]: {
			name: 'Volume down',
			options: [
				{
					id: 'channelIndex',
					type: 'number',
					label: 'Channel',
					default: 1,
					min: 1,
					max: 10,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				self.emitMessage({ action: ActionTypes.DecreaseVolume, index: action.options.channelIndex })
			},
		},

		[ActionTypes.PushToTalk]: {
			name: 'Push to talk',
			options: [
				{
					id: 'channelIndex',
					type: 'number',
					label: 'Channel',
					default: 1,
					min: 1,
					max: 10,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				self.emitMessage({ action: ActionTypes.PushToTalk, index: action.options.channelIndex })
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
