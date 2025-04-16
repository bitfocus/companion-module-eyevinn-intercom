import { combineRgb, type CompanionPresetDefinitions } from '@companion-module/base'
import { ModuleInstance } from './main.js'
import { ActionTypes, defaultOpenUrl } from './actions.js'
import {
	connectedIcon,
	decreaseVolumeIcon,
	diabledInputIcon,
	disabledDecreaseVolumeIcon,
	disabledIncreaseVolumeIcon,
	disabledOutputIcon,
	disabledPTTIcon,
	disconnectedIcon,
	increaseVolumeIcon,
	mutedInputIcon,
	mutedOutputIcon,
	PTTEnabledIcon,
	unmutedInputIcon,
	unmutedOutputIcon,
} from './icons.js'
import { Feedbacks } from './feedbacks.js'
import { Variables } from './variables.js'

// rgb(111, 216, 79)
// rgb(249, 108, 108)

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

export enum ChannelXPresetCategory {
	ChannelXButtons = 'Channel X Buttons',
}

export const PresetCategories = { ...GlobalPresetCategories, ...ChannelPresetCategories, ...ChannelXPresetCategory }

export enum PresetTypes {
	ToggleInputMute = 'toggle_input_mute',
	ToggleOutputMute = 'toggle_output_mute',
	IncreaseVolume = 'increase_volume',
	DecreaseVolume = 'decrease_volume',
	ChannelSelect = 'channel_select',
	PushToTalk = 'push_to_talk',
	ToggleGlobalMute = 'toggle_global_mute',
	OpenIntercom = 'open_intercom',
	ConnectionStatus = 'connection_status',
}

