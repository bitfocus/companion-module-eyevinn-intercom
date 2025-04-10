import { CompanionActionDefinition, CompanionActionEvent, InputValue } from '@companion-module/base'
import type { ModuleInstance } from './main.js'
import open from 'open'
import { Variables } from './variables.js'
import { Feedbacks } from './feedbacks.js'

export enum ActionTypes {
	OpenIntercom = 'open_intercom',
	ToggleInputMute = 'toggle_input_mute',
	ToggleOutputMute = 'toggle_output_mute',
	ToggleGlobalMute = 'toggle_global_mute',
	IncreaseVolume = 'increase_volume',
	DecreaseVolume = 'decrease_volume',
	PushToTalkStart = 'push_to_talk_start',
	PushToTalkStop = 'push_to_talk_stop',
	SetSelectedChannel = 'set_selected_channel',
}

export type ActionMessage = {
	action: ActionTypes
	index?: InputValue
}

export const defaultOpenUrl = 'https://intercom-dev.app.eyevinn.technology/'

export function UpdateActions(self: ModuleInstance): void {
	const sendActionMessage = (action: CompanionActionEvent, actionType: ActionTypes) => {
		const optionsChannelIndex = action.options.channelIndex?.toString()
		const selectedChannelIndex = self.getVariableValue(Variables.SELECTED_CHANNEL)?.toString()
		const channelIndex: string | undefined = optionsChannelIndex ?? selectedChannelIndex
		if (!channelIndex) return
		self.emitMessage({
			action: actionType,
			index: Number(channelIndex),
		})
	}

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
					default: 0,
					min: 0,
					max: 10,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				sendActionMessage(action, ActionTypes.ToggleInputMute)
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
				sendActionMessage(action, ActionTypes.ToggleOutputMute)
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
				sendActionMessage(action, ActionTypes.IncreaseVolume)
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
				sendActionMessage(action, ActionTypes.DecreaseVolume)
			},
		},

		[ActionTypes.PushToTalkStart]: {
			name: 'Push to talk start',
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
				sendActionMessage(action, ActionTypes.PushToTalkStart)
			},
		},

		[ActionTypes.PushToTalkStop]: {
			name: 'Push to talk stop',
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
				sendActionMessage(action, ActionTypes.PushToTalkStop)
			},
		},

		[ActionTypes.ToggleGlobalMute]: {
			name: 'Toggle global mute',
			options: [],
			callback: async () => {
				self.emitMessage({ action: ActionTypes.ToggleGlobalMute })
			},
		},
		[ActionTypes.SetSelectedChannel]: {
			name: 'Set selected channel',
			options: [
				{
					id: 'channelIndex',
					type: 'number',
					label: 'Channel',
					required: true,
					default: 0,
					min: 0,
					max: 10,
				},
			],
			callback: async (action: CompanionActionEvent) => {
				self.setVariableValues({ [Variables.SELECTED_CHANNEL]: action.options.channelIndex?.toString() })
				self.checkFeedbacks(Feedbacks.GET_BUTTON_VARIABLE_STATE, Feedbacks.IS_BUTTON_DISABLED)
			},
		},
	}

	self.setActionDefinitions(actions)
}
