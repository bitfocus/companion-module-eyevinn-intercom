import type { ModuleInstance } from './main.js'
import { ChannelPresetCategories } from './presets.js'

export enum GlobalVariables {
	IS_CONNECTED = 'IsConnected',
	GLOBAL_MUTE = 'GlobalMute',
	SELECTED_CHANNEL = 'SelectedChannel',
	NUMBER_OF_CALLS = 'NumberOfCalls',
}

export enum ChannelXVariables {
	CHANNEL_X_INPUT_MUTE = 'ChannelXInputMute',
	CHANNEL_X_OUTPUT_MUTE = 'ChannelXOutputMute',
}

export const Variables = { ...GlobalVariables, ...ChannelXVariables }

interface VariableDefinition {
	variableId: string
	name: string
}

interface VariableValues {
	[key: string]: boolean | number
}

const defaultVariables: VariableDefinition[] = [
	{ variableId: Variables.IS_CONNECTED, name: Variables.IS_CONNECTED },
	{ variableId: Variables.GLOBAL_MUTE, name: Variables.GLOBAL_MUTE },
	{ variableId: Variables.SELECTED_CHANNEL, name: Variables.SELECTED_CHANNEL },
	{ variableId: Variables.NUMBER_OF_CALLS, name: Variables.NUMBER_OF_CALLS },
]

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	const variableDefinitions: VariableDefinition[] = defaultVariables
	const variableValues: VariableValues = {
		[Variables.IS_CONNECTED]: false,
		[Variables.GLOBAL_MUTE]: false,
		[Variables.SELECTED_CHANNEL]: 0,
		[Variables.NUMBER_OF_CALLS]: 0,
	}

	Object.values(ChannelPresetCategories).forEach((_val, index) => {
		Object.values(ChannelXVariables).forEach((channelXVariable) => {
			const variableId = channelXVariable.replace('X', index.toString())
			const variableValue = channelXVariable === ChannelXVariables.CHANNEL_X_INPUT_MUTE
			variableDefinitions.push({ variableId, name: variableId })
			variableValues[variableId] = variableValue
		})
	})

	self.setVariableDefinitions(variableDefinitions)
	self.setVariableValues(variableValues)
}
