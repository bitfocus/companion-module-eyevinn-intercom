import type { ModuleInstance } from './main.js'

export function UpdateVariableDefinitions(self: ModuleInstance): void {
	self.setVariableDefinitions([
		{ variableId: 'globalMute', name: 'Global Mute' },
		{ variableId: 'variable2', name: 'My second variable' },
		{ variableId: 'variable3', name: 'Another variable' },
	])
}
