import { combineRgb, type CompanionPresetDefinitions } from '@companion-module/base'
import { ModuleInstance } from './main.js'
import { ActionTypes, defaultOpenUrl } from './actions.js'
import {
	decreaseVolumeIcon,
	globalMutedInputIcon,
	globalUnmutedInputIcon,
	increaseVolumeIcon,
	PTTEnabledIcon,
	unmutedInputIcon,
	unmutedOutputIcon,
} from './icons.js'

export enum GlobalPresetCategories {
	GlobalButtons = 'Global Buttons',
}

export enum ChannelPresetCategories {
	ChannelOneButtons = 'Channel 1 Buttons',
	ChannelTwoButtons = 'Channel 2 Buttons',
	ChannelThreeButtons = 'Channel 3 Buttons',
	ChannelFourButtons = 'Channel 4 Buttons',
	ChannelFiveButtons = 'Channel 5 Buttons',
	ChannelSixButtons = 'Channel 6 Buttons',
	ChannelSevenButtons = 'Channel 7 Buttons',
	ChannelEightButtons = 'Channel 8 Buttons',
}

export const PresetCategories = { ...GlobalPresetCategories, ...ChannelPresetCategories }

export enum PresetTypes {
	ToggleInputMute = 'toggle_input_mute',
	ToggleOutputMute = 'toggle_output_mute',
	IncreaseVolume = 'increase_volume',
	DecreaseVolume = 'decrease_volume',
	PushToTalk = 'push_to_talk',
	ToggleGlobalMute = 'toggle_global_mute',
	OpenIntercom = 'open_intercom',
}

export function UpdatePresets(self: ModuleInstance): void {
	const presets: CompanionPresetDefinitions = {
		[PresetTypes.OpenIntercom]: {
			category: PresetCategories.GlobalButtons,
			name: 'Open Intercom',
			type: 'button',
			style: { text: 'Open Intercom', size: '14', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: ActionTypes.OpenIntercom,
							options: {
								url: defaultOpenUrl,
							},
						},
					],
					up: [],
				},
			],
		},
		[PresetTypes.ToggleGlobalMute]: {
			category: PresetCategories.GlobalButtons,
			name: 'Toggle Input Mute',
			type: 'button',
			style: {
				text: '',
				size: '18',
				png64: globalUnmutedInputIcon,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [
				{
					feedbackId: 'ChannelState',
					options: {},
					style: {
						png64: globalMutedInputIcon,
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: ActionTypes.ToggleGlobalMute,
							options: {},
						},
					],
					up: [],
				},
			],
		},
	}
	let index = 0
	const categories = Object.values(ChannelPresetCategories)
	categories.forEach((category) => {
		index++
		presets[PresetTypes.ToggleInputMute + index] = {
			category,
			name: 'Toggle Input Mute' + index,
			type: 'button',
			style: {
				text: index.toString(),
				size: '14',
				png64: unmutedInputIcon,
				pngalignment: 'center:center',
				alignment: 'right:bottom',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: ActionTypes.ToggleInputMute,
							options: { channelIndex: index },
						},
					],
					up: [],
				},
			],
		}
		presets[PresetTypes.ToggleOutputMute + index] = {
			category,
			name: 'Toggle Output Mute' + index,
			type: 'button',
			style: {
				text: index.toString(),
				size: '14',
				png64: unmutedOutputIcon,
				pngalignment: 'center:center',
				alignment: 'right:bottom',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: ActionTypes.ToggleOutputMute,
							options: { channelIndex: index },
						},
					],
					up: [],
				},
			],
		}
		presets[PresetTypes.PushToTalk + index] = {
			category,
			name: 'Push To Talk' + index,
			type: 'button',
			style: {
				text: index.toString(),
				size: '14',
				png64: PTTEnabledIcon,
				pngalignment: 'center:center',
				alignment: 'right:bottom',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: ActionTypes.PushToTalk,
							options: { channelIndex: index },
						},
					],
					up: [],
				},
			],
		}
		presets[PresetTypes.IncreaseVolume + index] = {
			category,
			name: 'Increase Volume' + index,
			type: 'button',
			style: {
				text: index.toString(),
				size: '14',
				png64: increaseVolumeIcon,
				pngalignment: 'center:center',
				alignment: 'right:bottom',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: ActionTypes.IncreaseVolume,
							options: { channelIndex: index },
						},
					],
					up: [],
				},
			],
		}
		presets[PresetTypes.DecreaseVolume + index] = {
			category,
			name: 'Decrease Volume' + index,
			type: 'button',
			style: {
				text: index.toString(),
				size: '14',
				png64: decreaseVolumeIcon,
				pngalignment: 'center:center',
				alignment: 'right:bottom',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
			},
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: ActionTypes.DecreaseVolume,
							options: { channelIndex: index },
						},
					],
					up: [],
				},
			],
		}
	})
	self.setPresetDefinitions(presets)
}