export function UpdatePresets(self: ModuleInstance): void {
	const presets: CompanionPresetDefinitions = {
		[PresetTypes.ConnectionStatus]: {
			category: PresetCategories.GlobalButtons,
			name: 'Connection Status',
			type: 'button',
			style: {
				text: 'Status',
				size: '14',
				alignment: 'right:top',
				png64: connectedIcon,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				show_topbar: false,
			},
			feedbacks: [
				{
					feedbackId: Feedbacks.IS_BUTTON_DISABLED,
					options: {},
					style: {
						png64: disconnectedIcon,
						color: combineRgb(133, 133, 133),
					},
				},
			],
			steps: [
				{
					down: [],
					up: [],
				},
			],
		},
		[PresetTypes.OpenIntercom]: {
			category: PresetCategories.GlobalButtons,
			name: 'Open Intercom',
			type: 'button',
			style: {
				text: 'Open Intercom',
				size: '14',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				show_topbar: false,
			},
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
				text: 'Global',
				size: '14',
				alignment: 'right:top',
				png64: unmutedInputIcon,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				show_topbar: false,
			},
			feedbacks: [
				{
					feedbackId: Feedbacks.GET_BUTTON_VARIABLE_STATE,
					options: { variableId: Variables.GLOBAL_MUTE },
					style: {
						png64: mutedInputIcon,
					},
				},
				{
					feedbackId: Feedbacks.IS_BUTTON_DISABLED,
					options: {},
					style: {
						png64: diabledInputIcon,
						color: combineRgb(133, 133, 133),
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
	presets[PresetTypes.ToggleInputMute + 'X'] = {
		category: PresetCategories.ChannelXButtons,
		name: 'Toggle Input Mute X',
		type: 'button',
		style: {
			text: 'X',
			size: '14',
			png64: unmutedInputIcon,
			pngalignment: 'center:center',
			alignment: 'right:top',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		feedbacks: [
			{
				feedbackId: Feedbacks.GET_BUTTON_VARIABLE_STATE,
				options: { variableId: Variables.CHANNEL_X_INPUT_MUTE },
				style: {
					png64: mutedInputIcon,
				},
			},
			{
				feedbackId: Feedbacks.IS_BUTTON_DISABLED,
				options: {},
				style: {
					png64: diabledInputIcon,
					color: combineRgb(133, 133, 133),
				},
			},
		],
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
	}
	presets[PresetTypes.ToggleOutputMute + 'X'] = {
		category: PresetCategories.ChannelXButtons,
		name: 'Toggle Output Mute X',
		type: 'button',
		style: {
			text: 'X',
			size: '14',
			png64: unmutedOutputIcon,
			pngalignment: 'center:center',
			alignment: 'right:top',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		feedbacks: [
			{
				feedbackId: Feedbacks.GET_BUTTON_VARIABLE_STATE,
				options: { variableId: Variables.CHANNEL_X_OUTPUT_MUTE },
				style: {
					png64: mutedOutputIcon,
				},
			},
			{
				feedbackId: Feedbacks.IS_BUTTON_DISABLED,
				options: {},
				style: {
					png64: disabledOutputIcon,
					color: combineRgb(133, 133, 133),
				},
			},
		],
		steps: [
			{
				down: [
					{
						actionId: ActionTypes.ToggleOutputMute,
						options: {},
					},
				],
				up: [],
			},
		],
	}
	presets[PresetTypes.IncreaseVolume + 'X'] = {
		category: PresetCategories.ChannelXButtons,
		name: 'Increase Volume X',
		type: 'button',
		style: {
			text: 'X',
			size: '14',
			png64: increaseVolumeIcon,
			pngalignment: 'center:center',
			alignment: 'right:top',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		feedbacks: [
			{
				feedbackId: Feedbacks.IS_BUTTON_DISABLED,
				options: {},
				style: {
					png64: disabledIncreaseVolumeIcon,
					color: combineRgb(133, 133, 133),
				},
			},
		],
		steps: [
			{
				down: [
					{
						actionId: ActionTypes.IncreaseVolume,
						options: {},
					},
				],
				up: [],
			},
		],
	}
	presets[PresetTypes.DecreaseVolume + 'X'] = {
		category: PresetCategories.ChannelXButtons,
		name: 'Decrease Volume X',
		type: 'button',
		style: {
			text: 'X',
			size: '14',
			png64: decreaseVolumeIcon,
			pngalignment: 'center:center',
			alignment: 'right:top',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		feedbacks: [
			{
				feedbackId: Feedbacks.IS_BUTTON_DISABLED,
				options: {},
				style: {
					png64: disabledDecreaseVolumeIcon,
					color: combineRgb(133, 133, 133),
				},
			},
		],
		steps: [
			{
				down: [
					{
						actionId: ActionTypes.DecreaseVolume,
						options: {},
					},
				],
				up: [],
			},
		],
	}
	presets[PresetTypes.PushToTalk + 'X'] = {
		category: PresetCategories.ChannelXButtons,
		name: 'Push To Talk X',
		type: 'button',
		style: {
			text: 'X',
			size: '14',
			png64: PTTEnabledIcon,
			pngalignment: 'center:center',
			alignment: 'right:top',
			color: combineRgb(255, 255, 255),
			bgcolor: combineRgb(0, 0, 0),
			show_topbar: false,
		},
		feedbacks: [
			{
				feedbackId: Feedbacks.IS_BUTTON_DISABLED,
				options: {},
				style: {
					png64: disabledPTTIcon,
					color: combineRgb(133, 133, 133),
				},
			},
		],
		steps: [
			{
				down: [
					{
						actionId: ActionTypes.PushToTalkStart,
						options: {},
					},
				],
				up: [
					{
						actionId: ActionTypes.PushToTalkStop,
						options: {},
					},
				],
			},
		],
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
				alignment: 'right:top',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				show_topbar: false,
			},
			feedbacks: [
				{
					feedbackId: Feedbacks.GET_BUTTON_VARIABLE_STATE,
					options: { variableId: Variables.CHANNEL_X_INPUT_MUTE.replace('X', index.toString()) },
					style: {
						png64: mutedInputIcon,
					},
				},
				{
					feedbackId: Feedbacks.IS_BUTTON_DISABLED,
					options: { channelIndex: index },
					style: {
						png64: diabledInputIcon,
						color: combineRgb(133, 133, 133),
					},
				},
			],
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
				alignment: 'right:top',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				show_topbar: false,
			},
			feedbacks: [
				{
					feedbackId: Feedbacks.GET_BUTTON_VARIABLE_STATE,
					options: { variableId: Variables.CHANNEL_X_OUTPUT_MUTE.replace('X', index.toString()) },
					style: {
						png64: mutedOutputIcon,
					},
				},
				{
					feedbackId: Feedbacks.IS_BUTTON_DISABLED,
					options: { channelIndex: index },
					style: {
						png64: disabledOutputIcon,
						color: combineRgb(133, 133, 133),
					},
				},
			],
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
				alignment: 'right:top',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				show_topbar: false,
			},
			feedbacks: [
				{
					feedbackId: Feedbacks.IS_BUTTON_DISABLED,
					options: { channelIndex: index },
					style: {
						png64: disabledPTTIcon,
						color: combineRgb(133, 133, 133),
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: ActionTypes.PushToTalkStart,
							options: { channelIndex: index },
						},
					],
					up: [
						{
							actionId: ActionTypes.PushToTalkStop,
							options: { channelIndex: index },
						},
					],
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
				alignment: 'right:top',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				show_topbar: false,
			},
			feedbacks: [
				{
					feedbackId: Feedbacks.IS_BUTTON_DISABLED,
					options: { channelIndex: index },
					style: {
						png64: disabledIncreaseVolumeIcon,
						color: combineRgb(133, 133, 133),
					},
				},
			],
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
				alignment: 'right:top',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				show_topbar: false,
			},
			feedbacks: [
				{
					feedbackId: Feedbacks.IS_BUTTON_DISABLED,
					options: { channelIndex: index },
					style: {
						png64: disabledDecreaseVolumeIcon,
						color: combineRgb(133, 133, 133),
					},
				},
			],
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
		presets[PresetTypes.ChannelSelect + index] = {
			category: PresetCategories.ChannelXButtons,
			name: 'Channel ' + index,
			type: 'button',
			style: {
				text: 'Channel ' + index.toString(),
				size: '14',
				alignment: 'center:center',
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				show_topbar: false,
			},
			feedbacks: [
				{
					feedbackId: Feedbacks.IS_BUTTON_DISABLED,
					options: { channelIndex: index },
					style: {
						color: combineRgb(133, 133, 133),
					},
				},
			],
			steps: [
				{
					down: [
						{
							actionId: ActionTypes.SetSelectedChannel,
							options: { channelIndex: index },
						},
					],
					up: [
						{
							actionId: ActionTypes.SetSelectedChannel,
							options: { channelIndex: 0 },
						},
					],
				},
			],
		}
	})
	self.setPresetDefinitions(presets)
}
