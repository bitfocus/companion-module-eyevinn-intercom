import type { ModuleInstance } from './main.js'
import { ChannelPresetCategories } from './presets.js'

export enum GlobalVariables {
	GLOBAL_MUTE = 'GlobalMute',
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
	[key: string]: boolean
}

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	const variableDefinitions: VariableDefinition[] = [{ variableId: Variables.GLOBAL_MUTE, name: Variables.GLOBAL_MUTE }]
	const variableValues: VariableValues = {
		[Variables.GLOBAL_MUTE]: false,
	}

	for (let i in Object.values(ChannelPresetCategories)) {
		const index: number = Number(i) + 1
		Object.values(ChannelXVariables).forEach((channelXVariable) => {
			const variableId = channelXVariable.replace('X', index.toString())
			const variableValue = channelXVariable === ChannelXVariables.CHANNEL_X_INPUT_MUTE
			variableDefinitions.push({ variableId, name: variableId })
			variableValues[variableId] = variableValue
		})
	}

	self.setVariableDefinitions(variableDefinitions)
	self.setVariableValues(variableValues)
}
