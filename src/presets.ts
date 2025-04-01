import { combineRgb, type CompanionPresetDefinitions } from '@companion-module/base'
import { ModuleInstance } from './main.js'
import { ActionTypes } from './actions.js'

export enum PresetCategories {
	ChannelOneButtons = 'Channel 1 Buttons',
	ChannelTwoButtons = 'Channel 2 Buttons',
	ChannelThreeButtons = 'Channel 3 Buttons',
	ChannelFourButtons = 'Channel 4 Buttons',
	ChannelFiveButtons = 'Channel 5 Buttons',
	ChannelSixButtons = 'Channel 6 Buttons',
	ChannelSevenButtons = 'Channel 7 Buttons',
	ChannelEightButtons = 'Channel 8 Buttons',
}

export enum PresetTypes {
	ToggleInputMute = 'toggle_input_mute',
	ToggleOutputMute = 'toggle_output_mute',
	ToggleGlobalMute = 'toggle_global_mute',
	IncreaseVolume = 'increase_volume',
	DecreaseVolume = 'decrease_volume',
	PushToTalk = 'push_to_talk',
}

export function UpdatePresets(self: ModuleInstance): void {
	const presets: CompanionPresetDefinitions = {
		[PresetTypes.ToggleGlobalMute]: {
			category: 'Global Buttons',
			name: 'Toggle Input Mute',
			type: 'button',
			style: { text: 'Mute', size: '18', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
			feedbacks: [],
			steps: [
				{
					down: [
						{
							actionId: ActionTypes.ToggleInputMute,
							options: {},
						},
					],
					up: [],
				},
			],
		},
	}
	let index = 0
	const categories = Object.values(PresetCategories)
	categories.forEach((category) => {
		index++
		presets[PresetTypes.ToggleInputMute + index] = {
			category,
			name: 'Toggle Input Mute' + index,
			type: 'button',
			style: { text: 'Mute', size: '18', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
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
	})
	// 	[PresetTypes.ToggleInputMute]: {
	// 		category: PresetCategories.ChannelButtons,
	// 		name: 'Toggle Input Mute',
	// 		type: 'button',
	// 		style: { text: 'Mute', size: '18', color: combineRgb(255, 255, 255), bgcolor: combineRgb(0, 0, 0) },
	// 		feedbacks: [],
	// 		steps: [
	// 			{
	// 				down: [
	// 					{
	// 						actionId: ActionTypes.ToggleInputMute,
	// 						options: { channelIndex: 1 },
	// 					},
	// 				],
	// 				up: [],
	// 			},
	// 		],
	// 	},
	// }
	// presets['take'] = {
	// 	category: 'Actions\n(XY only)',
	// 	name: 'Take',
	// 	type: 'button',
	// 	style: {
	// text: 'Take',
	// size: '18',
	// color: combineRgb(255, 255, 255),
	// bgcolor: combineRgb(0, 0, 0),
	// 	},
	// 	feedbacks: [
	// 		{
	// 			feedbackId: 'take',
	// 			style: {
	// 				bgcolor: combineRgb(255, 0, 0),
	// 				color: combineRgb(255, 255, 255),
	// 			},
	// 			options: {},
	// 		},
	// 	],
	// 	steps: [
	// 		{
	// down: [
	// 	{
	// 		actionId: 'take',
	// 		options: {},
	// 	},
	// ],
	// up: [],
	// 		},
	// 	],
	// }

	// presets['clear'] = {
	// 	category: 'Actions\n(XY only)',
	// 	name: 'Clear',
	// 	type: 'button',
	// 	style: {
	// 		text: 'Clear',
	// 		size: '18',
	// 		color: combineRgb(128, 128, 128),
	// 		bgcolor: combineRgb(0, 0, 0),
	// 	},
	// 	feedbacks: [
	// 		{
	// 			feedbackId: 'clear',
	// 			style: {
	// 				bgcolor: combineRgb(255, 255, 255),
	// 				color: combineRgb(255, 0, 0),
	// 			},
	// 			options: {},
	// 		},
	// 	],
	// 	steps: [
	// 		{
	// 			down: [
	// 				{
	// 					actionId: 'clear',
	// 					options: {},
	// 				},
	// 			],
	// 			up: [],
	// 		},
	// 	],
	// }
	self.setPresetDefinitions(presets)
}
